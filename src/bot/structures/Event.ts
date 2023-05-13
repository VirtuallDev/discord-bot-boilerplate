import { ClientEvents } from "discord.js";
import CoreClient from "./Core";

export default class Event <Key extends keyof ClientEvents> {
    constructor(public event: Key, public handler: (core: CoreClient, ...args: ClientEvents[Key]) => any) {
    }
}
