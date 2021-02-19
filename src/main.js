'use strict'

// Fetch the items from JSON file
function loadItems(){
    return fetch('data/data.json')
    .then(response => response.json())
    .then(json => json.items)
}

// Update the list with the given items
function displayItems(items){
    const container = document.querySelector('.items');
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

// Create HTML list item from given data item
function createHTMLString(item){
    return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item-thumnail">
        <span class="description">${item.gender}, ${item.size}</span>
    </li>`
}

// Handle button click
function onButtonCilck(event,items){
    const target = event.target.dataset;
    const key = target.key;
    const value = target.value;
    if(key == null || value == null){
        return;
    }
    displayItems(items.filter(item=> item[key]===value))
    
}

function setEventListenters(items){
    const logo = document.querySelector('.logo');
    const button = document.querySelector('.buttons');
    logo.addEventListener('click',()=>{displayItems(items)});
    button.addEventListener('click',event=>onButtonCilck(event,items));
}

// main
loadItems()
.then(items => {
    displayItems(items);
    setEventListenters(items);
})
.catch(console.log)

