// Utility function to get DOM elements

function get(selector) {
  return document.querySelector(selector); 
}

// Utility function to format date
function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();
  return `${h.slice(-2)}:${m.slice(-2)}`;
}

const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

const socket = new WebSocket(`ws://${location.host}`);
let PERSON_NAME = '';
const PERSON_IMG = 'https://image.flaticon.com/icons/svg/145/145867.svg';

socket.addEventListener('open', () => {
  console.log('🟢 Connected');
});

socket.addEventListener('message', event => {
  const data = JSON.parse(event.data);
  if (data.type === 'welcome') {
    PERSON_NAME = data.name;
  }
  else if (data.type === 'chat') {
    appendMessage(data.fromName, PERSON_IMG, 'left', data.text);
  }
});

msgerForm.addEventListener("submit", event => {
  event.preventDefault();
  const text = msgerInput.value.trim();
  if (!text) return;
  appendMessage(PERSON_NAME, PERSON_IMG, "right", text);
  socket.send(JSON.stringify({ type: 'chat', text }));
  msgerInput.value = "";
});

function appendMessage(name, img, side, text) {
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>
      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>
        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;
  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

// Utility function to get user name
function getUserName() {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? user.name : 'Guest';
}

