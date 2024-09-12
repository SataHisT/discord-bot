const { SlashCommandBuilder } = require('@discordjs/builders')
const { PermissionFlagsBits } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('install')
		.setDescription('Установить logger-bot на Ваш discord server')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
		const guild = interaction.guild

		if (!guild) {
			await interaction.reply('Команда может быть использована только на дискорд сервере.')
			return
		}

		if (!interaction.member.permissions.has(PermissionFlagsBits.ManageChannels)) {
			await interaction.reply('У вас недостаточно прав для создания каналов.')
			return
		}

		try {
			// Создание категории
			const category = await guild.channels.create({
				name: 'moderation',
				type: 4 // Тип 4 соответствует категории
			})

			console.log(`Категория создана: ${category.name} (ID: ${category.id})`)

			// Создание текстовых каналов внутри категории
			await guild.channels.create({
				name: 'join-or-left-logger',
				type: 0, // Тип 0 соответствует текстовому каналу
				parent: category.id
			})

			await guild.channels.create({
				name: 'voice-logger',
				type: 0,
				parent: category.id
			})

			await guild.channels.create({
				name: 'moderator-only-logs',
				type: 0,
				parent: category.id
			})

			await guild.channels.create({
				name: 'message-logger',
				type: 0,
				parent: category.id
			})

			await interaction.reply('Каналы для работы logger-bot успешно установлены.')
		} catch (error) {
			console.error(error)
			await interaction.reply('Произошла ошибка при создании каналов.')
		}
	}
}
