const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'messageDelete',
  async execute(message) {
    if (message.partial) {
      try {
        await message.fetch();
      } catch (error) {
        console.error('Ошибка при загрузке сообщения:', error);
        return;
      }
    }

    // Поиск лог-канала в кэше
    const logChannel = message.guild.channels.cache.find(
        (channel) => channel.name === 'moderator-only-logs'
    );

    if (!logChannel) {
      console.error('Лог-канал не найден!');
      return;
    }

    // Создание встраиваемого сообщения
    const embed = new EmbedBuilder()
        .setColor('#FF0000') // Цвет красный для удаления
        .setTitle(`Сообщение удалено из ${message.channel.name}`)
        .setAuthor({
          name: message.author.tag,
          iconURL: message.author.displayAvatarURL(),
        })
        .addFields({ name: 'Удалено:', value: message.content || '[Empty]' })
        .setFooter({ text: `ID: ${message.id}` })
        .setTimestamp();

    // Отправка сообщения в лог-канал с улучшенной обработкой ошибок
    try {
      await logChannel.send({ embeds: [embed] });
      console.log('Сообщение отправлено успешно.');
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error);
    }
  },
};
