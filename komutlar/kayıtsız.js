const Discord = require('discord.js')
const meister = require('../meister.json')
require('discord-reply');

const client = new Discord.Client();

exports.run = async (client, message, args) => {

if(!message.member.roles.cache.has(meister.yetkili) && !message.member.hasPermission("MANAGE_ROLES")) return message.lineReply(`**Bu işlemi gerçekleştirmek için gerekli yetkin yok!**`)

const kayıtsız = message.mentions.members.first() || args[0];

if(!kayıtsız) return message.lineReply(`**${message.author} Lütfen kayıtsıza atmam için bir kişiyi etiketle!**`)


kayıtsız.roles.set(meister.kayıtsızrol)


const meisterembed = new Discord.MessageEmbed()

.setColor('00000')
.setTitle('Başarılı!') 
.setDescription(`**${kayıtsız} adlı kişi kayıtsıza atıldı!**

<@&${meister.kadınrol}> ve <@&${meister.kadınrol2}> ve <@&${meister.erkekrol}> ve <@&${meister.erkekrol2}> rolleri alındı!**`)
.setFooter(`Meister was here!`)
.setTimestamp()

message.lineReply(meisterembed)

client.channels.cache.get(meister.kayıtlog).send(`**${message.author}, ${kayıtsız} adlı kişiyi kayıtsıza attı!**`)

}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["unregistered"]
};

exports.help = {
  name: 'kayıtsız',
  description: '',
  usage: ''
};