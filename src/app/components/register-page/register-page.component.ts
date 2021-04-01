import { Component, OnInit } from '@angular/core';
import { SessionServiceService as SessionService } from 'src/app/services/session-service.service';

interface RegisterFields {
  name: string,
  email: string,
  password: string
}

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  public showPassword: boolean = false;

  public formData: RegisterFields = {
    name: '',
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
    this.sessionService.register(this.formData);
  }

}
