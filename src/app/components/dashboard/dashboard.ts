import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthService } from '../../services/auth.service';
import { EmployeeService } from '../../services/employee.service';
import { PerformanceService } from '../../services/performance.service';
import { Employee, Review, User } from '../../models';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatChipsModule,
    MatTableModule,
    MatProgressBarModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  currentUser: User | null = null;
  totalEmployees = 0;
  activeEmployees = 0;
  pendingReviews = 0;
  averageRating = 0;
  performanceStats: any = null;
  recentReviews: Review[] = [];
  topPerformers: any[] = [];
  displayedColumns = ['employee', 'reviewType', 'status', 'dueDate'];

  constructor(
    private authService: AuthService,
    private employeeService: EmployeeService,
    private performanceService: PerformanceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // Load employees
    this.employeeService.getAllEmployees().subscribe(employees => {
      this.totalEmployees = employees.length;
      this.activeEmployees = employees.filter(e => e.status === 'active').length;
    });

    // Load pending reviews
    this.performanceService.getPendingReviews().subscribe(reviews => {
      this.pendingReviews = reviews.length;
      this.recentReviews = reviews.slice(0, 5);
    });

    // Load performance statistics
    this.performanceService.getPerformanceStatistics().subscribe(stats => {
      this.performanceStats = stats;
      this.averageRating = stats.averageRating;
    });
  }

  navigateToEmployees(): void {
    this.router.navigate(['/employees']);
  }

  navigateToReviews(): void {
    this.router.navigate(['/performance-review']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getRatingColor(rating: number): string {
    if (rating >= 4.5) return 'primary';
    if (rating >= 4.0) return 'accent';
    if (rating >= 3.0) return 'warn';
    return 'warn';
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'completed': return 'primary';
      case 'in-progress': return 'accent';
      case 'pending': return 'warn';
      default: return '';
    }
  }
}
