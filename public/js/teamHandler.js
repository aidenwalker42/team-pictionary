function joinTeam(teamNumber) {
  //move from idle to team and make sure all other users see the change.
  console.log(currentRoom);
  socket.emit("playerJoinTeam", teamNumber, localUsername, currentRoom.id);
}
