/**
 * OBSERVABLE
 * For adding behaviors and side effects to the Connectors core methods, using
 * the observer pattern.
 * 
 * Roughly based on the RxJS implementation, but greatly simplified:
 * {@link https://github.com/ReactiveX/rxjs/blob/8.0.0-alpha.14/packages/rxjs/src/internal/Observable.ts}
 */

export interface Observer<T> {
    next(value: T): void;
    error(error: any): void;
    complete(): void;
}

interface Unsubscribable {
    closed: boolean;
    unsubscribe(): void;
}

interface Subscribable<T> {
    subscribe(observer: Partial<Observer<T>>): Unsubscribable
}

type TeardownCallback = Subscription | Unsubscribable | (() => void);

class Subscription implements Unsubscribable {
    public closed = false;
    private finalizers: Set<TeardownCallback> | null = null;

    constructor(private initialTeardown?: () => void) {}

    public unsubscribe(): void {
        if (!this.closed) {
            this.closed = true;
            const { finalizers, initialTeardown } = this;
            this.finalizers = new Set();
            if (typeof initialTeardown === 'function') initialTeardown();
            if (finalizers) finalizers.forEach((teardown: TeardownCallback) => {
                if (typeof teardown === 'function') teardown();
                else teardown.unsubscribe();
            })
        }
    }
}

export class Observable<T> implements Subscribable<T> {
    protected subscribers: Set<Observer<T>> = new Set();
    protected finalizers: WeakMap<Observer<T>, TeardownCallback> = new WeakMap();
    private _subscribe(_subscriber: Observer<any>): TeardownCallback|void {
        return;
    }

    constructor(
        subscribe?: (this: Observable<T>, subscriber: Observer<T>) => TeardownCallback|void,
    ) {
        if (subscribe) this._subscribe = subscribe;
    }

    public subscribe(
        observerOrNext?: Partial<Observer<T>> | ((value: T) => void),
        error?: (error: any) => void,
        complete?: () => void,
    ): Subscription {
        const observer: Observer<T> = {
            next: (_: T) => {},
            error: typeof error === 'function' ? error : (_: any) => {},
            complete: typeof complete === 'function' ? complete : () => {},
        };
        if (typeof observerOrNext === 'function') {
            observer.next = observerOrNext;
        } else if (typeof observerOrNext?.next === 'function') {
            observer.next = observerOrNext.next;
        }
        this.subscribers.add(observer);
        const finalizer: TeardownCallback | void = this._subscribe(observer);
        if (typeof finalizer === 'function') {
            const subscription = new Subscription(finalizer);
            this.finalizers.set(observer, finalizer);
            return subscription;
        }
        return new Subscription();
    }
}
