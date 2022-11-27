import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmpleadoService } from '../sevice/empleado.service';

@Component({
  selector: 'app-add-empleado',
  templateUrl: './add-empleado.component.html',
  styleUrls: ['./add-empleado.component.scss'],
})
export class AddEmpleadoComponent implements OnInit {
  createempleado: FormGroup;
  submited = false;
  id: string | null;
  titulo = 'Agregar Empleado';

  constructor(private fb: FormBuilder, private _empleadoSerive: EmpleadoService, private aRoute: ActivatedRoute) {
    this.createempleado = fb.group({
      nombre: ['', Validators.required],
      slario: ['', Validators.required],
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.esEditar();
  }

  agregarEmpleadoEditado() {
    if (this.createempleado.invalid) {
      return;
    }

    if (this.id===null) {
      this.empleadoAgregado();
    } else{
      this.modificarEmpleado(this.id);
    }
  }

  modificarEmpleado(id: string){
    const empleados: any = {
      nombre: this.createempleado.value.nombre,
      slario: this.createempleado.value.slario,
    };
    // eslint-disable-next-line no-underscore-dangle
    this._empleadoSerive.actualizarEmpleado(id, empleados).then(()=>{
      console.log('empleado modificado con exito');
    });
  }

  empleadoAgregado() {
    const empleados: any = {
      nombre: this.createempleado.value.nombre,
      slario: this.createempleado.value.slario,
    };
    // eslint-disable-next-line no-underscore-dangle
    this._empleadoSerive
      .addEmpleado(empleados)
      .then(() => {
        console.log('exito al cargar el empleado');
      })
      .catch(erro => console.log('error'));
  }

  esEditar() {
    if (this.id !== null){
      this.titulo = 'Editar empleado';
      // eslint-disable-next-line no-underscore-dangle
      this._empleadoSerive.getEmpleado(this.id).subscribe(data => {
        // eslint-disable-next-line no-underscore-dangle, @typescript-eslint/dot-notation
        console.log(data.payload.data()['nombre']);
        this.createempleado.setValue({
          // eslint-disable-next-line @typescript-eslint/dot-notation
          nombre: data.payload.data()['nombre'],
          // eslint-disable-next-line @typescript-eslint/dot-notation
          slario: data.payload.data()['slario'],
        });
      });
    }
  }
}
