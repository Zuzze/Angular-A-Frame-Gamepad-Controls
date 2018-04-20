import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';


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
  camera: any;
  cube: any;
  controller: any;

  constructor(ref: ElementRef, renderer: Renderer2) {
    this.elem = ref.nativeElement;
}

ngOnInit() {
    this.aframe = this.elem.querySelector('a-scene');
    this.camera = this.elem.querySelector("#camera");
    this.cube = this.elem.querySelector("#box");
    this.cube.addEventListener("click", (event) => {
      console.log("clicked");
      console.log(event);
      this.cube.setAttribute("color", "#000")
    });
    this.cube.addEventListener("mouseenter", (event) => {
      console.log("hovered");
      console.log(event);
      this.cube.setAttribute("color", "#FFF")
    });
    this.initController();
}

private initController(){

  window.addEventListener('gamepadconnected', function(e) {
    console.log("connected");
    //var gpad = navigator.getGamepads()[e.gamepad.index];
    //console.log(gpad)
  });
  window.addEventListener('gamepaddisconnected', function(e) {
    console.log("disconnected")
    // Pause the game 
  });

  var gamepads = navigator.getGamepads();// Array[Gamepad]
  for(let g of gamepads){
    if(g && g.id.toLowerCase().startsWith("xbox")){
      console.log("xbox controller connected");
      console.log(g);
      this.controller = g;
      this.camera.setAttribute("gamepad-controls", `controller: ${g.index}; lookEnabled: true`);
      //setInterval(this.gameLoop, 500);
      break;
    }
  }

  this.elem.addEventListener('gamepadbuttondown', function (e) {
    console.log('Button "%d" has been pressed.', e.index);
  });
}



}
