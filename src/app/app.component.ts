import { Component, OnInit, ElementRef } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent {
  elem: any;
  ball: any;
  controller: any;
  cursor: any;
  hovered: any;
  selected: any; //with gamepad
  ballStatus: string = "Untouched";

  constructor(ref: ElementRef) {
    this.elem = ref.nativeElement;
  }

  ngOnInit() {
    console.log("initializing...");
    this.ball = this.elem.querySelector("#ball");
    this.cursor = this.elem.querySelector("#cursor");

    //traditional event listeners for ball
    this.ball.addEventListener("click", (event) => {
      this.ballStatus = "Clicked with mouse";
      this.ball.setAttribute("color", "#E87EA1")
    });
    this.ball.addEventListener("mouseenter", (event) => {
      this.ballStatus = "Hovered";
      this.ball.setAttribute("color", "#A3F7B5")
      this.hovered = event.target;
    });
    this.ball.addEventListener("mouseleave", (event) => {
      this.ballStatus = "Untouched";
      this.ball.setAttribute("color", "#F4F1BB")
      this.hovered = null;
    });
    this.initController();

  //note that gamepad controls require that it is added to base element, not to the target
  //there is currently no support to get target from gamepadbuttondown event
  //--> add global hover variable for interactive elements, telling where the cursor is 
  //and use that when button is pressed
  this.elem.addEventListener('gamepadbuttondown', (event) => {
    console.log(`Button ${event.detail.index} has been pressed in the gamepad.`);
    if(this.hovered){
      this.selected = this.hovered;
      this.ballStatus = "Clicked with gamepad";
      this.hovered.setAttribute("color", 	"#E63946");
    }
  });
}

  private initController(){
    window.addEventListener('gamepadconnected', function(e) {
      console.log("controller connected");
    });
    window.addEventListener('gamepaddisconnected', function(e) {
      console.log("controller disconnected")
      this.controller = null;
    });

    //find xbox controller from connected controllers
    var gamepads = navigator.getGamepads();// Array[Gamepad]
    for(let g of gamepads){
      if(g && g.id.toLowerCase().startsWith("xbox")){
        console.log("xbox controller connected");
        console.log(g);
        this.controller = g;
        this.cursor.setAttribute("gamepad-controls", `controller: ${g.index}; enabled: true`);
        break;
      }
    }
  }
}
