const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "roleUpdate",
  execute(oldRole, newRole) {
    console.log('Role updated:', oldRole.name, '->', newRole.name);

    const logChannel = oldRole.guild.channels.cache.find(
        (channel) => channel.name === "moderator-only-logs"
    );
    if (!logChannel) return;

    const embed = new EmbedBuilder()
        .setColor("#c6b41e")
        .setTitle("Role Updated")
        .addFields(
            { name: "Old Role", value: oldRole.name, inline: true },
            { name: "New Role", value: newRole.name, inline: true },
            { name: "ID", value: newRole.id, inline: true }
        )
        .setFooter({ text: `Updated at: ${new Date().toLocaleString()}` })
        .setTimestamp();

    logChannel.send({ embeds: [embed] });
  },
};
