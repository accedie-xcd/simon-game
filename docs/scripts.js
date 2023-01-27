const topLeft = document.querySelector('#top-left');
const topRight = document.querySelector('#top-right');
const bottomLeft = document.querySelector('#bottom-left');
const bottomRight = document.querySelector('#bottom-right');
const startBtn = document.querySelector('#start-button');
const turnCounter = document.querySelector('#turn-counter')
const audio1 = document.querySelector('#clip1');
const audio2 = document.querySelector('#clip2');
const audio3 = document.querySelector('#clip3');
const audio4 = document.querySelector('#clip4');

let tracker = 0;
let turn = 1;
let color;
let array = [];
let playerSelection = [];


let win;
let interactable = false;
let started = false;


startBtn.addEventListener('click', () => {
  if(!started)
  {
    turnCounter.innerHTML = `1`;
    for (let index = 0; index < 20; index++) {
      array[index] = color = Math.floor(Math.random() * 4);
    }
    started=true;
    flash();
  }
})

function flash() {
  interactable=false;
  let index = 0;
  let flashInt = setInterval(() => {
    
    if (array[index] === 1){
      topRight.classList.add('!bg-red-500');
      audio2.play();
    } else if
    (array[index] === 0){
      topLeft.classList.add('!bg-green-500');
      audio1.play();
    }else if
    (array[index] === 2){
      bottomRight.classList.add('!bg-blue-500');
      audio4.play();
    }else if
    (array[index] === 3){
      bottomLeft.classList.add('!bg-yellow-500');
      audio3.play();
    }

    index++;
    clearColor();
    if(index === turn){
      interactable = true;
      clearInterval(flashInt);
    }
  },800)
}

function clearColor() {
  setTimeout(() => {
    topRight.classList.remove('!bg-red-500');
    topLeft.classList.remove('!bg-green-500');
    bottomRight.classList.remove('!bg-blue-500');
    bottomLeft.classList.remove('!bg-yellow-500');
  }, 200);
  
}


topLeft.addEventListener('click', () => {
  if(interactable){
    topLeft.classList.add('!bg-green-500');
    clearColor();
    audio1.play();
    playerSelection[tracker] = 0;
    tracker++;
    check();
  }
    
})

topRight.addEventListener('click', () => {
  if(interactable){
    topRight.classList.add('!bg-red-500');
    clearColor();
    audio2.play();
    playerSelection[tracker] = 1;
    tracker++;
    check();
  }
    
})

bottomLeft.addEventListener('click', () => {
  if(interactable){
    bottomLeft.classList.add('!bg-yellow-500');
    clearColor();
    audio3.play();
    playerSelection[tracker] = 3;
    tracker++;
    check();
  }
    
})

bottomRight.addEventListener('click', () => {
  if(interactable){
    bottomRight.classList.add('!bg-blue-500');
    clearColor();
    audio4.play();
    playerSelection[tracker] = 2;
    tracker++;
    check();
  }
    
})

function check() {
  if(playerSelection[tracker-1] !== array[tracker-1])
  {
    interactable = false;
    started = false;
    tracker = 0;
    turn = 1;
    array = [];
    playerSelection = [];
    started = false;
    return turnCounter.innerHTML = `lol`;
  }
  
  if(tracker === 5){
    interactable = false;
    started = false;
    tracker = 0;
    turn = 1;
    array = [];
    playerSelection = [];
    started = false;
    return turnCounter.innerHTML = `WIN`;
  }

  if(tracker === turn){
    turn++;
    turnCounter.innerHTML = `${turn}`;
    tracker = 0;
    flash();
  }

}
