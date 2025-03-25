/**
 * OBSERVERS & OBSERVABLES
 * For adding behaviors and side effects to the Connectors core methods. Unlike
 * the PHP version, which uses an OOP-style Observer Pattern, this hews more
 * to the reactive programming model, which is more prevalent in TypeScript.
 * Roughly based on the RxJS v8 implementation, but greatly simplified:
 * {@link https://rxjs.dev/guide/overview}
 * {@link https://github.com/ReactiveX/rxjs/blob/8.0.0-alpha.14/packages/rxjs/src/internal/types.ts}
 */

/**
 * OBSERVER
 * {@link https://rxjs.dev/api/index/interface/Observer}
 */
export interface Observer<T> {
    next(value: T): void;
    error(error: any): void;
    complete(): void;
}

/**
 * UNSUBSCRIBABLE
 * {@link https://rxjs.dev/api/index/interface/Unsubscribable}
 */
export interface Unsubscribable {
    closed: boolean;
    unsubscribe(): void;
}

/**
 * SUBSCRIBABLE
 * {@link https://rxjs.dev/api/index/interface/Subscribable}
 */
export interface Subscribable<T> {
    subscribe(observer: Partial<Observer<T>>): Unsubscribable
}

/**
 * TEARDOWN
 * {@link https://rxjs.dev/api/index/type-alias/TeardownLogic}
 */
export type Teardown = Subscription | Unsubscribable | (() => void) | void;

/**
 * SUBSCRIPTION-LIKE
 */
export interface SubscriptionLike extends Unsubscribable {
    unsubscribe(): void;
    readonly closed: boolean;
}

/**
 * SUBSCRIPTION
 * This is mainly for internal use by Observable, based on RxJS but simplified:
 * {@link https://rxjs.dev/api/index/class/Subscription}
 * For the complete implementation:
 * {@link https://github.com/ReactiveX/rxjs/blob/8.0.0-alpha.14/packages/rxjs/src/internal/Observable.ts#L49-L179}
 */
export class Subscription implements SubscriptionLike {
    public closed = false;
    private finalizers: Set<Teardown> | null = null;

    constructor(private initialTeardown?: () => void) {}

    public unsubscribe(): void {
        if (!this.closed) {
            this.closed = true;
            const { finalizers, initialTeardown } = this;
            this.finalizers = new Set();
            if (typeof initialTeardown === 'function') initialTeardown();
            if (finalizers) finalizers.forEach((teardown: Teardown) => {
                if (typeof teardown === 'function') teardown();
                else if (teardown) teardown.unsubscribe();
            })
        }
    }
}

/**
 * OBSERVABLE
 * For adding behaviors and side effects to the Connectors core methods, using
 * the observer pattern. This is roughly based on the RxJS v8 implementation,
 * but greatly simplified:
 * {@link https://rxjs.dev/api/index/class/Observable}
 * For the full implementation:
 * {@link https://github.com/ReactiveX/rxjs/blob/8.0.0-alpha.14/packages/rxjs/src/internal/Observable.ts#L551-L1008}
 */
export class Observable<T> implements Subscribable<T> {
    protected subscribers: Set<Observer<T>> = new Set();
    protected finalizers: WeakMap<Observer<T>, Teardown> = new WeakMap();
    private _subscribe(_subscriber: Observer<any>): Teardown|void {
        return;
    }

    constructor(
        subscribe?: (this: Observable<T>, subscriber: Observer<T>) => Teardown|void,
    ) {
        if (subscribe) this._subscribe = subscribe;
    }

    public subscribe(
        observerOrNext?: Partial<Observer<T>> | ((value: T) => void),
        error?: (error: any) => void,
        complete?: () => void,
    ): Subscription {
        let observer: Observer<T>;
        if (typeof observerOrNext === 'function') {
            observer = {
                next: observerOrNext,
                error: typeof error === 'function' ? error : (_: any) => {},
                complete: typeof complete === 'function' ? complete : () => {},
            };
        } else {
            observer = observerOrNext as Observer<T>;
        }
        this.subscribers.add(observer);
        const finalizer: Teardown | void = this._subscribe(observer);
        if (typeof finalizer === 'function') {
            const subscription = new Subscription(finalizer);
            this.finalizers.set(observer, finalizer);
            return subscription;
        }
        return new Subscription();
    }
}
