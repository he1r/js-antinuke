const Discord = require("discord.js");
const db = require("quick.db")
const colors = require("../colors.json")
const {MessageEmbed} = require("discord.js")
module.exports.run = async (bot, message , args) => {
    let noPermissions = new MessageEmbed()
  .setColor(colors.red)
  .setDescription(`<a:xNo:798519969527758848> ${message.author} only the server owner can remove users from the whitelist.`)
  .setTimestamp()
  let noRole = new MessageEmbed()
  .setColor("#2f3136")
  .setAuthor(`Command: reset`)
  .setDescription(`**Description**
Reset the manual bans a whitelist user has.
**Usage**
reset [user]
**Example**
reset @heir
**Required Permissions**
\`Server Owner\``)

  if (message.author.id != message.guild.owner.id) return message.channel.send(noPermissions).then(m => {
    setTimeout(() => {
        m.delete()
    }, 20000);
})
  if (!args[0]) return message.channel.send(noRole)
  let user = message.guild.members.cache.find(mem => mem.user.username === args[0]) || message.guild.members.cache.get(args[0]) || message.mentions.users.first()
if(!user) return message.channel.send(`${message.author} please enter the user that you want to reset their bans.`)
db.set(`wtlusers_${user.id}`, 0)
} 
module.exports.help = {
    name: "reset",
    aliases: [],
}

