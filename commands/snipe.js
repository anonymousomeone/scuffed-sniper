const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('s')
		.setDescription('Snipe the latest deleted message'),
	async execute(interaction) {
        console.log(interaction)
        if (!('latest' in interaction.channel)) { return await interaction.reply('No deleted messages yet')}

        var msg = interaction.channel.latest

        var iconURL;
        if (msg.author.avatar == null) iconURL = msg.author.defaultAvatarURL 
        else iconURL = `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}.webp`

        const embed = new MessageEmbed()
            .setColor('#ff0000')
            .setAuthor({ name: msg.author.tag, iconURL: `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}.webp`})
            .setDescription(msg.content)
            .setTimestamp(new Date(msg.deletedAt))
            .setFooter({ text: 'Message deleted:'});

		await interaction.reply({ embeds: [embed]});
	},
};
