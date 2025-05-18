import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Factura } from '../models/factura.model';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  get client() {
    return this.supabase;
  }

  async getFacturas(): Promise<Factura[]> {
    const { data } = await this.supabase.from('facturas').select('*').order('mes', { ascending: false });
    return data || [];
  }

  async addFactura(factura: Factura) {
  return await this.supabase.from('facturas').insert(factura).select();
}
}

