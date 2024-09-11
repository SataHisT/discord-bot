const { SlashCommandBuilder } = require('discord.js')
const { deployCommands } = require('../deploy-commands')

module.exports = {
	data: new SlashCommandBuilder().setName('deploy').setDescription('Обновить команды и перезапустить бота'),
	async execute(interaction) {
		await deployCommands()
		await interaction.reply('Команды обновлены!')
	}
}
