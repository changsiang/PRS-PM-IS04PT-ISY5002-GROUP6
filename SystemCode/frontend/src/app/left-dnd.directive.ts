import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appLeftDnd]'
})
export class LeftDndDirective {
  @HostBinding('class.fileover')
  fileOver: boolean = false;

  constructor() { }
  
  @HostListener('dragover', ['$event'])
  onDragOver(evt: any){
    evt.preventDefault();
    evt.stopPropagation();

    console.log('Drag Over');
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();

    console.log('Drag Leave');
  }

  @HostListener('drop', ['$event']) 
  public ondrop(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    const files = evt.dataTransfer.files;
    if(files.length > 0) {
      console.log(`You dropped ${files.length} files`)
    }
  }
  

}
