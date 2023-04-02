import { Component, Output, EventEmitter, Input } from '@angular/core';
import { SimplePaginationService } from 'src/app/shared/ui-elements/simple-pagination/simple-pagination.service';
import { SimplePagination } from './simple-pagination';

@Component({
  selector: 'app-simple-pagination',
  templateUrl: './simple-pagination.component.html',
  styleUrls: ['./simple-pagination.component.scss']
})
export class SimplePaginationComponent {

  // to get prev & next pages
  @Output() callPrev = new EventEmitter();
  @Output() callNext = new EventEmitter();
  @Input() spOptions:SimplePagination

  constructor() { }
  ngOnInit(): void {
  }

  // get prev page
  getPrevPage() {
    this.callPrev.emit();
  }

  // get next page
  getNextPage() {
    this.callNext.emit();
  }
}
