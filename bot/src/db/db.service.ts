import {NormalizedCacheObject} from '@apollo/client/cache';
import {Injectable} from '@nestjs/common';
import {LoggerService} from "../logger/logger.service";
import {ConfigService} from "../config/config.service";
import {ApolloClient} from '@apollo/client/core';
import {GraphQLClient} from "graphql-request";
import {getSdk, Sdk} from "../generated/graphql";

@Injectable()
export class DbService {
    private readonly client: GraphQLClient;
    private readonly _sdk: Sdk;

    constructor(private readonly logger: LoggerService,
                private readonly configService: ConfigService) {

        const hasuraConfig = configService.get('hasura');
        const httpUri = `${hasuraConfig.httpProtocol}://${hasuraConfig.host}:${hasuraConfig.port}${hasuraConfig.path}`

        this.logger.log(
            `Initializing Hasura client service with uri: ${httpUri}`,
        );


        this.client = new GraphQLClient(httpUri);
        this._sdk = getSdk(this.client)
    }


    get sdk(): Sdk {
        return this._sdk;
    }
}
