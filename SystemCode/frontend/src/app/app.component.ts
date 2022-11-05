import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'a-eye-web';
  public currentRoute = "";
  public brandLogo = './assets/images/logo.png'

  constructor(private router: Router, private route: ActivatedRoute
    ) {
    router.events.subscribe((val) => {
      this.currentRoute = this.router.url;
    });

  }

  navigateToLogin() {
    this.router.navigate(['/'], { relativeTo: this.route });

  }

  ngOnInit(){
    
  }
}
