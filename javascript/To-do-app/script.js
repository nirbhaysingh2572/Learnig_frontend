
console.log("Welcome to my todo app");

let main = document.getElementById("main");

//appending main heading
let h1 = document.createElement("h1");
h1.innerText = "My To Do App";
main.appendChild(h1);

//appending input section
//creating element
let input  =  document.createElement("div");
let getTodo = document.createElement("buttun");
let saveTodo = document.createElement("button");
let todoInput = document.createElement("input");
//ading atributs
input.id = "input";
todoInput.classList.add("form");
saveTodo.classList.add("bbtn");
getTodo.classList.add("ybtn");
saveTodo.id="save"
getTodo.id="get"
todoInput.type="text";
todoInput.placeholder="Enter a task here";
saveTodo.innerText = "save";
getTodo.innerText = "Get Pending Todos";

//appending them
input.appendChild(todoInput);
input.appendChild(saveTodo);
input.appendChild(getTodo);
main.appendChild(input);


//appending list
let list  =  document.createElement("div");
main.appendChild(list);

let headings = ()=>{
    let headings = document.createElement("div");
    headings.id = "headings";

    let headingData = [{class:"no",text:"No."},{class:"item",text:"Todo item"},{class:"status",text:"Status"},{class:"no",text:"No."},{class:"action",text:"Action"}]
    headingData.forEach((heading)=>{
        let h2 = document.createElement("h2");
        h2.classList.add(heading.class);
        h2.innerText = heading.text;
        headings.appendChild(h2);
    });
    return headings;
};
//apendings headings
list.appendChild(headings());
let hr = document.createElement("hr");
list.appendChild(hr);

//apendings empty todos div
let todos = document.createElement("div");
list.appendChild(todos);




let todoData = [];

// adding a ne brand todo
function addTodo(index, x){
    let t = (x.status=="in Progress")? "finish":"undo";

    // // creating all element
    let row = document.createElement("div");
    let no = document.createElement("h2");
    let item = document.createElement("div");
    let para = document.createElement("p");
    let input = document.createElement("input");
    let status = document.createElement("h3");
    let action = document.createElement("span");
    let edit = document.createElement("button");
    let finish = document.createElement("button");
    let delet = document.createElement("button");

    //adding content
    no.innerText = index+1 +".";
    para.innerText = x.item;
    status.innerText = x.status;
    edit.innerHTML = "Edit";
    finish.innerHTML = t;
    delet.innerHTML = "delet";



    // //ading classes
    row.classList.add("row");
    no.classList.add("no");
    item.classList.add("item");
    input.classList.add("form");
    status.classList.add("status");
    action.classList.add("action");
    edit.classList.add("edit", "ybtn");
    finish.classList.add(t,"bbtn");
    delet.classList.add("delet", "bbtn");

    // //giving id
    row.id = "row"+index;
    edit.id = index;
    finish.id = index;
    delet.id = index;

    // //adding atributs
    input.type = "hidden";
    edit.name = "edit";
    finish.name = "finish";
    delet.name = "delet";

    // // apending child;
    item.appendChild(para);
    item.appendChild(input);
    action.appendChild(edit);
    action.appendChild(finish);
    action.appendChild(delet);
    row.appendChild(no);
    row.appendChild(item);
    row.appendChild(status);
    row.appendChild(action);

    return row;
}

//print function 
function print(){
    // filter pending todos
    todoData.sort((a,b)=>{
        if(a.status=="in Progress"&&b.status=="finished")   return -1;
        else    return 1;
    });

    todos.innerHTML = ""; 
    todoData.forEach((x,index)=>{
        let row = addTodo(index,x);
        todos.appendChild(row);
        let hr = document.createElement("hr");
        todos.appendChild(hr);
    });
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
    saveTodo.disabled = true;
    saveTodo.style.opacity = 0.5;
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
    todoData = todoData.filter((todo)=>{
        return (todo.status == "in Progress");
    });
    print();
}


print();





