import { Component, OnInit } from '@angular/core';
import { SessionServiceService as SessionService } from '../../services/session-service.service';
import { Router } from '@angular/router'
import { getCurrencySymbol } from '@angular/common';

interface PaymentData {
  payments: any[]
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'value', 'currency', 'status', 'updatedAt'];
  public dataSource = []

  public amount: number = 0;

  constructor(
    private sessionService: SessionService,
    private router: Router,
    ){}

  ngOnInit() {
    if(!this.sessionService.verifySession()) {
      this.router.navigate(['/']);
      return;
    }

    this.sessionService.getPayments<PaymentData>().then(r => this.dataSource = r.data.payments.map(
      item => {
        console.log(item);
        return {
          ...item,
          value: (item.value/100).toFixed(2),
          currency: getSymbol(item.currency)
        }
      }));

    this.amount = this.getAmount();
  }

  public getAmount(): number {
    return this.sessionService.getAmount();
  }

}

function getSymbol(e):string {
  switch(e) {
    case 'brl': return 'R$';
    case 'eur': return '€';
    case 'usd': return 'U$';
    default: return 'R$';
  }
}
