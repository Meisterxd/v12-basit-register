const Discord = require('discord.js');
const client = new Discord.Client({ disableMentions: 'everyone' });
const ayarlar = require('./ayarlar.json');
const meister = require('./meister.json');
const fs = require('fs');
const moment = require('moment');
require('discord-reply'); //lineReply , lineReplyNoMention
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};



 





client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};





client.on("message", async message => {

  if (message.content === 'sa') {
    message.lineReply(`**Aleyküm Selam, Hoşgeldin. <a:sallan:863200759776935938>**`).then(message.react('<a:sallan:863200759776935938>'))
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////


client.on("message", async message => {

  if (message.content === 'tag') {
    message.channel.send(`\`${meister.tagmesaj}\``);
  }
});

client.on("message", async message => {

  if (message.content === '.tag') {
    message.channel.send(`\`${meister.tagmesaj}\``);
  }
});

client.on("guildMemberAdd", async member => {

let kanal = client.channels.cache.get(meister.hosgeldinkanal)
let yetkili = client.members.cache.find(meister.yetkili)

member.setNickname('Kayıtsız')
member.roles.add(meister.kayıtsızrol)

member.send(`Ekibimize hoşgeldin sunucumuz ekip sunucu olduğu için taglı alımdadır sende tag alarak ailemize katılabilirsin. ``${meister.tagmesaj}```)

yetkili.send(`Sunucuya yeni biri katıldı onunla ilgilenir misin?`)

kanal.send(`Sunucuya Hoşgeldin ${member}. Seninle beraber ${message.guildMemberCount} kişi olduk

Sunucumuz taglı alımdadır sende tagımızı ``${meister.tagmesaj}`` alarak sol taraftaki

V.Confirmed kanallarına girip kayıt olabilirsin.

Eğer Yetkili olmak istersen  <&!${meister.yetkilialim}> rolündeki kişilere yazabilirsiniz.

Kayıt olmak için bir yetkiliyi etiketleyin. ${meister.yetkili}
`)




})





client.on("userUpdate", async function(oldUser, newUser) { //tagrol kodu bana ait değildir sadece alıp üzerinde bir kaç değişiklik yaptım dmden mesaj atma vs.

  const guild = client.guilds.cache.get(meister.sunucuid)

  const embed = new Discord.MessageEmbed().setAuthor(member.displayName, member.user.avatarURL({ dynamic: true })).setColor('#ff0010').setTimestamp().setFooter('Meister was here!');
  if (newUser.username !== oldUser.username) {
      if (oldUser.username.includes(meister.tag) && !newUser.username.includes(meister.tag)) {
          member.roles.set(meister.kayıtsızrol)
          newUser.send('Tagımızı çıkardığın için senden <&!${meister.tagrol> rolünü aldım ve kayıtsıza attım.')
          client.channels.cache.get(meister.taglog).send(embed.setDescription(`${newUser} Kullanıcısı tagımızı çıkardığı için taglı rolü alındı!`))



      } else if (!oldUser.username.includes(meister.tag) && newUser.username.includes(meister.tag)) {
          member.roles.add(meister.tagrol)
          newUser.send('Tagımızı aldığın için sana <&!${meister.tagrol}> rolünü verdim. İyi eğlenceler')
          client.channels.cache.get(meister.taglog).send(embed.setDescription(`${newUser} Kullanıcısı tagımızı aldığı için taglı rolü verildi!`))
      }
  }
 if (newUser.discriminator !== oldUser.discriminator) {
      if (oldUser.discriminator == meister.etikettag && newUser.discriminator !== meister.etikettag) {
          member.roles.set(meister.kayıtsızrol)
          newUser.send('Tagımızı çıkardığın için senden <&!${meister.tagrol> rolünü aldım ve kayıtsıza attım.')
          client.channels.cache.get(meister.taglog).send(embed.setDescription(`${newUser} Kullanıcısı etiket tagımızı çıkardığı için taglı rolü alındı!`))


      } else if (oldUser.discriminator !== meister.etikettag && newUser.discriminator == meister.etikettag ) {
          member.roles.add(meister.tagrol)-
          newUser.send('Tagımızı aldığın için sana <&!${meister.tagrol}> rolünü verdim. İyi eğlenceler')
          client.channels.cache.get(meister.taglog).send(embed.setDescription(`${newUser} Kullanıcısı etiket tagımızı aldığı için taglı rolü verildi!`))
      }
  }

})












client.on('ready', async () => { 
    client.user.setActivity(`Meister was here!`, { type: "STREAMING", url: "https://www.twitch.tv/meister"})
        .then(console.log('PASS - '+ client.user.tag +' ismiyle API\'ye bağlanıldı ve bot hazır durumda.'))
        .catch(() => console.log('ERROR - Belirsiz bir hata ile karşılaşıldı.'));
  }); 

client.login(ayarlar.register);