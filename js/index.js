let streamers = [
  "ESL_SC2",
  "OgamingSC2",
  "cretetion",
  "freecodecamp",
  "storbeck",
  "habathcx",
  "RobotCaleb",
  "noobs2ninjas"
];

function generateChannel() {
  streamers.map(function(element) {
    let channel = element;
    let fccurl =
      "https://wind-bow.gomix.me/twitch-api/channels/freecodecamp?callback=?";

    function createURL(type, channel) {
      return (
        "https://wind-bow.gomix.me/twitch-api/" +
        type +
        "/" +
        channel +
        "?callback=?"
      );
    }

    $.getJSON(createURL("streams", channel), function(data) {
      let channelLive = "";

      if (data.stream === null) {
        channelLive = "offline";
      } else {
        channelLive = "online";
      }

      $.getJSON(createURL("channels", channel), function(data) {
        if (channel == "freecodecamp") {
          let fccStatus = document.getElementById("fccstatus");
          if (channelLive == "offline") {
            fccStatus.innerText = "offline";
          } else {
            fccStatus.innerText = "online!";
          }
        }

        let headerRow = document.getElementById("header-row");
        let rowChannel = document.createElement("div");
        rowChannel.classList.add("row", "channel");
        headerRow.after(rowChannel);

        // add channel logo
        let channelImg = data.logo;
        let divImg = document.createElement("div");
        divImg.classList.add(
          "col-md-2",
          "channel__logo",
          "center",
          "hidden-sm",
          "hidden-xs"
        );
        divImg.innerHTML =
          "<img class='img-circle' src='" +
          data.logo +
          "' alt='" +
          data.display_name +
          "' />";
        rowChannel.appendChild(divImg);

        //add channel name
        let channelName = data.display_name;
        let nameDiv = document.createElement("h4");
        nameDiv.classList.add("col-md-3", "col-xs-5", "name");
        nameDiv.innerHTML =
          "<a class='channel__link' href='https://go.twitch.tv/" +
          data.name +
          "'><p class='channel__name'>" +
          data.display_name +
          "</p></a>";
        rowChannel.append(nameDiv);

        //add status
        let channelStatus = data.status;
        let statusDiv = document.createElement("div");
        statusDiv.classList.add("col-md-7", "col-xs-7", "channel__status");

        if (channelLive == "online") {
          // console.log(data);
          statusDiv.innerHTML = "<p class='channel__status'><strong> Currently playing: "+ data.game+"</strong></p><p class='channel__status'> Views: "+ data.views+"</p>";
          rowChannel.append(statusDiv);
          rowChannel.style.borderLeft = "10px solid #297929";
          let onlineStatus = document.createElement("p");
          onlineStatus.innerHTML = "<span class='channel--isOnline'>is streaming!</span>";
          nameDiv.appendChild(onlineStatus);
        } else {
          statusDiv.innerHTML = "<p class='statusText'>offline</p>";
          rowChannel.append(statusDiv);
        
        }
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", function(e) {
  generateChannel();
});