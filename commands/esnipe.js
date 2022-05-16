const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('e')
		.setDescription('Snipe the latest edited message'),
	async execute(interaction) {
        if (!('latestEdited' in interaction.channel)) { return await interaction.reply('No edited messages yet')}

        var msg = interaction.channel.latestEdited

        var iconURL;
        if (msg.author.avatar == null) iconURL = msg.author.defaultAvatarURL 
        else iconURL = `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}.webp`

        console.log(msg.editedAt)
        const embed = new MessageEmbed()
            .setColor('#00ff00')
            .setAuthor({ name: msg.author.tag, iconURL: `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}.webp`})
            .setDescription(msg.content)
            .setTimestamp(new Date(msg.edited))
            .setFooter({ text: 'Message edited:'});

		await interaction.reply({ embeds: [embed]});
	},
};
