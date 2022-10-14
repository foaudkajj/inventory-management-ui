import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';
import { DxStoreOptions } from '../models';
import { GetService } from './get.service';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';

@Injectable({
  providedIn: 'root',
})
export class DxStoreService {
  constructor(
    private toast: ToastService,
    private router: Router,
    private getService: GetService
  ) {}

  getStore(storeOptions: DxStoreOptions): DataSource {
    return new DataSource({
      store: new CustomStore({
        key: storeOptions.Key,
        loadMode: 'raw',
        load: (options) => {
          return this.getService.get('COLOR')?.getAll() ?? [];
        },
        insert: (values) => {
          return (
            this.getService.get('COLOR')?.insert(values) ??
            Promise.resolve(undefined)
          );
        },
        update: (key: string, values) => {
          return (
            this.getService.get('COLOR')?.modify(key, values) ??
            Promise.resolve(undefined)
          );
        },
        remove: (key: string) => {
          return (
            this.getService.get('COLOR')?.remove(key) ??
            Promise.resolve(undefined)
          );
        },
        onInserted: (values: any, key: string) => {
          if (storeOptions.onInserted) {
            storeOptions.onInserted(values, key);
          }
          if (!values.IsError) this.toast.showSuccessMessage();
        },
        onLoaded: (result: Array<any>) => {
          if (storeOptions.onLoaded) storeOptions?.onLoaded(result);
        },
        onRemoved: (key: string) => {
          if (storeOptions.onRemoved) {
            storeOptions.onRemoved(key);
          }

          this.toast.showSuccessMessage();
        },
        onUpdated: (key: string, values) => {
          if (storeOptions.onUpdated) storeOptions.onUpdated(key, values);
          this.toast.showSuccessMessage();
        },
        errorHandler: (e: Error) => this.toast.showErrorMessage(e.message),
      }),
    });
  }
}
