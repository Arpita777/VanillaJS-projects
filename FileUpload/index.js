const dropZone = document.querySelector('.dropZone');
const uploadButton = document.querySelector('#upload-button');
const fileInput = document.querySelector('#file-input');
const fileList = document.querySelector('.fileList');
const saveButton = document.querySelector('#save-button');
const toastMessage = document.querySelector('.toastMessage');
let uploadedFiles = JSON.parse(localStorage.getItem('uploadFiles')) || [];

function displayFilesUploaded (){
    let fileListContent = '';
    if(uploadedFiles.length === 0){
        fileListContent = `<li>No Files Uploaded!</li>`
    }
    else{
        fileListContent = uploadedFiles.map((file,index) => `
          <li><a href="#" onclick="openImage('${file.data}')">${file.name}</a> <i class="fa-sharp fa-solid fa-trash removeFileButton" onClick="removeFile(${index})"></i></li> 
        `).join('')
    }
    fileList.innerHTML = fileListContent;
}

function openImage(dataUrl) {
    const newTab = window.open();
    newTab.document.write(`
        <html>
        <head><title>Image Preview</title></head>
        <body style="margin:0; display:flex; justify-content:center; align-items:center; height:100vh;">
            <img src="${dataUrl}" style="max-width:100%; max-height:100%;" />
        </body>
        </html>
    `);
    newTab.document.close();
}

function removeFile(index){
    uploadedFiles.splice(index,1);
    displayFilesUploaded();
}

function handleFiles(files){
    Array.from(files).forEach((file)=>{
        if(!['image/png','image/jpeg','image/jpg'].includes(file.type)){
            toastMessage.classList.add('show-failure');
            toastMessage.innerHTML = 'Only jpeg, jpg, png files are allowed!';
            setTimeout(()=>{
                toastMessage.classList.remove('show-failure');
            },2000);
            return;
        }
        if(uploadedFiles.some((existingFile) => existingFile.name === file.name)){
            toastMessage.classList.add('show-failure');
            toastMessage.innerHTML = `File ${file.name} is already uploaded!`;
            setTimeout(()=>{
                toastMessage.classList.remove('show-failure');
            },2000);
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            uploadedFiles.push({name: file.name, data: reader.result});
            displayFilesUploaded();
        }
    });
   
}
uploadButton.addEventListener('click',() => fileInput.click());
saveButton.addEventListener('click', ()=>{
    localStorage.setItem('uploadFiles',JSON.stringify(uploadedFiles));
    toastMessage.classList.add('show-success');
    toastMessage.innerHTML = 'Files saved successfully!';
    setTimeout(()=>{
        toastMessage.classList.remove('show-success');
    },2000);
})
fileInput.addEventListener('change', (event) => {
    event.preventDefault();
    handleFiles(event.target.files);
});
dropZone.addEventListener('dragover',(event)=>{
    event.preventDefault();
    dropZone.classList.add('dragover');
});
dropZone.addEventListener('dragleave',()=>{
    dropZone.classList.remove('dragover');
})
dropZone.addEventListener('drop',(event) => {
    event.preventDefault();
    dropZone.classList.remove('dragover');
    handleFiles(event.dataTransfer.files);
})
displayFilesUploaded ();
