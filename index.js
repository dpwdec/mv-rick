
'use strict';

require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

const activeChannel = '759690596913905664';

const messageReportMap = {};

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
  if(message.channel.id == '759690596913905664' && !(message.author instanceof Discord.ClientUser)) {
    message.channel.send('🐈');
  }
});

client.on('messageReactionAdd', async (reaction, user) => {
  if(reaction.message.channel != activeChannel) { return }

  const rMessage = reaction.message;

  // console.log(rMessage.reactions.cache);

  if(messageReportMap[rMessage.id] == undefined) {
    const botMessage = await rMessage.channel.send(`The reaction to the message is ${reaction.emoji}`);
    messageReportMap[rMessage.id] = botMessage.id;
  } else {
    const botMessage = await rMessage.channel.messages.fetch(messageReportMap[rMessage.id]);
    let emojiList = '';
    Array.from(rMessage.reactions.cache.keys()).forEach(key => emojiList += key);
    botMessage.edit(`The reaction to the message is ${emojiList}`);
  }
});

// read in JSON file with all the emoji as keys and whether they are negative, positive, or mixed, or if its all one emoji that is the reception of the video.

client.login(process.env.CLIENT_ID);