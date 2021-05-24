const { EMBED_COLOR } = require("../constants");

const label = "help";

const generator = (msg, args) => {
  const bot = msg.channel.client;
  if (args.length > 0) {
    let cur = bot.commands[bot.commandAliases[args[0]] || args[0]];
    if (!cur) {
      return "Command not found";
    }
    let { label } = cur;
    for (let i = 1; i < args.length; ++i) {
      cur = cur.subcommands[cur.subcommandAliases[args[i]] || args[i]];
      if (!cur) {
        return "Command not found";
      }
      label += ` ${cur.label}`;
    }
    const fields = [{ "name": "USAGE", "value": `\`${msg.prefix}${label}${cur.usage ? ' ' + cur.usage : ''}\`` }];
    if (cur.aliases.length > 0) {
      fields.push({ "name": "ALIASES", "value": `\`${cur.aliases.join("\`, \`")}\``, "inline": false });
    }
    const subcommands = Object.keys(cur.subcommands);
    if (subcommands.length > 0) {
      let subcommandsText = "";
      for (const subLabel of subcommands) {
        if (cur.subcommands.hasOwnProperty(subLabel) && cur.subcommands[subLabel].permissionCheck(msg)) {
          subcommandsText += `\n  \`${subLabel}\` : ${cur.subcommands[subLabel].description}`;
        }
      }
      fields.push({ "name": "SUBCOMMANDS", "value": subcommandsText, "inline": false });
    }

    const embed = {
      "type": "rich",
      "title": label.toUpperCase(),
      "description": `${cur.fullDescription}`,
      "color": EMBED_COLOR,
      "fields": fields
    }
    return { embed };
  } else {
    let commandsText = "";
    for (const label in bot.commands) {
      if (bot.commands.hasOwnProperty(label) && bot.commands[label] && bot.commands[label].permissionCheck(msg) && !bot.commands[label].hidden) {
        commandsText += `:small_blue_diamond: \`${msg.prefix}${label}\` : ${bot.commands[label].description}\n`;
      }
    }
    const title = `${bot.commandOptions.name}`;
    const embed = {
      "type": "rich",
      "title": title.toUpperCase(),
      "description": `Hi **${msg.author.username}**, how can I help you?`,
      "color": EMBED_COLOR,
      "fields": [
        { "name": "COMMANDS", "value": commandsText, "inline": false },
      ],
      "footer": { "text": `Type "${msg.prefix}help <command>" for more info on a command..` }
    }
    return { embed };
  }
}

const options = {
  description: "This help",
  fullDescription: "This command shows available commands and their help",
  aliases: ["h"]
}

const help = { label, generator, options };

module.exports = help;