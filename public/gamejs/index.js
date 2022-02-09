// const socket = io.connect("ws://localhost:5500");
// uncomment when wanting to test just drawing
let canvas;
let ctx;
let canvas_stack;
let layer1;
let ctx1;
let layer2;
let ctx2;
let canv2;

function canvasInit() {
  console.log("initializing canvas?");
  canvas = document.getElementById("canv");
  //need to write 2d or 3d
  ctx = canvas.getContext("2d");
  canvas.height = 600;
  canvas.width = 800;

  // let canvasStack = new CanvasStack();
  canvas_stack = new CanvasStack("canv");
  layer1 = canvas_stack.createLayer(); //can_ovl_1
  ctx1 = document.getElementById(layer1).getContext("2d"); //CanvasRendingContext2D object
  console.log(ctx1);

  layer2 = canvas_stack.createLayer();
  ctx2 = document.getElementById(layer2).getContext("2d");

  canv2 = document.getElementById("canv_ovl_2");

  canv2.addEventListener("mousedown", startPosition);
  canv2.addEventListener("mousemove", draw);
  canv2.addEventListener("mouseup", finishedPosition);
  console.log("done initializing canvas?");
}
canvasInit();
let painting = false;
ctx1.strokeStyle = "black";
ctx1.lineWidth = 2.5;

//TOOLS
let playerOne;
let playerTwo;
function checkWhichPlayer() {
  console.log("checkplayer run");
  for (let i = 0; i < currentRoom.teams.length; i++) {
    console.log(currentRoom.teams[i][i + 1][1] !== undefined);
    if (currentRoom.teams[i][i + 1][0] !== undefined) {
      //check if exists
      console.log("und1");
      if (currentRoom.teams[i][i + 1][0].id === socket.id) {
        //matching socket.id
        playerOne = true;
        playerTwo = false;
        return;
      } else if (currentRoom.teams[i][i + 1][1] !== undefined) {
        //check if exists
        console.log("und2");
        if (currentRoom.teams[i][i + 1][1].id === socket.id) {
          console.log("exist2");
          playerOne = false;
          playerTwo = true;
          return;
        }
      }
    }
  }
}
checkWhichPlayer();
function selectColor(color, that, masterSet) {
  //applying and removing "selected" class
  let selected = document.querySelectorAll(".selected");
  selected[0].classList.remove("selected");
  that.classList.add("selected");
  //set stroke color
  if (masterSet) {
    ctx1.strokeStyle = color;
    ctx2.strokeStyle = color;
    socket.emit("p1selectColor", color, currentRoom.id);
    socket.emit("p2selectColor", color, currentRoom.id);
  }
  if (playerOne) {
    ctx1.strokeStyle = color;
    socket.emit("p1selectColor", color, currentRoom.id);
  } else if (playerTwo) {
    ctx2.strokeStyle = color;
    socket.emit("p2selectColor", color, currentRoom.id);
  }
  //send color to io
}

function brushSizeSelector(brushSize, that, masterSet) {
  let selected = document.querySelectorAll(".active");
  console.log(selected);
  selected[0].classList.remove("active");
  let circle = that.querySelector("div");
  circle.classList.add("active");
  if (masterSet) {
    ctx1.lineWidth = 2.5;
    ctx2.lineWidth = 2.5;
    socket.emit("p1brushSize", brushSize, currentRoom.id);
    socket.emit("p2brushSize", brushSize, currentRoom.id);
  } else if (playerOne) {
    switch (brushSize) {
      case 1:
        ctx1.lineWidth = 2.5;
        break;
      case 2:
        ctx1.lineWidth = 5;
        break;
      case 3:
        ctx1.lineWidth = 10;
        break;
      case 4:
        ctx1.lineWidth = 20;
    }
    //send p1brushSize to io
    socket.emit("p1brushSize", brushSize, currentRoom.id);
  } else if (playerTwo) {
    switch (brushSize) {
      case 1:
        ctx2.lineWidth = 2.5;
        break;
      case 2:
        ctx2.lineWidth = 5;
        break;
      case 3:
        ctx2.lineWidth = 10;
        break;
      case 4:
        ctx2.lineWidth = 20;
    }
    //send p2brushSize to io
    socket.emit("p2brushSize", brushSize, currentRoom.id);
  }
}
function clearCanvas(fullClear) {
  //onClick
  if (fullClear) {
    ctx1.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.clearRect(0, 0, canvas.width, canvas.height);
  } else if (playerOne) {
    ctx1.clearRect(0, 0, canvas.width, canvas.height);
    socket.emit("p1clearCanvas", currentRoom.id);
  } else if (playerTwo) {
    ctx2.clearRect(0, 0, canvas.width, canvas.height);
    socket.emit("p2clearCanvas", currentRoom.id);
  }
}

function startPosition(e) {
  painting = true;
  draw(e);
  //send true
  let mousePosition = canv2.getBoundingClientRect();
  if (playerOne) {
    socket.emit(
      "p1mouseDown",
      e.clientX - mousePosition.left,
      e.clientY - mousePosition.top,
      currentRoom.id
    );
  } else if (playerTwo) {
    socket.emit(
      "p2mouseDown",
      e.clientX - mousePosition.left,
      e.clientY - mousePosition.top,
      currentRoom.id
    );
  }
}

function draw(e) {
  if (!painting) {
    return; //if not holding down mouse then return
  }
  let mousePosition = canv2.getBoundingClientRect();
  if (playerOne) {
    ctx1.lineCap = "round";
    ctx1.lineTo(e.clientX - mousePosition.left, e.clientY - mousePosition.top);
    ctx1.stroke();
    ctx1.beginPath();
    ctx1.moveTo(e.clientX - mousePosition.left, e.clientY - mousePosition.top);
    socket.emit(
      "p1mouseMove",
      e.clientX - mousePosition.left,
      e.clientY - mousePosition.top,
      currentRoom.id
    );
  } else if (playerTwo) {
    ctx2.lineCap = "round";
    ctx2.lineTo(e.clientX - mousePosition.left, e.clientY - mousePosition.top);
    ctx2.stroke();
    ctx2.beginPath();
    ctx2.moveTo(e.clientX - mousePosition.left, e.clientY - mousePosition.top);
    socket.emit(
      "p2mouseMove",
      e.clientX - mousePosition.left,
      e.clientY - mousePosition.top,
      currentRoom.id
    );
  }
  // console.log(e.clientX - mousePosition.left);
  // console.log(e.clientY - mousePosition.top);
  //send e.client's
}

function finishedPosition() {
  painting = false;
  if (playerOne) {
    ctx1.beginPath(); //resets
    //send false
    socket.emit("p1mouseUp", currentRoom.id);
  } else if (playerTwo) {
    ctx2.beginPath(); //resets
    //send false
    socket.emit("p2mouseUp", currentRoom.id);
  }
}
// canv2.addEventListener("mousedown", startPosition);
// canv2.addEventListener("mousemove", draw);
// canv2.addEventListener("mouseup", finishedPosition);

//HANDSHAKE

let painting1 = false;
let painting2 = false;
ctx1.strokeStyle = "black";
ctx1.lineWidth = 2.5;
ctx2.strokeStyle = "black";
ctx2.lineWidth = 2.5;

//PLAYER 1

function startPosition1(xPos, yPos) {
  painting1 = true;
  draw1(xPos, yPos);
}
function draw1(xPos, yPos) {
  // let mousePosition2 = canv2.getBoundingClientRect();
  // console.log(
  //   "X2: " + xPos - mousePosition2.left + "Y2: " + yPos - mousePosition2.top
  // );
  if (!painting1) {
    return; //if not holding down mouse then return
  }
  ctx1.lineCap = "round";
  ctx1.lineTo(xPos, yPos);
  ctx1.stroke();
  ctx1.beginPath();
  ctx1.moveTo(xPos, yPos);
}
function finishedPosition1() {
  painting1 = false;
  ctx1.beginPath();
}
function clearCanvas1() {
  ctx1.clearRect(0, 0, canvas.width, canvas.height);
}

//PLAYER 2

function startPosition2(xPos, yPos) {
  painting2 = true;
  draw2(xPos, yPos);
}
function draw2(xPos, yPos) {
  // let mousePosition2 = canv2.getBoundingClientRect();
  // console.log(
  //   "X2: " + xPos - mousePosition2.left + "Y2: " + yPos - mousePosition2.top
  // );
  if (!painting2) {
    return; //if not holding down mouse then return
  }
  ctx2.lineCap = "round";
  ctx2.lineTo(xPos, yPos);
  ctx2.stroke();
  ctx2.beginPath();
  ctx2.moveTo(xPos, yPos);
}
function finishedPosition2() {
  painting2 = false;
  ctx2.beginPath();
}
function clearCanvas2() {
  ctx2.clearRect(0, 0, canvas.width, canvas.height);
}

socket.on("p1mouseDown", startPosition1);
socket.on("p1mouseMove", draw1);
socket.on("p1mouseUp", finishedPosition1);
socket.on("p1clearCanvas", clearCanvas1);
socket.on("p1brushSize", (brushSize) => {
  switch (brushSize) {
    case 1:
      ctx1.lineWidth = 2.5;
      break;
    case 2:
      ctx1.lineWidth = 5;
      break;
    case 3:
      ctx1.lineWidth = 10;
      break;
    case 4:
      ctx1.lineWidth = 20;
  }
});
socket.on("p1selectColor", (color) => {
  ctx1.strokeStyle = color;
});

socket.on("p2mouseDown", startPosition2);
socket.on("p2mouseMove", draw2);
socket.on("p2mouseUp", finishedPosition2);
socket.on("p2clearCanvas", clearCanvas2);
socket.on("p2brushSize", (brushSize) => {
  switch (brushSize) {
    case 1:
      ctx2.lineWidth = 2.5;
      break;
    case 2:
      ctx2.lineWidth = 5;
      break;
    case 3:
      ctx2.lineWidth = 10;
      break;
    case 4:
      ctx2.lineWidth = 20;
  }
});
socket.on("p2selectColor", (color) => {
  ctx2.strokeStyle = color;
});
