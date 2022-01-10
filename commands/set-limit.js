const Discord = require("discord.js");
const {MessageEmbed} = require("discord.js")
const db = require("quick.db")
const colors = require("../colors.json")
module.exports.run = async (bot, message , args) => {
    let noPermissions = new MessageEmbed()
  .setColor(colors.red)
  .setDescription(`<a:xNo:798519969527758848> ${message.author} only the server owner can remove users from the whitelist.`)
  .setTimestamp()
  let noRole = new MessageEmbed()
  .setColor("#2f3136")
  .setAuthor(`Command: set-limit`)
  .setDescription(`**Description**
Set the maximum of users that someone can ban manually.
**Aliases**
limit, set-limit
**Usage**
set-limit [number]
**Example**
set-limit 50
**Required Permissions**
\`Server Owner\``)

  if (message.author.id != message.guild.owner.id) return message.channel.send(noPermissions).then(m => {
    setTimeout(() => {
        m.delete()
    }, 20000);
})
  if (!args[0]) return message.channel.send(noRole)
  let embed4 = new Discord.MessageEmbed()
  .setDescription(`${message.author} please enter a number as the limit.`)
  if(isNaN(args[0])) return message.channel.send(embed4)
  db.add(`limit_${message.guild.id}`, args[0])
  message.channel.send(`${message.author} set the maximum allowed bans for the whitelisted users to \`${args[0]}\`.`)
}
module.exports.help = {
    name: "limit",
    aliases: ['set-limit'],
}

