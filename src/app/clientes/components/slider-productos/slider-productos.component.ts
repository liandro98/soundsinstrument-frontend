import { Component, ViewChild, ElementRef, AfterViewInit,Input, OnInit, HostListener } from '@angular/core';
import { Producto } from '../../../shared/interfaces/producto';

@Component({
  selector: 'app-slider-productos',
  templateUrl: './slider-productos.component.html',
  styleUrl: './slider-productos.component.css'
})


export class SliderProductosComponent implements OnInit{

  @Input('productos') productos:Producto[] = [];
 
  responsiveOptions: any[] | undefined;
  ngOnInit() {

    this.responsiveOptions = [
        {
            breakpoint: '1280px',
            numVisible: 4,
            numScroll: 1,
        },
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1
        }
    ];
}


  
}
