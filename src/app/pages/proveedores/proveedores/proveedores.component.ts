import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Proveedores } from '@app/shared/models/proveedores';
import { Subscription } from 'rxjs';
import { ProveedoresServiceService } from '../proveedores-service.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();

  isAdmin = null;

  constructor(
    private provSvc: ProveedoresServiceService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const role = JSON.parse(localStorage.getItem('user'));
    this.isAdmin = role.role;

    this.subscription.add(
      this.provSvc.getAll().subscribe((data) => {
        this.dataSource.data = data;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  displayedColumns: string[] = ['id', 'razon_social', 'CUIT', 'telefono', 'email', 'direccion'];      //ENCABEZADO DE LA LISTA(TITULOS)
  dataSource = new MatTableDataSource<Proveedores>();

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


  DetalleProvee(index: string) {
    this.router.navigate([`/proveedores/detalles/${index}`]);
  }

}
