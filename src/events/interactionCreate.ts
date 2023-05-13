import { CommandInteractionOptionResolver, Interaction, GuildMember } from "discord.js";
import Event from "../bot/structures/Event";
import { InteractionT } from "../bot/structures/InteractionHandler";

function getInteractionIdentifier(interaction: Interaction): string {
    if (interaction.isCommand()) return interaction.commandName;
    if (interaction.isButton() || interaction.isAnySelectMenu()) return interaction.customId;
    return "";
}

export default new Event("interactionCreate", async (core, interaction) => {
    let handler = core.interactions.get(getInteractionIdentifier(interaction));
    if (handler) {
        handler.handler({
            core: core,
            interaction: interaction as InteractionT,
            options: interaction.isChatInputCommand() ? interaction.options as CommandInteractionOptionResolver : null,
            option: interaction.isStringSelectMenu() ? interaction.component.options.find(o => o.value === interaction.values[0]) : undefined
        })
    } else if (interaction.isChatInputCommand()) {
        interaction.reply({ content: "There was a problem loading the command.", ephemeral: true });
    }
})