import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import { Role } from 'src/app/models';
import {
  DxStoreService,
  GetService,
  RoleService,
  ToastService,
} from 'src/app/services';

@Component({
  selector: 'app-roles-assignment',
  templateUrl: './roles-assignment.component.html',
  styleUrls: ['./roles-assignment.component.scss'],
})
export class RolesAssignmentComponent implements OnInit {
  @ViewChild('grid') grid: DxDataGridComponent;
  @ViewChild('permissionGrid') permissionGrid: DxDataGridComponent;

  rolesDS: DataSource;
  permissionsDS: DataSource;
  roleAssignedPermissions: string[];

  constructor(
    private getService: GetService,
    private dxStore: DxStoreService,
    private roleService: RoleService,
    private toastService: ToastService
  ) {}

  async ngOnInit(): Promise<void> {
    this.rolesDS = this.dxStore.getDS({
      key: 'id',
      load: (options) => {
        return this.getService.get('ROLE')?.getAll() ?? [];
      },
      insert: (values) => {
        return (
          this.getService.get('ROLE')?.insert(values) ??
          Promise.resolve(undefined)
        );
      },
      update: (key, values) => {
        return (
          this.getService.get('ROLE')?.modify(key, values) ??
          Promise.resolve(undefined)
        );
      },
      remove: (key) => {
        return (
          this.getService.get('ROLE')?.remove(key) ?? Promise.resolve(undefined)
        );
      },

      onInserted: () => this.grid.instance.refresh(),
      onRemoved: () => this.grid.instance.refresh(),
      onUpdated: () => this.grid.instance.refresh(),
    });

    this.permissionsDS = this.dxStore.getDS({
      key: 'id',
      load: (options) => {
        return this.getService.get('PERMISSION')?.getAll() ?? [];
      },
      insert: (values) => {
        return (
          this.getService.get('PERMISSION')?.insert(values) ??
          Promise.resolve(undefined)
        );
      },
      update: (key, values) => {
        return (
          this.getService.get('PERMISSION')?.modify(key, values) ??
          Promise.resolve(undefined)
        );
      },
      remove: (key) => {
        return (
          this.getService.get('PERMISSION')?.remove(key) ??
          Promise.resolve(undefined)
        );
      },

      onInserted: () => this.permissionGrid.instance.refresh(),
      onRemoved: () => this.permissionGrid.instance.refresh(),
      onUpdated: () => this.permissionGrid.instance.refresh(),
    });
  }

  handleSelectionChanged(e) {
    e.component.collapseAll(-1);
    e.component.expandRow(e.currentSelectedRowKeys[0]);
    const roles: Role[] = this.rolesDS.items();
    const key = e.selectedRowKeys[0];
    const role = roles.find((r) => r.id === key);
    this.roleAssignedPermissions =
      role?.rolePermissions?.map((m) => m.permissionId) ?? [];
  }

  async assignPermissionsToRole(permissionIdList: string[], roleId: string) {
    try {
      await this.roleService.assignPermissions({
        permissionIds: permissionIdList,
        roleId: roleId,
      });
    } catch (e) {
      this.toastService.showErrorMessage();
    }
  }
}
