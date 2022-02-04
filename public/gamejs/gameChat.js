function addGameChatListener() {
  console.log("adding listener");
  gameForm = document.getElementById("ingame-chat-form");
  gameChatInput = document.getElementById("game-chat-input");
  gameForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (gameChatInput.value) {
      //if not blank
      socket.emit(
        "gameMessage",
        localUsername,
        gameChatInput.value,
        currentRoom.id,
        socket.id,
        yourTeamNumber,
        greenText
      );
      gameChatInput.value = ""; //clear
    }
  });
}
//yourTeamNumber is +1
socket.on("gameMessage", (username, chat, sID, teamID, greenMessage) => {
  chatMessages = document.getElementById("chat-messages-list");
  if (!greenMessage && chat === currentWord) {
    wordGuessed(teamID, globalTime);
    console.log("PING");
  } else if (greenMessage && greenText) {
    if (sID === socket.id) {
      if (socket.id === currentRoom.host.id) {
        chatMessages.innerHTML += `<li class="green-text"><h4 class="player-host">${username} (You)</h4>: ${chat}</li><br />`;
      } else {
        chatMessages.innerHTML += `<li class="green-text"><h4 class="player-local">${username} (You)</h4>: ${chat}</li><br />`;
      }
    } else if (sID === currentRoom.host.id) {
      chatMessages.innerHTML += `<li class="green-text"><h4 class="player-host">${username}</h4>: ${chat}</li><br />`;
    } else {
      chatMessages.innerHTML += `<li class="green-text"><h4>${username}</h4>: ${chat}</li><br />`;
    }
  } else if (!greenMessage && sID === socket.id) {
    if (socket.id === currentRoom.host.id) {
      chatMessages.innerHTML += `<li><h4 class="player-host">${username} (You)</h4>: ${chat}</li><br />`;
    } else {
      chatMessages.innerHTML += `<li><h4 class="player-local">${username} (You)</h4>: ${chat}</li><br />`;
    }
  } else if (!greenMessage && sID === currentRoom.host.id) {
    chatMessages.innerHTML += `<li><h4 class="player-host">${username}</h4>: ${chat}</li><br />`;
  } else if (!greenMessage) {
    chatMessages.innerHTML += `<li><h4>${username}</h4>: ${chat}</li><br />`;
  }
  let container = document.getElementById("ingame-chat");
  container.scrollTo(0, container.scrollHeight);
});
