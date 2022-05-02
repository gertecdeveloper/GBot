import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssociarSatPage } from './associar-sat.page';

describe('AssociarSatPage', () => {
  let component: AssociarSatPage;
  let fixture: ComponentFixture<AssociarSatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociarSatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssociarSatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
