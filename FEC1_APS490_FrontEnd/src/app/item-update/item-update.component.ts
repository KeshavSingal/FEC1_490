import { Component } from '@angular/core';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-update',
  templateUrl: './item-update.component.html'
})
export class ItemUpdateComponent {
  itemId: number | null = null;
  itemName: string = '';

  constructor(private itemService: ItemService) {}

  updateItem(): void {
    if (this.itemId && this.itemName) {
      this.itemService.updateItem(this.itemId, this.itemName).subscribe({
        next: (updatedItem) => {
          console.log('Item updated successfully:', updatedItem);
          this.itemId = null;  // Clear the input fields after update
          this.itemName = '';
        },
        error: (error) => {
          console.error('There was an error updating the item:', error);
        }
      });
    }
  }
}
