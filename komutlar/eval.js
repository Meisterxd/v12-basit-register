const Discord = require("discord.js");
const client = new Discord.Client();

exports.run = async (client, message, args) => {
  
    if(message.author.id !== "840535141532041217") return;
    try {
        if(!codein.toLowerCase().includes('token')) return console.log(`<@!${message.author.id}> isimli kişi tokenimi almaya çalıştı!`)
          let codein = a.slice(0).join(' ')  
        let code = eval(codein);

        if (typeof code !== 'string')
            code = require('util').inspect(code, { depth: 0 });
        let çıkış = (`\`\`\`js\n${code}\n\`\`\``)
        message.channel.send(çıkış)
    } catch(e) {
        message.channel.send(`\`\`\`js\n${e}\n\`\`\``);
    }
}






exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["calıstır", "çalıştır", "eval"]
  };
  
exports.help = {
    name: 'eval',
    description: '',
    usage: ''
  };