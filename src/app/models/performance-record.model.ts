export interface PerformanceRecord {
  id: number;
  employeeId: number;
  reviewDate: Date;
  reviewerId: number;
  overallRating: number;
  productivityScore: number;
  qualityScore: number;
  communicationScore: number;
  teamworkScore: number;
  innovationScore: number;
  attendanceScore: number;
  comments: string;
  goals: string[];
  achievements: string[];
  areasOfImprovement: string[];
  period: string; // e.g., "Q1 2024", "2024 Annual"
}

export class PerformanceRecordClass implements PerformanceRecord {
  constructor(
    public id: number,
    public employeeId: number,
    public reviewDate: Date,
    public reviewerId: number,
    public overallRating: number,
    public productivityScore: number,
    public qualityScore: number,
    public communicationScore: number,
    public teamworkScore: number,
    public innovationScore: number,
    public attendanceScore: number,
    public comments: string,
    public goals: string[],
    public achievements: string[],
    public areasOfImprovement: string[],
    public period: string
  ) {}

  get averageScore(): number {
    return (
      (this.productivityScore +
        this.qualityScore +
        this.communicationScore +
        this.teamworkScore +
        this.innovationScore +
        this.attendanceScore) / 6
    );
  }

  get performanceLevel(): string {
    if (this.overallRating >= 4.5) return 'Exceptional';
    if (this.overallRating >= 4.0) return 'Exceeds Expectations';
    if (this.overallRating >= 3.0) return 'Meets Expectations';
    if (this.overallRating >= 2.0) return 'Needs Improvement';
    return 'Unsatisfactory';
  }
}
