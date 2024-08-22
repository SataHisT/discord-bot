const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "messageDelete",
  execute(message) {
    const logChannel = message.guild.channels.cache.find(
      (channel) => channel.name === "moderator-only-logs",
    );

    if (!logChannel) {
      console.error("Log channel not found!");
      return;
    }

    const embed = new EmbedBuilder()
      .setColor("#FF0000") // Цвет красный для удаления
      .setTitle(`Сообщение удалено из ${message.channel.name}`)
      .setAuthor({
        name: message.author.tag,
        iconURL: message.author.displayAvatarURL(),
      })
      .addFields({ name: "Удалено:", value: message.content || "[Empty]" })
      .setFooter({ text: `ID: ${message.id}` })
      .setTimestamp();

    logChannel
      .send({ embeds: [embed] })
      .then(() => console.log("Message sent successfully."))
      .catch((error) => console.error("Error sending message:", error));
  },
};
