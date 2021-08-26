const Discord = require('discord.js')
const meister = require('../meister.json')
require('discord-reply');

const client = new Discord.Client();

exports.run = async (client, message, args) => {

if(!message.member.roles.cache.has('860194541265092629') && !message.member.hasPermission("MANAGE_ROLES")) return message.lineReply(`**Bu işlemi gerçekleştirmek için gerekli yetkin yok!**`)

const kız = message.mentions.members.first() || args[0];
const isim = args[1];

let tag = meister.tag

if(!kız) return message.lineReply(`**${message.author} Lütfen kayıt etmem için bir kişiyi etiketle!**`)
if(!isim) return message.lineReply(`${message.author} **Lütfen kayıt etmem için bir isim belirt!**`)

kız.roles.add(meister.kadınrol)
kız.roles.add(meister.kadınrol2)
kız.roles.remove(meister.kayıtsızrol)
kız.setNickname(`${isim} ${tag}`)

const meisterembed = new Discord.MessageEmbed()

.setColor('00000')
.setTitle('Başarılı!') 
.setDescription(`**${kız} adlı kişi erkek olarak kayıt edildi ve <@&${meister.kadınrol}> ve <@&${meister.kadınrol2}> rolleri eklendi.**

**${kız} adlı kişinin kayıdı başarı ile tamamlandı.**

**İyi eğlenceler ${kız}**`)

.setFooter(`Meister was here!`)
.setTimestamp()
message.lineReply(meisterembed)

client.channels.cache.get(meister.sohbetkanal).send(`${kız} **aramıza katıldı. Bir hoşgeldin diyelim!**`)

client.channels.cache.get(meister.kayıtlog).send(`**${message.author}, ${kız} adlı kişiyi erkek olarak kayıt etti!**`)




}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kadın", "woman", "kız"]
};

exports.help = {
  name: 'k',
  description: '',
  usage: ''
};