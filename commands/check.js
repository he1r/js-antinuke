const Discord = require("discord.js");
const colors = require("../colors.json")
const {MessageEmbed} = require("discord.js")
const db = require("quick.db")
module.exports.run = async (bot, message , args) => {
let user = message.guild.members.cache.find(mem => mem.user.username === args[0]) || message.guild.members.cache.get(args[0]) || message.mentions.users.first()
if(!user) return message.channel.send(`${message.author} please enter the user that you want to check their ban count.`)
let count = db.fetch(`wtlusers_${user.id}`)
let embed1 = new Discord.MessageEmbed()
.setDescription(`<@${user.id}> has ${count} bans.`)
message.channel.send(embed1)
} 
module.exports.help = {
    name: "check",
    aliases: ["check-bans"],
}

