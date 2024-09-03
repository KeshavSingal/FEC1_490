import { Component } from '@angular/core';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-delete',
  templateUrl: './item-delete.component.html'
})
export class ItemDeleteComponent {
  itemId: number | null = null;

  constructor(private itemService: ItemService) {}

  deleteItem(): void {
    if (this.itemId) {
      this.itemService.deleteItem(this.itemId).subscribe({
        next: (response) => {
          console.log('Item deleted successfully:', response);
          this.itemId = null;  // Clear the input field after deletion
        },
        error: (error) => {
          console.error('There was an error deleting the item:', error);
        }
      });
    }
  }
}
