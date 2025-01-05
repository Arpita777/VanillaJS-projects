
document.addEventListener('DOMContentLoaded',()=>{
    const searchInputElement = document.querySelector('.searchInput');
    const suggestionsElement =  document.querySelector('.suggestions');
    let currentFocusedIndex = -1;
    
    searchInputElement.addEventListener("keyup", debounce(handleInputSuggestions,500));
    
    function handleClick(event){
     searchInputElement.value = event.target.textContent;
     suggestionsElement.innerHTML = '';
    }
    
    function getSuggestedElement(suggestionList,query){
     suggestionsElement.innerHTML = '';
     suggestionList.forEach((suggestion) => {
        const suggestElement = document.createElement("div");
        const regex = new RegExp(`(${query})`, "i");
        const highlightedText = suggestion.replace(
         regex,
         `<span class="highlight">${query}</span>`
        );
        suggestElement.innerHTML = highlightedText;
        suggestElement.classList.add("suggested-text");
        suggestElement.addEventListener("click",handleClick)
        suggestionsElement.appendChild(suggestElement);
     })
    }
    
    async function getInputSuggestions(value){
     try{
       suggestionsElement.innerHTML = '';
       if (value.trim() === "") {
         return; 
       }
   
       const response = await fetch(`https://dummyjson.com/products/search?q=${value}`);
       const data = await response.json();
       const suggestionList = data.products.filter((product) => product.title.toLowerCase().includes(value.toLowerCase()));
       getSuggestedElement(suggestionList.map((item)=>item.title),value);
     }
     catch(error){
       console.log(error);
     }
    }
    
    function getCurrentFocusedIndex(key,maxIndex){
     if(key === "ArrowDown"){
      return Math.min(currentFocusedIndex+1,maxIndex-1);
     }
     else{
      return Math.max(currentFocusedIndex-1,-1);
     }
    }
    
    function focus(){
     for(let i=0;i<suggestionsElement.children.length;i++){
       suggestionsElement.children[i].classList.remove("focus");
     }
     if(currentFocusedIndex>=currentFocusedIndex < suggestionsElement.children.length){
        suggestionsElement.children[currentFocusedIndex].classList.add("focus");
     }
    
    }
    
    function handleInputSuggestions(event){
     const key = event.key;
     if(key === "ArrowDown" || key === "ArrowUp"){
      event.preventDefault();
      currentFocusedIndex = getCurrentFocusedIndex(key,suggestionsElement.children.length);
      focus();
     }
     else if(key === "Enter"){
      handleEnterKey();
     }
     else{
       getInputSuggestions(event.target.value);
     }
    }
    
    function handleEnterKey(){
     if(currentFocusedIndex !=-1){
       searchInputElement.value = suggestionsElement.children[currentFocusedIndex].textContent;
       suggestionsElement.innerHTML = '';
     }
    }
    
    function debounce(func,delay){
     let timer;
     return function(...args){
      let context = this;
      if(timer){
        clearTimeout(timer);
      }
      timer = setTimeout(()=>{
       timer=null;
       func.apply(context,args);
      },delay)
     }
    }
    
    document.body.addEventListener('click',(event) => {
      if(event.target.classList[0] === "searchContainer"){
         suggestionsElement.innerHTML = '';
      }
    })
   })