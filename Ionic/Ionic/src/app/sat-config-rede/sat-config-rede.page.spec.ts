import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SatConfigRedePage } from './sat-config-rede.page';

describe('SatConfigRedePage', () => {
  let component: SatConfigRedePage;
  let fixture: ComponentFixture<SatConfigRedePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SatConfigRedePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SatConfigRedePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
