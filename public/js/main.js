const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const usersList = document.getElementById("users");
const socket = io();

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

socket.emit("joinRoom", { username, room });

socket.on("message", (message) => {
  console.log(message);
  outPutMessage(message);
  //Scroll Down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

//
socket.on("roomUsers", ({ room, users }) => {
  outPutRoomName(room);
  outPutUsers(users);
});
//Message Submit
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const message = e.target.elements.msg.value;
  socket.emit("chatmessage", message);
  chatForm.reset();
});

//
const outPutMessage = (message) => {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">${message.userName + " "}<span>${
    message.time
  }</span></p>
  <p class="text">
     ${message.text}
  </p>`;
  document.querySelector(".chat-messages").appendChild(div);
};

// Add roon Name to DOM
function outPutRoomName(room) {
  roomName.innerText = room;
}

//Add Users to DOm
function outPutUsers(users) {
  usersList.innerHTML = `
  ${users.map((user) => `<li>${user.username}</li>`).join("")}
  `;
}
