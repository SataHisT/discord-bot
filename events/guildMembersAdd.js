const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "guildMemberAdd",
  execute(member) {
    const logChannel = member.guild.channels.cache.find(
      (channel) => channel.name === "moderator-only-logs",
    );
    if (!logChannel) return;

    const embed = new EmbedBuilder()
      .setColor("#00FF00") // Цвет зеленый для новых участников
      .setTitle("Новый участник присоединился")
      .addFields(
        { name: "Участник", value: member.user.tag, inline: true },
        { name: "ID", value: member.id, inline: true },
      )
      .setFooter({ text: `Присоединился: ${new Date().toLocaleString()}` })
      .setTimestamp();

    logChannel.send({ embeds: [embed] });
  },
};
