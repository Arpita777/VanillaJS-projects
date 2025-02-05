const progressFill = document.querySelector('.progressBar__fill');
const progressText = document.querySelector('.progressBar_text');
const startButton = document.querySelector('#start-button');

startButton.addEventListener('click', ()=>{
    let progress = 0;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `${progress}%`;
    const interval = setInterval(()=>{
        if(progress >= 100){
            clearInterval(interval);
        }else{
            progress=progress+5;
            progressFill.style.width = `${progress}%`;
            progressText.textContent = `${progress}%`;
        }     

    },500)
})