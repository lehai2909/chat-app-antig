const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

// Store connected clients: { username: ws }
const clients = {};

wss.on('connection', (ws) => {
    let currentUser = null;

    console.log('New client connected');

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            console.log('Received:', data);

            switch (data.type) {
                case 'login':
                    currentUser = data.username;
                    // Store user info object instead of just socket
                    clients[currentUser] = {
                        ws: ws,
                        info: {
                            username: data.username,
                            avatar: data.avatar
                        }
                    };
                    console.log(`${currentUser} logged in`);
                    broadcastUserList();
                    break;

                case 'message':
                    // { type: 'message', from: 'A', to: 'B', content: '...' }
                    const targetClient = clients[data.to];
                    if (targetClient && targetClient.ws.readyState === WebSocket.OPEN) {
                        targetClient.ws.send(JSON.stringify({
                            type: 'receive_message',
                            from: data.from,
                            to: data.to,
                            content: data.content,
                            msgType: data.msgType || 'text' // handle text/image/video
                        }));
                    } else {
                        // Optional: Handle offline user
                        // For now, maybe echo back error? Or simply ignore
                        console.log(`User ${data.to} not found or offline`);
                    }
                    break;

                default:
                    break;
            }
        } catch (e) {
            console.error('Error parsing message:', e);
        }
    });

    ws.on('close', () => {
        if (currentUser) {
            console.log(`${currentUser} disconnected`);
            delete clients[currentUser];
            broadcastUserList();
        }
    });

    ws.on('error', (err) => {
        console.error(`Client error: ${err}`);
    });
});

function broadcastUserList() {
    const users = Object.values(clients).map(client => client.info);
    const message = JSON.stringify({
        type: 'users',
        users: users
    });

    Object.values(clients).forEach((client) => {
        if (client.ws.readyState === WebSocket.OPEN) {
            client.ws.send(message);
        }
    });
}

console.log('WebSocket server started on ws://localhost:8080');
