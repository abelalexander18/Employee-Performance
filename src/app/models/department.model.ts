export interface Department {
  id: number;
  name: string;
  description: string;
  managerId?: number;
  employeeCount: number;
  budget?: number;
}

export class DepartmentClass implements Department {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public employeeCount: number,
    public managerId?: number,
    public budget?: number
  ) {}

  get hasManager(): boolean {
    return this.managerId !== undefined && this.managerId > 0;
  }
}
