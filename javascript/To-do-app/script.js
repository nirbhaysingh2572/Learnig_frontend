//  `
console.log("Welcome to my todo app");

let todos = document.querySelector("#todos");
let getTodo = document.querySelector("#get");
let saveTodo = document.querySelector("#save");
let todoInput = document.querySelector("#input>input");


let todoData = [];

// adding a ne brand todo
function addTodo (index, item, status){
    let t = (status=="in Progress")? "finish":"undo";
    let row =  ` <div class="row", id = "row${index}">
                    <h2 class="no">${index+1}.</h2>
                    <div class = "item">
                        <p>${item}</p>
                        <input class="form" type="hidden" >
                    </div>
                    <h3 class="status">${status}</h3>
                    <span class="action">
                        <button class="edit ybtn", name = "edit" id ="${index}">Edit</button>
                        <button class="${t} bbtn", name = "finish", id ="${index}">${t}</button>
                        <button class="delet bbtn", name = "delet", id ="${index}">Delete</button>
                    </span>
                </div> 
                <hr>`;

    return row;
}

//print function 
function print(){
    todoData.sort((a,b)=>{
        if(a.status=="in Progress"&&b.status=="finished")   return -1;
        else    return 1;
    });
    let alltodo = "";
    todoData.forEach((x,index)=>{
        let row = addTodo(index,x.item,x.status);
        alltodo += row;
    })   
    todos.innerHTML = alltodo; 
}

// disabling bottom
todoInput.addEventListener("keyup",()=>{
    if(todoInput.value.length==0){   
        saveTodo.disabled = true;
        saveTodo.style.opacity = 0.5;
    }
    else {
        saveTodo.disabled = false;
        saveTodo.style.opacity = 1;
    }
});

// save todos
function save(){
    let data  = todoInput.value;
    if(data.length===0)    return;
    let todo ={item : data, status : "in Progress"}
    todoData.push(todo);
    todoInput.value = '';
    print();
}
saveTodo.addEventListener("click",save);
todoInput.addEventListener("keypress", function(event) {
    if(event.key=="Enter")    save();
});

// deleting todo
function deleteTodo(index){
    todoData.splice(index,1);
    print();
}

//finish todo
function finishTodo(index){
    todoData[index].status = todoData[index].status == "finished" ? "in Progress":"finished";
    print();
}

//Editing a todo
function editTodo(index){
    let todo = document.getElementById("row"+index).children[1];
    let input = todo.children[1];
    let text = todo.children[0];

    if(input.type=="text"){
        todoData[index].item = input.value;
        print();
        return;
    }

    text.style.display = "none";
    input.value = text.innerText;
    input.type = "text";
    input.focus();
    let length = input.value.length;
    input.setSelectionRange(length, length);


    input.addEventListener("keypress", (event)=>{
        if(event.key=="Enter"){
            todoData[index].item = input.value;
            print();
        }
        return;
    });
}

//event lisner in all todos
todos.addEventListener("click",(event)=>{
    if(event.target.name=="delet")
        deleteTodo(event.target.id);
    else if(event.target.name=="finish")
        finishTodo(event.target.id);
    else if(event.target.name=="edit")
        editTodo(event.target.id);

});

// Geting pending toodos
getTodo.onclick = ()=>{
    console.log("filterd");
    todoData = todoData.filter((todo)=>{
        return (todo.status == "in Progress");
    });
    print();
}


print();





