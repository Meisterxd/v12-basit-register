const Discord = require('discord.js')
const meister = require('../meister.json')

const client = new Discord.Client();

exports.run = async (client, message, args) => {

if(!message.member.hasPermission("MANAGE_ROLES")) return message.lineReply(`**Bu işlemi gerçekleştirmek için gerekli yetkin yok!**`)

const vip = message.mentions.members.first() || args[0];

let tag = meister.tag

if(!vip) return message.lineReply(`**${message.author} Lütfen <@&${meister.viprol}> rolünü vermem için bir kişiyi etiketle!**`)

vip.roles.add(meister.viprol) 
return message.lineReply(`**Başarıyla ${vip} kişisine <@&${meister.viprol}> rolünü verdim!**`)

}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["vip"]
};

exports.help = {
  name: 'special',
  description: '',
  usage: ''
};