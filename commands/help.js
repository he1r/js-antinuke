const Discord = require("discord.js");
module.exports.run = async (bot, message , args) => {
        if (!message.guild.me.hasPermission("SEND_MESSAGES")) return;
    let inline = true
    let infoembed = new Discord.MessageEmbed()
    .setColor("#000000")
    .setThumbnail(`${message.guild.iconURL({ dynamic: true })}`)
    .setDescription(`***ANTI COMMAND LIST!***
**anti-logs** - \`Set the logging channel for the anti nuke bot.\`
**anti** - \`Enable or disable the anti nuke.\`
**anti ping** - \`Enable or disable the anti ping module.\`
**whitelist** - \`Whitelist users.\`
**dewhitelist** - \`Dewhitelist a user.\`
**whitelisted** - \`Shows all the whitelisted users.\`
**ping whitelist** - \`Add a user to the ping whitelist.(Users wont get kicked if they @everyone or @here ping.)\`
**ping dewhitelist** - \`Remove a user from the ping whitelist.\`
**ping whitelisted** - \`Shows all the ping whitelisted users.\` 
**set-limit** - \`Sets the maximum users that a whitelisted user is allowed to ban manually.\`
**reset** - \`Resets that amount of bans that a whitelisted user has.\`
**check** - \`Shows the amount of manual bans that a whitelisted user has.\`

***INFORMATION COMMAND LIST!***
**help** - \`Shows the bot commands.\`
**ping** - \`Shows the bots ping.\`
**invite** - \`Sends the bot invite link.\`
**uptime** - \`Shows the bot online time.\`
**info** - \`Shows all the available information for the bot.\`
**set-prefix** - \`Sets the bot prefix for the  current guild.\``)
    .setTimestamp()
    message.channel.send(infoembed);
}
module.exports.help = {
    name: "help",
    aliases: [],
}
