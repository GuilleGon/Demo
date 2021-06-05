import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-nuevou',
  templateUrl: './nuevou.component.html',
  styleUrls: ['./nuevou.component.scss']
})
export class NuevouComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  newForm = this.fb.group({
    "username": [''],
    "password": [''],
    "role": [''],
  });

  constructor(
    private fb: FormBuilder,
    private usutSvc: UsuariosService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  onCreate() {
    const formValue = this.newForm.value;
    this.subscription.add(
      this.usutSvc.newUser(formValue).subscribe()
    );
    this.router.navigate(['/admin']);
  }


}
