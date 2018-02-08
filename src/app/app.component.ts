import { Component, OnInit, ElementRef } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent {
  title = 'app';
  elem: any;
  aframe: any;
  timeout: any;

  constructor(ref: ElementRef) {
    this.elem = ref.nativeElement;
}

ngOnInit() {
    this.aframe = this.elem.querySelector('a-scene');
}
}
