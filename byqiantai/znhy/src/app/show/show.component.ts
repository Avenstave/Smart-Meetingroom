import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  constructor(private router: Router) { }
  login() {
    this.router.navigate(['/login']);
  }
  regs() {
    this.router.navigate(['/register']);
  }
  ngOnInit() {
  }

}
