import { Injectable } from '@angular/core';

export class Report {
  category: string;
  text: string;
  base64Image: string;
  constructor(category: string, text: string, base64Image: string) {
    this.category = category;
    this.text = text;
    this.base64Image = base64Image;
  }
}

@Injectable()
export class ReportService {
  reports: Report[];

  constructor() {
    this.reports = new Array<Report>();
  }

  public getReports() {
    return this.reports;
  }

  public saveReport(report: Report) {
    this.reports.push(report);
  }
}
