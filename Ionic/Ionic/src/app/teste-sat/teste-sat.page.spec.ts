import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TesteSatPage } from './teste-sat.page';

describe('TesteSatPage', () => {
  let component: TesteSatPage;
  let fixture: ComponentFixture<TesteSatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesteSatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TesteSatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
