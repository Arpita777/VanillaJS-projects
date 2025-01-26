let allQuotes;
const quoteContainer = document.querySelector('.quote-container');
const quoteText = document.querySelector('.quote');
const authorText = document.querySelector('.quote-author');
const loader = document.querySelector('.loader');

function loading(){
    quoteContainer.hidden = true;
    loader.hidden = false;
}
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}
function newQuote(){
    loading();
    const currIndex = Math.floor(Math.random() * allQuotes.length);
    const quote = allQuotes[currIndex];
    quoteText.textContent = quote.text;
    authorText.textContent = quote.author || 'Unknown';
    complete();
}
function showSuccessToast(){
    const toastMessage = document.querySelector('.toast-message');
    toastMessage.textContent = 'Quote copied successfully!'
    toastMessage.classList.add('show-success');
    setTimeout(()=>{
        toastMessage.classList.remove('show-success');
    },2000);
}
function showFailureToast(){
    const toastMessage = document.querySelector('.toast-message');
    toastMessage.textContent = 'Failed to copy Quote!'
    toastMessage.classList.add('show-failure');
    setTimeout(()=>{
        toastMessage.classList.remove('show-failure');
    },2000);
}
function copyQuote(){
    navigator.clipboard.writeText(quoteText.textContent).then(()=> {
        showSuccessToast();

    }).catch(()=>{

    })
}
async function getAllQuotes(){
    loading();
    try {
        const apiURL = 'https://mocki.io/v1/8e40e648-9903-44f3-999c-a99853ed7cdb';
        const response = await fetch(apiURL); // fetch('quotes.json'), to fetch from local data
        allQuotes = await response.json();

    } catch (error) {
        console.log(error)
    }
    finally{
        newQuote();
    }  
}

const newQuoteButton = document.querySelector('.new-quote-button');
const copyButton = document.querySelector('.copy-button');
newQuoteButton.addEventListener('click',()=>{
    newQuote();
});
copyButton.addEventListener('click',()=>{
    copyQuote();
});
getAllQuotes();