import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FalagbotPage } from './falagbot.page';

describe('FalagbotPage', () => {
  let component: FalagbotPage;
  let fixture: ComponentFixture<FalagbotPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FalagbotPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FalagbotPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
