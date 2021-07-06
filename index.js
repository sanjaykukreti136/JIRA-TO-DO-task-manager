// let addBtn = document.querySelector(".add");
// let body = document.querySelector("body");

// let grid = document.querySelector(".grid");
// let deleteBtn = document.querySelector(".delete");

// let deletemode = false;


// /////  local storage part ////

// if (localStorage.getItem("AllTickets") == undefined) {
//   let alltickets = {};
//   alltickets = JSON.stringify(alltickets);
//   localStorage.setItem("AllTickets", alltickets)
// }




// deleteBtn.addEventListener("click", function (e) {
//   if (e.currentTarget.classList.contains("delete-selected")) {
//     e.currentTarget.classList.remove("delete-selected");
//     deletemode = false;
//   }
//   else {
//     e.currentTarget.classList.add("delete-selected");
//     deletemode = true;
//   }
// })



// let colors = ["pink", "blue", "green", "black"];

// addBtn.addEventListener("click", function () {
//   deleteBtn.classList.remove("delete-selected");
//   deletemode = false;
//   let preModal = document.querySelector(".modal");

//   if (preModal != null) return;

//   let div = document.createElement("div"); //<div></div>

//   div.classList.add("modal"); //<div class="modal"></div>

//   div.innerHTML = ` <div class="task-section">
//   <div class="task-inner-container" contenteditable="true"></div>
// </div>
// <div class="modal-priority-section">
//   <div class="priority-inner-container">
//     <div class="modal-priority pink"></div>
//     <div class="modal-priority blue"></div>
//     <div class="modal-priority green"></div>
//     <div class="modal-priority black selected"></div>
//   </div>
// </div>`;




//   let ticketColor = "black";

//   let allModalPriority = div.querySelectorAll(".modal-priority");
//   for (let i = 0; i < allModalPriority.length; i++) {
//     allModalPriority[i].addEventListener("click", function (e) {
//       for (let j = 0; j < allModalPriority.length; j++) {
//         allModalPriority[j].classList.remove("selected");
//       }

//       e.currentTarget.classList.add("selected");

//       ticketColor = e.currentTarget.classList[1];
//     });
//   }



//   let taskInnerContainer = div.querySelector(".task-inner-container");

//   taskInnerContainer.addEventListener("keydown", function (e) {
//     if (e.key == "Enter") {

//       let ticketDiv = document.createElement("div");
//       ticketDiv.classList.add("ticket");
//       let id = uid();
//       let text = e.currentTarget.innerText;

//       ////  local storage part ///

//       let obj = localStorage.getItem("AllTickets");
//       obj = JSON.parse(obj);
//       let x = {
//         color: ticketColor,
//         task: text
//       }
//       obj[id] = x;
//       localStorage.setItem("AllTickets", JSON.stringify(obj));


//       ticketDiv.innerHTML = ` <div  class="ticket-color ${ticketColor}"></div>
//         <div data-id="${id}" class="ticket-id">
//           #${id}
//         </div>
//         <div class="actual-task" contenteditable="true" >
//           ${text}
//         </div>`;
//       let actualTaskDiv = ticketDiv.querySelector(".actual-task");
//       let ticketdiv = ticketDiv.querySelector(".ticket-id")


//       ticketDiv.addEventListener("click", function (e) {
//         if (deletemode) {
//           ticketdiv = ticketDiv.querySelector(".ticket-id")
//           ticketdiv = ticketdiv.getAttribute("data-id")
//           console.log(ticketdiv);
//           let obj = JSON.parse(localStorage.getItem(("AllTickets")));
//           delete obj[ticketdiv];
//           localStorage.setItem("AllTickets", JSON.stringify(obj))
//           e.currentTarget.remove();

//         }
//       })


//       ////   updated task change 

//       actualTaskDiv.addEventListener("input", function (e) {
//         let updatedTask = e.currentTarget.innerText;

//         let currTicketId = ticketdiv.getAttribute("data-id");
//         console.log(currTicketId);
//         let allTickets = JSON.parse(localStorage.getItem("AllTickets"));

//         allTickets[currTicketId].task = updatedTask;

//         localStorage.setItem("AllTickets", JSON.stringify(allTickets));
//       });

//       let ticketColorDiv = ticketDiv.querySelector(".ticket-color");

//       ////////   color change
//       ticketColorDiv.addEventListener("click", function (e) {


//         let currColor = e.currentTarget.classList[1]; //green

//         let index = -1;
//         for (let i = 0; i < colors.length; i++) {
//           if (colors[i] == currColor) index = i;
//         }

//         index++;
//         index = index % 4;

//         let newColor = colors[index];

//         ticketColorDiv.classList.remove(currColor);
//         ticketColorDiv.classList.add(newColor);

//         let id = ticketdiv.getAttribute("data-id");
//         let obj = JSON.parse(localStorage.getItem("AllTickets"));
//         obj[id].color = newColor
//         localStorage.setItem("AllTickets", JSON.stringify(obj));


//       });

//       grid.append(ticketDiv);

//       div.remove();
//     } else if (e.key === "Escape") {
//       div.remove()
//     }
//   });

//   body.append(div);




// });

let addBtn = document.querySelector(".add");
let body = document.querySelector("body");

let grid = document.querySelector(".grid");

let colors = ["pink", "blue", "green", "black"];

let allFiltersChildren = document.querySelectorAll(".filter div");
let allfilter = document.querySelectorAll(".filter");
for (let i = 0; i < allFiltersChildren.length; i++) {

  allFiltersChildren[i].addEventListener("click", function (e) {
    if (allfilter[i].classList.contains("filterselect")) {
      allfilter[i].classList.remove("filterselect");
      loadTasks();
    }
    else {
      allfilter[i].classList.add("filterselect")
      let filterColor = e.currentTarget.classList[0];

      loadTasks(filterColor);
    }
  });
}

let deleteBtn = document.querySelector(".delete");

let deleteMode = false;

if (localStorage.getItem("AllTickets") == undefined) {
  let allTickets = {};

  allTickets = JSON.stringify(allTickets);

  localStorage.setItem("AllTickets", allTickets);
}

loadTasks();

deleteBtn.addEventListener("click", function (e) {
  if (e.currentTarget.classList.contains("delete-selected")) {
    e.currentTarget.classList.remove("delete-selected");
    deleteMode = false;
  } else {
    e.currentTarget.classList.add("delete-selected");
    deleteMode = true;
  }
});

addBtn.addEventListener("click", function () {
  //delete mode ko band krna h

  deleteBtn.classList.remove("delete-selected");
  deleteMode = false;

  let preModal = document.querySelector(".modal");

  if (preModal != null) return;

  let div = document.createElement("div"); //<div></div>

  div.classList.add("modal"); //<div class="modal"></div>

  div.innerHTML = ` <div class="task-section">
  <div class="task-inner-container" contenteditable="true"></div>
</div>
<div class="modal-priority-section">
  <div class="priority-inner-container">
    <div class="modal-priority pink"></div>
    <div class="modal-priority blue"></div>
    <div class="modal-priority green"></div>
    <div class="modal-priority black selected"></div>
  </div>
</div>`;

  let ticketColor = "black";

  let allModalPriority = div.querySelectorAll(".modal-priority");
  for (let i = 0; i < allModalPriority.length; i++) {
    allModalPriority[i].addEventListener("click", function (e) {
      for (let j = 0; j < allModalPriority.length; j++) {
        allModalPriority[j].classList.remove("selected");
      }

      e.currentTarget.classList.add("selected");

      ticketColor = e.currentTarget.classList[1];
    });
  }

  let taskInnerContainer = div.querySelector(".task-inner-container");

  taskInnerContainer.addEventListener("keydown", function (e) {
    if (e.key == "Enter") {
      let id = uid();
      let task = e.currentTarget.innerText;

      // step1 => jobhi data hai localstorage use lekr aao

      let allTickets = JSON.parse(localStorage.getItem("AllTickets"));

      // step2 => usko update kro

      let ticketObj = {
        color: ticketColor,
        taskValue: task,
      };

      allTickets[id] = ticketObj;

      // step3 => wapis updated object ko localstorage me save krdo

      localStorage.setItem("AllTickets", JSON.stringify(allTickets));

      let ticketDiv = document.createElement("div");
      ticketDiv.classList.add("ticket");

      ticketDiv.setAttribute("data-id", id);

      ticketDiv.innerHTML = ` <div data-id="${id}" class="ticket-color ${ticketColor}"></div>
        <div class="ticket-id">
          #${id}
        </div>
        <div data-id="${id}" class="actual-task" contenteditable="true">
          ${task}
        </div>`;

      let ticketColorDiv = ticketDiv.querySelector(".ticket-color");

      let actualTaskDiv = ticketDiv.querySelector(".actual-task");

      actualTaskDiv.addEventListener("input", function (e) {
        let updatedTask = e.currentTarget.innerText;

        let currTicketId = e.currentTarget.getAttribute("data-id");
        let allTickets = JSON.parse(localStorage.getItem("AllTickets"));

        allTickets[currTicketId].taskValue = updatedTask;

        localStorage.setItem("AllTickets", JSON.stringify(allTickets));
      });

      ticketColorDiv.addEventListener("click", function (e) {
        // let colors = ["pink", "blue", "green", "black"];

        let currTicketId = e.currentTarget.getAttribute("data-id");

        let currColor = e.currentTarget.classList[1]; //green

        let index = -1;
        for (let i = 0; i < colors.length; i++) {
          if (colors[i] == currColor) index = i;
        }

        index++;
        index = index % 4;

        let newColor = colors[index];

        //1- all tickets lana ; 2- update krna ; 3- wapis save krna

        let allTickets = JSON.parse(localStorage.getItem("AllTickets"));

        allTickets[currTicketId].color = newColor;

        localStorage.setItem("AllTickets", JSON.stringify(allTickets));

        ticketColorDiv.classList.remove(currColor);
        ticketColorDiv.classList.add(newColor);
      });

      ticketDiv.addEventListener("click", function (e) {
        if (deleteMode) {
          let currTicketId = e.currentTarget.getAttribute("data-id");

          e.currentTarget.remove();

          let allTickets = JSON.parse(localStorage.getItem("AllTickets"));

          delete allTickets[currTicketId];

          localStorage.setItem("AllTickets", JSON.stringify(allTickets));
        }
      });

      grid.append(ticketDiv);

      div.remove();
    } else if (e.key === "Escape") {
      div.remove();
    }
  });

  body.append(div);
});

function loadTasks(color) {
  let ticketsOnUi = document.querySelectorAll(".ticket");

  for (let i = 0; i < ticketsOnUi.length; i++) {
    ticketsOnUi[i].remove();
  }

  //1- fetch alltickets data

  let allTickets = JSON.parse(localStorage.getItem("AllTickets"));

  //2- create ticket UI for each ticket obj
  //3- attach required listeners
  //4- add tickets in the grid section of ui

  for (x in allTickets) {
    let currTicketId = x;
    let singleTicketObj = allTickets[x]; //pink

    //passed color was black
    if (color) {
      if (color != singleTicketObj.color) continue;
    }

    let ticketDiv = document.createElement("div");
    ticketDiv.classList.add("ticket");

    ticketDiv.setAttribute("data-id", currTicketId);

    ticketDiv.innerHTML = ` <div data-id="${currTicketId}" class="ticket-color ${singleTicketObj.color}"></div>
      <div class="ticket-id">
        #${currTicketId}
      </div>
      <div data-id="${currTicketId}" class="actual-task" contenteditable="true">
        ${singleTicketObj.taskValue}
      </div>`;

    let ticketColorDiv = ticketDiv.querySelector(".ticket-color");

    let actualTaskDiv = ticketDiv.querySelector(".actual-task");

    actualTaskDiv.addEventListener("input", function (e) {
      let updatedTask = e.currentTarget.innerText;

      let currTicketId = e.currentTarget.getAttribute("data-id");
      let allTickets = JSON.parse(localStorage.getItem("AllTickets"));

      allTickets[currTicketId].taskValue = updatedTask;

      localStorage.setItem("AllTickets", JSON.stringify(allTickets));
    });

    ticketColorDiv.addEventListener("click", function (e) {
      // let colors = ["pink", "blue", "green", "black"];

      let currTicketId = e.currentTarget.getAttribute("data-id");

      let currColor = e.currentTarget.classList[1]; //green

      let index = -1;
      for (let i = 0; i < colors.length; i++) {
        if (colors[i] == currColor) index = i;
      }

      index++;
      index = index % 4;

      let newColor = colors[index];

      //1- all tickets lana ; 2- update krna ; 3- wapis save krna

      let allTickets = JSON.parse(localStorage.getItem("AllTickets"));

      allTickets[currTicketId].color = newColor;

      localStorage.setItem("AllTickets", JSON.stringify(allTickets));

      ticketColorDiv.classList.remove(currColor);
      ticketColorDiv.classList.add(newColor);
    });

    ticketDiv.addEventListener("click", function (e) {
      if (deleteMode) {
        let currTicketId = e.currentTarget.getAttribute("data-id");

        e.currentTarget.remove();

        let allTickets = JSON.parse(localStorage.getItem("AllTickets"));

        delete allTickets[currTicketId];

        localStorage.setItem("AllTickets", JSON.stringify(allTickets));
      }
    });

    grid.append(ticketDiv);
  }
}