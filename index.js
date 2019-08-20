/* global cuid */

'use strict';

const store = {
  items: [
    { id: cuid(), name: 'banana', marked: true, editing: false },
    { id: cuid(), name: 'apple', marked: false, editing: false }
  ],
  hideMarked: false
};

/**
 * 
 * @param {string} item -- one item from the shopping list
 */

function generateItemAsElement(item) {
  // generate a single li element from item attributes
  const isCrossedOff = item.marked === true ? 'shopping-item__checked' : null;
  const isEditing = item.editing === true ? null : 'hidden';
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
        <button class="shopping-item-edit js-item-edit">
            <span class="button-label">edit</span>
        </button>
        <form class="js-edit-form ${isEditing}">
            <label for="shopping-list-edit-entry">Edit item name:</label>
            <input type="text" name="shopping-list-edit-entry" class="js-shopping-list-edit-entry" placeholder="e.g., broccoli">
            <button type="submit">Edit item</button>
        </form>
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
  const items = shoppingList.map( (item, index) => generateItemAsElement(item, index));
  return items.join('');

}

function renderShoppingCartList() {
  // Renders data from store as html in DOM
  let filteredItems = store.items;

  if(store.hideMarked) {
    filteredItems = filteredItems.filter(item => !item.marked);
  }
  const shoppingCartListString = generateShoppingListString(filteredItems);
  $('.js-shopping-list').html(shoppingCartListString);
}

// add an item to store

function addNewItem(itemName) {
  store.items.push({id: cuid(), name: itemName, marked: false, editing: false});
}

function handleNewItemSubmit() {
  // Adds new item into store based on user input
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
  $('.js-shopping-list').on('click', '.js-item-toggle', (e) => {
    const id = getItemIdFromElement(e.currentTarget);
    toggleMarkedForItem(id);
    renderShoppingCartList();
  });
}

// delete on item from store by id
function deleteItem(itemId) {
  const filteredStore = store.items.filter( item => itemId !== item.id);
  store.items = filteredStore;
  renderShoppingCartList();
}

// Handles click event for deleting a given item from list
function handleItemDelete() {
  $('.js-shopping-list').on('click', '.js-item-delete', (e) => {
    const id = getItemIdFromElement(e.currentTarget);
    deleteItem(id);
    renderShoppingCartList();
  });

}

// toggle the store value for hideMarked

function toggleMarkedFilter() {
  store.hideMarked = !store.hideMarked;
}

// listen for event to apply filter to only show unmarked items

function toggleMarkedInView() {
  $('.js-hide-completed-toggle').on('click', () => {
    toggleMarkedFilter();
    renderShoppingCartList();
  });
}

/**
 * Editing item
 * - toggle hidden class on click of edit button on an item
 * - upon adding new name into input and submitting, push change to store
 * - re-render list
 */

function toggleEditMode(itemId) {
  const item = store.items.find( item => itemId === item.id);
  item.editing = !item.editing;
}

function toggleHiddenForElement() {
  $('.js-shopping-list').on('click', '.js-item-edit', (e) => {
    const id = getItemIdFromElement(e.currentTarget);
    toggleEditMode(id);
    renderShoppingCartList();
  });
}

function updateItemName(itemId, newName) {
  const item = store.items.find( item => itemId === item.id);
  item.name = newName;
}

function updateNameForElement() {
  $('.js-shopping-list').on('submit', '.js-edit-form', (e) => {
    e.preventDefault();
    const id = getItemIdFromElement(e.currentTarget);
    const newName = $('.js-shopping-list-edit-entry').val();
    updateItemName(id, newName);
    toggleEditMode(id);
    renderShoppingCartList();
  });
}

function main() {
  // Invokes all functions for access in DOM/document ready
  renderShoppingCartList();
  handleNewItemSubmit();
  handleItemCrossedOff();
  handleItemDelete();
  toggleMarkedInView();
  toggleHiddenForElement();
  updateNameForElement();
}

$(main);