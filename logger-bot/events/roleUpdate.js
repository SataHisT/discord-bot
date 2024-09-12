const { EmbedBuilder } = require('discord.js')

module.exports = {
	name: 'roleUpdate',
	async execute(oldRole, newRole) {
		console.log('Роль обновлена:', oldRole.name, '->', newRole.name)

		// Найти лог-канал
		const logChannel = newRole.guild.channels.cache.find((channel) => channel.name === 'moderator-only-logs')

		if (!logChannel) {
			console.error('Лог-канал не найден!')
			return
		}

		const embed = new EmbedBuilder()
			.setColor('#c6b41e')
			.setTitle('Обновление роли!')
			.addFields(
				{ name: 'Старая роль', value: oldRole.name, inline: true },
				{ name: 'Новая роль', value: newRole.name, inline: true },
				{ name: 'ID', value: newRole.id, inline: true }
			)
			.setFooter({ text: `Обновлено в: ${new Date().toLocaleString()}` })
			.setTimestamp()

		try {
			await logChannel.send({ embeds: [embed] })
			console.log('Обновление роли прошло успешно.')
		} catch (error) {
			console.error('Ошибка в изменении роли:', error)
		}
	}
}
