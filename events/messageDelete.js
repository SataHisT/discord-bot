const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "messageDelete",
  execute(message) {
    // Найти канал для логирования
    const logChannel = message.guild.channels.cache.find(
      (channel) => channel.name === "moderator-only-logs",
    );

    // Если канал не найден, вывести ошибку в консоль и завершить выполнение
    if (!logChannel) {
      console.error("Log channel not found!");
      return;
    }

    // Создание встраиваемого сообщения (embed)
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

    // Отправка сообщения в лог-канал
    logChannel
      .send({ embeds: [embed] })
      .then(() => console.log("Message sent successfully."))
      .catch((error) => console.error("Error sending message:", error));
  },
};
