const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: { origin: "*" },
});
app.use(express.static("public"));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.use(express.json());
const { v4: uuidV4 } = require("uuid");
let port = process.env.PORT || 5500;
server.listen(port, () => {
  console.log("Server running on port: " + port);
});

let rooms = [];

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("mouseDown", (xPos, yPos) => {
    socket.broadcast.emit("mouseDown", xPos, yPos);
  });
  socket.on("mouseMove", (xPos, yPos) => {
    socket.broadcast.emit("mouseMove", xPos, yPos);
  });
  socket.on("mouseUp", () => {
    socket.broadcast.emit("mouseUp");
  });
  socket.on("clearCanvas", () => {
    socket.broadcast.emit("clearCanvas");
  });
  socket.on("selectColor", (color) => {
    socket.broadcast.emit("selectColor", color);
  });
  socket.on("brushSize", (brushSize) => {
    socket.broadcast.emit("brushSize", brushSize);
  });
  socket.on("joinSocketRoom", (roomObject) => {
    socket.join(roomObject.id);
    io.to(roomObject.id).emit("userJoinedLobby", roomObject);
  });
  socket.on("playerJoinRoom", (username) => {
    //only people in room will see event
    //will put player in idle
    //must change object
  });
  socket.on("message", (username, chat, id, sID) => {
    io.to(id).emit("message", username, chat, sID);
  });
  let currentTeam;
  socket.on("playerJoinTeam", (teamNumber, username, id) => {
    //change object
    //put player in team selected, will probably have to pass things in
    let index = findRoomIndex(id); //might not work
    console.log(index);
    //remove object in idlePlayers where id === id and push object to team # if not full. if full send a bool.
    if (
      rooms[index].teams[teamNumber - 1][teamNumber].findIndex(
        (item) => item.id === socket.id
      ) > -1
    ) {
      io.to(socket.id).emit("alert", "You are already on this team!");
    } else if (rooms[index].teams[teamNumber - 1][teamNumber].length === 2) {
      io.to(socket.id).emit("alert", "That team is full!");
    } else {
      let playerInIdleIndex = rooms[index].idlePlayers.findIndex(
        (item) => item.id === socket.id
      );
      if (playerInIdleIndex !== -1) {
        rooms[index].idlePlayers.splice(playerInIdleIndex, 1); //splice from idle array
        console.log("Spliced!!!!" + playerInIdleIndex);
      }
      rooms[index].teams[teamNumber - 1][teamNumber].push({
        //add to object
        id: socket.id,
        username,
      });
      console.log(currentTeam + "Current Team <");
      if (
        currentTeam &&
        rooms[index].teams[currentTeam - 1] &&
        currentTeam !== teamNumber
      ) {
        // this just splices from last team
        let playerInTeamIndex = rooms[index].teams[currentTeam - 1][
          currentTeam
        ].findIndex((item) => item.id === socket.id);
        rooms[index].teams[currentTeam - 1][currentTeam].splice(
          playerInTeamIndex,
          1
        );
        console.log("Player Moved Teams!");
        console.log(rooms[index].teams[currentTeam - 1][currentTeam]);
      }
      currentTeam = teamNumber;
      io.to(id).emit("playerJoinTeam", rooms[index]);
    }
    console.log(rooms[index].teams[teamNumber - 1][teamNumber]);
  });
  socket.on("settingsChanged", (id, round, time, teams) => {
    let index = findRoomIndex(id);
    if (rooms[index].teams.length !== teams) {
      let teamDifference = teams - rooms[index].teams.length;
      if (teamDifference > 0) {
        for (let i = rooms[index].teams.length; i < teams; i++) {
          rooms[index].teams[i] = { [i + 1]: [] };
        }
        console.log(rooms[index].teams);
      } else {
        //if removing teams
        //put users in deleted teams into idlePlayers
        teamDifference *= -1; // change number to positive
        for (let i = rooms[index].teams.length - 1; i >= teams; i--) {
          console.log("i: " + i);
          console.log(rooms[index].teams[i][i + 1].length);
          console.log(rooms[index].teams[i][i + 1]);
          console.log("bitch ass mofo");
          if (rooms[index].teams[i][i + 1].length > 0) {
            console.log("passed first");
            let playerToIdleOne = rooms[index].teams[i][i + 1][0];
            rooms[index].idlePlayers.push(playerToIdleOne);
            console.log("Second player");
            console.log(rooms[index].teams[i][i + 1][1]);
            if (rooms[index].teams[i][i + 1][1]) {
              console.log("passed second");
              //check if there is a player 2 and push it as well
              let playerToIdleTwo = rooms[index].teams[i][i + 1][1];
              rooms[index].idlePlayers.push(playerToIdleTwo);
            }
          }
          rooms[index].teams.splice(i, 1);
        }
        console.log("MOVED TO IDLE?");
        console.log(rooms[index]);
      }
    }
    rooms[index].roundSettingValue = round;
    rooms[index].timeSettingValue = time;
    rooms[index].teamMaxSettingValue = teams;
    rooms[index].maxPlayers = teams * 2;
    io.to(id).emit("settingsChanged", rooms[index]);
  });
  socket.on("disconnect", () => {
    if (!rooms) {
      console.log("no room");
      return;
    }
    let [index, jIndex] = findPlayerInRoom(socket.id); //get indexes
    console.log(index, jIndex);
    if (index === null) {
      console.log("Player was not found, did not remove player");
      return;
    }
    //delete player who left from object
    if (rooms[index].players[jIndex].id === socket.id) {
      rooms[index].players.splice(jIndex, 1);
      for (let i = 0; i < rooms[index].teamMaxSettingValue; i++) {
        let playerInTeam = rooms[index].teams[i][i + 1].findIndex(
          (item) => item.id === socket.id
        ); //have to change the object
        if (playerInTeam !== -1) {
          rooms[index].teams[i][i + 1].splice(playerInTeam, 1);
          break;
        }
      }
      let playerInIdle = rooms[index].idlePlayers.findIndex(
        (item) => item.id === socket.id
      );
      if (playerInIdle !== -1) {
        rooms[index].idlePlayers.splice(playerInIdle, 1);
      }
    }
    //switch host
    console.log("test " + rooms[index].players[0]);
    if (rooms[index].players[0] !== rooms[index].host) {
      try {
        rooms[index].host = {
          id: rooms[index].players[0].id,
          username: rooms[index].players[0].username,
        };
      } catch {
        console.log(
          "No players in lobby, cannot switch host, deleting room now."
        );
      }
    }

    //delete when no players
    console.log(rooms[index]);
    if (rooms[index].players.length === 0) {
      rooms.splice(index, 1);
      console.log("rooms:" + rooms);
    } else {
      io.to(rooms[index].id).emit("playerLeft", rooms[index]);
    }
  });
});

app.get("/rooms", (req, res) => {
  res.status(200).send(rooms);
});
app.post("/rooms", (req, res) => {
  let roomObj = req.body;
  roomObj.id = uuidV4();
  console.log(roomObj);
  rooms.push(roomObj);
  res.status(200).send(roomObj.id); //resID
});

app.put("/rooms/join", (req, res) => {
  let joiningPlayerID = req.body.localSocketID;
  let joiningPlayerUsername = req.body.username;
  let roomID = req.body.roomID;
  let objectPair = {
    id: joiningPlayerID,
    username: joiningPlayerUsername,
  };
  console.log("ID: " + joiningPlayerID);
  for (let i = 0; i < rooms.length; i++) {
    if (rooms[i].id === roomID) {
      rooms[i].players.push(objectPair);
      rooms[i].idlePlayers.push(objectPair);
      console.log(rooms[i]);
      res.status(200).send(rooms[i]);
      break;
    }
  }
});

function findRoomIndex(roomID) {
  for (let i = 0; i < rooms.length; i++) {
    if (rooms[i].id === roomID) {
      return i; //object
    }
  }
}

function findPlayerInRoom(PlayerID) {
  console.log(PlayerID);
  for (let i = 0; i < rooms.length; i++) {
    for (let j = 0; j < rooms[i].players.length; j++) {
      if (rooms[i].players[j].id === PlayerID) {
        return [i, j];
      }
    }
  }
  console.log("Room not found");
  return [null, null];
}
