import { Injectable } from '@angular/core';
import * as faker from 'faker/locale/en_US';

import { DaffCategoryPageConfigurationState } from '@daffodil/category';
import { DaffModelFactory } from '@daffodil/core/testing';

export class MockCategoryPageConfigurationState implements DaffCategoryPageConfigurationState {
  id = faker.random.number(100);
  page_size = faker.random.number(10, 20);
  current_page = faker.random.number(10);
  filters = [{
    name: 'Category',
    items_count: 2,
    attribute_name: 'cat',
    type: '',
    options: [
      {
        label: 'Gear',
        value: '3',
        items_count: 34
      },
      {
        label: 'Training',
        value: '9',
        items_count: 6
      }
    ]
  }];
  sort_options = [
    {
      label: 'Position',
      value: 'position'
    },
    {
        label: 'Name',
        value: 'name'
    },
    {
        label: 'Price',
        value: 'price'
    }
  ];
  total_pages = faker.random.number(4);
  applied_filters = null;
  applied_sort_option = null;
  applied_sort_direction = null;
}

@Injectable({
  providedIn: 'root'
})
export class DaffCategoryPageConfigurationStateFactory extends DaffModelFactory<DaffCategoryPageConfigurationState>{
  constructor(){
    super(MockCategoryPageConfigurationState);
  }
}
