export interface Review {
  id: number;
  employeeId: number;
  reviewerId: number;
  reviewType: 'quarterly' | 'annual' | 'probation' | 'mid-year';
  reviewDate: Date;
  dueDate: Date;
  status: 'pending' | 'in-progress' | 'completed' | 'approved';
  performanceRecordId?: number;
  submittedDate?: Date;
  approvedDate?: Date;
  approvedBy?: number;
}

export class ReviewClass implements Review {
  constructor(
    public id: number,
    public employeeId: number,
    public reviewerId: number,
    public reviewType: 'quarterly' | 'annual' | 'probation' | 'mid-year',
    public reviewDate: Date,
    public dueDate: Date,
    public status: 'pending' | 'in-progress' | 'completed' | 'approved',
    public performanceRecordId?: number,
    public submittedDate?: Date,
    public approvedDate?: Date,
    public approvedBy?: number
  ) {}

  get isOverdue(): boolean {
    if (this.status === 'completed' || this.status === 'approved') {
      return false;
    }
    return new Date() > this.dueDate;
  }

  get daysUntilDue(): number {
    const today = new Date();
    const diffTime = this.dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
}
