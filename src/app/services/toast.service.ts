import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import notify from 'devextreme/ui/notify';

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private translate: TranslateService) {}
  showErrorMessage(message?: string) {
    notify(message ? this.translate.instant(message) : '', 'error');
  }

  showSuccessMessage(message?: string) {
    notify(
      message ? message : this.translate.instant('MESSAGES.SUCCESFULL'),
      'success'
    );
  }

  showWarningMessage(message: string) {
    notify(
      message ? message : this.translate.instant('MESSAGES.SUCCESFULL'),
      'warning'
    );
  }
}
