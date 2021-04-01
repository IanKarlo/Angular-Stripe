import { Component, OnInit } from '@angular/core';
import { SessionServiceService as SessionService } from '../../services/session-service.service';

interface RegisterFields {
  email: string,
  password: string
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public showPassword: boolean = false;
  public formData: RegisterFields = {
    email: '',
    password: '',
  }

  constructor(private sessionService: SessionService) { }

  ngOnInit(): void {
  }

  swapPassword() {
    this.showPassword = !this.showPassword;
  }

  send() {
    this.sessionService.login(this.formData);
  }

}
