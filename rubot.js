// Dependencies
const discord = require('discord.js');
const ytdl = require('ytdl-core');
const bot = new discord.Client({disableEveryone: true});
const config = require('./config.json');

// Startup of the bot
bot.on("ready", async () => {
  console.log(`ok im online on ${bot.guilds.size} servers`);
  bot.user.setActivity(`Ruby is an epic gamer 😎`, {type: "STREAMING"});
});

// Commands and other parameters
bot.on("message", async message => {
  const prefix = config.prefix;

  if(message.author.bot) return; // Ignores bots
  if(message.channel.type === "dm") return; // Ignores DMs
  let messageArray = message.content.split(" "); 
  let cmd = messageArray[0];
  let args = messageArray.slice(1); 
  if (!message.content.startsWith(prefix)) return; // Prevents users from using commands with similar prefixes

  if(cmd === `${prefix}test`){
    if(message.author.id !== config.ownerIDS) return;
    message.channel.send('crist is gay lol');
  }
  if(cmd === `${prefix}botinfo`){
  let embed = new discord.RichEmbed()
    .setTitle("Bot Info")
    .setColor("ff0000")
    .setThumbnail(bot.user.displayAvatarURL)
    .addField("Name", `${bot.user.username}`)
    .addField("Version", `0.0.1 Pre-Alpha`)
    .addField("Developed by", `<@306104099185623042> & <@330863976504229899>`)
    .addField("Created on", "28th of October 2018");
  message.channel.send(embed);
  }
  if(cmd === `${prefix}suggest`){
    let suggestiontext = args.slice(0).join(" ");
    if (!suggestiontext) return message.channel.send(`Please enter a valid suggestion following the command!`);
    let suggestion = new discord.RichEmbed()
    .setTitle(`${message.author.username} with ID ${message.author.id}`)
    .setThumbnail(message.author.displayAvatarURL)
    .setColor("ff0000")
    .setDescription(`${suggestiontext}`);
bot.guilds.get("496990452369588224").channels.get("506885418512285699").send(suggestion);
}
  if(cmd === `${prefix}play`){
   if (!message.member.voiceChannel) return message.channel.send('You are not connected to a voice channel!');
    if (message.guild.me.voiceChannel) return message.channel.send('I am already connected to a voice channel!');
    if (!args[0]) return message.channel.send('You must give me a url to the song you would like to listen to!');
    let valid = await ytdl.validateURL(args[0]);
    if (!valid) return message.channel.send('This URL is invalid!');
    let info = await ytdl.getInfo(args[0]);
    let connect = await message.member.voiceChannel.join();
    let connection = await connection.playStream(ytdl(args[0], { filter: 'audioonly' }));
    message.channel.send(`Now Playing: ${info.title}`);
 }

});

bot.login(process.env.BOT_TOKEN);
