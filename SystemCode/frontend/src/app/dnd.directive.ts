import { Directive, Host, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appRightDnd]'
})
export class RightDndDirective {
  @Output()
  uploadEvt: EventEmitter<any> = new EventEmitter()

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
    this.uploadEvt.emit(evt)
    // console.log({files})
    // if(files.length > 0) {
    //   console.log(`You dropped ${files.length} files`)
    // }
  }

  @HostListener('change', ['$event'])
  public onChange(evt: any) {
    this.uploadEvt.emit(evt)
  }

}
