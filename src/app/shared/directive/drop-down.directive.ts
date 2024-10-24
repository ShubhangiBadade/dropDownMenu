import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropDown]'
})
export class DropDownDirective implements OnInit{
  dropdown : any;
  private isOpen = false;

  constructor(
    private _element: ElementRef,
    private _rendere: Renderer2
  ) { }
  ngOnInit(): void {
    
    const dropdown = document.getElementById('navbarDropdown')?.click();
   // dropdown.click(); // This will simulate the dropdown click and open it
    //this.isOpen = !this.isOpen; // default behaviour

   
  }

  @HostListener('click') toggleDropDown() {
    this.isOpen = !this.isOpen; // default behaviour

    if (this.isOpen) {
      this._rendere.addClass(this._element.nativeElement.nextElementSibling, 'show')

    } else {
      this._rendere.removeClass(this._element.nativeElement.nextElementSibling, 'show')
    }
  }

  @HostListener('document :click', ['$event.target']) onclickOutside(targetelement: HTMLElement) {

    const clickInside = this._element.nativeElement.contains(targetelement);
    if (!clickInside) {
      this.isOpen = false;
      this._rendere.removeClass(this._element.nativeElement.nextElementSibling, 'show')
    }
  }

  @HostListener('document:keydown.escape',['$event']) onEscapePress(event:KeyboardEvent){
    this.isOpen = false;
    this._rendere.removeClass(this._element.nativeElement.nextElementSibling,'show')
  }
}

