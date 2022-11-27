import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { EmpleadoService } from '../sevice/empleado.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  empleados: any[] = [];
  constructor(private _empleadosService: EmpleadoService) {}

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit(): void {
    this.getEmpleados();
  }

  getEmpleados() {
    // eslint-disable-next-line no-underscore-dangle
    this._empleadosService.getEmpleados().subscribe((data) => {
      this.empleados = [];
      data.forEach((element: any) => {
        this.empleados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
    });
  }

  eliminarEmpleado(id: string) {
    // eslint-disable-next-line no-underscore-dangle
    this._empleadosService.eliminarEmpleado(id).then(()=>{
      console.log('eleminado');
    }).catch();
  }

}
