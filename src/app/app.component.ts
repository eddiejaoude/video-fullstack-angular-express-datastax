import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

interface Event {
  id: number;
  name: string;
  date: string;
  url: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public events: Event[] = [];
  constructor(private http: HttpClient) {
    this.findAll();
  }

  findAll() {
    this.http
      .get('http://localhost:3000/events')
      .subscribe((data: any) => (this.events = data));
  }
}
