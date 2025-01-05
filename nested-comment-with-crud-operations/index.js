const commentList = [
  {
    "id": 47238,
    "userName": "User321",
    "commentText": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.",
    "replies": [
      {
        "id": 89471,
        "userName": "User784",
        "commentText": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.",
        "replies": []
      },
      {
        "id": 12345,
        "userName": "User112",
        "commentText": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.",
        "replies": [
          {
            "id": 67890,
            "userName": "User987",
            "commentText": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.",
            "replies": []
          }
        ]
      }
    ]
  },
  {
    "id": 56789,
    "userName": "User654",
    "commentText": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.",
    "replies": []
  }
];

document.addEventListener("DOMContentLoaded", () => {
const commentWrapper = document.querySelector('.comment-wrapper');
const commentInput = document.querySelector('#comment-input');
const commentSubmit = document.querySelector('#comment-submit');

let currentReplyInputPointer = null;
let currentReplySubmitPointer = null;
let currentReplyClosePointer = null;
let currentEditInputPointer = null;
let currentEditSubmitPointer = null;
let currentEditClosePointer = null;
let lastId = 100;

function loadUI(){
commentWrapper.innerHTML='';
commentList.forEach((comment) => {
 addComment(commentWrapper,comment);
});
}

commentSubmit.addEventListener('click', () => {
  if(commentInput.value.trim() != ''){
    commentList.push({
      id: lastId++,
      userName: 'New User',
      commentText: commentInput.value
    })
    commentInput.value = '';
    loadUI();
  }
})

function addComment(parentContainer,comment){
 const commentDiv = document.createElement('div');
 commentDiv.classList.add('comment');
 commentDiv.id = comment.id;
 
 const parentCommentDiv = document.createElement('div');
 parentCommentDiv.classList.add('parent-comment');
 const repliesCommentDiv = document.createElement('div');
 repliesCommentDiv.classList.add('replies');
 
 const userIcon = document.createElement('img');
 userIcon.src = "https://cdn-icons-png.flaticon.com/128/552/552848.png";
 userIcon.alt = 'UserIcon'
 userIcon.classList.add('user-icon');
 parentCommentDiv.appendChild(userIcon);
 
 const userName = document.createElement('label');
 userName.textContent = comment.userName;
 userName.classList.add('user-name');
 parentCommentDiv.appendChild(userName);
 
 const userComment = document.createElement('section');
 userComment.classList.add('user-comment');
 userComment.textContent = comment.commentText;
 parentCommentDiv.appendChild(userComment);
 
 const commenntButtons = document.createElement('section');
 commenntButtons.classList.add('comment-buttons');
 parentCommentDiv.appendChild(commenntButtons);
  
 const replyBtn = document.createElement('button');
 replyBtn.classList.add('reply-btn');
 replyBtn.textContent='Reply';
 replyBtn.addEventListener('click',()=>{
   handleReply(parentCommentDiv,commentDiv);
 });
 commenntButtons.appendChild(replyBtn);
 
 const editBtn = document.createElement('button');
 editBtn.classList.add('edit-btn');
 editBtn.textContent='Edit';
 editBtn.addEventListener('click',()=>{
  handleEdit(parentCommentDiv,commentDiv);
 });
 commenntButtons.appendChild(editBtn);
 
  const deleteBtn = document.createElement('button');
 deleteBtn.classList.add('delete-btn');
 deleteBtn.textContent='Delete';
 deleteBtn.addEventListener('click',()=>{
  handleDelete(commentDiv);
 });
 commenntButtons.appendChild(deleteBtn);
 
 commentDiv.appendChild(parentCommentDiv);
 commentDiv.appendChild(repliesCommentDiv);
 
 if(comment && comment.replies && comment.replies.length > 0){
   comment.replies.forEach((reply) => {
      addComment(repliesCommentDiv,reply);
   })
 }
 parentContainer.appendChild(commentDiv); 
}

const updateCommentList = (commentId, commentText) => {
  const processingList = (list) => {
   list.forEach((comment) => {
     if(comment.id == commentId){
       if(!comment.replies) comment.replies = [];
       comment.replies.push({
         id: lastId++,
         userName: 'New User',
         commentText: commentText
       })
     }
     if(comment.replies && comment.replies.length > 0){
        processingList(comment.replies);
     }
   })
  }
  processingList(commentList);
}

const updateCommentListForEdit = (commentId, commentText) => {
  const processingList = (list) => {
   list.forEach((comment) => {
     if(comment.id == commentId){
       comment.commentText = commentText;
     }
     if(comment.replies && comment.replies.length > 0){
        processingList(comment.replies);
     }
   })
  }
  processingList(commentList);
}


const handleReply = (parentCommentDiv,commentDiv) => {
 if(currentReplyInputPointer){
  currentReplyInputPointer.parentNode.removeChild(currentReplyInputPointer);
  currentReplySubmitPointer.parentNode.removeChild(currentReplySubmitPointer);
  currentReplyClosePointer.parentNode.removeChild(currentReplyClosePointer)
 }
 const replySection = document.createElement('section');
 replySection.classList.add('reply-section'); 
 
 const replyInput = document.createElement('input');
 replyInput.type = 'text';
 replyInput.placeholder = 'Enter your reply...';
 replyInput.classList.add('reply-input');
 currentReplyInputPointer = replyInput;
 
 const replySubmit = document.createElement('button');
 replySubmit.textContent = 'Submit';
 replySubmit.classList.add('reply-submit-btn');
 replySubmit.addEventListener('click',() => { 
   const commentText = replyInput.value.trim();
   if(commentText != ''){
    updateCommentList(commentDiv.id,commentText);
    replyInput.parentNode.removeChild(replyInput);
    replySubmit.parentNode.removeChild(replySubmit);
    currentReplyInputPointer=null;
    currentReplySubmitPointer=null;
    loadUI();
   }
 });
 currentReplySubmitPointer = replySubmit;
 
  const replyClose = document.createElement('button');
 replyClose.textContent = 'Close';
 replyClose.classList.add('reply-close-btn');
 replyClose.addEventListener('click',() => {  
    replyInput.parentNode.removeChild(replyInput);
    replySubmit.parentNode.removeChild(replySubmit);
    replyClose.parentNode.removeChild(replyClose);
    currentReplyInputPointer=null;
    currentReplySubmitPointer=null;
    currentReplyClosePointer=null;
 });
 currentReplyClosePointer = replyClose;
 
 replySection.appendChild(replyInput);
 replySection.appendChild(replySubmit); 
  replySection.appendChild(replyClose); 
 parentCommentDiv.appendChild(replySection);
} 

const removeCommentById = (commentId) => {
   const processingList = (list) => {
   list.forEach((comment,index) => {
     if(comment.id == commentId){
       list.splice(index,1);
     }
     if(comment.replies && comment.replies.length > 0){
        processingList(comment.replies);
     }
   })
  }
  processingList(commentList);
}

const handleDelete = (commentDiv) => {
  removeCommentById(parseInt(commentDiv.id));
  loadUI();
}

const handleEdit = (parentCommentDiv,commentDiv) => {
  if(currentEditInputPointer){
  currentEditInputPointer.parentNode.removeChild(currentEditInputPointer);
  currentEditSubmitPointer.parentNode.removeChild(currentEditSubmitPointer);
  currentEditClosePointer.parentNode.removeChild(currentEditClosePointer);
 } 
 const editSection = document.createElement('section');
 editSection.classList.add('edit-section'); 
 
 const editInput = document.createElement('input');
 editInput.type = 'text';
 editInput.value = parentCommentDiv.querySelector('.user-comment').textContent;
 editInput.classList.add('edit-input');
 currentEditInputPointer = editInput;
 
 const editSubmit = document.createElement('button');
 editSubmit.textContent = 'Submit';
 editSubmit.classList.add('edit-submit-btn');
 editSubmit.addEventListener('click',() => { 
   const editCommentText = editInput.value.trim();
   if(editCommentText != ''){
    updateCommentListForEdit(commentDiv.id,editCommentText);
    editInput.parentNode.removeChild(editInput);
    editSubmit.parentNode.removeChild(editSubmit);
    currentEditInputPointer=null;
    currentReplySubmitPointer=null;
    loadUI();
   }
 });
 currentEditSubmitPointer = editSubmit;
 
 const editClose = document.createElement('button');
 editClose.textContent = 'Close';
 editClose.classList.add('edit-close-btn');
 editClose.addEventListener('click',() => {  
    editInput.parentNode.removeChild(editInput);
    editSubmit.parentNode.removeChild(editSubmit);
    editClose.parentNode.removeChild(editClose);
    currentEditInputPointer=null;
    currentEditSubmitPointer=null;
    currentEditClosePointer=null;
 });
 currentEditClosePointer = editClose;
 
 editSection.appendChild(editInput);
 editSection.appendChild(editSubmit); 
 editSection.appendChild(editClose); 
 parentCommentDiv.appendChild(editSection);
}

loadUI(); 
});




