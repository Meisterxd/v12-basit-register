const Discord = require('discord.js');
const message = require('../events/message');
const meister = require('../meister.json')
require('discord-reply');

 module.exports.run = async(client, message, args) => {

const etiketlenen = message.mentions.members.first() || args[0];
const rol = message.mentions.roles.first() || args[1];

const yetki = new Discord.MessageEmbed()

.setColor('00000')
.setDescription(`Hata! Bu komuta erişim sağlamak için yeterli yetkiye sahip değilsin!`)

if(!message.member.roles.cache.has('') && !message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(yetki)

const meisterembed = new Discord.MessageEmbed()

.setColor('00000')
.setDescription(`Lütfen bir kişiyi etiketle ${message.author}! Örn: .r-al <@meister/id> <@rol/id>`)

const meisterembed2 = new Discord.MessageEmbed()

.setColor('00000')
.setDescription(`Lütfen bir rol idsi gir ${message.author}! Örn: .r-al <@meister/id> <@rol/id>`)

const meisterembed3 = new Discord.MessageEmbed()

.setColor('00000')
.setDescription(`${etiketlenen} kişisine başarıyla <@&${rol}> rolünü verdim ${message.author}!`)

if(!etiketlenen) return message.lineReply(meisterembed)
if(!rol) return message.lineReply(meisterembed2)


etiketlenen.roles.remove(rol)

return message.lineReply(meisterembed3)


} 


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["r-al"]
  };
  
exports.help = {
    name: 'rol-al',
    description: '',
    usage: ''
  };