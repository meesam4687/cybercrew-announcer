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
    if (message.channel.id !== "1153958075548573756") return;
    send(message.content.replace(/(<@(.+)>)/g, ""), webhooks)
    fetch("https://api.llama-api.com/chat/completions", {
        method: 'post',
        body: JSON.stringify({
            "model": "llama3-70b",
            "messages": [
                { "role": "user", "content": "I want you to help me moderate a discord server for cybercrew. I want the chat to be clean, not offensive and always be to the point. No random nonsense or people playing around. I will be sending you a message, you have to check if that message is allowed or not. If the message is allowed then reply with OK if not the reply with NOK. ONLY REPLY WITH OK OR NOK, NOTHING ELSE" },
                { "role": "user", "content": message.content }
            ]
        }),
        headers: { 'Authorization': `Bearer ${process.env.LLAMA}`, 'Content-Type': 'application/json' }
    }).then(response => response.json()).then(data => {
        if (data.choices[0].message.content == 'NOK') {
            message.delete()
        }
    })
})

let app = express();
app.get("/", (req, res) => {
    res.send("Running");
});
app.listen(3000, () => {
    console.log("Server started on port 3000");
});



client.login(process.env.TOKEN)