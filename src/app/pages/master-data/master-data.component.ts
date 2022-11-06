import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DxDataGridComponent } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import { Column } from 'devextreme/ui/data_grid';
import { City, Country, ProductType, SERVICES } from 'src/app/models';
import {
  DxStoreService,
  GetService,
  ProductTypeService,
  ToastService,
} from 'src/app/services';

@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.component.html',
  styleUrls: ['./master-data.component.scss'],
})
export class MasterDataComponent implements OnInit {
  @ViewChild('grid') grid: DxDataGridComponent;
  columns: Column[] = [];
  dataTypes: { id: number; name: string }[] = [];
  ds: DataSource;
  selectedDataType: number;

  masterDetailDS: DataSource;
  masterDetailValue: string[];

  countries: Country[] = [];
  cities: City[] = [];

  constructor(
    public _translate: TranslateService,
    private dxStore: DxStoreService,
    private getService: GetService,
    private productTypeService: ProductTypeService,
    private toastService: ToastService
  ) {
    this.tagBoxShowValue = this.tagBoxShowValue.bind(this);
  }

  async ngOnInit(): Promise<void> {
    this.dataTypes = [
      {
        id: 0,
        name: this._translate.instant('STOCK_MODULE.MASTER_DATA.BRANCHES'),
      },
      {
        id: 1,
        name: this._translate.instant('STOCK_MODULE.MASTER_DATA.COLORS'),
      },
      {
        id: 2,
        name: this._translate.instant(
          'STOCK_MODULE.MASTER_DATA.PAYMENT_METHODS'
        ),
      },
      {
        id: 3,
        name: this._translate.instant('STOCK_MODULE.MASTER_DATA.PRODUCT_TYPE'),
      },
    ];

    await this.loadLookups();
  }

  onDataTypeChanged(e) {
    const value = e.value;
    this.selectedDataType = value;

    let masterDetailServiceName!: SERVICES;
    let serviceName!: SERVICES;
    let serviceFilter: {};

    switch (value) {
      case 0:
        serviceName = 'BRANCH';

        this.columns = [
          {
            dataField: 'name',
            caption: this._translate.instant(
              'STOCK_MODULE.MASTER_DATA.BRANCH_NAME'
            ),
            validationRules: [
              {
                type: 'required',
              },
            ],
          },
          {
            dataField: 'countryId',
            caption: this._translate.instant(
              'STOCK_MODULE.MASTER_DATA.COUNTRY'
            ),
            lookup: {
              dataSource: this.countries,
              displayExpr: 'name',
              valueExpr: 'id',
            },
            validationRules: [
              {
                type: 'required',
              },
            ],
          },
          {
            dataField: 'cityId',
            caption: this._translate.instant('STOCK_MODULE.MASTER_DATA.CITY'),
            lookup: {
              dataSource: this.cities,
              displayExpr: 'name',
              valueExpr: 'id',
            },
            validationRules: [
              {
                type: 'required',
              },
            ],
          },
        ];
        break;

      case 1:
        serviceName = 'COLOR';
        this.columns = [
          {
            dataField: 'name',
            caption: this._translate.instant('STOCK_MODULE.MASTER_DATA.COLORS'),
          },
          {
            dataField: 'code',
            caption: this._translate.instant(
              'STOCK_MODULE.MASTER_DATA.COLORS_SHORTCODES'
            ),
          },
        ];
        break;

      case 2:
        serviceName = 'PAYMENT_METHOD';
        this.columns = [
          {
            dataField: 'name',
            caption: this._translate.instant(
              'STOCK_MODULE.MASTER_DATA.PAYMENT.NAME'
            ),
          },
        ];
        break;

      case 3:
        serviceName = 'PRODUCT_TYPE';
        serviceFilter = {
          params: {
            filter: JSON.stringify({
              productTypePropertyList: true,
            }),
          },
        };
        masterDetailServiceName = 'PRODUCT_PROPERTY';
        this.columns = [
          {
            dataField: 'name',
            caption: this._translate.instant(
              'STOCK_MODULE.MASTER_DATA.PRODUCT_TYPE_NAME'
            ),
          },
        ];
        break;

      default:
        break;
    }

    if (serviceName) {
      this.ds = this.dxStore.getDS({
        key: 'id',
        load: async (options) => {
          const t = await this.getService
            .get(serviceName)
            ?.getAll(serviceFilter);
          console.log(t);
          return this.getService.get(serviceName)?.getAll(serviceFilter) ?? [];
        },
        insert: (values) => {
          return (
            this.getService.get(serviceName)?.insert(values) ??
            Promise.resolve(undefined)
          );
        },
        update: (key, values) => {
          return (
            this.getService.get(serviceName)?.modify(key, values) ??
            Promise.resolve(undefined)
          );
        },
        remove: (key) => {
          return (
            this.getService.get(serviceName)?.remove(key) ??
            Promise.resolve(undefined)
          );
        },

        onInserted: () => this.grid.instance.refresh(),
        onRemoved: () => this.grid.instance.refresh(),
        onUpdated: () => this.grid.instance.refresh(),
      });
    }

    if (value == 3) {
      if (masterDetailServiceName) {
        this.masterDetailDS = this.dxStore.getDS({
          key: 'id',
          load: (options) => {
            return this.getService.get(masterDetailServiceName)?.getAll() ?? [];
          },
          insert: (values) => {
            return (
              this.getService.get(masterDetailServiceName)?.insert(values) ??
              Promise.resolve(undefined)
            );
          },
          update: (key, values) => {
            return (
              this.getService
                .get(masterDetailServiceName)
                ?.modify(key, values) ?? Promise.resolve(undefined)
            );
          },
          remove: (key) => {
            return (
              this.getService.get(masterDetailServiceName)?.remove(key) ??
              Promise.resolve(undefined)
            );
          },
          onInserted: () => this.grid.instance.refresh(),
          onRemoved: () => this.grid.instance.refresh(),
          onUpdated: () => this.grid.instance.refresh(),
        });
      }
    }
  }

  gridEditorPreparing(e) {
    if (this.selectedDataType == 4) {
      if (
        e.parentType === 'dataRow' &&
        (e.dataField === 'Name' || e.dataField === 'Percent') &&
        !e.row.isNewRow
      ) {
        e.editorOptions.disabled = true;
      }
    }
  }

  tagBoxShowValue(row) {
    if (this.selectedDataType == 3) {
      return row && this._translate.instant(row.translate);
    }
  }

  async masterDetailsTagSave(
    selectedKeys: { id: string }[],
    parentRowId: string
  ) {
    if (this.selectedDataType == 3) {
      try {
        await this.productTypeService.assignProperties({
          productTypeId: parentRowId,
          productPropertyIds: selectedKeys?.map((m) => m.id),
        });
        this.toastService.showSuccessMessage();
      } catch (e) {
        this.toastService.showErrorMessage();
      }
    }
  }

  getMasterDataValue(data) {
    if (this.selectedDataType === 3) {
      console.log(data.productTypePropertyList?.map((m) => m.id));
      return data.productTypePropertyList?.map((m) => m.id);
    }
  }

  masterDetailExpanded(e) {
    if (this.selectedDataType === 3) {
      const productTypeList: ProductType[] = this.grid.instance
        .getDataSource()
        .items();
      const productType = productTypeList.find(f=> f.id === e.key);
      this.masterDetailValue =
        productType?.productTypePropertyList.map((m) => m.productPropertyId) ??
        [];
    }
    console.log();
    // console.log(this.masterDetailDS.store().load());
    console.log(e);
    // this.masterDetailValue
  }

  async loadLookups() {
    const country$ = this.getService.get('COUNTRY')?.getAll();
    const city$ = this.getService.get('CITY')?.getAll();

    const [countries, cities] = await Promise.all([country$, city$]);
    this.countries = (countries as Country[]) ?? [];
    this.cities = (cities as City[]) ?? [];
  }
}
