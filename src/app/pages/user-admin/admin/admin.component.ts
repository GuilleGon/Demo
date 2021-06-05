import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserDetail } from '@app/shared/models/user.interface';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private listaUsu: UsuariosService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.listaUsu.getAllUsuarios().subscribe((data) => {
      console.log(data);
      this.dataSource.data = data;
    });

  }


  displayedColumns: string[] = ['id', 'username', 'password', 'role', 'createdAt', 'updateAt'];
  dataSource = new MatTableDataSource<UserDetail>();

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


  DetalleCliente(index: string){
    this.listaUsu.getUserById(index).subscribe(data =>{
      console.log(data)
    });

    this.router.navigate([`/userD/${index}`]);
  }

}
