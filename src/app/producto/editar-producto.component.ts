import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto';
import { ProductoService } from '../service/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.less']
})

export class EditarProductoComponent implements OnInit {
  
  producto: Producto | null = null;


  constructor(
    private productoService: ProductoService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router

  ) {}

  ngOnInit(){
    const id = this.activatedRoute.snapshot.params['id'];

    this.productoService.detail(id).subscribe(
      data => {
        this.producto = data;
      },
      err => {
        this.toastr.error(err.error.mensaje, 'FAIL', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        }); 
        this.router.navigate(['/']);
      }
    )
  }

  onUpdate(): void{
    const id = this.activatedRoute.snapshot.params['id'];
    
    if (this.producto) {
    
      this.productoService.update(id, this.producto).subscribe(
        data => {
          this.toastr.success('Producto actualizado', 'OK', {
            timeOut: 3000,
            positionClass: 'toast-top-center'

          }); 
          this.router.navigate(['/']);
        },
        err => {
          this.toastr.error(err.error.mensaje, 'FAIL', {
            timeOut: 3000,
            positionClass: 'toast-top-center'
          }); 
          this.router.navigate(['/']);
        }
      )
    }
  }
}
