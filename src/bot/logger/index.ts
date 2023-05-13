import { LogType } from '../enums/Logger';
import ch from 'chalk';

interface logArgs {
    logType?: LogType;
    text: string;
    prefix?: string
};

export type log = (args: logArgs) => void

export default function log(args: logArgs): void {
    const { logType, text, prefix: prefix_ } = args;
    let prefix = prefix_;
    if(prefix_ !== "" && !prefix_) prefix = "[Core]";
    let colored: string = "";
    switch (logType) {
        case LogType.Success:
            colored = ch.greenBright(prefix);
            break;
        case LogType.Danger:
            colored = ch.red(prefix);
            break;
        case LogType.Info:
            colored = ch.grey(prefix);
            break;
        case LogType.Warn:
            colored = ch.yellowBright(prefix);
            break;
        case LogType.Primary: default:
            colored = ch.blueBright(prefix);
            break;
    }

    return console.log(colored, text);
};