import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { promise } from 'protractor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  constructor(private firestorage: AngularFirestore) {}

  addEmpleado(empleado: any): Promise<any> {
    return this.firestorage.collection('empleados').add(empleado);
  }

  getEmpleados(): Observable<any> {
    return this.firestorage.collection('empleados').snapshotChanges();
  }

  eliminarEmpleado(id: string): Promise<any> {
    return this.firestorage.collection('empleados').doc(id).delete();
  }

  getEmpleado(id: string): Observable<any> {
    return this.firestorage.collection('empleados').doc(id).snapshotChanges();
  }

  actualizarEmpleado(id: string, data: any){
    return this.firestorage.collection('empleados').doc(id).update(data);
  }

}
