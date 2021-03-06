import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Presuspuestos } from '@app/shared/models/presupuestos';
import { Subscription } from 'rxjs';
import { PresupuestosService } from '../presupuestos/presupuestos.service';


interface ingresos {   //    arqueo, ingresos
  ingresos_tipo: 'efectivo' | 'deposito' | 'cheque' | 'transferencia';
  monto: number;
}

const arqueo_ingres: ingresos[] = [
  { ingresos_tipo: 'cheque', monto: 400 },
  { ingresos_tipo: 'efectivo', monto: 200 },
  { ingresos_tipo: 'deposito', monto: 100 },
  { ingresos_tipo: 'transferencia', monto: 650 },
];

interface egresos {   //    arqueo, egresos
  egresos_tipo: 'efectivo' | 'deposito' | 'cheque' | 'transferencia';
  monto: number;
}
const arqueo_egres: egresos[] = [
  { egresos_tipo: 'cheque', monto: 400 },
  { egresos_tipo: 'efectivo', monto: 200 },
  { egresos_tipo: 'deposito', monto: 100 },
  { egresos_tipo: 'transferencia', monto: 650 },
];

interface retiro {   //    arqueo, egresos
  nombre: string;
  concepto: string;
  monto: number;
}
const retiro: retiro[] = [
  { nombre: 'Gaston', concepto: 'Vuelto', monto: 400 },
  { nombre: 'Hernan', concepto: 'Vuelto', monto: 200 },
  { nombre: 'Cintia', concepto: 'Vuelto', monto: 700 },
  { nombre: 'Gaston', concepto: 'Vuelto', monto: 800 },
];



@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.scss']
})
export class CajaComponent implements OnInit {

  private subscription: Subscription = new Subscription();

  constructor(private presuSvc: PresupuestosService) { }

  presus: Presuspuestos[] = [];
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    let j = 0;
    this.subscription.add(
      this.presuSvc.getAll().subscribe((data) => {
        for (let i = 0; i < data.length; i++) {

          if (data[i].forma_pago == "Cheque") {
            this.presus[j] = data[i];
            j++;
          }
        }
        this.dataSource.data = this.presus;
        this.totalCheques = this.presus.length;
      })
    );


  }



  //-----------------------------------------------------INICIO DEL DIA
  displayedColumns: string[] = ['numero', 'banco', 'fecha_vencimiento', 'monto'];      //ENCABEZADO DE LA LISTA(TITULOS)
  dataSource = new MatTableDataSource<Presuspuestos>();

  //-----------------------------------------------------ARQUEO INGRESOS
  displayedColumnsI: string[] = ['ingresos_tipo', 'monto'];      //ENCABEZADO DE LA LISTA(TITULOS)
  dataSourceI = arqueo_ingres;

  //-----------------------------------------------------ARQUEO EGRESOS
  displayedColumnsE: string[] = ['egresos_tipo', 'monto'];      //ENCABEZADO DE LA LISTA(TITULOS)
  dataSourceE = arqueo_egres;

  //-----------------------------------------------------RETIRO
  displayedColumnsR: string[] = ['nombre', 'concepto', 'monto'];      //ENCABEZADO DE LA LISTA(TITULOS)
  dataSourceR = retiro;

  i_cierre: number = 0;
  i_efectivo: number = 0;
  i_diferencia: number = 0;

  totalCheques = 0;



  //--------------------------------------------------------ARQUEO
  a_efectivo: number = 0;
  totalMovimiento: number;

  empezar() {

  }

  //--------------------------------------------------------RETIRO DE EFECTIVO

}
