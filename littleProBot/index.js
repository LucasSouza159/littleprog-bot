const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
// DOTENV
const dotenv = require("dotenv");
dotenv.config();
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env;

// importação dos comandos
const fs = require("node:fs");
const path = require("node:path");
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `Esse comando em ${filePath} está com "data" ou "execute ausente"`
    );
  }
}

// Login do bot
client.once(Events.ClientReady, (c) => {
  console.log(`Pronto! Login realizado como ${c.user.tag}`);
});

client.login(TOKEN);

// Listener de interação com o bot
client.on(Events.InteractionCreate, async (interaction) => {
  //   if (interaction.isStringSelectMenu()) {
  //     const selected = interaction.values[0];
  //     if (selected == "html") {
  //       await interaction.reply(
  //         "Documentação do HTML https://developer.mozilla.org/pt-BR/docs/Web/HTML"
  //       );
  //     }
  //   }
  if (interaction.isStringSelectMenu()) {
    const selected = interaction.values[0];
    switch (selected) {
      case "html":
        await interaction.reply(
          "Documentação do HTML https://developer.mozilla.org/pt-BR/docs/Web/HTML"
        );
        break;
      case "css":
        await interaction.reply(
          "Documentação do CSS https://developer.mozilla.org/pt-BR/docs/Web/css"
        );
        break;
      case "javascript":
        await interaction.reply(
          "Documentação do javascript https://developer.mozilla.org/pt-BR/docs/Web/javascript"
        );
        break;
      case "flexbox":
        await interaction.reply(
          "Documentação do Flexbox https://css-tricks.com/snippets/css/a-guide-to-flexbox/"
        );
        break;
      case "grid-layout":
        await interaction.reply(
          "Documentação do Grid Layout https://css-tricks.com/snippets/css/complete-guide-grid/"
        );
        break;
      case "vue-js":
        await interaction.reply(
          "Documentação do Vue JS https://vuejs.org/guide/introduction.html"
        );
        break;
      case "react-js":
        await interaction.reply(
          "Documentação do React JS https://pt-br.reactjs.org/docs/getting-started.html"
        );
        break;
      case "angular-js":
        await interaction.reply(
          "Documentação do Angular JS https://docs.angularjs.org/guide"
        );
        break;
      default:
        console.error(error);
    }
  }

  if (!interaction.isChatInputCommand()) return;
  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) {
    console.error("Comando não encontrado");
    return;
  }
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply("Houve um erro ao executar este comando!");
  }
});
