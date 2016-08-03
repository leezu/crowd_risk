import { Injectable } from '@angular/core';
let PouchDB = require('pouchdb');

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
  db;

  constructor() {
    this.db = new PouchDB('reports');
  }

  public getAll() {
    return this.db.allDocs({include_docs: true}).
      then(docs => {
        return docs.rows.map(row => {
          return row.doc;
        });
      });
  }

  public add(report: Report) {
    return this.db.post(report);
  }

  public update(report: Report) {
    return this.db.put(report);
  }

  public delete(report: Report) {
    return this.db.remove(report);
  }
}
