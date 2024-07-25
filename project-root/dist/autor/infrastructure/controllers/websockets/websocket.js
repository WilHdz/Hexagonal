"use strict";
// src/autor/infrastructure/websockets/websocket.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const socket = new WebSocket('ws://192.168.0.25:8080'); // Usa la IP de tu servidor WebSocket
socket.onmessage = (event) => {
    const reader = new FileReader();
    reader.onload = function () {
        try {
            const data = JSON.parse(reader.result);
            if (socket.onmessageParsed) {
                socket.onmessageParsed(data);
            }
        }
        catch (e) {
            console.error("Error parsing JSON:", e);
        }
    };
    reader.readAsText(event.data);
};
const sendMessage = (message) => {
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
    }
    else {
        socket.addEventListener('open', () => {
            socket.send(JSON.stringify(message));
        });
    }
};
exports.sendMessage = sendMessage;
exports.default = socket;
