import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SensorPage } from './sensor.page';

describe('SensorPage', () => {
  let component: SensorPage;
  let fixture: ComponentFixture<SensorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SensorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
