import {Module} from "@nestjs/common";
import {DbService} from "./db.service";
import {LoggerModule} from "../logger/logger.module";
import {ConfigModule} from "../config/config.module";

@Module({
    imports: [LoggerModule, ConfigModule],
    providers: [DbService],
    exports: [DbService],
})
export class DbModule {
}
