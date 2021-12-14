function checkUsername() {
  let usernameInput = document.getElementById("name").value;
  if (usernameInput && usernameInput.length < 12) {
    return true;
  } else {
    return false;
  }
}
function btnJoinGame() {
  //ran when user clicks "JoinGame"
  if (checkUsername() === false) {
    document.getElementById("no-username-message").innerHTML =
      "Please enter your name!";
    return;
  }
  localUsername = document.getElementById("name").value;
  section.innerHTML = `
        <header>
            <a href="javascript:btnHome();"><h1 class="h1-home">Team Pictionary</h1></a>
        </header>
        <h2>Join a game room</h2>
        <div id="search-container" class="grid-center">
            <input type="text" placeholder="🔎 Search Room name" id="search-room">
        </div>
        <div id="room-grid">
            <div class="room-item">
                <h3>Aiden's Room</h3>
                <div>
                    <span><b>5/8</b> Players</span>
                </div>
                <div>
                    <span><b>4</b> Teams</span>
                </div>
                <div>
                    <span><b>80</b> Second Timer</span>
                </div>
                <div>
                    <button class="big-button green">Join</button>
                </div>
            </div>
            <div class="room-item">
                <h3>Aiden's Room</h3>
                <div>
                    <span><b>5/8</b> Players</span>
                </div>
                <div>
                    <span><b>4</b> Teams</span>
                </div>
                <div>
                    <span><b>80</b> Second Timer</span>
                </div>
                <div>
                    <button class="big-button green">Join</button>
                </div>
            </div>
            <div class="room-item">
                <h3>Aiden's Room</h3>
                <div>
                    <span><b>5/8</b> Players</span>
                </div>
                <div>
                    <span><b>4</b> Teams</span>
                </div>
                <div>
                    <span><b>80</b> Second Timer</span>
                </div>
                <div>
                    <button class="big-button green">Join</button>
                </div>
            </div>
            <div class="room-item">
                <h3>Aiden's Room</h3>
                <div>
                    <span><b>5/8</b> Players</span>
                </div>
                <div>
                    <span><b>4</b> Teams</span>
                </div>
                <div>
                    <span><b>80</b> Second Timer</span>
                </div>
                <div>
                    <button class="big-button green">Join</button>
                </div>
            </div>
        </div>`;
  joinRoomGet(); //joinGame.js
}
function btnHostGame() {
  //ran when user clicks "HostGame"
  if (checkUsername() === false) {
    document.getElementById("no-username-message").innerHTML =
      "Please enter your name!";
    return;
  }
  localUsername = document.getElementById("name").value;
  console.log(localUsername);
  section.innerHTML = `
                <header>
            <a href="javascript:btnHome();"><h1 class="h1-home">Team Pictionary</h1></a>
        </header>
        <h2>Create Game Room</h2>
        <div class="grid-center gap">
            <div class="box">
                <input type="text" placeholder="Room name" id="room-name">
                <div class="settings-item">
                    <h4>Rounds: </h4>
                    <div>
                        <button class="inc-button" onclick="roundMinus()">-</button>
                        <span id="rounds" class="settings-span">3</span>
                        <button class="inc-button" onclick="roundPlus()">+</button>
                    </div>
                </div>
                <div class="settings-item">
                    <h4>Draw Time: </h4>
                    <div>
                        <button class="inc-button" onclick="drawTimeMinus()">-</button>
                        <span id="draw-time" class="settings-span">80</span>
                        <button class="inc-button" onclick="drawTimePlus()">+</button>
                    </div>
                </div>
                <div class="settings-item">
                    <h4>Max Teams: </h4>
                    <div>
                        <button class="inc-button" onclick="teamMinus()">-</button>
                        <span id="max-teams" class="settings-span">4</span>
                        <button class="inc-button" onclick="teamPlus()">+</button>
                    </div>
                </div>
                <button class="big-button" id="create-room" onclick="createRoom()">Create Room</button>
            </div>
        </div>`;
  createRoomLoader(); //createRoom.js
}
function btnHome() {
  //   section.innerHTML = `
  //             <div class="grid-center gap">
  //             <header class="grid-center">
  //                 <a href="javascript:btnHome();"><h1 class="h1-home">Team Pictionary</h1></a>
  //             </header>
  //             <div class="box">
  //                 <input type="text" placeholder="Enter your name" id="name">
  //                 <button id="join-button" class="big-button" onclick="btnJoinGame()">Join a game</button>
  //                 <button id="host-button" class="big-button" onclick="btnHostGame()">Host a game</button>
  //                 <span id="no-username-message"></span>
  //             </div>
  //             <div class="box">
  //                 <h2>About</h2>
  //                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur cupiditate ipsum cumque obcaecati vitae? Delectus in esse repellendus soluta eveniet?</p>
  //                 <h2>How to play</h2>
  //                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus fuga a, dolor perferendis ipsa eaque blanditiis dolore rerum assumenda et!</p>
  //             </div>
  //         </div>`;
  location.reload();
}

function btnCreateRoom(resID) {
  console.log("hello");
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
                <button class="big-button blue" onclick="editLobbySettings()">Change Settings</button>
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
                    <input type="text" placeholder="Chat Message" id="chat-input">
                    <button id="chat-button">Chat</button>
                </form>
            </div>
            <div class="start-game-container" id="start-game-container">
                <button class="start-game-button">Start Game</button>
            </div>
        </div>`;
  chatMessages = document.getElementById("game-chat");
  form = document.getElementById("game-chat-form");
  chatInput = document.getElementById("chat-input");
  chatButton = document.getElementById("chat-button");
  addChatListener();
  hostLobbyCreation(resID); //renders lobby for host
}

function hostLobbyCreation(resID) {
  roomName = document.getElementById("game-room-name");
  idlePlayers = document.getElementById("game-idle-players");
  teams = document.getElementById("game-teams-grid");
  rounds = document.getElementById("rounds");
  drawTime = document.getElementById("draw-time");
  maxTeams = document.getElementById("max-teams");
  let rooms;
  let roomObj;
  //getting and finding correct room using response sent from post
  axios.get(BaseURL).then((res) => {
    rooms = res.data;
    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i].id === resID) {
        roomObj = rooms[i];
      }
    }
    //editing html
    console.log(roomObj);
    roomName.innerHTML = roomObj.roomName;
    for (let i = 0; i < roomObj.idlePlayers.length; i++) {
      idlePlayers.innerHTML += `<li class="player-host">${roomObj.idlePlayers[i].username} (You)</li>`;
    }
    for (let i = 0; i < roomObj.teamMaxSettingValue; i++) {
      console.log("hello??");
      teams.innerHTML += `
      <div class="team">
          <h3 onclick="joinTeam(${i + 1})" id="team-header-${i + 1}">Team ${
        i + 1
      }</h3>
              <ul id="team-${i + 1}">
              </ul>
          </div>`;
    }
    rounds.innerHTML = roomObj.roundSettingValue;
    drawTime.innerHTML = roomObj.timeSettingValue;
    maxTeams.innerHTML = roomObj.teamMaxSettingValue;
    socket.emit("joinSocketRoom", roomObj);
  });
}
