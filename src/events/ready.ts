import { BaseGuild, ChatInputApplicationCommandData, Collection } from "discord.js";
import Event from "../bot/structures/Event";
import { InteractionType } from "../bot/enums/InteractionType";
import { InteractionHandler } from "../bot/structures/InteractionHandler";
import { LogType } from "../bot/enums/Logger";

export default new Event("ready", async (core) => {
    let commands: Collection<string, InteractionHandler> = core.interactions.filter((i: InteractionHandler) => i.type == InteractionType.Command);
    core.application?.commands.set(commands.map((c: InteractionHandler) => c.data as ChatInputApplicationCommandData));

    core.log({ logType: LogType.Success, text: "The core is ready." });
})