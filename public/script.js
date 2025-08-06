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

// Get the current host and protocol
const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
const host = window.location.host;
const socket = new WebSocket(`${protocol}//${host}`);

let PERSON_NAME = '';
let PERSON_ICON = '';

socket.addEventListener('open', () => {
  console.log('🟢 Connected');
});

socket.addEventListener('message', event => {
  const data = JSON.parse(event.data);
  if (data.type === 'welcome') {
    PERSON_NAME = data.name;
    PERSON_ICON = data.iconUrl;
  }
  else if (data.type === 'chat') {
    // All incoming messages from server are from other users (left side)
    appendMessage(data.fromName, data.iconUrl, 'left', data.text, data.messageId);
  }
  else if (data.type === 'edit') {
    // Handle message editing
    console.log('Received edit:', data.messageId, data.text);
    editMessage(data.messageId, data.text);
  }
});

msgerForm.addEventListener("submit", event => {
  event.preventDefault();
  const text = msgerInput.value.trim();
  if (!text) return;
  
  // Generate message ID
  const messageId = crypto.randomUUID();
  
  // Display user's own message immediately on the right side
  appendMessage(PERSON_NAME, PERSON_ICON, "right", text, messageId);
  
  // Send to server for broadcasting to others
  socket.send(JSON.stringify({ type: 'chat', text, messageId }));
  msgerInput.value = "";
});

function appendMessage(name, img, side, text, messageId) {
  const isOwnMessage = side === 'right';
  const editButton = isOwnMessage ? `<button class="edit-btn" onclick="editMessage('${messageId}')">✏️</button>` : '';
  
  const msgHTML = `
    <div class="msg ${side}-msg" data-message-id="${messageId}">
      <div class="msg-img" style="background-image: url(${img})"></div>
      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
          ${editButton}
        </div>
        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;
  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

function editMessage(messageId, newText = null) {
  console.log('editMessage called:', messageId, newText);
  const messageElement = document.querySelector(`[data-message-id="${messageId}"]`);
  if (!messageElement) {
    console.log('Message element not found for ID:', messageId);
    return;
  }
  
  if (newText !== null) {
    // Update message text (for incoming edits)
    const msgTextElement = messageElement.querySelector('.msg-text');
    if (msgTextElement) {
      msgTextElement.textContent = newText;
    }
    return;
  }
  
  // Start editing (for own messages)
  const msgTextElement = messageElement.querySelector('.msg-text');
  const currentText = msgTextElement.textContent;
  
  // Create input field
  const input = document.createElement('input');
  input.type = 'text';
  input.value = currentText;
  input.className = 'edit-input';
  
  // Replace text with input
  msgTextElement.innerHTML = '';
  msgTextElement.appendChild(input);
  input.focus();
  
  // Handle save/cancel
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const newText = input.value.trim();
      if (newText && newText !== currentText) {
        msgTextElement.textContent = newText;
        // Send edit to server
        socket.send(JSON.stringify({ 
          type: 'edit', 
          messageId, 
          text: newText 
        }));
      } else {
        msgTextElement.textContent = currentText;
      }
    } else if (e.key === 'Escape') {
      msgTextElement.textContent = currentText;
    }
  });
  
  input.addEventListener('blur', () => {
    msgTextElement.textContent = currentText;
  });
}



