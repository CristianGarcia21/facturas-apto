import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { Factura } from '../../models/factura.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  imports: [CommonModule],
  standalone: true
})
export class BalanceComponent implements OnInit {
  facturas: Factura[] = [];
  dividedBalances: { [key: string]: boolean } = {};

  constructor(private supabase: SupabaseService) {}

  async ngOnInit() {
    this.facturas = await this.supabase.getFacturas();
    this.facturas = this.facturas.map(f => ({
      ...f,
      balance: (f.ingreso1 + f.ingreso2 + f.ingreso3 + f.ingreso4) - 
               (f.agua + f.gas + f.energia + f.internet + f.pago_arriendo)
    }));
    
    // Inicializar el estado de las divisiones
    this.facturas.forEach(f => {
      this.dividedBalances[f.mes] = false;
    });
  }

  toggleDivision(mes: string) {
    this.dividedBalances[mes] = !this.dividedBalances[mes];
  }

  getPersonBalance(balance: number): number {
    return Number((balance / 2).toFixed(2));
  }
}