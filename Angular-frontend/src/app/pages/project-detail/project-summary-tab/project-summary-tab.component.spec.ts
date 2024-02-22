import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSummaryTabComponent } from './project-summary-tab.component';

describe('ProjectSummaryTabComponent', () => {
  let component: ProjectSummaryTabComponent;
  let fixture: ComponentFixture<ProjectSummaryTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectSummaryTabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectSummaryTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
