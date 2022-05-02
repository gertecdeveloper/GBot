import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SatFerramentasPage } from './sat-ferramentas.page';

describe('SatFerramentasPage', () => {
  let component: SatFerramentasPage;
  let fixture: ComponentFixture<SatFerramentasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SatFerramentasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SatFerramentasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
