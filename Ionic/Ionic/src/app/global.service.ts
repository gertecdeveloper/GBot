import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public codAtv: string = "";

  constructor() { }

  public getCodAtv() {
    return this.codAtv;
  }

  public setCodAtv(codAtv) {
    this.codAtv = codAtv;
  }
}
