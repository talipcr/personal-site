import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFormatItem]',
})
export class FormatItemDirective implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.renderer.setProperty(
      this.el.nativeElement,
      'innerHTML',
      this.el.nativeElement.innerHTML.trim().split(',').join(', ')
    );
  }
}
