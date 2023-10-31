let form = document.querySelector("form");
let text = document.getElementById("text");
let todoCon = document.querySelector(".todo-con");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addtodo();
})

let todos = JSON.parse(localStorage.getItem("todos"));
if (todos) {
    todos.forEach(element => {
        addtodo(element);
    })
}

//Add tasks here
function addtodo(elem) {
    let todoColl = document.createElement("div");
    todoColl.classList.add("todocoll")
    let todoText = text.value;
    if (elem) {
        todoText = elem.text;
    }
    if (todoText) {

        todoColl.innerHTML = `<div class="todo-li">
    <div class="check ${elem && elem.complete?"active-check":""}"><img src="./images/icon-check.svg" alt=""></div>
    <p class="ptag ${elem && elem.complete}"complete":""}">${todoText}</p>
    <button class="close"><img src="./images/icon-cross.svg" alt=""></button>
  </div>
    <!-- create a horizontal line -->
    <div class="hr"></div>`;

        todoCon.appendChild(todoColl);
        updateLs();
    }
    text.value = "";

    let close = todoColl.querySelector(".close");
    close.addEventListener("click", () => {
        todoColl.remove();
        updateLs();
    })

    let check = todoColl.querySelector(".check");
    check.addEventListener("click", () => {
        check.classList.add('active-check');
        todoColl.children[0].children[1].classList.add("complete")
        updateLs();
    })
}

function updateLs() {
    let ptag = document.querySelectorAll(".ptag")
    let arr = [];
    ptag.forEach(element => {
        arr.push({
            text: element.innerHTML,
            complete: element.classList.contains("complete")
        })
    })
    localStorage.setItem("todos", JSON.stringify(arr));
}

let info = document.querySelectorAll(".choice p");
let todoli = document.querySelectorAll(".todo-li");
console.log(info);
info.forEach(element =>{
    element.addEventListener("click",()=>{
        info.forEach(item =>{
            item.classList.remove("active");
        })
        element.classList.add("active");
        if(element.innerHTML == "Active"){
            todoli.forEach(elem=>{
                if(!elem.children[0].children[1].classList.contains("complete")){
                    elem.style.display = "flex";
                }else{
                    elem.style.display = "none";
                }
            })
        }else if(element.innerHTML == "Completed"){
            todoli.forEach(elem =>{
                if(elem.children[0].children[1].classList.contains("complete")){
                    elem.style.display = "flex";
                }else{
                    elem.style.display = "none";
                }
            })
        }else{

        }
    })
    
})