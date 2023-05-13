import { ButtonComponentData, APISelectMenuOption, ButtonInteraction, ChatInputApplicationCommandData, CommandInteraction, CommandInteractionOptionResolver, GuildMember, BaseSelectMenuComponentData,SelectMenuComponentOptionData, AnySelectMenuInteraction } from "discord.js";
import { InteractionType } from "../enums/InteractionType"
import CoreClient from "./Core";

export type InteractionT = CommandInteraction | ButtonInteraction | AnySelectMenuInteraction;
export type InteractionData = ChatInputApplicationCommandData | ButtonComponentData | BaseSelectMenuComponentData;

export interface HandlerArgs {
    core: CoreClient,
    interaction: InteractionT,
    options: CommandInteractionOptionResolver | null,
    option?: APISelectMenuOption
};

export type handlerCallback = (args: HandlerArgs) => Promise<any>;

export class InteractionHandler {
    public handler: handlerCallback;
    public type: InteractionType;
    public data: InteractionData | null;
    public identifier: string;

    constructor(identifier: string, handler: handlerCallback, data: InteractionData | null, type: InteractionType) {
        this.identifier = identifier;
        this.handler = handler;
        this.type = type;

        if (type == InteractionType.Command) {
            this.data = data;
        }

    }
}