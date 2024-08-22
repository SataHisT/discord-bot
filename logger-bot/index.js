const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const config = require("./config/config.json");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
  ],
});

client.commands = new Collection();

// Загрузка команд
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

// Загрузка событий
const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  client.on(event.name, (...args) => event.execute(...args, client));
}

// Обработка Slash-команд
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "Произошла ошибка при выполнении команды!",
      ephemeral: true,
    });
  }
});

// Логирование запуска бота
client.once("ready", () => {
  console.log("------------------------------------------");
  console.log(`Bot is online!`);
  console.log(`Logged in as: ${client.user.tag}`);
  console.log(`Connected to ${client.guilds.cache.size} servers.`);
  console.log("------------------------------------------");
});

client.login(config.token);
