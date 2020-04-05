import { Component, OnInit } from '@angular/core';
import {Item} from '../item';
import {DataService} from '../data.service';

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.css'],
  providers: [DataService]
})
export class ShoppingItemComponent implements OnInit {
  shoppingItemList:Item[]=[];
  selectedItem: Item;
  toggleForm: boolean = false;
constructor(private dataService: DataService) { }

//gets item name data from database at index 0
  getItems(){
    this.dataService.getShoppingItems()
    .subscribe(items =>{
      this.shoppingItemList = items;
      //console.log("data from dataservice: " + this.shoppingItemList[0].itemName);

    });
  }

  addItem(form){
    let newItem: Item ={
      itemName: form.value.itemName,
      itemQuantity: form.value.itemQuantity,
      itemBought: false
    }

    this.dataService.addShoppingItem(newItem)
    .subscribe(item => {
      console.log(item);
      this.getItems();

    });
}

  deleteItem(id){
    this.dataService.deleteShoppingItem(id)
    .subscribe( data => {
      console.log(data);
      if (data.status== 200) {
        for (let index = 0; index < this.shoppingItemList.length; index++) {
          const element = this.shoppingItemList[index];
          if (id == element._id) {
            this.shoppingItemList.splice(index,1);

          }

        }

      }
    })
  }


  showEditForm(item){

    this.selectedItem = item;

  }
  ngOnInit(): void {
    this.getItems();
  }

}
