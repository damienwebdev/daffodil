import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarItemComponent } from './sidebar-item.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({template: '<div class="sidebar-item-wrapper" sidebar-item>Title</div>'})
class TestSidebarItemWrapper {}

describe('SidebarItemComponent', () => {
  let component: TestSidebarItemWrapper;
  let fixture: ComponentFixture<TestSidebarItemWrapper>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        TestSidebarItemWrapper,
        SidebarItemComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSidebarItemWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a class of `header__sidebar-item` to its host', () => {
    let sidebarItemWrapper = fixture.debugElement.query(By.css('.sidebar-item-wrapper'));

    expect(sidebarItemWrapper.nativeElement.classList.contains('header__sidebar-item')).toBeTruthy();
  });
});