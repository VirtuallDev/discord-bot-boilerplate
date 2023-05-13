import CoreClient from './bot/structures/Core';
import 'dotenv/config';


function main() {
    
    let client: CoreClient = new CoreClient(process.env!.BOT_TOKEN as string, {
        type: "sqlite",
        database: "./db.sqlite",
        synchronize: true
    });
    
    client.start();


}


main();