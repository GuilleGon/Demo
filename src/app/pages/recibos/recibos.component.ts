import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Recibo } from '@app/shared/models/recibos';
import { Subscription } from 'rxjs';
import { RecibosService } from './recibos.service';

@Component({
  selector: 'app-recibos',
  templateUrl: './recibos.component.html',
  styleUrls: ['./recibos.component.scss']
})
export class RecibosComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();

  isAdmin = null;

  constructor(
    private listaRcvo: RecibosService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    const role = JSON.parse(localStorage.getItem('user'));
    this.isAdmin = role.role;

    this.subscription.add(
      this.listaRcvo.getAllReciboD().subscribe((data) => {
        this.dataSource.data = data;
      })
    );
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  displayedColumns: string[] = ['id', 'numero', 'cliente', 'fecha_emision', 'forma_pago', 'monto', 'cantidad'];      //ENCABEZADO DE LA LISTA(TITULOS)
  dataSource = new MatTableDataSource<Recibo>();

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


  DetalleRecibo(index: string) {
    this.router.navigate([`/recibos/detalleRec/${index}`]);
  }

}
