import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EmployeeService } from '../../services/employee.service';
import { PerformanceService } from '../../services/performance.service';
import { AuthService } from '../../services/auth.service';
import { Employee, PerformanceRecord } from '../../models';

@Component({
  selector: 'app-performance-review',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    MatChipsModule,
    MatStepperModule,
    MatSnackBarModule
  ],
  templateUrl: './performance-review.html',
  styleUrl: './performance-review.css',
})
export class PerformanceReview implements OnInit {
  reviewFormGroup!: FormGroup;
  scoresFormGroup!: FormGroup;
  feedbackFormGroup!: FormGroup;
  
  employees: Employee[] = [];
  selectedEmployee: Employee | null = null;
  isSubmitting = false;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private performanceService: PerformanceService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.initializeForms();
  }

  initializeForms(): void {
    this.reviewFormGroup = this.formBuilder.group({
      employeeId: ['', Validators.required],
      period: ['', Validators.required],
      reviewDate: [new Date().toISOString().split('T')[0], Validators.required]
    });

    this.scoresFormGroup = this.formBuilder.group({
      productivityScore: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
      qualityScore: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
      communicationScore: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
      teamworkScore: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
      innovationScore: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
      attendanceScore: [3, [Validators.required, Validators.min(1), Validators.max(5)]]
    });

    this.feedbackFormGroup = this.formBuilder.group({
      comments: ['', Validators.required],
      goals: this.formBuilder.array([this.createGoalControl()]),
      achievements: this.formBuilder.array([this.createAchievementControl()]),
      areasOfImprovement: this.formBuilder.array([this.createImprovementControl()])
    });
  }

  createGoalControl(): FormGroup {
    return this.formBuilder.group({
      text: ['', Validators.required]
    });
  }

  createAchievementControl(): FormGroup {
    return this.formBuilder.group({
      text: ['', Validators.required]
    });
  }

  createImprovementControl(): FormGroup {
    return this.formBuilder.group({
      text: ['', Validators.required]
    });
  }

  get goals(): FormArray {
    return this.feedbackFormGroup.get('goals') as FormArray;
  }

  get achievements(): FormArray {
    return this.feedbackFormGroup.get('achievements') as FormArray;
  }

  get areasOfImprovement(): FormArray {
    return this.feedbackFormGroup.get('areasOfImprovement') as FormArray;
  }

  addGoal(): void {
    this.goals.push(this.createGoalControl());
  }

  removeGoal(index: number): void {
    if (this.goals.length > 1) {
      this.goals.removeAt(index);
    }
  }

  addAchievement(): void {
    this.achievements.push(this.createAchievementControl());
  }

  removeAchievement(index: number): void {
    if (this.achievements.length > 1) {
      this.achievements.removeAt(index);
    }
  }

  addImprovement(): void {
    this.areasOfImprovement.push(this.createImprovementControl());
  }

  removeImprovement(index: number): void {
    if (this.areasOfImprovement.length > 1) {
      this.areasOfImprovement.removeAt(index);
    }
  }

  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(employees => {
      this.employees = employees.filter(e => e.status === 'active');
    });
  }

  onEmployeeChange(): void {
    const employeeId = this.reviewFormGroup.get('employeeId')?.value;
    if (employeeId) {
      this.employeeService.getEmployeeById(parseInt(employeeId)).subscribe(employee => {
        this.selectedEmployee = employee || null;
      });
    }
  }

  calculateOverallRating(): number {
    const scores = this.scoresFormGroup.value;
    const sum = scores.productivityScore + scores.qualityScore + 
                scores.communicationScore + scores.teamworkScore + 
                scores.innovationScore + scores.attendanceScore;
    return sum / 6;
  }

  formatSliderValue(value: number): string {
    const labels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
    return labels[value] || '';
  }

  onSubmit(): void {
    if (this.reviewFormGroup.invalid || this.scoresFormGroup.invalid || this.feedbackFormGroup.invalid) {
      this.snackBar.open('Please fill in all required fields', 'Close', {
        duration: 3000
      });
      return;
    }

    this.isSubmitting = true;
    const currentUser = this.authService.currentUserValue;

    const performanceRecord: PerformanceRecord = {
      id: 0,
      employeeId: parseInt(this.reviewFormGroup.value.employeeId),
      reviewDate: new Date(this.reviewFormGroup.value.reviewDate),
      reviewerId: currentUser?.id || 0,
      overallRating: this.calculateOverallRating(),
      productivityScore: this.scoresFormGroup.value.productivityScore,
      qualityScore: this.scoresFormGroup.value.qualityScore,
      communicationScore: this.scoresFormGroup.value.communicationScore,
      teamworkScore: this.scoresFormGroup.value.teamworkScore,
      innovationScore: this.scoresFormGroup.value.innovationScore,
      attendanceScore: this.scoresFormGroup.value.attendanceScore,
      comments: this.feedbackFormGroup.value.comments,
      goals: this.goals.value.map((g: any) => g.text).filter((t: string) => t.trim()),
      achievements: this.achievements.value.map((a: any) => a.text).filter((t: string) => t.trim()),
      areasOfImprovement: this.areasOfImprovement.value.map((i: any) => i.text).filter((t: string) => t.trim()),
      period: this.reviewFormGroup.value.period
    };

    this.performanceService.addPerformanceRecord(performanceRecord).subscribe({
      next: () => {
        this.snackBar.open('Performance review submitted successfully!', 'Close', {
          duration: 3000
        });
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.snackBar.open('Error submitting review. Please try again.', 'Close', {
          duration: 3000
        });
        this.isSubmitting = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
