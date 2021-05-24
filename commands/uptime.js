const humanizeDuration = require("humanize-duration");
const { EMBED_COLOR } = require("../constants");

const label = "uptime";

const generator = (msg, args) => {
  const bot = msg.channel.client;
  const shortEnglishHumanizer = humanizeDuration.humanizer({
    language: "shortEn",
    languages: {
      shortEn: {
        y: () => "y",
        mo: () => "mo",
        w: () => "w",
        d: () => "d",
        h: () => "h",
        m: () => "m",
        s: () => "s",
        ms: () => "ms",
      },
    },
    round: true,
    delimiter: " ",
    spacer: ""
  });
  const fields = [
    { "name": `Uptime`, "value": `${shortEnglishHumanizer(process.uptime() * 1000)}`, "inline": true },
    { "name": `Current session`, "value": `${shortEnglishHumanizer(bot.uptime)}`, "inline": true }
  ];
  const embed = {
    "type": "rich",
    "color": EMBED_COLOR,
    fields
  }
  return { embed };
}

const options = {
  description: "Displays how long the bot is up",
  fullDescription: "Displays time since last restart",
  aliases: ["up", "status"],
  caseInsensitive: true
}

const uptime = { label, generator, options };

module.exports = uptime;