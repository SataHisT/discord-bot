const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "roleUpdate",
  execute(oldRole, newRole) {
    const logChannel = oldRole.guild.channels.cache.find(
      (channel) => channel.name === "moderator-only-logs",
    );
    if (!logChannel) return;

    const embed = new MessageEmbed()
      .setColor("#0000FF") // Цвет синий для изменений ролей
      .setTitle("Role Updated")
      .addField("Old Role", oldRole.name, true)
      .addField("New Role", newRole.name, true)
      .addField("ID", newRole.id, true)
      .setFooter(`Updated at: ${new Date().toLocaleString()}`)
      .setTimestamp();

    logChannel.send({ embeds: [embed] });
  },
};
