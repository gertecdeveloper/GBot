import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AtivacaoSatPage } from './ativacao-sat.page';

describe('AtivacaoSatPage', () => {
  let component: AtivacaoSatPage;
  let fixture: ComponentFixture<AtivacaoSatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtivacaoSatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AtivacaoSatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
