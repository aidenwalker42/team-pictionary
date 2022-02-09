const socket = io.connect();
//"ws://localhost:5500"
let localSocketID = socket.id;

const section = document.getElementById("main-container");
let lobbySettingsDOM;
let startGameButton;
let timeSetting;
let roundSetting;
let teamMaxSetting;
let localUsername;
const BaseURL = "https://teampictionary.herokuapp.com/rooms";
//http://localhost:5500/rooms
// https://teampictionary.herokuapp.com/rooms

let roomName;
let idlePlayers;
let teams;
let rounds;
let drawTime;
let maxTeams;

let chatMessages;
let form;
let chatInput;
let chatButton;

let editLobbySettingsClicked;

let wordPickerPlayer;
let theActiveTeam;
let theActiveTeamNumber;
let currentRound;
let currentWord;
let yourTeamNumber;
let inOverlay;

let globalTime;

let gameForm;
let gameChatInput;
let greenText;

let guessingTeamsLeft;

let clock;

let firstload = true;

function updateUsernameClasses(roomObject) {
  // teams.innerHTML = "";
  console.log("updateLobby");
  currentRoom = roomObject;
  idlePlayers = document.getElementById("game-idle-players");
  idlePlayers.innerHTML = "";
  console.log(roomObject);
  for (let i = 0; i < roomObject.idlePlayers.length; i++) {
    if (roomObject.host.id === roomObject.idlePlayers[i].id) {
      //if host
      if (roomObject.host.id === socket.id) {
        //if host and you
        idlePlayers.innerHTML += `<li class="player-host">${roomObject.idlePlayers[i].username} (You)</li>`;
      } else {
        idlePlayers.innerHTML += `<li class="player-host">${roomObject.idlePlayers[i].username}</li>`;
      }
    } else if (roomObject.idlePlayers[i].id === socket.id) {
      idlePlayers.innerHTML += `<li class="player-local">${roomObject.idlePlayers[i].username} (You)</li>`;
    } else {
      idlePlayers.innerHTML += `<li>${roomObject.idlePlayers[i].username}</li>`;
    }
  }
  teams.innerHTML = "";
  for (let i = 0; i < roomObject.teamMaxSettingValue; i++) {
    teams.innerHTML += `
      <div class="team">
          <h3 onclick="joinTeam(${i + 1})" id="team-header-${i + 1}">Team ${
      i + 1
    }</h3>
              <ul id="team-${i + 1}">
              </ul>
          </div>`;
  }
  for (let i = 0; i < roomObject.teamMaxSettingValue; i++) {
    for (let j = 0; j < 2; j++) {
      if (roomObject.teams[i][i + 1][j]) {
        if (roomObject.teams[i][i + 1][j].id === roomObject.host.id) {
          if (roomObject.host.id === socket.id) {
            document.getElementById(
              `team-${i + 1}`
            ).innerHTML += `<li class="player-host">${
              roomObject.teams[i][i + 1][j].username
            } (You)</li>`;
          } else {
            document.getElementById(
              `team-${i + 1}`
            ).innerHTML += `<li class="player-host">${
              roomObject.teams[i][i + 1][j].username
            }</li>`;
          }
        } else if (roomObject.teams[i][i + 1][j].id === socket.id) {
          document.getElementById(
            `team-${i + 1}`
          ).innerHTML += `<li class="player-local">${
            roomObject.teams[i][i + 1][j].username
          } (You)</li>`;
        } else {
          document.getElementById(`team-${i + 1}`).innerHTML += `<li>${
            roomObject.teams[i][i + 1][j].username
          }</li>`;
        }
      }
    }
  }
}

function displayHostControls() {
  //ignore syntax highlight
  lobbySettingsDOM = document.getElementById("lobby-settings");
  lobbySettingsDOM.innerHTML = `
  <div class="settings-item">
    <h4>Rounds: </h4>
    <div>
        
        <span id="rounds" class="settings-span">${currentRoom.roundSettingValue}</span>

    </div>
  </div>
  <div class="settings-item">
    <h4>Draw Time: </h4>
    <div>

        <span id="draw-time" class="settings-span">${currentRoom.timeSettingValue}</span>

    </div>
  </div>
  <div class="settings-item">
    <h4>Max Teams: </h4>
    <div>

        <span id="max-teams" class="settings-span">${currentRoom.teamMaxSettingValue}</span>

    </div>
  </div>
  <button class="big-button blue" onclick="editLobbySettings()">Change Settings</button>
  `;
  startGameButton = document.getElementById("start-game-container");
  startGameButton.innerHTML = `<button class="start-game-button" onclick="startGame()">Start Game</button>`;
}

socket.on("userJoinedLobby", (roomObject) => {
  // if (username === localUsername) {
  //   //add class
  // }
  // idlePlayers.innerHTML += `<li>${username}</li>`;
  currentRoom = roomObject;
  updateUsernameClasses(roomObject);
});

socket.on("playerLeft", (roomObject) => {
  let previousRoom = currentRoom;
  currentRoom = roomObject;
  console.log(currentRoom);
  if (roomObject.inProgress) {
    //if game is going on
    displayTeams(currentRoom);
    gameLeaveHandler(currentRoom, previousRoom);
    checkWhichPlayer();
    return;
  }
  //if in game then different render
  updateUsernameClasses(currentRoom);
  if (socket.id === roomObject.host.id) {
    displayHostControls();
  }
});

socket.on("alert", (msg) => {
  alert(msg);
});

socket.on("playerJoinTeam", (roomObject) => {
  console.log(roomObject.teams);
  currentRoom = roomObject;
  updateUsernameClasses(currentRoom);
});

socket.on("settingsChanged", (roomObject) => {
  if (currentRoom.teamMaxSettingValue !== roomObject.teamMaxSettingValue) {
    updateUsernameClasses(roomObject);
  }
  currentRoom = roomObject;
  lobbySettingsDOM = document.getElementById("lobby-settings");
  lobbySettingsDOM.innerHTML = `
  <div class="settings-item">
    <h4>Rounds: </h4>
    <div>
        
        <span id="rounds" class="settings-span">${currentRoom.roundSettingValue}</span>

    </div>
  </div>
  <div class="settings-item">
    <h4>Draw Time: </h4>
    <div>

        <span id="draw-time" class="settings-span">${currentRoom.timeSettingValue}</span>

    </div>
  </div>
  <div class="settings-item">
    <h4>Max Teams: </h4>
    <div>

        <span id="max-teams" class="settings-span">${currentRoom.teamMaxSettingValue}</span>

    </div>
  </div>
  `;
  if (socket.id === currentRoom.host.id) {
    lobbySettingsDOM.innerHTML += `<button class="big-button blue" onclick="editLobbySettings()">Change Settings</button>`;
  }
});

socket.on("endGame", (roomObject) => {
  currentRoom = roomObject;
});
