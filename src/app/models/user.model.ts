export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'manager' | 'employee';
  employeeId?: number;
  token?: string;
}

export class UserClass implements User {
  constructor(
    public id: number,
    public username: string,
    public email: string,
    public role: 'admin' | 'manager' | 'employee',
    public employeeId?: number,
    public token?: string
  ) {}

  get isAdmin(): boolean {
    return this.role === 'admin';
  }

  get isManager(): boolean {
    return this.role === 'manager' || this.role === 'admin';
  }

  get canReviewPerformance(): boolean {
    return this.isManager;
  }
}
