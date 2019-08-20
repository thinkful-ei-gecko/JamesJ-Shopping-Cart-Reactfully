'use strict';

const store = {
  items: [
    { name: 'banana', marked: true },
    { name: 'apple', marked: false }
  ]
};

function generateItemAsElement(item) {
  // generate a single li element from item attributes
  const isCrossedOff = item.marked === true ? 'shopping-item__checked' : null;
  return `
    <li class='${isCrossedOff}'>${item.name}</li>
  `;
}
function generateShoppingListString() {
  // generate string of li elements from the store 
  // for each item in our shopping cart list
  return store.items.map( item => generateItemAsElement(item));

}

function renderShoppingCartList() {
  // Renders data from store as html in DOM
  console.log('renderShoppingCartList is working');
  const shoppingCartListString = generateShoppingListString();
  $('.js-shopping-list').html(shoppingCartListString);
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