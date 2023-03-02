const {
  SlashCommandBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  Component,
} = require("discord.js");

const row = new ActionRowBuilder().addComponents(
  new StringSelectMenuBuilder()
    .setCustomId("select")
    .setPlaceholder("Nenhuma linguagem selecionada")
    .addOptions(
      {
        label: "HTML",
        description: "Veja a documentação do HTML",
        value: "html",
      },
      {
        label: "CSS",
        description: "Veja a documentação do CSS",
        value: "css",
      },
      {
        label: "Javascript",
        description: "Veja a documentação do Javascript",
        value: "javascript",
      },
      {
        label: "Flexbox",
        description: "Veja a documentação do Flexbox",
        value: "flexbox",
      },
      {
        label: "Grid Layout",
        description: "Veja a documentação do Grid Layout",
        value: "grid-layout",
      },
      {
        label: "Vue JS",
        description: "Veja a documentação do Vue JS",
        value: "vue-js",
      },
      {
        label: "React",
        description: "Veja a documentação do React JS",
        value: "react-js",
      },
      {
        label: "Angular",
        description: "Veja a documentação do Angular JS",
        value: "angular-js",
      }
    )
);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("docs")
    .setDescription("Acesse a documentação da tecnologia que quiser!"),

  async execute(interaction) {
    await interaction.reply({
      content: "Selecione uma das tecnologias abaixo:",
      components: [row],
    });
  },
};
