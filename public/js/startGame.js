function startGame() {
  //check if all players are on a team or just host?
  let unableToStartGame;
  let errorMessage =
    "CANNOT START GAME YET! \n______________________________________\n\n";
  if (currentRoom.idlePlayers.length > 0) {
    //error message
    errorMessage += "- All players MUST join a team. \n";
    unableToStartGame = true;
  }
  //check if there are two teams active
  let activeTeams = 0;
  for (let i = 0; i < currentRoom.teams.length; i++) {
    if (currentRoom.teams[i][i + 1].length > 0) {
      activeTeams++;
    }
  }
  if (activeTeams < 2) {
    errorMessage +=
      "- There must be players on at least TWO DIFFERENT TEAMS. \n";
    unableToStartGame = true;
  }
  //check if settings are applied
  if (editLobbySettingsClicked) {
    //error message
    errorMessage += "- Please apply match settings. \n";
    unableToStartGame = true;
  }
  //check if more than one player
  if (currentRoom.players.length < 2) {
    //error message
    errorMessage += "- More than one player required to start. \n";
    unableToStartGame = true;
  }
  if (unableToStartGame) {
    alert(errorMessage);
    return;
  }
  socket.emit("startGame", currentRoom);
  //display HTML for everyone
  //
  //set room to inprogress, no players can join. put request for that? why?
  //check all the normal actions that would usually happen in lobby make sure they dont conflict
  //maybe make a new local object?? might conflict
  //might have to block lobby js
  //enable game's js
}
socket.on("startGame", (roomObj) => {
  currentRoom = roomObj;
  loadGameHtml();
  currentRound = 1;
  for (let i = 0; i < currentRoom.teams.length; i++) {
    if (currentRoom.teams[i][i + 1][0]) {
      if (socket.id === currentRoom.teams[i][i + 1][0].id) {
        yourTeamNumber = i;
        break;
      }
    }
    if (currentRoom.teams[i][i + 1][1]) {
      if (socket.id === currentRoom.teams[i][i + 1][1].id) {
        yourTeamNumber = i;
        break;
      }
    }
  }
  for (let i = 0; i < currentRoom.teams.length; i++) {
    //finds first team
    if (currentRoom.teams[i][i + 1].length > 0) {
      theActiveTeam = currentRoom.teams[i][i + 1];
      theActiveTeamNumber = i;
      break; //first team, taking into account empty teams
    }
  }
  let points = [];
  for (let i = 0; i < currentRoom.teams.length; i++) {
    points[i] = 0;
  }
  socket.emit("points", points, currentRoom.id);
  overlayRound(false); //startGame.js
});
socket.on("points", (roomObj) => {
  currentRoom = roomObj;
});
function loadGameHtml() {
  section.innerHTML = `
        <header>
            <a href="javascript:btnHome();"><h1 class="h1-home">Team Pictionary</h1></a>
        </header>
        <div class="head-bar-container">
            <div class="head-bar-flex">
                <div class="timer">
                    <h3>Time: </h3><span id="setting-time"></span>
                </div>
                <div>
                    <span id="hangman"></span>
                </div>
                <div><h3>Round: </h3><span id="setting-rounds">1/${currentRoom.roundSettingValue}</span></div>
            </div>
        </div>
        <div class="grid-center" id="game-container">
            <div class="sidebar-container" id="team-sidebar">
                <h2>Teams</h2>
                <!-- <div class="game-team">
                    <h3>Team #</h3>
                    <ul class="team-list">
                        <li>Player 1</li>
                        <li>Player 2</li>
                    </ul>
                </div> -->
            </div>
            <div class="canvas-container">
                <canvas id="canv"></canvas>
                <div id="overlay" class="visible grid-center">
                    <h1>Round 1</h1>
                    <!-- <div id="word-container">
                        <div onclick="selectWord(1, this)">Test</div>
                        <div onclick="selectWord(2, this)">Bobby Ferguson</div>
                        <div onclick="selectWord(3, this)">Bitch Please</div>
                    </div> -->
                </div>
            </div>
            <div class="sidebar-container">
                <h2>Chat</h2>
                <div id="ingame-chat">
                    <ul id="chat-messages-list">
                        <!-- <h4>Aiden: </h4><li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae laborum magni quasi reiciendis quaerat rem quod quo ratione temporibus at.</li> -->
                    </ul>
                </div>
                <form id="ingame-chat-form" action="">
                    <input autocomplete="false" type="text" placeholder="Guess Here" id="game-chat-input">
                </form>
            </div>
        </div>
        <div id="palette" class="grid-center">
          <div onclick="selectColor('black', this)" class="color-box black selected"></div>        
          <div onclick="selectColor('white', this)" class="color-box white"></div>
          <div onclick="selectColor('red', this)" class="color-box red"></div>
          <div onclick="selectColor('orange', this)" class="color-box orange"></div>
          <div onclick="selectColor('yellow', this)" class="color-box yellow"></div>
          <div onclick="selectColor('lime', this)" class="color-box lime"></div>
          <div onclick="selectColor('green', this)" class="color-box green"></div>
          <div onclick="selectColor('cyan', this)" class="color-box cyan"></div>
          <div onclick="selectColor('blue', this)" class="color-box blue"></div>
          <div onclick="selectColor('purple', this)" class="color-box purple"></div>
          <div onclick="selectColor('pink', this)" class="color-box pink"></div>
          <div onclick="selectColor('brown', this)" class="color-box brown"></div>
          <div onclick="selectColor('darkgrey', this)" class="color-box dark-gray"></div>
          <div onclick="selectColor('lightgrey', this)" class="color-box light-gray"></div>
          <div class="brush-wrapper" onclick="brushSizeSelector(1, this)">
              <div class="brush small active"></div>
          </div>
          <div class="brush-wrapper" onclick="brushSizeSelector(2, this)">
              <div class="brush medium"></div>
          </div>
          <div class="brush-wrapper" onclick="brushSizeSelector(3, this)">
              <div class="brush large"></div>
          </div>
          <div class="brush-wrapper" onclick="brushSizeSelector(4, this)"> 
              <div class="brush xlarge"></div>
          </div>
          <div class="clear-canvas-wrapper" onclick="clearCanvas()">
              <span>🗑️</span>
          </div>
        </div>
            `;
  if (firstload) {
    const canvasjs = document.createElement("script");
    canvasjs.src = "gamejs/CanvasStack-2v01.js";
    canvasjs.async = false;
    canvasjs.onload = () => {
      console.log("cstack load");
    };
    document.head.appendChild(canvasjs);
    const indexjs = document.createElement("script");
    indexjs.src = "gamejs/index.js";
    indexjs.async = false;
    indexjs.onload = () => {
      console.log("index load");
    };
    document.body.appendChild(indexjs);
  } else {
    canvasInit();
  }
  addGameChatListener();
  displayTeams(currentRoom);
  guessingTeamsLeft = document.getElementsByClassName("game-team").length; //initialize this, then every new round scan again as well as when a team leaves that hasnt guessed.
}

function displayTeams(roomObj) {
  currentRoom = roomObj;
  //index.js
  let teamSidebar = document.getElementById("team-sidebar");
  teamSidebar.innerHTML = "";
  function teamHTML(teamNum, playerOne, playerTwo) {
    if (!playerTwo) {
      return `<div class="game-team">
                      <h3>Team ${teamNum}: </h3><span id="team-${teamNum}-points">0 Points</span>
                      <ul class="team-list">
                          ${playerOne}
                          <li></li>
                      </ul>
                  </div>`;
    }
    if (playerOne) {
      return `<div class="game-team">
                      <h3>Team ${teamNum}: </h3><span id="team-${teamNum}-points">0 Points</span>
                      <ul class="team-list">
                          ${playerOne}
                          ${playerTwo}
                      </ul>
                  </div>`;
    }
  }
  //loop through teams
  //check if host, host && you, you, or else
  for (let i = 0; i < currentRoom.teamMaxSettingValue; i++) {
    let playerOne;
    let playerTwo;
    if (currentRoom.teams[i][i + 1][0]) {
      //does player 1 exist
      if (currentRoom.teams[i][i + 1][0].id === currentRoom.host.id) {
        //if player 1 host
        if (currentRoom.host.id === socket.id) {
          // if player 1 is host and yourself
          playerOne = `<li class="player-host">${
            currentRoom.teams[i][i + 1][0].username
          } (You)</li>`;
        } else {
          // if player 1 is host and not yourself
          playerOne = `<li class="player-host">${
            currentRoom.teams[i][i + 1][0].username
          }</li>`;
        }
      } else if (currentRoom.teams[i][i + 1][0].id === socket.id) {
        // if player 1 not host but its you
        playerOne = `<li class="player-local">${
          currentRoom.teams[i][i + 1][0].username
        } (You)</li>`;
      } else {
        // if player 1 not host and not you
        playerOne = `<li>${currentRoom.teams[i][i + 1][0].username}</li>`;
      }
      if (currentRoom.teams[i][i + 1][1]) {
        //does player 2 exist
        if (currentRoom.teams[i][i + 1][1].id === currentRoom.host.id) {
          //if player 2 host
          if (currentRoom.host.id === socket.id) {
            // if player 2 is host and yourself
            playerTwo = `<li class="player-host">${
              currentRoom.teams[i][i + 1][1].username
            } (You)</li>`;
          } else {
            // if player 2 not yourself
            playerTwo = `<li class="player-host">${
              currentRoom.teams[i][i + 1][1].username
            }</li>`;
          }
        } else if (currentRoom.teams[i][i + 1][1].id === socket.id) {
          // if player 2 not host but its you
          playerTwo = `<li class="player-local">${
            currentRoom.teams[i][i + 1][1].username
          } (You)</li>`;
        } else {
          // if player 2 not host and not you
          playerTwo = `<li>${currentRoom.teams[i][i + 1][1].username}</li>`;
        }
      }
      teamSidebar.innerHTML += teamHTML(i + 1, playerOne, playerTwo);
    }
  }
}
