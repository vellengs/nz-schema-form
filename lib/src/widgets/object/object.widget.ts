import { Component, OnInit } from '@angular/core';
import { ObjectLayoutWidget } from '../../widget';

@Component({
  selector: 'nz-sf-object',
  template: `
    <ng-container *ngIf="grid; else noGrid">
        <div nz-row [nzGutter]="grid.gutter">
            <ng-container *ngFor="let i of list">
                <ng-container *ngIf="i.property.visible">
                    <div nz-col
                        [nzSpan]="i.grid.span" [nzOffset]="i.grid.offset"
                        [nzXs]="i.grid.xs" [nzSm]="i.grid.sm" [nzMd]="i.grid.md"
                        [nzLg]="i.grid.lg" [nzXl]="i.grid.xl">
                        <div nz-row nz-form-item [ngClass]="{'array-field': i.isArray}">
                            <nz-sf-item [formProperty]="i.property"></nz-sf-item>
                        </div>
                    </div>
                </ng-container>
            </ng-container>
        </div>
    </ng-container>
    <ng-template #noGrid>
        <ng-container *ngFor="let i of list">
            <ng-container *ngIf="i.property.visible">
                <div nz-row nz-form-item>
                    <nz-sf-item [formProperty]="i.property"></nz-sf-item>
                </div>
            </ng-container>
        </ng-container>
    </ng-template>
    `
})
export class ObjectWidget extends ObjectLayoutWidget implements OnInit {
    list: any[] = [];
    // TODO: no yet ` [nzXXl]="grid.xxl"`
    get grid() {
        return this.formProperty.schema.grid;
    }

    ngOnInit(): void {
        const list: any[] = [];
        for (const i of this.formProperty.schema.fieldsets) {
            for (const fid of i.fields) {
                const property = this.formProperty.getProperty(fid);
                const item = {
                    property,
                    grid: property.schema.grid || this.grid || {},
                    isArray: property.schema.type === 'array'
                };
                list.push(item);
            }
        }
        this.list = list;
    }
}
