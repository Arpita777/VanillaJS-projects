const backlogColumnItems = document.getElementById('backlog-items');
const progressColumnItems = document.getElementById('progress-items');
const completeColumnItems = document.getElementById('complete-items');
const holdColumnItems = document.getElementById('hold-items');
const addItemButtons = document.querySelectorAll('.button-add-item');
const saveItemButtons = document.querySelectorAll('.button-save-item');
const columnItems = document.querySelectorAll('.column-items');
const textBoxToAddItem = document.querySelectorAll('.input-content');
const closeTextBoxIcons = document.querySelectorAll('.close-icon');
const addItemContentWrappers = document.querySelectorAll('.add-item-content');

let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let holdListArray = [];
let initialLoad = false;
let currentColumn;
let draggedItem;
let draggedColumn;
let draggedItemIndex;

function getFromLocalStorage(){
  backlogListArray = localStorage.getItem('backlogList') ? JSON.parse(localStorage.getItem('backlogList')) : [];
  progressListArray = localStorage.getItem('progressList') ? JSON.parse(localStorage.getItem('progressList')) : [];  
  completeListArray = localStorage.getItem('completeList')  ? JSON.parse(localStorage.getItem('completeList')) : [];
  holdListArray = localStorage.getItem('holdList') ? JSON.parse(localStorage.getItem('holdList')) : [];
}

function saveToLocalStorage(){
  localStorage.setItem('backlogList',JSON.stringify(backlogListArray));
  localStorage.setItem('progressList',JSON.stringify(progressListArray));
  localStorage.setItem('completeList',JSON.stringify(completeListArray));
  localStorage.setItem('holdList',JSON.stringify(holdListArray));
}

function  deleteFromList(columnIndex,ItemIndex) {
  if (columnIndex === 0) backlogListArray.splice(ItemIndex,1);
  if (columnIndex === 1) progressListArray.splice(ItemIndex,1);
  if (columnIndex === 2) completeListArray.splice(ItemIndex,1);
  if (columnIndex === 3) holdListArray.splice(ItemIndex,1);
}

function deleteItem(columnNo,itemNo){
  const liElements = columnItems[columnNo].querySelectorAll('li');
  liElements[itemNo].remove();
  deleteFromList(columnNo,itemNo);
  saveToLocalStorage();
  updateDOM();
} 

function addToList(columnIndex,content){
  if(content.trim().length > 0){
    if (columnIndex === 0) backlogListArray.push(content);
    if (columnIndex === 1) progressListArray.push(content);
    if (columnIndex === 2) completeListArray.push(content);
    if (columnIndex === 3) holdListArray.push(content);
  }
}

function updateItem(columnIndex,content,index){
  if(content.trim().length > 0){
    if (columnIndex === 0) backlogListArray[index] = content;
    if (columnIndex === 1) progressListArray[index] = content;
    if (columnIndex === 2) completeListArray[index] = content;
    if (columnIndex === 3) holdListArray[index] = content;
  }
}

function hideSaveForm(index){
  const addItemContentWrapper = addItemContentWrappers[index];
  addItemContentWrapper.style.display = 'none';
  const addItemButton = addItemButtons[index];
  addItemButton.style.display = 'block';
}

function dragStart(e,columnNo,itemNo){
  draggedItem = e.target;
  draggedItem.classList.add('faded');
  draggedColumn = columnNo;
  draggedItemIndex = itemNo;
}

function createItemElement(column,content,columnNo,itemNo){
  const element = document.createElement('li');
  element.classList.add('drag-item');
  element.draggable = true;
  
  const textSpan = document.createElement('span');
  textSpan.textContent = content;
  textSpan.contentEditable = "true";
  textSpan.classList.add('drag-item-text');
  textSpan.addEventListener('blur', ()=>{
    updateItem(columnNo,textSpan.textContent,itemNo);
    saveToLocalStorage();
    updateDOM();
  })

  const deleteIcon = document.createElement('i');
  deleteIcon.classList.add('fa-solid', 'fa-trash','delete-button');
  deleteIcon.addEventListener('click',() => {
    deleteItem(columnNo,itemNo);
  })

  element.appendChild(textSpan);
  element.appendChild(deleteIcon);
  element.addEventListener("dragstart", (e)=>dragStart(e,columnNo,itemNo));

  column.appendChild(element);
}

function updateDOM(){
  if(!initialLoad){
    initialLoad = true;
    getFromLocalStorage();
  }
  backlogColumnItems.textContent = '';
  backlogListArray?.forEach((item, index) => {
    createItemElement(backlogColumnItems,item,0,index);
  });

  progressColumnItems.textContent = '';
  progressListArray?.forEach((item, index) => {
    createItemElement(progressColumnItems,item,1,index);
  });

  completeColumnItems.textContent = '';
  completeListArray?.forEach((item, index) => {
    createItemElement(completeColumnItems,item,2,index);
  });

  holdColumnItems.textContent = '';
  holdListArray?.forEach((item, index) => {
    createItemElement(holdColumnItems,item,3,index);
  });
 
}

addItemButtons.forEach((addItemButton, index) => {
  addItemButton.addEventListener('click', ()=>{
    const addItemContentWrapper = addItemContentWrappers[index];
    textBoxToAddItem[index].textContent = '';
    addItemContentWrapper.style.display = 'flex';
    addItemButton.style.display = 'none';
  })
});

saveItemButtons.forEach((saveItemButton, index) => {
  saveItemButton.addEventListener('click',()=>{
    const inputBoxContent =textBoxToAddItem[index];
    hideSaveForm(index);
    addToList(index,inputBoxContent.textContent);
    saveToLocalStorage();
    updateDOM();
  })
});

closeTextBoxIcons.forEach((closeIcon,index) => {
  closeIcon.addEventListener('click',()=>{
    hideSaveForm(index);
  })
});

columnItems.forEach((columnItem,index) => {
  columnItem.addEventListener('dragover', event => {
    event.preventDefault();
    columnItem.classList.add('over');
  });

  columnItem.addEventListener('drop', event => {
    event.preventDefault();
    columnItems.forEach((column) => {
      column.classList.remove('over');
    });
    columnItem.appendChild(draggedItem);
    draggedItem.classList.remove('faded');
    deleteFromList(draggedColumn,draggedItemIndex);
    const content = draggedItem.querySelector('.drag-item-text').textContent;
    addToList(index,content);
    saveToLocalStorage();
    updateDOM();
  });
});

document.addEventListener('dragend', (event) => {
  if (event.target.classList.contains('drag-item')) {     
      event.target.classList.remove('faded');
      columnItems.forEach(column => {
          column.classList.remove('over');
      });
  }
});

updateDOM();


