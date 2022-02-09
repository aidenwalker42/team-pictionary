let wordBank = [
  "alligator",
  "america",
  "angle",
  "ant",
  "applause",
  "apple",
  "arch",
  "arm",
  "army",
  "artist",
  "avocado",
  "baby",
  "backbone",
  "bag",
  "baker",
  "ball",
  "band",
  "baseball",
  "basin",
  "basket",
  "bath",
  "bathroom",
  "battery",
  "bed",
  "bedbug",
  "bee",
  "beehive",
  "bell",
  "berry",
  "bicycle",
  "bird",
  "birthdaycake",
  "birthday",
  "blade",
  "bleach",
  "board",
  "boat",
  "bomb",
  "bone",
  "bonnet",
  "book",
  "boot",
  "bottle",
  "bowtie",
  "box",
  "boy",
  "brain",
  "brake",
  "branch",
  "brick",
  "bridge",
  "bruise",
  "brush",
  "bucket",
  "bulb",
  "button",
  "cabin",
  "cake",
  "camera",
  "card",
  "cardboard",
  "carriage",
  "cart",
  "cat",
  "ceiling",
  "chain",
  "chalk",
  "chameleon",
  "charger",
  "cheerleader",
  "cheese",
  "chef",
  "chess",
  "chime",
  "chin",
  "church",
  "circle",
  "circus",
  "cliff",
  "cloak",
  "clock",
  "cloud",
  "coach",
  "coal",
  "coat",
  "collar",
  "comb",
  "comedian",
  "computer",
  "convertible",
  "cord",
  "cow",
  "cowboy",
  "cruise",
  "crust",
  "cup",
  "cupcake",
  "curtain",
  "cushion",
  "darts",
  "deep",
  "dent",
  "dentist",
  "diving",
  "dog",
  "doghouse",
  "door",
  "doormat",
  "drain",
  "drawer",
  "dream",
  "dress",
  "drip",
  "drop",
  "dust",
  "ear",
  "egg",
  "electricity",
  "engine",
  "extensioncord",
  "eye",
  "face",
  "farm",
  "feather",
  "finger",
  "firefighter",
  "fireman",
  "fish",
  "fizz",
  "flag",
  "flagpole",
  "floor",
  "flute",
  "fly",
  "fog",
  "foot",
  "fork",
  "fowl",
  "frame",
  "frenchfries",
  "frog",
  "garbage",
  "garden",
  "garfield",
  "gate",
  "giant",
  "girl",
  "glove",
  "goat",
  "goblin",
  "goldenretriever",
  "gun",
  "hairdryer",
  "hair",
  "hammer",
  "hand",
  "handle",
  "hat",
  "head",
  "headphones",
  "heart",
  "hockey",
  "hook",
  "hopscotch",
  "horn",
  "horse",
  "hospital",
  "hotdog",
  "hottub",
  "house",
  "houseboat",
  "hurdle",
  "internet",
  "island",
  "jewel",
  "joke",
  "kettle",
  "key",
  "knee",
  "kneel",
  "knife",
  "knight",
  "knot",
  "koala",
  "lace",
  "lap",
  "lawnmower",
  "leaf",
  "leak",
  "leg",
  "lightbulb",
  "lighthouse",
  "line",
  "lip",
  "lock",
  "mailman",
  "map",
  "mascot",
  "match",
  "mattress",
  "money",
  "monkey",
  "moon",
  "mouth",
  "muscle",
  "mushroom",
  "music",
  "nail",
  "nature",
  "neck",
  "needle",
  "neet",
  "nerve",
  "net",
  "newspaper",
  "nightmare",
  "nose",
  "nut",
  "oar",
  "office",
  "orange",
  "outside",
  "oven",
  "owl",
  "pajamas",
  "parcel",
  "park",
  "password",
  "peach",
  "pen",
  "pencil",
  "pharmacist",
  "photograph",
  "picnic",
  "picture",
  "pig",
  "pilot",
  "pin",
  "pineapple",
  "pingpong",
  "pinwheel",
  "pipe",
  "pirate",
  "plane",
  "plank",
  "plate",
  "plough",
  "pocket",
  "pool",
  "popsicle",
  "postoffice",
  "pot",
  "potato",
  "prison",
  "pump",
  "puppet",
  "purse",
  "queen",
  "quilt",
  "raft",
  "rail",
  "raincoat",
  "rat",
  "ray",
  "receipt",
  "ring",
  "rod",
  "roof",
  "root",
  "rug",
  "safe",
  "sail",
  "salmon",
  "saltandpepper",
  "sandbox",
  "scale",
  "school",
  "scissors",
  "screw",
  "season",
  "seed",
  "shallow",
  "shampoo",
  "sheep",
  "sheets",
  "shelf",
  "ship",
  "shirt",
  "shoe",
  "shrink",
  "skate",
  "ski",
  "skin",
  "skirt",
  "sleep",
  "snake",
  "sneeze",
  "snowball",
  "sock",
  "song",
  "spade",
  "speakers",
  "sponge",
  "spoon",
  "spring",
  "sprinkler",
  "square",
  "stamp",
  "star",
  "state",
  "station",
  "stem",
  "stick",
  "stingray",
  "stocking",
  "stomach",
  "store",
  "street",
  "suitcase",
  "sun",
  "sunburn",
  "sushi",
  "swamp",
  "sweater",
  "table",
  "tail",
  "teapot",
  "thief",
  "think",
  "thread",
  "throat",
  "thumb",
  "ticket",
  "timemachine",
  "tiptoe",
  "toe",
  "tongue",
  "tooth",
  "town",
  "train",
  "tray",
  "treasure",
  "tree",
  "trip",
  "trousers",
  "turtle",
  "tusk",
  "tv",
  "umbrella",
  "violin",
  "wall",
  "watch",
  "wateringcan",
  "wax",
  "weddingdress",
  "wheel",
  "whip",
  "whistle",
  "wig",
  "window",
  "wing",
  "wire",
  "worm",
  "yardstick",
  "zoo",
];
function getWords() {
  let a = Math.floor(Math.random() * wordBank.length);
  let b = Math.floor(Math.random() * wordBank.length);
  let c = Math.floor(Math.random() * wordBank.length);
  return [wordBank[a], wordBank[b], wordBank[c]];
}

function overlayRound(bool) {
  let overlay = document.getElementById("overlay");
  inOverlay = true;
  greenText = false;
  let hangman = document.getElementById("hangman");
  hangman.innerHTML = "";
  console.log("bool = " + bool);
  if (bool) {
    //runs second time only
    console.log("bool success");
    let originalATN = theActiveTeamNumber;
    function getActiveTeam(i) {
      for (i; i < currentRoom.teams.length; i++) {
        if (currentRoom.teams[i][i + 1].length > 0) {
          //checking if there are people on the team
          theActiveTeam = currentRoom.teams[i][i + 1]; //set them as the drawers
          theActiveTeamNumber = i;
          return;
        }
      }
    }
    getActiveTeam(theActiveTeamNumber + 1);
    if (originalATN === theActiveTeamNumber) {
      //checks if this is the last team to draw for the round
      if (currentRound === currentRoom.roundSettingValue) {
        //checks if last round
        //show scores
        clearTimeout();
        overlay.innerHTML = `<h1>Match Over!</h1><br/>`;
        setTimeout(endOfGameHandler, 2000);
        console.log("Game Over");
        return;
      }
      getActiveTeam(0);
      currentRound++;
      document.getElementById(
        "setting-rounds"
      ).innerHTML = `${currentRound}/${currentRoom.roundSettingValue}`;
    }
  }
  //active team plus one after round ends.
  if (theActiveTeam.length === 2) {
    if (currentRound % 2 === 1) {
      //alternate who draws every round
      wordPickerPlayer = theActiveTeam[0]; //{id: 'tFR7u04y2A-r7sDcAAAN', username: 'Lmao'}
    } else {
      wordPickerPlayer = theActiveTeam[1];
    }
  } else {
    wordPickerPlayer = theActiveTeam[0];
  }
  if (wordPickerPlayer.id === socket.id) {
    let words = getWords();
    console.log("thats me");
    greenText = true;
    setTimeout(() => {
      overlay.innerHTML = `
    <h1>Select a word</h1>
        <div id="word-container">
            <div onclick="selectWord(1, this)">${words[0]}</div>
            <div onclick="selectWord(2, this)">${words[1]}</div>
            <div onclick="selectWord(3, this)">${words[2]}</div>
        </div>`;
    }, 3000);
  } else {
    console.log("should fucking pop up");
    setTimeout(() => {
      overlay.innerHTML = `<h1>${wordPickerPlayer.username} is picking a word</h1>`;
    }, 3000);
  }
  // setTimeout(() => {
  //   overlay.className = "hidden grid-center";
  // }, 2000);
  //on round end do the same thing
}

function selectWord(num, wordElement) {
  console.log(wordElement.innerHTML);
  socket.emit("setWord", wordElement.innerHTML, currentRoom);
  inOverlay = false;
  startTimer();
  //server set word
  //handle when leave, make sure someone else selects the word
}

socket.on("setWord", (word) => {
  currentWord = word;
  //round start
  let overlay = document.getElementById("overlay");
  overlay.innerHTML = "";
  overlay.className = "hidden grid-center";
  if (theActiveTeamNumber === yourTeamNumber) {
    drawerHandler();
  } else {
    guesserHandler();
  }
});

function startTimer() {
  let time = currentRoom.timeSettingValue;
  clock = setInterval(() => {
    if (time === 0) {
      clearInterval(clock);
      clock = 0;
    }
    socket.emit("tick", time, currentRoom.id);
    time--;
  }, 1000);
}
socket.on("tick", (theTime) => {
  let timerElement = document.getElementById("setting-time");
  globalTime = theTime;
  timerElement.innerHTML = theTime + "";
  console.log("tick!");
  if (theTime === 0) {
    console.log("should round end");
    roundEnd(1);
  }
});

function drawerHandler() {
  console.log("drawer");
  let hangman = document.getElementById("hangman");
  let palette = document.getElementById("palette");
  palette.className = "grid-center";
  hangman.innerHTML = currentWord;
  greenText = true;
  brushSizeSelector(
    1,
    document.getElementsByClassName("brush-wrapper")[0],
    true
  );
  selectColor("black", document.getElementsByClassName("color-box")[0], true);
}
function guesserHandler() {
  let overlay = document.getElementById("overlay");
  let palette = document.getElementById("palette");
  palette.className = "grid-center hidden";
  overlay.className = "nodraw grid-center";
  console.log("guesser");
  let hangman = document.getElementById("hangman");
  for (let i = 0; i < currentWord.length; i++) {
    hangman.innerHTML += "_ ";
  }
}

function wordGuessed(teamID, amt) {
  //globally ran
  guessingTeamsLeft--;
  if (yourTeamNumber === teamID) {
    greenText = true;
    socket.emit("greenBackground", yourTeamNumber, currentRoom.id);
  }
  if (guessingTeamsLeft === 1) {
    //its one because the drawer isnt guessing
    roundEnd(2);
  }

  //increase points of team
  socket.emit("addPoints", amt, teamID, currentRoom.id); //adding amt to team
  //change background color
}
socket.on("addPoints", (teamID, roomObj) => {
  let theTeam = document.getElementById(`team-${teamID + 1}-points`);
  theTeam.innerHTML = roomObj.points[teamID] + " Points";
  currentRoom = roomObj;
});
socket.on("greenBackground", (teamID) => {
  let theTeam = document.getElementById(`team-${teamID + 1}-points`);
  theTeam.classList.add("guessed");
});

function quicksort(array) {
  if (array.length <= 1) {
    return array;
  }

  var pivot = array[0];

  var left = [];
  var right = [];

  for (var i = 1; i < array.length; i++) {
    array[i].score < pivot.score ? left.push(array[i]) : right.push(array[i]);
  }

  return quicksort(left).concat(pivot, quicksort(right));
}

function roundEnd(type) {
  //type 1 = timeout
  //type 2 = all guessed
  //type 3 = active players left
  inOverlay = true;
  clearInterval(clock);
  clock = 0;
  let timerElement = document.getElementById("setting-time");
  timerElement.innerHTML = "";
  let hangman = document.getElementById("hangman");
  hangman.innerHTML = currentWord;
  let overlay = document.getElementById("overlay");
  overlay.className = "visible grid-center";
  switch (type) {
    case 1:
      overlay.innerHTML = `<h1>Time ran out!</h1><br/><h1>The word was "${currentWord}".</h1>`;
      break;
    case 2:
      overlay.innerHTML = `<h1>Everyone guessed correctly!</h1><br/><h1>The word was "${currentWord}".</h1>`;
      break;
    case 3:
      overlay.innerHTML = `<h1>The drawing team left the game.</h1><br/><h1>The word was "${currentWord}".</h1>`;
      break;
    default:
      break;
  }
  guessingTeamsLeft = document.getElementsByClassName("game-team").length;
  currentWord = null;
  //go to back to lobby
  //update leaderboard
  setTimeout(() => {
    let scores = [];
    for (let i = 0; i < currentRoom.teams.length; i++) {
      scores[i] = {
        score: currentRoom.points[i],
        index: i,
      };
    }
    console.log(scores);
    let sorted = quicksort(scores).reverse();
    console.log("Sorted array", sorted);
    overlay.innerHTML = `<h1>Scores</h1><br />
    <ul id="overlay-points"></ul>`;
    let scoreboard = document.getElementById("overlay-points");
    scoreboard.innerHTML = "";
    for (let i = 0; i < currentRoom.teams.length; i++) {
      scoreboard.innerHTML += `<li class="green-text"><b>#${
        i + 1
      } -- </b>Team ${sorted[i].index + 1}: ${sorted[i].score} PTS</li>`;
    }
    setTimeout(() => {
      let guessed = document.querySelectorAll(".guessed");
      console.log(guessed);
      for (let i = 0; i < guessed.length; i++) {
        guessed[i].classList.remove("guessed");
      }
      console.log(guessed);
      clearCanvas(true);
      overlayRound(true);
    }, 5000);
  }, 5000);
}

function endOfGameHandler() {
  //after 5000 seconds display scoreboard and go back to lobby
  socket.emit("endGame", currentRoom);
  console.log("endOfGameHandler()");
  let scores = [];
  for (let i = 0; i < currentRoom.teams.length; i++) {
    scores[i] = {
      score: currentRoom.points[i],
      index: i,
    };
  }
  console.log(scores);
  let sorted = quicksort(scores).reverse();
  console.log("Sorted array", sorted);
  overlay.innerHTML = `<h1>Final Scores</h1><br />
    <ul id="overlay-points"></ul>`;
  let scoreboard = document.getElementById("overlay-points");
  scoreboard.innerHTML = "";
  for (let i = 0; i < currentRoom.teams.length; i++) {
    if (i === 0) {
      scoreboard.innerHTML += `<li class="player-local"><b>#${
        i + 1
      } -- </b>Team ${sorted[i].index + 1}: ${sorted[i].score} PTS</li>`;
    } else {
      scoreboard.innerHTML += `<li class="green-text"><b>#${
        i + 1
      } -- </b>Team ${sorted[i].index + 1}: ${sorted[i].score} PTS</li>`;
    }
  }
  setTimeout(goBackToLobby, 5000);
}

function goBackToLobby() {
  console.log("goBackToLobby");
  console.log(teams);
  teams.innerHTML = ``;
  //reload html and put all the room data in it
  section.innerHTML = `
        <header>
            <a href="javascript:btnHome();"><h1 class="h1-home">Team Pictionary</h1></a>
        </header>
        <h2>Lobby</h2>
        <div class="lobby-room-name">
            <h4>Room name:</h4> <span id="game-room-name"></span>
        </div>
        <div class="lobby-grid">
            <div class="idle-players">
                <div class="idle-players-spacer">
                    <h3>Idle Players</h3>
                    <ul id="game-idle-players">

                    </ul>
                </div>
            </div>
            <div class="teams-box">
                <div class="teams-grid" id="game-teams-grid">

                </div>
            </div>
            <div class="lobby-settings" id="lobby-settings">
                <div class="settings-item">
                    <h4>Rounds: </h4>
                    <div>
                        
                        <span id="rounds" class="settings-span"></span>
                        
                    </div>
                </div>
                <div class="settings-item">
                    <h4>Draw Time: </h4>
                    <div>
                        
                        <span id="draw-time" class="settings-span"></span>
                        
                    </div>
                </div>
                <div class="settings-item">
                    <h4>Max Teams: </h4>
                    <div>
                        
                        <span id="max-teams" class="settings-span"></span>
                        
                    </div>
                </div>
            </div>
            <div class="game-history">
                <div class="idle-players-spacer">
                    <h3>Leaderboard</h3>
                    <ol id="game-leaderboard">

                    </ol>
                </div>
            </div>
            <div class="lobby-chat-box">
                <div class="chat-container" id="chats">
                    <ul id="game-chat">
                    
                    </ul>
                </div>
                <form id="game-chat-form" action="">
                    <input autocomplete="false" type="text" placeholder="Chat Message" id="chat-input">
                    <button id="chat-button">Chat</button>
                </form>
            </div>
            <div class="start-game-container" id="start-game-container">
            </div>
        </div>
        `;
  for (let i = 0; i < currentRoom.teamMaxSettingValue; i++) {
    document.getElementById("game-teams-grid").innerHTML += `
    <div class="team">
      <h3 onclick="joinTeam(${i + 1})" id="team-header-${i + 1}">Team ${
      i + 1
    }</h3>
      <ul id="team-${i + 1}">
      </ul>
    </div>`;
  }
  console.log(teams);
  console.log(section);
  teams = document.getElementById("game-teams-grid");
  updateUsernameClasses(currentRoom);
  firstload = false;
  addChatListener();
  if (socket.id === currentRoom.host.id) {
    displayHostControls(); //have to change currentRoom object to not inprogress, and delete scores key?
  }
}
