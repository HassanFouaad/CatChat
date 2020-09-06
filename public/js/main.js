const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const socket = io();

socket.on("message", (message) => {
  console.log(message);
  outPutMessage(message);
  //Scroll Down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

//Message Submit
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const message = e.target.elements.msg.value;
  socket.emit("chatmessage", message);
});

//
const outPutMessage = (message) => {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">${
    message.userName + " "
  }<span>9:12pm</span></p>
  <p class="text">
     ${message.text}
  </p>`;
  document.querySelector(".chat-messages").appendChild(div);
};
