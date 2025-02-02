


// Import the necessary classes from discord.js
const { Client, GatewayIntentBits, Events } = require('discord.js');
const { token } = require('./config.json'); // Create a config.json file to store your bot token

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, // Enables access to guild (server) data
    GatewayIntentBits.GuildMessages, // Enables access to message events
    GatewayIntentBits.MessageContent, // Enables access to message content (if you want to read messages)
  ],
});

// When the client is ready, run this code (only once)
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Listen for messages
client.on(Events.MessageCreate, (message) => {
  // Ignore messages from bots
  if (message.author.bot) return;

  // Respond to a specific command
  if (message.content === '!ping') {
    message.reply('Pong!');
  }
});

// Log in to Discord with your bot token
client.login('MTMwMzM3NDE2MjUzMzk0MTMzMQ.GgXUT9.x5C1Vhdk7pLA9no9a4Fi-da6xeTOudMZNDa7Vk');
