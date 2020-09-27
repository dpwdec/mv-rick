
'use strict';

require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const Reception = require('./reception');

const reception = new Reception('./emojiReception.json');
const activeChannel = '322312912419028993';
const messageReportMap = {};

//759690596913905664 => dev channel
//322312912419028993 => mv channel

client.once('ready', () => {
	console.log('Ready!');
});

// client.on('message', message => {
//   // console.log(message.channel.id);
//   // if(message.channel.id == '759690596913905664' && !(message.author instanceof Discord.ClientUser)) {
//   //   message.channel.send('🐈');
//   // }
// });

client.on('messageReactionAdd', async (reaction, user) => {
  if(reaction.message.channel != activeChannel) { return }

  const rMessage = reaction.message;

  let reactionList = {};
  Array.from(rMessage.reactions.cache.keys()).forEach(key => {
    reactionList[key] = rMessage.reactions.cache.get(key).count;
  })

  const verdict = `The reception to this video is ${reception.getReception(reactionList)}.`;

  // create a new message if one doesn't exist with the verdict
  if(messageReportMap[rMessage.id] == undefined) {
    const botMessage = await rMessage.channel.send(verdict);
    messageReportMap[rMessage.id] = botMessage.id;
  // otherwise load the previous message associated with the verdict and update it
  } else {
    const botMessage = await rMessage.channel.messages.fetch(messageReportMap[rMessage.id]);
    // only edit the message if it changed
    if(verdict == botMessage.content) { return }
    botMessage.edit(verdict);
  }
});

client.login(process.env.PROD_CLIENT_ID);