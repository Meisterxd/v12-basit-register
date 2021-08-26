const Discord = require("discord.js");
const meister = require('../meister.json')
require('discord-reply');

exports.run= async (client, message, args) => {       

   let TotalMember = message.guild.memberCount
          let Online = message.guild.members.cache.filter(off => off.presence.status !== 'offline').size;
          let Taglı = message.guild.members.cache.filter(kisi => kisi.user.username.includes(meister.isimtag)).size;
          let Taglı2 = message.guild.members.cache.filter(kisi => kisi.user.username.discriminator(meister.etikettag)).size;
          let toplamTag = Taglı  + Taglı2
          let Voice = message.guild.members.cache.filter(s => s.voice.channel).size;
          let Boost = message.guild.premiumSubscriptionCount;

message.lineReply(new Discord.MessageEmbed().setDescription(`
 Sunucumuzda toplam **${TotalMember}** kullanıcı bulunmaktadır.
 Sunucumuzda toplam **${Online}** aktif kullanıcı bulunmaktadır.
 Toplam **${toplamTag}** kişi tagımızda bulunuyor.
 Seste **${Voice}** kullanıcı bulunmaktadır.
 Sunucuya toplam **${Boost}** takviye yapılmıştır. 
`))


}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: []
  };
  
  exports.help = {
    name: 'say',
    description: '',
    usage: ''
  };