import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DxDataGridComponent } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import { Branch, Role, UserStatus } from 'src/app/models';
import { DxStoreService, GetService } from 'src/app/services';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  @ViewChild('grid') grid: DxDataGridComponent;

  usersDS: DataSource;
  userStatus: { id: string; name: any }[];
  roles: Role[];
  branches: Branch[];

  constructor(
    private getService: GetService,
    private dxStore: DxStoreService,
    private translate: TranslateService
  ) {}

  async ngOnInit(): Promise<void> {
    this.userStatus = Object.keys(UserStatus).map((us) => {
      return {
        id: us,
        name: this.translate.instant(`enums.user-status.${us.toLowerCase()}`),
      };
    });

    this.roles = (await this.getService.get('ROLE')?.getAll()) as Role[];
    this.branches = (await this.getService.get('BRANCH')?.getAll()) as Branch[];
    this.usersDS = this.dxStore.getDS({
      key: 'id',
      load: (options) => {
        return this.getService.get('USER')?.getAll() ?? [];
      },
      insert: (values) => {
        return (
          this.getService.get('USER')?.insert(values) ??
          Promise.resolve(undefined)
        );
      },
      update: (key, values) => {
        return (
          this.getService.get('USER')?.modify(key, values) ??
          Promise.resolve(undefined)
        );
      },
      remove: (key) => {
        return (
          this.getService.get('USER')?.remove(key) ?? Promise.resolve(undefined)
        );
      },

      onInserted: () => this.grid.instance.refresh(),
      onRemoved: () => this.grid.instance.refresh(),
      onUpdated: () => this.grid.instance.refresh(),
    });
  }

  allowDeleting(e) {
    if (e.row.data.id === '1cc45430-18b3-4264-8f43-4e81a2035afc') {
      return false;
    } else {
      return true;
    }
  }

  onEditorPreparing(e) {
    if (
      e.dataField === 'password' &&
      e.parentType === 'dataRow' &&
      !e.row.isNewRow
    ) {
      e.editorOptions.value = '*******';
    }
  }
}
