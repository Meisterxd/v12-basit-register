const Discord = require('discord.js')
require('discord-reply');
const meister = require('../meister.json')

const client = new Discord.Client();

exports.run = async (client, message, args) => {

if(!message.member.roles.cache.has('860194541265092629') && !message.member.hasPermission("MANAGE_ROLES")) return message.lineReply(`**Bu işlemi gerçekleştirmek için gerekli yetkin yok!**`)

const taglı = message.mentions.members.first() || args[0];

if(!taglı) return message.lineReply(`**${message.author} Lütfen taglı rolünü vermem için bir kişiyi etiketle! Ör: .taglı <@meister/id>**`)

taglı.roles.add(meister.erkekrol)

return message.lineReply(`Başarı ile ${taglı} adlı kişiye taglı rolünü verdim!`)

client.channels.cache.get(meister.kayıtlog).send(`**${message.author}, ${taglı} adlı kişiye tag aldırdı!**`)


}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["tagges", "tagli"]
};

exports.help = {
  name: 'taglı',
  description: '',
  usage: ''
};