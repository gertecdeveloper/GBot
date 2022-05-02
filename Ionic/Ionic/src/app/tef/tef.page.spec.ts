import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TefPage } from './tef.page';

describe('TefPage', () => {
  let component: TefPage;
  let fixture: ComponentFixture<TefPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TefPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TefPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
