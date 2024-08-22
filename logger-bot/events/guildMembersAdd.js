const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "guildMemberAdd",
  execute(member) {
    const logChannel = member.guild.channels.cache.find(
      (channel) => channel.name === "moderator-only-logs",
    );
      if (!logChannel) {
          console.error("Log channel not found!");
          return;
      }

    const embed = new EmbedBuilder()
      .setColor("#cfff00")
      .setAuthor({
          name: member.author.tag,
          iconURL: member.author.displayAvatarURL(),
        })
      .setTitle("Присоединился новый участник")
      .setFooter({ text: `Присоединился: ${new Date().toLocaleString()}` })
      .setTimestamp();

    logChannel.send({ embeds: [embed] });
  },
};
