const socket = io.connect("ws://localhost:5500");

const canvas = document.getElementById("canv");
//need to write 2d or 3d
const ctx = canvas.getContext("2d");
canvas.height = 600;
canvas.width = 800;

// let canvasStack = new CanvasStack();
let canvas_stack = new CanvasStack("canv");
let layer1 = canvas_stack.createLayer(); //can_ovl_1
const ctx1 = document.getElementById(layer1).getContext("2d"); //CanvasRendingContext2D object
console.log(ctx1);

let layer2 = canvas_stack.createLayer();
const ctx2 = document.getElementById(layer2).getContext("2d");

let canv2 = document.getElementById("canv_ovl_2");

let painting = false;
ctx1.strokeStyle = "black";
ctx1.lineWidth = 2.5;

//TOOLS

let selectedColor = "black";
function selectColor(color, that) {
  //applying and removing "selected" class
  let selected = document.querySelectorAll(".selected");
  selected[0].classList.remove("selected");
  that.classList.add("selected");
  //set stroke color
  ctx1.strokeStyle = color;
  socket.emit("selectColor", color);
  //send color to io
}

function brushSizeSelector(brushSize, that) {
  let selected = document.querySelectorAll(".active");
  selected[0].classList.remove("active");
  that.classList.add("active");
  switch (brushSize) {
    case 1:
      ctx1.lineWidth = 2;
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

  //send brushSize to io
  socket.emit("brushSize", brushSize);
}
function clearCanvas() {
  ctx1.clearRect(0, 0, canvas.width, canvas.height);
  socket.emit("clearCanvas");
}

function startPosition(e) {
  painting = true;
  draw(e);
  //send true
  let mousePosition = canv2.getBoundingClientRect();
  socket.emit(
    "mouseDown",
    e.clientX - mousePosition.left,
    e.clientY - mousePosition.top
  );
}

function draw(e) {
  if (!painting) {
    return; //if not holding down mouse then return
  }
  let mousePosition = canv2.getBoundingClientRect();
  ctx1.lineCap = "round";
  const offset = 0;
  ctx1.lineTo(e.clientX - mousePosition.left, e.clientY - mousePosition.top);
  ctx1.stroke();
  ctx1.beginPath();
  ctx1.moveTo(e.clientX - mousePosition.left, e.clientY - mousePosition.top);
  // console.log(e.clientX - mousePosition.left);
  // console.log(e.clientY - mousePosition.top);
  //send e.client's
  socket.emit(
    "mouseMove",
    e.clientX - mousePosition.left,
    e.clientY - mousePosition.top
  );
}

function finishedPosition() {
  painting = false;
  ctx1.beginPath(); //resets
  //send false
  socket.emit("mouseUp");
}

canv2.addEventListener("mousedown", startPosition);
canv2.addEventListener("mousemove", draw);
canv2.addEventListener("mouseup", finishedPosition);
//add io listener for ^^^ and have it do the same thing???

//ctx2
let painting2 = false;
ctx2.strokeStyle = "black";
ctx2.lineWidth = 2.5;

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

socket.on("mouseDown", startPosition2);
socket.on("mouseMove", draw2);
socket.on("mouseUp", finishedPosition2);
socket.on("clearCanvas", clearCanvas2);
socket.on("brushSize", (brushSize) => {
  switch (brushSize) {
    case 1:
      ctx2.lineWidth = 2;
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
socket.on("selectColor", (color) => {
  ctx2.strokeStyle = color;
});
