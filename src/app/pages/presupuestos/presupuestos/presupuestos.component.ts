import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Presuspuestos } from '@app/shared/models/presupuestos';
import { Subscription } from 'rxjs';
import { PresupuestosService } from '../presupuestos.service';

@Component({
  selector: 'app-presupuestos',
  templateUrl: './presupuestos.component.html',
  styleUrls: ['./presupuestos.component.scss']
})
export class PresupuestosComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();

  isAdmin = null;

  constructor(
    private presuSvc: PresupuestosService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const role = JSON.parse(localStorage.getItem('user'));
    this.isAdmin = role.role;

    this.subscription.add(
      this.presuSvc.getAll().subscribe((data) => {
        this.dataSource.data = data;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  displayedColumns: string[] = ['id', 'numero', 'cliente', 'fecha_emision', 'estado'];      //ENCABEZADO DE LA LISTA(TITULOS)
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


  DetallePresu(index: string) {
    this.router.navigate([`/presupuestos/presupuestosD/${index}`]);
  }

}
