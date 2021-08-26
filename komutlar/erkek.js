const Discord = require('discord.js')
require('discord-reply');
const meister = require('../meister.json')

const client = new Discord.Client();

exports.run = async (client, message, args) => {

if(!message.member.roles.cache.has('860194541265092629') && !message.member.hasPermission("MANAGE_ROLES")) return message.lineReply(`**Bu işlemi gerçekleştirmek için gerekli yetkin yok!**`)

const erkek = message.mentions.members.first() || args[0];
const isim = args[1];

let tag = meister.tag //buraya tagınızı yazınız

if(!erkek) return message.lineReply(`**${message.author} Lütfen kayıt etmem için bir kişiyi etiketle!**`)
if(!isim) return message.lineReply(`${message.author} **Lütfen kayıt etmem için bir isim belirt!**`)

erkek.roles.add(meister.erkekrol)
erkek.roles.add(meister.erkekrol2)
erkek.roles.remove(meister.kayıtsızrol)
erkek.setNickname(`${isim} ${tag}`)

const meisterembed = new Discord.MessageEmbed()

.setColor('00000')
.setTitle('Başarılı!') 
.setDescription(`**${erkek} adlı kişi erkek olarak kayıt edildi ve <@&${meister.erkekrol}> ve <@&${meister.erkekrol2}> rolleri eklendi.**

**${erkek} adlı kişinin kayıdı başarı ile tamamlandı.**

**İyi eğlenceler ${erkek}**`)

.setFooter(`Meister was here!`)
.setTimestamp()
message.lineReply(meisterembed)

client.channels.cache.get(meister.sohbetkanal).send(`${erkek} **aramıza katıldı. Bir hoşgeldin diyelim!**`)

client.channels.cache.get(meister.kayıtlog).send(`**${message.author}, ${erkek} adlı kişiyi erkek olarak kayıt etti!**`)


}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["erkek", "man"]
};

exports.help = {
  name: 'e',
  description: '',
  usage: ''
};