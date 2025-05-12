import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationItem, NavigationSearchService } from '../../services/navigation-search.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {

  @ViewChild('iSearchTag')
  public tagInput!: ElementRef<HTMLInputElement>;
  
  public searchResults: NavigationItem[] = [];
  public showResults: boolean = false;
  public searchTerm: string = '';

  constructor(
    private navigationSearchService: NavigationSearchService
  ){}

  searchTag(): void {
    this.searchTerm = this.tagInput.nativeElement.value.trim();
    
    if (this.searchTerm) {
      this.searchResults = this.navigationSearchService.searchSections(this.searchTerm);
      this.showResults = true;
    } else {
      this.clearSearch();
    }
  }
  
  clearSearch(): void {
    this.searchResults = [];
    this.showResults = false;
    this.tagInput.nativeElement.value = '';
    this.searchTerm = '';
  }
  
  onInputChange(): void {
    // Realizar búsqueda en tiempo real mientras el usuario escribe
    this.searchTerm = this.tagInput.nativeElement.value.trim();
    if (this.searchTerm) {
      this.searchResults = this.navigationSearchService.searchSections(this.searchTerm);
      this.showResults = true;
    } else {
      this.clearSearch();
    }
  }
  
  closeResults(): void {
    this.showResults = false;
  }
}
