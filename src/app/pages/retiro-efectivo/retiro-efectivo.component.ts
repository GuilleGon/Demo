import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Retiro } from '@app/shared/models/retiro.interface';
import { Subscription } from 'rxjs';
import { EfectivoService } from './efectivo.service';



@Component({
  selector: 'app-retiro-efectivo',
  templateUrl: './retiro-efectivo.component.html',
  styleUrls: ['./retiro-efectivo.component.scss']
})
export class RetiroEfectivoComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  isAdmin = null;

  constructor(
    private router: Router,
    private retiro: EfectivoService,
  ) { }

  ngOnInit(): void {
    const role = JSON.parse(localStorage.getItem('user'));
    this.isAdmin = role.role;

    this.subscription.add(
      this.retiro.getAllRetiros().subscribe((data) => {
        this.dataSource.data = data;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  displayedColumns: string[] = ['fecha', 'responsable', 'concepto', 'monto'];
  dataSource = new MatTableDataSource<Retiro>();

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

  DetalleRetiro(index: string) {
    this.router.navigate([`efectivo/detalleR/${index}`]);
  }

}
