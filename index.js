const Discord = require('discord.js');
require('dotenv').config();
const express = require('express');
const send = require('./webhook.js');

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildVoiceStates,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent
  ]
});

const webhooks = [
    process.env.API
]

client.on('ready', () => {
    console.log("Started and Running")
});

client.on('messageCreate', (message) => {
    if(message.channel.id !== "1153958075548573756") return;
    send(message.content, webhooks)
})

let app = express();
app.get("/", (req, res) => {
    res.send("Running");
});
app.listen(3000, () => {
    console.log("Server started on port 3000");
});

client.login(process.env.TOKEN)