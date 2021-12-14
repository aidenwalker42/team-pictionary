function createRoomLoader() {
  timeSetting = document.getElementById("draw-time"); //global
  roundSetting = document.getElementById("rounds");
  teamMaxSetting = document.getElementById("max-teams");
  console.log("done");
  console.log(localUsername);
}

function roundMinus() {
  settingChanger(roundSetting, 1, 1, false);
}
function roundPlus() {
  settingChanger(roundSetting, 5, 1, true);
}
function drawTimeMinus() {
  settingChanger(timeSetting, 10, 10, false);
}
function drawTimePlus() {
  settingChanger(timeSetting, 120, 10, true);
}
function teamMinus() {
  settingChanger(teamMaxSetting, 2, 1, false);
}
function teamPlus() {
  settingChanger(teamMaxSetting, 6, 1, true);
}

function createRoom() {
  // ran when create Room is pressed.
  let timeSettingValue = parseInt(timeSetting.textContent);
  let roundSettingValue = parseInt(roundSetting.textContent);
  let teamMaxSettingValue = parseInt(teamMaxSetting.textContent);
  roomName = document.getElementById("room-name").value; //global
  //send object with all the settings to server which will then store to list of active games
  //dont let create Room twice
  let roomObj = {
    host: { id: socket.id, username: localUsername },
    roomName,
    socketID: socket.id,
    timeSettingValue,
    roundSettingValue,
    teamMaxSettingValue,
    maxPlayers: teamMaxSettingValue * 2,
    players: [{ id: socket.id, username: localUsername }],
    teams: [],
    idlePlayers: [{ id: socket.id, username: localUsername }],
  };
  for (let i = 0; i < teamMaxSettingValue; i++) {
    roomObj.teams[i] = {
      [i + 1]: [],
    };
  }
  console.log(roomObj);
  axios.post(BaseURL, roomObj).then((res) => {
    let resID = res.data;
    btnCreateRoom(resID);
  });
}

function settingChanger(element, range, increment, bool) {
  //bool = true when increasing vice versa
  //element = element.value
  //range = the max or min value
  //increment = increment of setting
  let elementValue = parseInt(element.textContent);
  if (bool) {
    if (elementValue < range) {
      element.innerHTML = elementValue + increment;
    } else {
      //message
      console.log("range reached");
    }
  } else {
    if (elementValue > range) {
      element.innerHTML = elementValue - increment;
    } else {
      //message
      console.log("range reached");
    }
  }
}
