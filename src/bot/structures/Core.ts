import 'reflect-metadata';
import { ActivityType, Client, Collection, Partials } from 'discord.js';
import { InteractionHandler } from './InteractionHandler';
import { DataSource, DataSourceOptions } from 'typeorm';
import Utils from '../utils';
import Log, { log } from '../logger';
import { InteractionType } from '../enums/InteractionType';
import { LogType } from '../enums/Logger';
import Config from '../constants/Config';

export default class CoreClient extends Client {
    public interactions: Collection<string, InteractionHandler> = new Collection();
    public dataSource: DataSource;
    public log: log = Log;
    public config = Config;
    private token_: string;

    constructor(token: string, databaseOptions: DataSourceOptions) {
        super({ intents: 3276799, partials: [Partials.Message, Partials.Channel] });
        this.token_ = token;
        this.loadDatabaseEntites(databaseOptions);
        this.loadEvents();
        this.loadInteractions();
    }

    public start(): void {
        this.statusInterval();
        this.login(this.token_);
    }

    private statusInterval() {
        setInterval(() => {
            this.user?.setPresence({activities: [{
                name: `[${this.guilds.cache.first()?.memberCount} Members]`,
                type: ActivityType.Listening
            }],
            status: 'dnd'
            })

            this.user?.setStatus('dnd');
        }, 1000);
    }

    private async loadDatabaseEntites(databaseOptions: DataSourceOptions): Promise<void> {
        this.dataSource = new DataSource({
            entities: [`./src/bot/entities/*{.ts,.js}`],
            ...databaseOptions
        });
        await this.dataSource.initialize();

        this.log({ logType: LogType.Success, prefix: "[DB Manager]", text: `the database has successfully loaded.` });
        this.log({ prefix: "", text: "------------------------------------------------------------------", logType: 0 });
    }

    private async loadInteractions() {
        (await Utils.importFilesGlob("interactions/*/*{.ts,.js}")).forEach((interaction: InteractionHandler) => {
            if (!interaction.data && interaction.type == InteractionType.Command) {
                return this.log({ text: `command interaction with identifier ${interaction.identifier} has no data.`, prefix: "[Interaction Manager]", logType: LogType.Danger });
            }
            this.interactions.set(interaction.identifier, interaction);
            this.log({ logType: LogType.Success, prefix: "[Interaction Manager]", text: `${interaction.identifier} loaded.` });

        })

        this.log({ prefix: "", text: "------------------------------------------------------------------" })
    }

    private async loadEvents() {
        
        (await Utils.importFilesGlob("events/*{.ts,.js}")).forEach(event => {
            this.on(event.event, event.handler.bind(null, this));
            this.log({ logType: LogType.Success, prefix: "[Event Manager]", text: `${event.event} loaded.` });
        })
        this.log({ prefix: "", text: "------------------------------------------------------------------" })
    }
}