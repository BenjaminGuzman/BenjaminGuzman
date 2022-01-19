import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[dataBackground]'
})
export class DataBackgroundDirective {
  constructor(private elementRef: ElementRef) {
  }

  @Input()
  set dataBackground(val: string) {
    this.elementRef.nativeElement.setAttribute("data-background", val);
  }

}
