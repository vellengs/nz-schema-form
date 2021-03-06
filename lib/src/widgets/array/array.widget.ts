import { Component } from '@angular/core';
import { ArrayLayoutWidget } from '../../widget';

@Component({
  selector: 'nz-sf-array',
  template: `
  <div nz-form-item nz-row>
      <div *ngIf="schema.title" nz-form-label nz-col [nzSpan]="schema.span_label">
          <label>{{ schema.title }}</label>
      </div>
      <div nz-form-control nz-col [nzSpan]="schema.span_control" [nzOffset]="schema.offset_control">
        <button nz-button nzType="primary"
            [disabled]="schema.maxItems && $any(formProperty).properties.length >= schema.maxItems"
            (click)="addItem()" [innerHTML]="addTitle"></button>
        <div class="card-list">
            <nz-card *ngFor="let i of formProperty.properties; let idx=index">
                <ng-template #body>
                    <nz-sf-item *ngIf="i.visible" [formProperty]="i"></nz-sf-item>
                    <button nz-button nzType="danger" (click)="removeItem(idx)" [innerHTML]="removeTitle"></button>
                </ng-template>
            </nz-card>
        </div>
      </div>
  </div>`
})
export class ArrayWidget extends ArrayLayoutWidget {

    get addTitle() {
        return this.widgetData.addTitle || '添加';
    }

    get removeTitle() {
        return this.widgetData.removeTitle || '移除';
    }

  addItem() {
    this.formProperty.addItem();
  }

  removeItem(index: number) {
    this.formProperty.removeItem(index);
  }

  trackByIndex(index: number, item: any) {
    return index;
  }
}
