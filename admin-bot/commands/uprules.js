const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { fetchRulesFromGoogleDocs } = require('../utils/googleDocs')

module.exports = {
	data: new SlashCommandBuilder().setName('uprules').setDescription('Обновить правила сервера'),
	async execute(interaction) {
		const rulesText = await fetchRulesFromGoogleDocs()

		const embed = new EmbedBuilder()
			.setTitle('Правила Discord-канала Wainwright')
			.setDescription(rulesText)
			.setColor('#034a30')
			.setTimestamp() // Добавляет текущее время
			.setFooter({
				text: '© 2024 Wainwright FAMQ',
				iconURL: 'https://i.pinimg.com/736x/21/ed/b6/21edb60c14f76c0dd1dff7424b8ebd0f.jpg'
			}) // Текст и иконка в футере
			.setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL() })

		try {
			// Получаем guild из взаимодействия
			const guild = interaction.guild

			// Ищем канал по имени
			const channel = guild.channels.cache.find((ch) => ch.name === '🔰правила-сервера')

			if (!channel) {
				throw new Error('Канал не найден')
			}

			// Ищем последнее сообщение с правилами
			const messages = await channel.messages.fetch({ limit: 10 }) // Или укажите большее значение, если нужно
			const prevMessage = messages.find(
				(msg) => msg.embeds.length > 0 && msg.embeds[0].title === 'Правила Discord-канала Wainwright'
			)

			if (prevMessage) {
				console.log('Удаление сообщения:', prevMessage.id)
				await prevMessage.delete()
			} else {
				console.log('Сообщение не найдено для удаления')
			}

			await channel.send({ embeds: [embed] })

			// Ответ на взаимодействие
			if (!interaction.replied) {
				await interaction.reply({ content: 'Правила обновлены!', ephemeral: true })
			}
		} catch (error) {
			console.error('Ошибка при отправке сообщения в канал:', error)
			if (!interaction.replied) {
				try {
					await interaction.reply({ content: 'Произошла ошибка при обновлении правил!', ephemeral: true })
				} catch (replyError) {
					console.error('Ошибка при отправке ответа на взаимодействие:', replyError)
				}
			}
		}
	}
}
