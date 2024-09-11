module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {
		if (!interaction.isCommand()) return

		const command = client.commands.get(interaction.commandName)
		if (!command) return

		try {
			// Проверяем, ответили ли мы уже на взаимодействие
			if (!interaction.replied) {
				await command.execute(interaction)
			}
		} catch (error) {
			console.error(error)
			if (!interaction.replied) {
				await interaction.reply({
					content: 'Произошла ошибка при выполнении команды!',
					ephemeral: true
				})
			}
		}
	}
}
