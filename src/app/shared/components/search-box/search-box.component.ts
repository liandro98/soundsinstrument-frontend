import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {

  @ViewChild('iSearchTag')
  public tagInput!:ElementRef<HTMLInputElement>;

  constructor(
  ){}

  searchTag( ):void {
    const newTag:string = this.tagInput.nativeElement.value;
    //console.log(newTag)
    
    //this.gifsService.searchTag(newTag);
    
    this.tagInput.nativeElement.value = '';
  }
}
