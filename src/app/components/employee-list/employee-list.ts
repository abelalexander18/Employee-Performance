import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { PerformanceService } from '../../services/performance.service';
import { Employee, Department } from '../../models';

@Component({
  selector: 'app-employee-list',
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  departments: Department[] = [];
  displayedColumns = ['name', 'email', 'position', 'department', 'status', 'rating', 'actions'];
  searchTerm = '';
  selectedDepartment = 'all';
  employeePerformance: Map<number, number> = new Map();

  constructor(
    private employeeService: EmployeeService,
    private performanceService: PerformanceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.loadDepartments();
    this.loadPerformanceData();
  }

  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(employees => {
      this.employees = employees;
      this.applyFilters();
    });
  }

  loadDepartments(): void {
    this.employeeService.getAllDepartments().subscribe(departments => {
      this.departments = departments;
    });
  }

  loadPerformanceData(): void {
    this.performanceService.getAllPerformanceRecords().subscribe(records => {
      // Calculate average rating per employee
      const employeeRatings: Map<number, number[]> = new Map();
      
      records.forEach(record => {
        if (!employeeRatings.has(record.employeeId)) {
          employeeRatings.set(record.employeeId, []);
        }
        employeeRatings.get(record.employeeId)!.push(record.overallRating);
      });

      employeeRatings.forEach((ratings, employeeId) => {
        const avg = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
        this.employeePerformance.set(employeeId, avg);
      });
    });
  }

  applyFilters(): void {
    let filtered = [...this.employees];

    // Apply search filter
    if (this.searchTerm) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(emp =>
        emp.firstName.toLowerCase().includes(searchLower) ||
        emp.lastName.toLowerCase().includes(searchLower) ||
        emp.email.toLowerCase().includes(searchLower) ||
        emp.position.toLowerCase().includes(searchLower)
      );
    }

    // Apply department filter
    if (this.selectedDepartment !== 'all') {
      const deptId = parseInt(this.selectedDepartment);
      filtered = filtered.filter(emp => emp.departmentId === deptId);
    }

    this.filteredEmployees = filtered;
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onDepartmentChange(): void {
    this.applyFilters();
  }

  getDepartmentName(departmentId: number): string {
    const dept = this.departments.find(d => d.id === departmentId);
    return dept ? dept.name : 'Unknown';
  }

  getEmployeeRating(employeeId: number): number {
    return this.employeePerformance.get(employeeId) || 0;
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'active': return 'primary';
      case 'on-leave': return 'accent';
      case 'inactive': return 'warn';
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

  viewEmployee(employee: Employee): void {
    this.router.navigate(['/employee-detail', employee.id]);
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
