const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "messageUpdate",
  execute(oldMessage, newMessage) {
    // Игнорировать, если содержание не изменилось
    if (oldMessage.content === newMessage.content) return;

    // Найти канал для логирования
    const logChannel = oldMessage.guild.channels.cache.find(
      (channel) => channel.name === "moderator-only-logs",
    );
    if (!logChannel) {
      console.error("Log channel not found!");
      return;
    }

    // Создание встраиваемого сообщения (embed)
    const embed = new EmbedBuilder()
      .setColor("#06eeac") // Цвет для изменений
      .setTitle(`Сообщение изменено в ${newMessage.channel.name}`)
      .setAuthor({
        name: newMessage.author.tag,
        iconURL: newMessage.author.displayAvatarURL(),
      })
      .addFields(
        {
          name: "Старое содержание",
          value: oldMessage.content || "[Empty]",
          inline: false,
        },
        {
          name: "Новое содержание",
          value: newMessage.content || "[Empty]",
          inline: false,
        },
      )
      .setFooter({ text: `ID: ${newMessage.id}` })
      .setTimestamp();

    // Отправка сообщения в лог-канал
    logChannel
      .send({ embeds: [embed] })
      .then(() => console.log("Message update log sent successfully."))
      .catch((error) =>
        console.error("Error sending message update log:", error),
      );
  },
};
