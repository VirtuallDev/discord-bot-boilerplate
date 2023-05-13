import { ChatInputApplicationCommandData, CommandInteraction, ApplicationCommandOptionType, Message } from "discord.js";
import { InteractionType } from "../../bot/enums/InteractionType";
import { HandlerArgs, InteractionHandler } from "../../bot/structures/InteractionHandler";
import Utils from "../../bot/utils";

let commandOptions: ChatInputApplicationCommandData = {
    name: "embed",
    description: "Send an embed.",
    dmPermission: false,
    defaultMemberPermissions: "Administrator",
    options: [
        {
            type: ApplicationCommandOptionType.String,
            name: "title",
            description: "The title of the embed.",
            required: true
        },
        {
            type: ApplicationCommandOptionType.String,
            name: "description",
            description: "The description of the embed.",
            required: false
        },
        {
            type: ApplicationCommandOptionType.Boolean,
            name: "footer",
            description: "Should the embed be with a footer.",
            required: false
        },
        {
            type: ApplicationCommandOptionType.Boolean,
            name: "icon",
            description: "Should the embed be with a icon.",
            required: false
        }
    ]
}

async function handler({ core, interaction, options }: HandlerArgs): Promise<any> {
    interaction as CommandInteraction;
    if (!interaction.guild) return;
    let description = options?.getString("description");
    if(interaction.channel?.lastMessage && !options?.getString("description"))
    {
        description = interaction.channel?.lastMessage!.content;
    }
    


    const filter = (m: Message) => m.author.id == interaction.member?.user.id;
    const title = options?.getString("title", true);
    const footer = options?.getBoolean("footer");
    const icon = options?.getBoolean("icon");

    await interaction.reply({
        content: "You have 15 seconds to write a message!",
        ephemeral: true,
        fetchReply: true
    })

    interaction.channel?.awaitMessages({filter, max: 1, time: 15000, errors: ['time']}).then(c => {
        interaction!.channel!.send({
            embeds: [Utils.buildEmbed(title!, c.first()!.content, footer!, icon!)],
        })
    }).catch(() => {
        interaction.followUp({
            ephemeral: true,
            content: "you didnt send a message"
        })
    })



}

export default new InteractionHandler("embed", handler, commandOptions, InteractionType.Command);