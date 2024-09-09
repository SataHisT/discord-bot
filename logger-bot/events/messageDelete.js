const { EmbedBuilder } = require('discord.js')

module.exports = {
	name: 'messageDelete',
	async execute(message) {
		if (message.partial) {
			try {
				await message.fetch()
			} catch (error) {
				console.error('Ошибка при загрузке сообщения:', error)
				return
			}
		}

		const logChannel = message.guild.channels.cache.find((channel) => channel.name === 'message-logger')

		if (!logChannel) {
			console.error('Лог-канал не найден!')
			return
		}

		let executor = 'Неизвестно'
		let executorAvatar = null

		try {
			const fetchedLogs = await message.guild.fetchAuditLogs({
				limit: 1,
				type: 72 // Код действия для удаления сообщений
			})

			const deletionLog = fetchedLogs.entries.first()

			if (deletionLog) {
				const { executor: mod, target } = deletionLog

				if (target.id === message.author.id) {
					executor = mod.tag
					executorAvatar = mod.displayAvatarURL()
				}
			}
		} catch (error) {
			console.error('Ошибка при получении журналов аудита:', error)
		}

		// Создание встраиваемого сообщения
		const embed = new EmbedBuilder()
			.setColor('#FF0000') // Цвет красный для удаления
			.setTitle(`Сообщение от пользователя ${message.author.tag} было удалено`)
			.setAuthor({
				name: executor, // Имя пользователя, который удалил сообщение
				iconURL: executorAvatar // URL аватара пользователя
			})
			.addFields({ name: 'Удалено:', value: message.content || '[Empty]' })
			.setFooter({ text: `ID сообщения: ${message.id}` })
			.setTimestamp()

		// Отправка сообщения в лог-канал с улучшенной обработкой ошибок
		try {
			await logChannel.send({ embeds: [embed] })
			console.log('Сообщение отправлено успешно.')
		} catch (error) {
			console.error('Ошибка при отправке сообщения:', error)
		}
	}
}
