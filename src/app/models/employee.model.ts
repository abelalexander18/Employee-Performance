export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  departmentId: number;
  hireDate: Date;
  salary: number;
  profileImage?: string;
  phoneNumber?: string;
  status: 'active' | 'on-leave' | 'inactive';
  managerId?: number;
}

export class EmployeeClass implements Employee {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public position: string,
    public departmentId: number,
    public hireDate: Date,
    public salary: number,
    public status: 'active' | 'on-leave' | 'inactive',
    public profileImage?: string,
    public phoneNumber?: string,
    public managerId?: number
  ) {}

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  get yearsOfService(): number {
    const today = new Date();
    const years = today.getFullYear() - this.hireDate.getFullYear();
    return years;
  }
}
