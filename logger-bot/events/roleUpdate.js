const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'roleUpdate',
  async execute(oldRole, newRole) {
    console.log('Role updated:', oldRole.name, '->', newRole.name);

    // Найти лог-канал
    const logChannel = newRole.guild.channels.cache.find(
        (channel) => channel.name === 'moderator-only-logs'
    );

    if (!logChannel) {
      console.error('Log channel not found!');
      return;
    }

    const embed = new EmbedBuilder()
        .setColor('#c6b41e')
        .setTitle('Role Updated')
        .addFields(
            { name: 'Old Role', value: oldRole.name, inline: true },
            { name: 'New Role', value: newRole.name, inline: true },
            { name: 'ID', value: newRole.id, inline: true }
        )
        .setFooter({ text: `Updated at: ${new Date().toLocaleString()}` })
        .setTimestamp();

    try {
      await logChannel.send({ embeds: [embed] });
      console.log('Role update log sent successfully.');
    } catch (error) {
      console.error('Error sending role update log:', error);
    }
  },
};
