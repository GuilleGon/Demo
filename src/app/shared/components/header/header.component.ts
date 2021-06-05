import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from '@app/pages/auth/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destoy$ = new Subject<any>();
  isAdmin = null;
  isLogged = false;
  checkSide = false;
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private authSvc: AuthService) { }

  ngOnInit(): void {
    
    this.authSvc.isLogged.pipe(takeUntil(this.destoy$)).subscribe((res) => (this.isLogged = res));

    this.authSvc.isAdmin$.pipe(takeUntil(this.destoy$)).subscribe((res) => this.isAdmin = res);
  }

  ngOnDestroy(): void {
    this.destoy$.next({});
    this.destoy$.complete();
  }

  onToggleSidenav(): void {
    this.toggleSidenav.emit();
    if(!this.checkSide){
      this.checkSide = true;
    }else{
      this.checkSide = false
    }
  }

  onLogout(): void {
    this.authSvc.logout();
    if(this.checkSide){
      this.onToggleSidenav();
    }
  }

}
