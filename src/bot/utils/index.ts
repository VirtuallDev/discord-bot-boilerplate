import { promisify } from 'util';
import glob from "glob";
import { ActionRowBuilder, ColorResolvable, EmbedBuilder, Guild, GuildMember, SelectMenuBuilder, TextChannel, VoiceChannel, Message, APISelectMenuOption, ButtonComponent, ButtonBuilder, StringSelectMenuBuilder } from 'discord.js';
import Config from "../constants/Config";
import CoreClient from '../structures/Core';
import fs from 'fs';

type ChannelType = TextChannel | VoiceChannel;

class Utils {
    public globify = promisify(glob);

    getReplacedCwd() {
        return process.cwd().replace(/\\/g, "/");
    }

    async importFilesGlob(path: string): Promise<any[]> {


        const paths = await this.globify(`./src/${path}`)

        return await Promise.all(paths.map(async (p: string) => (await import(`${this.getReplacedCwd()}/${p}`))?.default));

    }

    extractIdentifier(ids: string[], id: 'steam' | 'discord' | 'xbx' | 'license'): string | null {

        for(var i = 0; i < ids.length; i++) {
            if(ids[i].startsWith(id)) return ids[i].replace(id + ':', ''); 
        }

        return null;
    }

    buildEmbed(title: string, description: string = '', footer: boolean = false, icon: boolean = false): EmbedBuilder {
        var createdEmbed = new EmbedBuilder()
            .setColor(Config.embed.color as ColorResolvable)
            .setAuthor({ name: title, iconURL: Config.embed.icon });

        if (footer) {
            createdEmbed = createdEmbed
                .setTimestamp()
                .setFooter({ text: Config.embed.footer, iconURL: Config.embed.icon });
        }

        if (description) {
            createdEmbed = createdEmbed.setDescription(description);
        }

        if (icon) {
            createdEmbed = createdEmbed.setThumbnail(Config.embed.thumbnail);
        }

        return createdEmbed;
    }

    async getChannel<T extends ChannelType>(guild: Guild, id: string): Promise<T | null> {
        let channel: T = guild.channels.cache.get(id) as T;
        if (!channel) {
            channel = await guild.channels.fetch(id).catch(() => null) as T;
        }

        return channel as T;
    }


    createStringSelectMenu(customID: string, options: APISelectMenuOption[], placeHolder?: string) {
        return new ActionRowBuilder<StringSelectMenuBuilder>()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId(customID)
                    .setPlaceholder(placeHolder || "Nothing Selected...")
                    .addOptions(...options)
            )
    }

    createButtonActionRow(buttons: ButtonBuilder[]) {
        return new ActionRowBuilder<ButtonBuilder>()
            .addComponents(...buttons)
    }

    async getAllChannelMessages(core: CoreClient, channel: TextChannel): Promise<Message[]> {
        let lastID: string | undefined;

        let messages: Message[] = [];

        while (true) {
            let fetchedMessages = await channel.messages.fetch({
                limit: 100,
                ...(lastID && { before: lastID })
            });

            if (fetchedMessages.size === 0) return messages.filter(m => !m.author.bot);

            messages = messages.concat(Array.from(fetchedMessages.values()));
            lastID = fetchedMessages.lastKey();
        }

    }
}

export default new Utils();