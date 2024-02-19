import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.sass'
})
export class ProfileComponent implements OnInit{

  constructor(private http: HttpClient) {
  }
  ngOnInit() {
    this.http.get('http://localhost:8000/api/auth').subscribe(console.log)
  }


}
