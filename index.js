const Eris = require("eris");
const { MongoClient } = require("mongodb");
const Service = require("./services/service");
const DAO = require("./dao/dao");
const commands = require("./commands");

const bot = new Eris.CommandClient(process.env.BOT_TOKEN, {}, {
  description: "Discord Starter Bot",
  owner: "<@carlosxaxim#9000>",
  prefix: ["."],
  defaultHelpCommand: false
});

commands.forEach(cmd => bot.registerCommand(cmd.label, cmd.generator, cmd.options));

bot.on("ready", async () => {
  const sessions = Service.newSession(bot);
  console.log(`Session ${sessions.length} of ${bot.user.username}#${bot.user.discriminator} started at ${new Date()}`);
});

bot.on("error", (err, id) => {
  console.log("Error Event catched: " + err.message);
});

const client = new MongoClient(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  keepAlive: 1
});

async function run() {
  console.log("------------------- Starting Bot -------------------");
  try {
    await client.connect();
    await DAO.injectDB(client);

    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log(`Connected ${client.s.options.auth.username} successfully to ${client.s.options.srvHost}. Default database: ${client.s.options.dbName}`);

    await bot.connect();
  } finally {
    console.log("------------------- Bot started -------------------");
  }
}

run().catch(console.dir);