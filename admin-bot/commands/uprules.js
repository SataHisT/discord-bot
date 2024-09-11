const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { fetchRulesFromGoogleDocs } = require('../utils/googleDocs')

module.exports = {
	data: new SlashCommandBuilder().setName('uprules').setDescription('Обновить правила сервера'),
	async execute(interaction) {
		const rulesText = await fetchRulesFromGoogleDocs()

		const embed = new EmbedBuilder().setTitle('Правила сервера').setDescription(rulesText).setColor('#0099ff')

		try {
			const channel = await interaction.client.channels.fetch(process.env.RULES_CHANNEL_ID)
			await channel.send({ embeds: [embed] })
			await interaction.reply({ content: 'Правила обновлены!', ephemeral: true })
		} catch (error) {
			console.error('Ошибка при отправке сообщения в канал:', error)
			await interaction.reply({ content: 'Произошла ошибка при обновлении правил!', ephemeral: true })
		}
	}
}
