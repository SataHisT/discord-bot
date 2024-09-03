const { EmbedBuilder } = require('discord.js')

module.exports = {
	name: 'voiceStateUpdate',
	execute(oldState, newState) {
		const logChannel = newState.guild.channels.cache.find((channel) => channel.name === 'voice-logger')
		if (!logChannel) return

		let embed

		if (!oldState.channelId && newState.channelId) {
			embed = new EmbedBuilder()
				.setColor('#00FF00')
				.setAuthor({
					name: newState.member.user.tag,
					iconURL: newState.member.user.displayAvatarURL()
				})
				.setTitle(`Подключается к ${newState.channel.name}`)
				.setFooter({ text: `ID: ${newState.id}` })
				.setTimestamp()
		} else if (oldState.channelId && !newState.channelId) {
			embed = new EmbedBuilder()
				.setColor('#FF0000')
				.setAuthor({
					name: oldState.member.user.tag,
					iconURL: oldState.member.user.displayAvatarURL()
				})
				.setTitle(`Отключается от ${oldState.channel.name}`)
				.setFooter({ text: `ID: ${oldState.id}` })
				.setTimestamp()
		} else if (oldState.channelId && newState.channelId && oldState.channelId !== newState.channelId) {
			embed = new EmbedBuilder()
				.setColor('#FFA500')
				.setAuthor({
					name: newState.member.user.tag,
					iconURL: newState.member.user.displayAvatarURL()
				})
				.setTitle(`Переместился из ${oldState.channel.name} в ${newState.channel.name}`)
				.setFooter({ text: `ID: ${newState.id}` })
				.setTimestamp()
		}

		// Отправка сообщения в лог-канал, если embed был создан
		if (embed) {
			logChannel
				.send({ embeds: [embed] })
				.then(() => console.log('Voice state change logged successfully.'))
				.catch((error) => console.error('Error logging voice state change:', error))
		}
	}
}
