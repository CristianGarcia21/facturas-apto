import { Component } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { Factura } from '../../models/factura.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-ingreso-form',
  templateUrl: './ingreso-form.component.html',
  imports: [CommonModule, FormsModule], 
  standalone: true
})
export class IngresoFormComponent {
  factura: Factura = {
    mes: '', agua: 0, gas: 0, energia: 0, internet: 0,
    ingreso1: 0, ingreso2: 0, ingreso3: 0, ingreso4: 0, 
    pago_arriendo: 0, balance: 0
  };

  constructor(private supabase: SupabaseService, private router: Router) {}

  // Modifica el método convertirValorMonetario:
convertirValorMonetario(valor: string | number): number {
  if (typeof valor === 'number') return valor;
  
  // Eliminar posibles separadores de miles y manejar formato colombiano
  // (reemplazar punto por nada y coma por punto)
  const valorSinFormato = valor.toString().replace(/\./g, '').replace(',', '.');
  
  // Convertir a número
  return parseFloat(valorSinFormato) || 0; // Evitar NaN
}

  async guardar() {
    try {
      // Convertir todos los valores monetarios
      this.factura.agua = this.convertirValorMonetario(this.factura.agua);
      this.factura.gas = this.convertirValorMonetario(this.factura.gas);
      this.factura.energia = this.convertirValorMonetario(this.factura.energia);
      this.factura.internet = this.convertirValorMonetario(this.factura.internet);
      this.factura.pago_arriendo = this.convertirValorMonetario(this.factura.pago_arriendo);
      this.factura.ingreso1 = this.convertirValorMonetario(this.factura.ingreso1);
      this.factura.ingreso2 = this.convertirValorMonetario(this.factura.ingreso2);
      this.factura.ingreso3 = this.convertirValorMonetario(this.factura.ingreso3);
      this.factura.ingreso4 = this.convertirValorMonetario(this.factura.ingreso4);
      
      // Calcular balance (gastos - ingresos)
      const gastos = this.factura.agua + this.factura.gas + 
                     this.factura.energia + this.factura.internet + 
                     this.factura.pago_arriendo;
      
      const ingresos = this.factura.ingreso1 + this.factura.ingreso2 + 
                       this.factura.ingreso3 + this.factura.ingreso4;
      
      this.factura.balance = Number((ingresos - gastos).toFixed(2));
      
      const { data, error } = await this.supabase.addFactura(this.factura);
      
      if (error) {
        console.error('Error al guardar factura:', error);
        alert('Error al guardar los datos: ' + error.message);
        return;
      }
      
      console.log('Factura guardada correctamente:', data);
      this.router.navigate(['/']);
    } catch (e) {
      console.error('Error inesperado:', e);
      alert('Ocurrió un error inesperado');
    }
  }

  // Método para formatear valores como moneda colombiana (solo para visualización)
  formatoPeso(valor: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP', 
      minimumFractionDigits: 0
    }).format(valor);
  }
}