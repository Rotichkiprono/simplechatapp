const socket = io('http://localhost:3000');
const messageContainer = document.querySelector('#message-container');  // Use querySelector for single element
const messageForm = document.querySelector('.message-input-container'); // Use correct class name
const messageInput = document.querySelector('#message-input');  // Use ID for specific element

const name = prompt("What is your name?");
appendMessage(`${name} joined chat`);  // Include user name in message
socket.emit('new-user', name);

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
    appendMessage(`${name} connected`)
})
socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`)
})

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`you: ${message}`);
    socket.emit('send-chat-message', message);
    messageInput.value = '';
});

function appendMessage(message){
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}