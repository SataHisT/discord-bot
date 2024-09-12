const { EmbedBuilder } = require('discord.js')

module.exports = {
	name: 'guildMemberAdd',
	async execute(member) {
		const logChannel = member.guild.channels.cache.find((channel) => channel.name === 'join-or-left-logger')

		if (!logChannel) {
			console.error('Log channel not found!')
			return
		}

		const embed = new EmbedBuilder()
			.setColor('#cfff00')
			.setAuthor({
				name: member.user.tag,
				iconURL: member.user.displayAvatarURL()
			})
			.setTitle('Присоединился новый участник')
			.addFields({ name: 'ID', value: member.id, inline: true })
			.setFooter({ text: `Присоединился: ${new Date().toLocaleString()}` })
			.setTimestamp()

		try {
			await logChannel.send({ embeds: [embed] })
			console.log('Присоединился новый пользователь, лог успешно доставлен.')
		} catch (error) {
			console.error('Ошибка в отправке лога присоединения нового пользователя:', error)
		}
	}
}
