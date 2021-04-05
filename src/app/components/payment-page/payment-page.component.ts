import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

import axios from 'axios';
import { SessionServiceService as SessionService } from 'src/app/services/session-service.service';
import { Router } from '@angular/router';

declare var Stripe;

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss']
})
export class PaymentPageComponent implements OnInit {

  public stripe: any;
  public elements: any;
  public cardElement: any;
  public paymentRequestButton: any;
  public paymentRequest: any;
  public hadClientKey: boolean = false;
  public showGoToHomePage = false;
  private clientKey: string = "";


  //values
  public amount: any;
  public currency: any;

  constructor(private sessionService: SessionService,
    private router: Router) {}

  ngOnInit() {

    if(!this.sessionService.verifySession()) {
      this.router.navigate(['/']);
    }

    this.stripe = Stripe(environment.stripe_public_key);
    this.elements = this.stripe.elements();

    const style = {
      base: {
        color: "#32325d",
        fontFamily: '"Quicksand", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    };

    this.cardElement = this.elements.create("card", {style:style});
    this.cardElement.mount('#card-element');
    this.cardElement.on('change', ({error}) => {
      let displayError = document.getElementById('card-errors');
      if (error) {
        displayError.textContent = error.message;
      } else {
        displayError.textContent = '';
      }
    });
    this.amount = "";
    this.currency = 'brl';
  }

  public paymentIntent() {

    this.sessionService.paymentIntent(this.amount, this.currency)
      .then(r => {
        this.clientKey = r.data.clientSecret;
        this.hadClientKey = true;
        this.pay();
      })
      .catch(r => alert("Houve um erro, tente novamente mais tarde"));
  }

  private pay() {

    this.stripe.confirmCardPayment(this.clientKey, {
      payment_method: {
        card: this.cardElement,
        billing_details: {
          name: this.sessionService.getName(),
        }
      }
    })
    setTimeout(r => this.showGoToHomePage = true, 5000);
  }

  public getSymbol():string {
    switch(this.currency) {
      case 'brl': return 'R$';
      case 'eur': return '€';
      case 'usd': return 'U$';
      default: return 'R$';
    }
  }

  public goHome() {
    this.router.navigate(['/home'])
  }

}
