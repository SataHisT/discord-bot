const { REST, Routes } = require('discord.js')
const fs = require('fs')
require('dotenv').config()

const token = process.env.BOT_TOKEN
const clientId = process.env.BOT_CLIENT_ID
const guildId = process.env.BOT_GUILD_ID

if (!token || !clientId || !guildId) {
	console.error('Отсутствуют переменные окружения. Убедитесь, что BOT_TOKEN, BOT_CLIENT_ID и BOT_GUILD_ID установлены.')
	process.exit(1)
}

const commands = []
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'))

for (const file of commandFiles) {
	const command = require(`./commands/${file}`)

	if (!command.data) {
		console.error(`Команда ${file} не содержит свойства data.`)
	} else {
		console.log(`Команда ${file} успешно загружена.`)
		commands.push(command.data.toJSON())
	}
}
1

const rest = new REST({ version: '10' }).setToken(token)

;(async () => {
	try {
		console.log('Started refreshing application (/) commands.')

		await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })

		console.log('Successfully reloaded application (/) commands.')
	} catch (error) {
		console.error('Ошибка при обновлении команд:', error)
	}
})()
