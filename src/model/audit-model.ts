export class Audit {
  auditAction: string;
  data: any; 
  status: number;
  error: string;
  auditBy: string;
  auditOn: string;

  constructor(
    auditAction: string,
    data: any,
    status: number,
    error: any,
    auditBy: string,
    auditOn: string
  ) {
    this.auditAction = auditAction;
    this.data = data;
    this.status = status;
    this.error = error;
    this.auditBy = auditBy;
    this.auditOn = auditOn;
  }
};
