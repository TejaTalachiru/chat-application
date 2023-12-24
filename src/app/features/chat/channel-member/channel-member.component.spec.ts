import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelMemberComponent } from './channel-member.component';

describe('ChannelMemberComponent', () => {
  let component: ChannelMemberComponent;
  let fixture: ComponentFixture<ChannelMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChannelMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
