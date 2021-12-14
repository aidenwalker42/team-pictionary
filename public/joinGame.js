let rooms;
let currentRoom;

function joinRoomGet() {
  //pageChange.js last on btnJoinGame()
  let roomGrid = document.getElementById("room-grid");
  roomGrid.innerHTML = ""; //change later
  axios.get(BaseURL).then((res) => {
    rooms = res.data;
    rooms.forEach((obj) => {
      let index = 0;
      roomGrid.innerHTML += `
            <div class="room-item">
                <h3>${obj.roomName}</h3>
                <h4>Host: ${obj.host.username}</h4>
                <div>
                    <span><b>${obj.players.length}/${obj.maxPlayers}</b> Players</span>
                </div>
                <div>
                    <span><b>${obj.teamMaxSettingValue}</b> Teams</span>
                </div>
                <div>
                    <span><b>${obj.timeSettingValue}</b> Second Timer</span>
                </div>
                <div>
                    <button class="big-button green" onclick="joinLobby('${obj.id}')">Join</button>
                </div>
            </div>`;
      index++;
    });
  });
}
function joinLobby(roomID) {
  //button for joining lobby onclick calls this
  axios
    .put(BaseURL + "/join", {
      //updating object
      roomID,
      localSocketID: socket.id,
      username: localUsername,
    })
    .then((res) => {
      if (!res.data) {
        console.log("Room does not exist.");
        return;
      }
      currentRoom = res.data;
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
                    <input type="text" placeholder="Chat Message" id="chat-input">
                    <button id="chat-button">Chat</button>
                </form>
            </div>
            <div class="start-game-container" id="start-game-container">
            </div>
        </div>
        `;
      playerLobbyCreation();
    });
}
function playerLobbyCreation() {
  //inside http put promise.
  chatMessages = document.getElementById("game-chat");
  form = document.getElementById("game-chat-form");
  chatInput = document.getElementById("chat-input");
  chatButton = document.getElementById("chat-button");
  addChatListener();
  roomName = document.getElementById("game-room-name");
  idlePlayers = document.getElementById("game-idle-players");
  teams = document.getElementById("game-teams-grid");
  rounds = document.getElementById("rounds");
  drawTime = document.getElementById("draw-time");
  maxTeams = document.getElementById("max-teams");
  roomName.innerHTML = currentRoom.roomName;
  for (let i = 0; i < currentRoom.teamMaxSettingValue; i++) {
    teams.innerHTML += `
      <div class="team">
          <h3 onclick="joinTeam(${i + 1})" id="team-header-${i + 1}">Team ${
      i + 1
    }</h3>
              <ul id="team-${i + 1}">
              </ul>
          </div>`;
  }
  for (let i = 0; i < currentRoom.idlePlayers.length; i++) {
    //add if host
    idlePlayers.innerHTML += `<li>${currentRoom.idlePlayers[i].username}</li>`;
  }
  rounds.innerHTML = currentRoom.roundSettingValue;
  drawTime.innerHTML = currentRoom.timeSettingValue;
  maxTeams.innerHTML = currentRoom.teamMaxSettingValue;
  socket.emit("joinSocketRoom", currentRoom);
  console.log(currentRoom);
}
