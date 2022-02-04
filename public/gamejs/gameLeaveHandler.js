function gameLeaveHandler(currentRoom, previousRoom) {
  //check if player is operating overlay
  for (let i = 0; i < currentRoom.teams.length; i++) {
    if (
      previousRoom.teams[i][i + 1].length >
        currentRoom.teams[i][i + 1].length &&
      currentRoom.teams[i][i + 1].length === 0
    ) {
      guessingTeamsLeft--; //finds the player who left and sees if it disbanded a team or not
    }
  }
  let numberOfTeams = document.getElementsByClassName("game-team").length;
  if (numberOfTeams === 1) {
    alert("Everyone left! please leave the game.");
    return;
  }
  if (
    currentRoom.teams[theActiveTeamNumber][theActiveTeamNumber + 1].length ===
      0 ||
    (currentRoom.teams[theActiveTeamNumber][theActiveTeamNumber + 1].length ===
      1 &&
      !currentWord)
  ) {
    roundEnd(3);
    return;
  }
  if (guessingTeamsLeft === 1) {
    roundEnd(2);
    return;
  }
}
//if(document.getElementById("overlay").innerHTML.includes("Select")||document.getElementById("overlay").innerHTML.includes("Round"))
