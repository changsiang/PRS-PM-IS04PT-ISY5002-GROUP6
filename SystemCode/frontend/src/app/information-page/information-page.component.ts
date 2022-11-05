import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-information-page',
  templateUrl: './information-page.component.html',
  styleUrls: ['./information-page.component.sass']
})
export class InformationPageComponent implements OnInit {
  public isChecked: Boolean;
  constructor(
    private router: Router, 
    private route: ActivatedRoute
  ) { 
    this.isChecked = false;
  }

  ngOnInit(): void {
  }

  checkCheckBoxvalue(event: any): void {
    this.isChecked = !this.isChecked;
  }

  proceed(event: any): void {
    if(this.isChecked) {
      this.router.navigate(['/image-upload'], { relativeTo: this.route});
    }
  }

}
