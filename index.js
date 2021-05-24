const Eris = require("eris");
const commands = require("./commands");

let sessions = [];

const bot = new Eris.CommandClient(process.env.BOT_TOKEN, {}, {
  description: "Discord Starter Bot",
  owner: "<@carlosxaxim#9000>",
  prefix: ["."],
  defaultHelpCommand: false
});

commands.forEach(cmd => bot.registerCommand(cmd.label, cmd.generator, cmd.options));

bot.on("ready", async () => {
  sessions.push(Date.now());
  console.log(`Session ${sessions.length} of ${bot.user.username}#${bot.user.discriminator} started at ${new Date()}`);
});

async function run() {
  console.log("------------------- Starting Bot -------------------");
  try {
    await bot.connect();
  } finally {
    console.log("------------------- Bot started -------------------");
  }
}

run().catch(console.dir);