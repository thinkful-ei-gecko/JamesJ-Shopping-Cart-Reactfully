/* global cuid */

'use strict';

const store = {
  items: [
    { id: cuid(), name: 'banana', marked: true },
    { id: cuid(), name: 'apple', marked: false }
  ]
};
/**
 * 
 * @param {string} item -- one item from the shopping list
 */

function generateItemAsElement(item) {
  // generate a single li element from item attributes
  const isCrossedOff = item.marked === true ? 'shopping-item__checked' : null;
  return `
    <li data-item-id="${item.id}"> 
      <span class="shopping-item js-shopping-item ${isCrossedOff}">
      ${item.name}
      </span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>
  `;
}

/**
 * 
 * @param {array} shoppingList -- array of items from store
 */

function generateShoppingListString(shoppingList) {
  // generate string of li elements from the store 
  // for each item in our shopping cart list
  const items = store.items.map( (item, index) => generateItemAsElement(item, index));
  return items.join('');

}

function renderShoppingCartList() {
  // Renders data from store as html in DOM
  console.log('renderShoppingCartList is working');
  const shoppingCartListString = generateShoppingListString();
  $('.js-shopping-list').html(shoppingCartListString);
}

// add an item to store

function addNewItem(itemName) {
  store.items.push({id: cuid(), name: itemName, marked: false});

}
function handleNewItemSubmit() {
  // Adds new item into store based on user input
  console.log('handleNewItemSubmit is working');
  $('#js-shopping-list-form').on('submit', (e) => {
    e.preventDefault();
    const newItemName = $('.js-shopping-list-entry').val();
    addNewItem(newItemName);
    $('.js-shopping-list-entry').val('');
    renderShoppingCartList();
  });
}

// toggle the marked status of an item in store
function toggleMarkedForItem(itemId) {
  const item = store.items.find(item => itemId === item.id);
  item.marked = !item.marked;
}

// gets the data- value off of an element
function getItemIdFromElement(item) {
  return $(item)
    .closest('li')
    .data('item-id');
}
function handleItemCrossedOff() {
  // Updates state of an item to mark or unmark an item as crossed out
  // within the shopping cart list
  console.log('handleItemCrossedOff is working');
  $('.js-shopping-list').on('click', '.js-item-toggle', (e) => {
    const id = getItemIdFromElement(e.currentTarget);
    toggleMarkedForItem(id);
    renderShoppingCartList();
  });
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
}

$(main);