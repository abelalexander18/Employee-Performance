import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { EmployeeService } from '../../services/employee.service';
import { PerformanceService } from '../../services/performance.service';
import { Employee, Department, PerformanceRecord, Review } from '../../models';

@Component({
  selector: 'app-employee-detail',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTabsModule,
    MatListModule,
    MatDividerModule
  ],
  templateUrl: './employee-detail.html',
  styleUrl: './employee-detail.css',
})
export class EmployeeDetail implements OnInit {
  employee: Employee | null = null;
  department: Department | null = null;
  performanceRecords: PerformanceRecord[] = [];
  reviews: Review[] = [];
  averageRating = 0;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private performanceService: PerformanceService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadEmployeeDetails(parseInt(id));
    }
  }

  loadEmployeeDetails(id: number): void {
    this.employeeService.getEmployeeById(id).subscribe(employee => {
      if (employee) {
        this.employee = employee;
        this.loadDepartment(employee.departmentId);
        this.loadPerformanceData(id);
        this.loadReviews(id);
      } else {
        this.router.navigate(['/employees']);
      }
      this.loading = false;
    });
  }

  loadDepartment(departmentId: number): void {
    this.employeeService.getDepartmentById(departmentId).subscribe(dept => {
      this.department = dept || null;
    });
  }

  loadPerformanceData(employeeId: number): void {
    this.performanceService.getPerformanceRecordsByEmployee(employeeId).subscribe(records => {
      this.performanceRecords = records.sort((a, b) => 
        new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime()
      );
      
      if (records.length > 0) {
        const sum = records.reduce((acc, r) => acc + r.overallRating, 0);
        this.averageRating = sum / records.length;
      }
    });
  }

  loadReviews(employeeId: number): void {
    this.performanceService.getReviewsByEmployee(employeeId).subscribe(reviews => {
      this.reviews = reviews.sort((a, b) => 
        new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime()
      );
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'active': return 'primary';
      case 'on-leave': return 'accent';
      case 'inactive': return 'warn';
      default: return '';
    }
  }

  getReviewStatusColor(status: string): string {
    switch (status) {
      case 'completed': return 'primary';
      case 'approved': return 'primary';
      case 'in-progress': return 'accent';
      case 'pending': return 'warn';
      default: return '';
    }
  }

  getRatingStars(rating: number): string {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '★'.repeat(fullStars);
    if (hasHalfStar) stars += '½';
    const emptyStars = 5 - Math.ceil(rating);
    stars += '☆'.repeat(emptyStars);
    return stars;
  }

  getYearsOfService(): number {
    if (!this.employee) return 0;
    const today = new Date();
    const hireDate = new Date(this.employee.hireDate);
    return today.getFullYear() - hireDate.getFullYear();
  }

  goBack(): void {
    this.router.navigate(['/employees']);
  }
}
