const { EmbedBuilder } = require('discord.js')
const leaveMessage = require('../utils/message/leaveMessage')

module.exports = {
	name: 'guildMemberRemove',
	async execute(member) {
		const logChannel = member.guild.channels.cache.find((channel) => channel.name === 'join-or-left-logger')

		if (!logChannel) {
			console.error('Log channel not found!')
			return
		}

		const randomIndex = Math.floor(Math.random() * leaveMessage.length)
		const randomMessage = leaveMessage[randomIndex]

		const embed = new EmbedBuilder()
			.setColor('#ff0000')
			.setAuthor({
				name: member.user.tag,
				iconURL: member.user.displayAvatarURL()
			})
			.setTitle('Участник покинул сервер')
			.addFields({ name: 'Причина побега:', value: randomMessage, inline: false })
			.addFields({ name: 'ID', value: member.id, inline: false })
			.setFooter({ text: `Вышел: ${new Date().toLocaleString()}` })
			.setTimestamp()

		try {
			await logChannel.send({ embeds: [embed] })
			console.log('Member leave log sent successfully.')
		} catch (error) {
			console.error('Error sending member leave log:', error)
		}
	}
}
