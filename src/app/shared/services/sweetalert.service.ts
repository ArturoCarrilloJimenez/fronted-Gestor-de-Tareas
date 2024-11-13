import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SweetalertService {
  constructor() {}

  // Alerta de confirmación
  alertConfirm = (
    title: string,
    text: string,
    button: string,
  ) => {
    return new Promise((resolve) => {
      Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: button,
      }).then((result) => {
        resolve(result.isConfirmed)
      });
    });
  };
}
