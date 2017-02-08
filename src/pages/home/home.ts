import {Component, Output, EventEmitter, Input, OnChanges, SimpleChanges} from '@angular/core';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnChanges {

  isSelected = false;
  segment1;
  segment2;
  segment3;
  whatTodoText;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }


  whatToDo() {

    // Segment 1
    // x1 x2 x3 x4

    // Segment 2
    // y1 y2 y3 y4

    // Segment 3
    // z1 z2 z3 z4
    console.log("some segment button pressed");


    // Case 1
    if (this.segment1 == "x1"
      && this.segment2 == "y1"
      && this.segment3 == "z1") {
      this.whatTodoText = "ALL NUMBER ONES"
    }


    // Case 2
    if (this.segment1 == "x2"
      && this.segment2 == "y2"
      && this.segment3 == "z2") {
      this.whatTodoText = "ALL NUMBER TWO, ALL NUMBER TWO, ALL NUMBER TWO, ALL NUMBER TWO"
    }


    // Case 3
    if (this.segment1 == "x3"
      && this.segment2 == "y3"
      && this.segment3 == "z3") {
      this.whatTodoText = "ALL NUMBER THREES, ALL NUMBER THREES, ALL NUMBER THREES, ALL NUMBER THREES, ALL NUMBER THREES "
    }


  }


  tapEvent(event) {
    this.isSelected = !this.isSelected;
    console.log(this.isSelected);
  }

}
