const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setlog")
    .setDescription("Устанавливает канал для логирования")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Выберите канал для логирования")
        .setRequired(true),
    ),
  async execute(interaction) {
    const logChannel = interaction.options.getChannel("channel");
    interaction.client.logChannelId = logChannel.id;
    await interaction.reply(
      `Канал для логирования установлен на ${logChannel.name}.`,
    );
  },
};
