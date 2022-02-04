function addChatListener() {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (chatInput.value) {
      //if not blank
      socket.emit(
        "message",
        localUsername,
        chatInput.value,
        currentRoom.id,
        socket.id
      );
      chatInput.value = ""; //clear
    }
  });
}

// let chatMessages;
// let form;
// let chatInput;
// let chatButton;

socket.on("message", (username, chat, sID) => {
  if (sID === socket.id) {
    if (socket.id === currentRoom.host.id) {
      chatMessages.innerHTML += `<li><h4 class="player-host">${username} (You)</h4>: ${chat}</li>`;
    } else {
      chatMessages.innerHTML += `<li><h4 class="player-local">${username} (You)</h4>: ${chat}</li>`;
    }
  } else if (sID === currentRoom.host.id) {
    chatMessages.innerHTML += `<li><h4 class="player-host">${username}</h4>: ${chat}</li>`;
  } else {
    chatMessages.innerHTML += `<li><h4>${username}</h4>: ${chat}</li>`;
  }
  let container = document.getElementById("chats");
  container.scrollTo(0, container.scrollHeight);
});
