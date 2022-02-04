const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: { origin: "*" },
});
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);
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
  socket.on("message", (username, chat, id, sID) => {
    io.to(id).emit("message", username, chat, sID);
  });
  socket.on("gameMessage", (username, chat, id, sID, teamID, greenText) => {
    io.to(id).emit("gameMessage", username, chat, sID, teamID, greenText);
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
  socket.on("startGame", (roomObject) => {
    let index = findRoomIndex(roomObject.id);
    rooms[index].inProgress = true;
    io.to(roomObject.id).emit("startGame", rooms[index]);
  });
  socket.on("setWord", (word, roomObject) => {
    io.to(roomObject.id).emit("setWord", word);
  });
  socket.on("points", (points, id) => {
    let index = findRoomIndex(id);
    rooms[index].points = points; //adding points array
    io.to(id).emit("points", rooms[index]);
  });
  socket.on("addPoints", (amt, teamID, id) => {
    let index = findRoomIndex(id);
    rooms[index].points[teamID] += amt / rooms[index].players.length; //FIX THIS SHIT BRO
    console.log(amt);
    io.to(id).emit("addPoints", teamID, rooms[index]);
  });
  socket.on("tick", (time, id) => {
    io.to(id).emit("tick", time);
  });
  socket.on("disconnect", () => {
    if (!rooms) {
      console.log("no rooms exist");
      return;
    }
    let [index, jIndex] = findPlayerInRoom(socket.id); //get indexes
    console.log(index, jIndex);
    if (index === null) {
      console.log("Player was not found, or player not in room");
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
          console.log("removed player from team"); //remove player from team
          break;
        }
      }
      let playerInIdle = rooms[index].idlePlayers.findIndex(
        (item) => item.id === socket.id
      );
      if (playerInIdle !== -1) {
        rooms[index].idlePlayers.splice(playerInIdle, 1);
        console.log("removed player from idle"); //remove player from idle
      }
    }
    //switch host
    if (rooms[index].players[0] !== rooms[index].host) {
      //if first player joined is not host
      try {
        rooms[index].host = {
          id: rooms[index].players[0].id,
          username: rooms[index].players[0].username,
        };
        console.log("host transferred"); //host is now first player, next in line type thing
      } catch {
        console.log("cannot switch host, deleting room now.");
      }
    }

    //delete when no players
    console.log(rooms[index]);
    if (rooms[index].players.length === 0) {
      //if no players in room
      rooms.splice(index, 1); //remove room
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
  console.log("Player in room not found");
  return [null, null];
}
