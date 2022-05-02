import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlterarSatPage } from './alterar-sat.page';

describe('AlterarSatPage', () => {
  let component: AlterarSatPage;
  let fixture: ComponentFixture<AlterarSatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlterarSatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlterarSatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
