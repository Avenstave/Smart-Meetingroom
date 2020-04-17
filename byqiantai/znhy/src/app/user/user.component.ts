import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  menuIndex = 1;
  constructor(private router: Router) { }
  menuClick(index) {
    this.menuIndex = index;
    if (index == 1) {
    }
    else if (index == 2) {
    }
    else if (index == 3) {
    }
  }
  ngOnInit() {
  }
}
