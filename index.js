const Discord = require('discord.js');
require('dotenv').config();
const fetch = require("node-fetch-commonjs");

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildVoiceStates,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent
  ]
});

const webhookUrl = process.env.API;

function send(q) {
    const messageData = {
        text: q,
    };

    fetch(webhookUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
    })
        .then((response) => {
            if (response.ok) {
                console.log("Message sent successfully");
            } else {
                console.error(
                    `Failed to send message. Error: ${response.status} ${response.statusText}`
                );
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

client.on('ready', () => {
    console.log("Started and Running")
});

client.on('messageCreate', (message) => {
    if(message.channel.id !== "1153958075548573756") return;
    send(message.content)
})

client.login(process.env.TOKEN)