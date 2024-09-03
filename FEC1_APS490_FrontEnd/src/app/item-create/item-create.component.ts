import { Component } from '@angular/core';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html'
})
export class ItemCreateComponent {
  itemName: string = '';

  constructor(private itemService: ItemService) {}

  createItem(): void {
    if (this.itemName) {
      this.itemService.createItem(this.itemName).subscribe({
        next: (newItem) => {
          console.log('Item created successfully:', newItem);
          this.itemName = '';  // Clear the input field after creation
        },
        error: (error) => {
          console.error('There was an error creating the item:', error);
        }
      });
    }
  }
}
