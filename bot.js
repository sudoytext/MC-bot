const mineflayer = require('mineflayer');
const config = require('./config.json');

const bot = mineflayer.createBot({
    host: config.server_ip,
    port: config.server_port || 25565,
    username: config.bot_username,
    version: config.version || false,
});

bot.on('login', () => {
    console.log(`Bot ${config.bot_username} has joined the server!`);
});

bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    bot.chat(`Hello ${username}, you said: ${message}`);
});

bot.on('error', (err) => console.log(`Error: ${err}`));
bot.on('end', () => console.log('Bot disconnected.'));

setInterval(() => {
    const yaw = Math.random() * Math.PI * 2;
    bot.look(yaw, 0, false);
    bot.setControlState('forward', true);
    bot.setControlState('jump', true);
    setTimeout(() => {
        bot.setControlState('forward', false);
        bot.setControlState('jump', false);
    }, 1000); // Move and jump for 1 second Jumping is not fully functional!
}, 10000);
