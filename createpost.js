const createPost__form = document.getElementById("createPost__form");

createPost__form.addEventListener('submit',(e)=>{
e.preventDefault();
const formData= new FormData(createPost__form);
let newPost= {};
for (let inputData of formData) {
    newPost[inputData[0]] = inputData[1];
      
       }
 createPost(newPost, ()=>{
    window.location.href="/index.html";
 });
});
