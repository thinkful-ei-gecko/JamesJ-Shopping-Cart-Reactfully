'use strict';

const store = {
  items: [
    { name: 'banana', marked: true },
    { name: 'apple', marked: false }
  ]
};

function renderShoppingCartList() {
  // Renders data from store as html in DOM
  console.log('renderShoppingCartList is working');
}

function handleNewItemSubmit() {
  // Adds new item into store based on user input
  console.log('handleNewItemSubmit is working');
}

function handleItemCrossedOff() {
  // Updates state of an item to mark or unmark an item as crossed out
  // within the shopping cart list
  console.log('handleItemCrossedOff is working');

}

function handleItemDelete() {
  // Updates store to remove item from shopping cart 
  console.log('handleItemDelete is working');

}

function main() {
  // Invokes all functions for access in DOM/document ready
  renderShoppingCartList();
  handleNewItemSubmit();
  handleItemCrossedOff();
  handleItemDelete();
  handleItemDelete();
}

$(main);