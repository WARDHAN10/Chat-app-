const chatForm = document.getElementById("chat-form");
const ChatMess = document.querySelector(".chat-messages");
const socket = io();
//get usernname

const { username } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

console.log(username);
socket.on("message", (message) => {
  console.log(message);
  outputMessage(message);
  //scrooll down
  ChatMess.scrollTop = ChatMess.scrollHeight;
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const mess = e.target.elements.msg.value;
  // emit a msg to server
  console.log(mess);
  socket.emit("chatMessage", mess);

  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

//output message to DOM

function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `
  <p class="meta">${message.username} <span>9:12pm</span></p>

    <p class="text">
      ${message.text}
    </p>`;

  document.querySelector(".chat-messages").appendChild(div);
}
