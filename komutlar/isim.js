const Discord = require('discord.js')
require('discord-reply');
const meister = require('../meister.json')

 module.exports.run = async(client, message, args) => {
   
    
if(!message.member.roles.cache.has('860194541265092629') && !message.member.hasPermission("MANAGE_NICKNAMES")) return message.lineReply(`**Bu işlemi gerçekleştirmek için gerekli yetkin yok!**`)

const etiketlenen = message.mentions.members.first() || args[0]

const isim = args[1]

let tag = meister.tag


if(!etiketlenen) return message.lineReply(`${message.author} **Lütfen bir kullanıcı etiketler misin?**`)
if(!isim) return message.lineReply(`${message.author} **Belirtilen kişinin ismini değiştirmem için lütfen bir isim yaz!**`)

etiketlenen.setNickname(`${isim} ${tag}`)
return message.lineReply(`**Başarıyla ${etiketlenen} kişinin ismini ${isim} olarak değiştirdim.**`)


}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["nick", "nickname", "i"]
  };
  
exports.help = {
    name: 'isim',
    description: '',
    usage: ''
  };