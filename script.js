let enterTask = document.getElementById("enterTask");
let tasklist = document.getElementById("tasklist");
let body = document.querySelector("body");
let tasks = [];
let id = 1;
let cid = 1;
let temp = "";

/* Add task in input field */
enterTask.addEventListener("focus", function (event) {
  enterTask.placeholder = `⭕ Try typing "Pay utilities bill by Friday 6pm"`;
});

enterTask.addEventListener("focusout", function (event) {
  enterTask.placeholder = "+ Add a task";
});

enterTask.addEventListener("keydown", function (event) {
  if (event.key == "Enter") {
    if (enterTask.value != "") {
      addToLocal();
      enterTask.value = "";
    }
  }
});

function addToLocal() {
  let tobj = {};
  tobj.name = enterTask.value;
  tobj.status = "pending";
  tobj.id = id;
  id++;
  tasks.push(tobj);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  addToTaskList(tobj);
}

function addToTaskList(tobj) {
  let taskdiv = document.createElement("div");
  taskdiv.setAttribute("id", tobj.id);

  let ntask = document.createElement("span");

 /* Checkbox */
  let label = document.createElement("label");
  label.setAttribute("for", `checkbox_${cid}`);
  let image = document.createElement("img");
  image.setAttribute("src", "./media/bullet.png");

  let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("class", "checkbox");
  checkbox.setAttribute("id", `checkbox_${cid}`);
  cid++;
  checkbox.addEventListener("click", function (event) {
    if (checkbox.checked == true) {
      para.style.textDecoration = "line-through";
      para.style.color = "grey";
      updateStatus(tobj, "Completed");
    } else {
      para.style.textDecoration = "none";
      para.style.color = "white";
      updateStatus(tobj, "pending");
    }
  });

  let para = document.createElement("p");
  para.innerHTML = tobj.name;

  /* Edit task */
  let editimg = document.createElement("img");
  editimg.setAttribute("src", "./media/edit.png");
  editimg.setAttribute("class", "editimg");
  editimg.addEventListener("click", function (event) {
    para.contentEditable = true;
    para.style.border="2px solid white";

    let tick = document.createElement("img");
    tick.setAttribute("src", "./media/save.png");
    tick.setAttribute("class", "tick");
    ntask.appendChild(tick);

     tick.addEventListener("click", function (event) {
      if (para.innerText !== "") {
        para.contentEditable = false;
        para.style.border="none";
        temp = para.innerText;
        //console.log(temp);
      }
    editToLocal(tobj.id);
    ntask.removeChild(tick);
  });
  });

  /* Delete task */
  let deleteimg = document.createElement("img");
  deleteimg.setAttribute("src", "./media/delete.png");
  deleteimg.setAttribute("class", "deleteimg");
  deleteimg.addEventListener("click", function (event) {
    taskdiv.removeChild(ntask);
    deleteTask(tobj.id);
  });

  taskdiv.appendChild(ntask);
  label.appendChild(image);
  ntask.appendChild(label);
  ntask.appendChild(checkbox);
  ntask.appendChild(para);
  ntask.appendChild(editimg);
  ntask.appendChild(deleteimg);
  tasklist.appendChild(taskdiv);
}

loadTask();

function editToLocal(id) {
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.filter((task)=> {
    if(task.id === id){
      task.name = temp;
    }
  })
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(id) {
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateStatus(obj, newstatus) {
  tasks.forEach(function (ts) {
    if (ts.id == obj.id) {
      ts.status = newstatus;
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTask() {
  id = 0;
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task)=> {
    if (id < task.id) 
    id = task.id;
    addToTaskList(task);
  });
  id++;
}

