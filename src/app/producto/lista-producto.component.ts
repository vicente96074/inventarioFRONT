import { Component, OnInit} from '@angular/core';
import { Producto } from '../models/producto';
import { ProductoService } from '../service/producto.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.less']
})

export class ListaProductoComponent implements OnInit{

  productos: Producto[] = [];

  constructor(
    private productoService: ProductoService,
    private toastr: ToastrService
    ){}

  ngOnInit(){
    this.cargarProductos();
      
  }

  cargarProductos(): void{
    this.productoService.lista().subscribe(
      data => {
        this.productos = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  borrar(id: number): void{
    this.productoService.delete(id).subscribe (
      data => {
        this.toastr.success('Producto eliminado', 'OK',
          {
            timeOut: 3000,
            positionClass: 'toast-top-center'
          }
        );
        this.cargarProductos();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'FAIL', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        }); 
      }
    )
  }
}
