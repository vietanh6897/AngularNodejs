import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBoardTabComponent } from './project-board-tab.component';

describe('ProjectBoardTabComponent', () => {
  let component: ProjectBoardTabComponent;
  let fixture: ComponentFixture<ProjectBoardTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectBoardTabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectBoardTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
