import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CodigobarrasPage } from './codigobarras.page';

describe('CodigobarrasPage', () => {
  let component: CodigobarrasPage;
  let fixture: ComponentFixture<CodigobarrasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodigobarrasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CodigobarrasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
