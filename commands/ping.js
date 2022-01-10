const Discord = require("discord.js");
const colors = require("../colors.json")
const {MessageEmbed} = require("discord.js")
const { util } = require('discord.js-commando')
module.exports.run = async (bot, message , args) => {
  if(!args[0]){
    if (!message.guild.me.hasPermission("SEND_MESSAGES")) return;
  message.channel.send(`🏓 Pinging....`).then((msg) => {
      const _ = new Discord.MessageEmbed()
        .setTitle("🏓 Pong!")
        .setThumbnail(`${message.author.displayAvatarURL({ dynamic: true })}`)
        .setColor(colors.black)
        .setDescription(`
       ***Bot response time is ${Math.round(bot.ws.ping)} ms***`
        )
      msg.edit(_);
      msg.edit("\u200B");
    });
  }
  if(args[0] == "whitelist"){
     let noPermissions = new MessageEmbed()
  .setColor(colors.red)
  .setDescription(`<a:xNo:798519969527758848> ${message.author} only the server owner can whitelist users.`)
  let noRole = new MessageEmbed()
  .setColor("#2f3136")
  .setAuthor(`Command: whitelist`)
  .setDescription(`**Description**
Adds a user to the ping whitelist.
**Usage**
ping whitelist [user]
**Example**
ping whitelist @heir
**Required Permissions**
\`Server Owner\``)

  if (message.author.id != message.guild.owner.id) return message.channel.send(noPermissions).then(m => {
    setTimeout(() => {
        m.delete()
    }, 20000);
})
  if (!args[1]) return message.channel.send(noRole)
  let array = bot.settings.get(message.guild.id, "ping")
  let user = message.guild.members.cache.find(mem => mem.user.username === args[1]) || message.guild.members.cache.get(args[1]) || message.mentions.users.first()
  if (array.includes(user.id)){ 
    let removeXpGainRole = new MessageEmbed()
    .setColor(colors.red)
    .setDescription(`<a:xNo:798519969527758848> ${message.author} that user is already ping whitelisted.`)
  return message.channel.send(removeXpGainRole)}
  else{
  bot.settings.push(message.guild.id, user.id, "ping")
  let noXpGain = new MessageEmbed()
    .setColor(colors.green)
    .setDescription(`<a:xnYes:798519965330178088> ${message.author} ping whitelisted ${user}.`)
  message.channel.send(noXpGain)
  }
  }else if (args[0] == "dewhitelist"){
    let noPermissions = new MessageEmbed()
  .setColor(colors.red)
  .setDescription(`<a:xNo:798519969527758848> ${message.author} only the server owner can remove users from the ping whitelist.`)
  .setTimestamp()
  let noRole = new MessageEmbed()
  .setColor("#2f3136")
  .setAuthor(`Command: ping dewhitelist`)
  .setDescription(`**Description**
Removes a user from the ping whitelist.
**Aliases**
ping dewhitelist, unwhitelist
**Usage**
ping dewhitelist [user]
**Example**
ping dewhitelist @heir
**Required Permissions**
\`Server Owner\``)

  if (message.author.id != message.guild.owner.id) return message.channel.send(noPermissions).then(m => {
    setTimeout(() => {
        m.delete()
    }, 20000);
})
  if (!args[1]) return message.channel.send(noRole)
  let array = bot.settings.get(message.guild.id, "ping")
  let user = message.guild.members.cache.find(mem => mem.user.username === args[0]) || message.guild.members.cache.get(args[0]) || message.mentions.users.first()
 if(!array.includes(user.id)){ 
    let removeXpGainRole = new MessageEmbed()
    .setColor(colors.red)
    .setDescription(`<a:xNo:798519969527758848> ${message.author} that user is not ping whitelisted.`)
  return message.channel.send(removeXpGainRole)}
  else {
    let index = array.findIndex(obj => obj === user.id)
  bot.settings.delete(message.guild.id, `ping.${index}`)
    let noXpGain = new MessageEmbed()
    .setColor(colors.green)
    .setDescription(`<a:xnYes:798519965330178088> ${message.author} removed ${user} from the ping whitelist.`)
  message.channel.send(noXpGain)
  }
  }else if (args[0] == "whitelisted"){
     try {
    let noPermissions = new MessageEmbed()
    .setColor(colors.red)
    .setDescription(`<a:xNo:798519969527758848> ${message.author} you do not have the required permission to use this command.`)
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(noPermissions).then(m => {
        setTimeout(() => {
            m.delete()
        }, 3000);
    })
    if (!args[1]) args[0] = 1
    let page = args[0]
    let array = bot.settings.get(message.guild.id, "ping")
    const paginated = util.paginate(array, page, Math.floor(30))
    let i = 1;
    let icon = message.guild.iconURL({dynamic: true})
    if(!icon) icon = message.author.displayAvatarURL({dynamic: true})
    let embed = new MessageEmbed()
    .setAuthor(`ping whitelisted users for ${message.guild.name}.`, icon)
    .setTimestamp()
    .setThumbnail(icon)
    .setColor(colors.black)
    .setDescription(paginated.items.map(user => `\`#${i++}.\` ${message.guild.members.cache.get(user)}\n`))
        message.channel.send(embed)
}catch (error) {
    console.log(error)
}
  }
}
  module.exports.help = {
    name: "ping",
    aliases: [],
}
