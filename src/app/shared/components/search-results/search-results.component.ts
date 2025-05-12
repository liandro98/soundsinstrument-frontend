import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationSearchService, NavigationItem } from '../../services/navigation-search.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent implements OnInit {
  searchTerm: string = '';
  searchResults: NavigationItem[] = [];
  noResults: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navigationSearchService: NavigationSearchService
  ) {}

  ngOnInit(): void {
    // Subscribe to query parameter changes
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['q'] || '';
      if (this.searchTerm) {
        this.performSearch();
      } else {
        this.searchResults = [];
        this.noResults = false;
      }
    });
  }

  performSearch(): void {
    this.searchResults = this.navigationSearchService.searchSections(this.searchTerm);
    this.noResults = this.searchResults.length === 0;
  }

  navigateTo(path: string): void {
    this.router.navigateByUrl(path);
  }
}
