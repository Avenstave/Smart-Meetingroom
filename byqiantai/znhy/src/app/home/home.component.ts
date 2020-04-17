import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  menuIndex = 1;
  constructor(private router: Router) { }
  ngOnInit() {
  }
  menuClick(index) {
    this.menuIndex = index;
    if (index == 1) {
    }
    else if (index == 2) {
    }
    else if (index == 3) {
    }
    else if (index == 0) {
      this.router.navigate(['./meet']);
    }
  }
}
