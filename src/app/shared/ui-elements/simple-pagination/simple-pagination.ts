export class SimplePagination {
  itemsPerPage= 10
  currentPage= 1
  totalPages= 1
  totalItems= 0
  viewItemsCountStart= 0
  viewItemsCountEnd= 0
  hasPrevPage= false
  hasNextPage= false
  pagedData: any[] = []
}
