import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  public imageSrc = './assets/images/cover.png';
  public issLogo = './assets/images/iss-logo.png'
  public loginError = false;
  public loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  get username() { return this.loginForm.get('username') };
  get password() { return this.loginForm.get('password') };

  constructor(private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {

  }

  onClickLoginBtn() {
    if (this.username?.value === 'demo' && this.password?.value === 'demo') {
      this.router.navigate(['/info'], { relativeTo: this.route});
    }
  }
}
