import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class SessionServiceService {

  private token: string | null = null;
  private name: string | null = null;
  private id: number | null = null;
  private amount: number = 0;


  constructor(private router: Router) { }

  verifySession(): boolean {
    return (!!this.token && !!this.name && !!this.id);
  }

  async login(formData) {
    try {
      const data = await axios.post(`${environment.route}/login`, formData);
      this.token = data.data.token;
      this.name = data.data.user.name;
      this.id = data.data.user.id;
      this.amount = data.data.user.amount;
      console.log(data.data);
      this.router.navigate(['/home']);
    } catch(err) {
      alert("Erro ao fazer login. Tente novamente mais tarde.");
    }
  }

  async register(formData) {
    try {
      const data = await axios.post(`${environment.route}/register`, formData);
      this.token = data.data.token;
      this.name = data.data.user.name;
      this.amount = data.data.user.amount;
      this.router.navigate(['/home']);
    } catch(err) {
      alert("Erro ao registar. Tente novamente mais tarde.");
    }
  }

  async paymentIntent(amount, currency) {

    const data = {
      amount: amount * 100,
      currency
    }

    return axios.post(environment.route + `/payment`, data, {
      headers: {
        authorization: 'Bearer ' + this.token,
      }
    })
  }

  async getPayments<Type>() {
    return axios.get<Type>(environment.route + `/payments`, {
      headers: {
        authorization: 'Bearer ' + this.token,
      }
    })
  }

  getName(): string {
    if(this.name) return this.name;
    else return '';
  }

  getAmount(): number {
    return this.amount;
  }

}
