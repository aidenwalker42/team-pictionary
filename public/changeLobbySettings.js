let currentRoundValue;
let currentDrawTimeValue;
let currentMaxTeamsValue;

function settingsChange(num) {
  currentRoundValue = parseInt(rounds.innerHTML);
  currentDrawTimeValue = parseInt(drawTime.innerHTML);
  currentMaxTeamsValue = parseInt(maxTeams.innerHTML);
  console.log("hit");
  console.log(currentMaxTeamsValue);
  switch (num) {
    case 1:
      if (currentRoundValue > 1) {
        rounds.innerHTML = currentRoundValue - 1;
      }
      break;
    case 2:
      if (currentRoundValue < 5) {
        rounds.innerHTML = currentRoundValue + 1;
      }
      break;
    case 3:
      if (currentDrawTimeValue > 10) {
        drawTime.innerHTML = currentDrawTimeValue - 10;
      }
      break;
    case 4:
      if (currentDrawTimeValue < 120) {
        drawTime.innerHTML = currentDrawTimeValue + 10;
      }
      break;
    case 5:
      if (currentMaxTeamsValue > 2) {
        maxTeams.innerHTML = currentMaxTeamsValue - 1;
      }
      break;
    case 6:
      if (currentMaxTeamsValue < 6) {
        maxTeams.innerHTML = currentMaxTeamsValue + 1;
      }
      break;
  }
}

function editLobbySettings() {
  //show edit buttons
  //edit button
  lobbySettingsDOM = document.getElementById("lobby-settings");
  lobbySettingsDOM.innerHTML = `
  <div class="settings-item">
    <h4>Rounds: </h4>
    <div>
        <button class="inc-button" onclick="settingsChange(1)">-</button>
        <span id="rounds" class="settings-span">${currentRoom.roundSettingValue}</span>
        <button class="inc-button" onclick="settingsChange(2)">+</button>
    </div>
  </div>
  <div class="settings-item">
    <h4>Draw Time: </h4>
    <div>
        <button class="inc-button" onclick="settingsChange(3)">-</button>
        <span id="draw-time" class="settings-span">${currentRoom.timeSettingValue}</span>
        <button class="inc-button" onclick="settingsChange(4)">+</button>
    </div>
  </div>
  <div class="settings-item">
    <h4>Max Teams: </h4>
    <div>
        <button class="inc-button" onclick="settingsChange(5)">-</button>
        <span id="max-teams" class="settings-span">${currentRoom.teamMaxSettingValue}</span>
        <button class="inc-button" onclick="settingsChange(6)">+</button>
    </div>
  </div>
  <button class="big-button green" onclick="applyLobbySettings()">Apply Settings</button>`;
  rounds = document.getElementById("rounds");
  drawTime = document.getElementById("draw-time");
  maxTeams = document.getElementById("max-teams");
}

function applyLobbySettings() {
  //on clicking applySettings
  currentRoundValue = parseInt(rounds.innerHTML);
  currentDrawTimeValue = parseInt(drawTime.innerHTML);
  currentMaxTeamsValue = parseInt(maxTeams.innerHTML);
  socket.emit(
    "settingsChanged",
    currentRoom.id,
    currentRoundValue,
    currentDrawTimeValue,
    currentMaxTeamsValue
  ); //goes to server then goes to global
}

//dont change object property until apply settings???
//problem is that whenever player joins, code is trying to reference their object or something.
//
