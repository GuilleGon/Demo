import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClientesService } from '../clientes.service';
import { ClienteDetalle } from '@app/shared/models/client.interfase';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  isAdmin = null;

  constructor(
    private listaClte: ClientesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const role = JSON.parse(localStorage.getItem('user'));
    this.isAdmin = role.role;

    this.subscription.add(
      this.listaClte.getAllClientD().subscribe((data) => {
        this.dataSource.data = data;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }




  displayedColumns: string[] = ['id', 'razon_social', 'CUIT', 'presupuestos_emitidos', 'presupuestos_pendientes'];      //ENCABEZADO DE LA LISTA(TITULOS)
  dataSource = new MatTableDataSource<ClienteDetalle>();

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


  DetalleCliente(index: string) {
    this.router.navigate([`/clientesD/${index}`]);
  }


}
