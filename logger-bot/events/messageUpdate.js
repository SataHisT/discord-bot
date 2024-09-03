const { EmbedBuilder } = require('discord.js')

module.exports = {
	name: 'messageUpdate',
	async execute(oldMessage, newMessage) {
		if (oldMessage.content === newMessage.content) return

		if (oldMessage.partial) {
			try {
				await oldMessage.fetch()
			} catch (error) {
				console.error('Ошибка при загрузке старого сообщения:', error)
				return
			}
		}

		if (newMessage.partial) {
			try {
				await newMessage.fetch()
			} catch (error) {
				console.error('Ошибка при загрузке нового сообщения:', error)
				return
			}
		}

		const logChannel = newMessage.guild.channels.cache.find((channel) => channel.name === 'message-logger')

		if (!logChannel) {
			console.error('Лог-канал не найден!')
			return
		}

		const embed = new EmbedBuilder()
			.setColor('#06eeac') // Цвет для изменений
			.setTitle(`Сообщение изменено в ${newMessage.channel.name}`)
			.setAuthor({
				name: newMessage.author.tag,
				iconURL: newMessage.author.displayAvatarURL()
			})
			.addFields(
				{
					name: 'Старое содержание',
					value: oldMessage.content || '[Empty]',
					inline: false
				},
				{
					name: 'Новое содержание',
					value: newMessage.content || '[Empty]',
					inline: false
				}
			)
			.setFooter({ text: `ID: ${newMessage.id}` })
			.setTimestamp()

		try {
			await logChannel.send({ embeds: [embed] })
			console.log('Message update log sent successfully.')
		} catch (error) {
			console.error('Error sending message update log:', error)
		}
	}
}
