import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Cheques } from '@app/shared/models/Cheques';
import { Presuspuestos } from '@app/shared/models/presupuestos';
import { Subscription } from 'rxjs';
import { PresupuestosService } from '../presupuestos/presupuestos.service';

@Component({
  selector: 'app-cheques',
  templateUrl: './cheques.component.html',
  styleUrls: ['./cheques.component.scss']
})
export class ChequesComponent implements OnInit, OnDestroy {

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
      })
    );



  }

  displayedColumns: string[] = ['banco', 'numero', 'fecha_vencimiento', 'monto'];      //ENCABEZADO DE LA LISTA(TITULOS)
  dataSource = new MatTableDataSource<Presuspuestos>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }




}

