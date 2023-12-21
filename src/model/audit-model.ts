export interface Audit {
  auditAction: string;
  data: any;
  status: number;
  error: string;
  auditBy: string;
  auditOn: string;
}
