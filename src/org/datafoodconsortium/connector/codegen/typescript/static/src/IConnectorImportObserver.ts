import type DatasetExt from "rdf-ext/lib/Dataset";
import type { Observer } from './observer';

export default interface IConnectorImportObserver extends Observer<DatasetExt[]> {
  next(datasets: DatasetExt[]): void;
}
