import { Provider, Scope } from '@nestjs/common';
import IORedis, { Redis } from 'ioredis';

// eslint-disable-next-line @typescript-eslint/no-namespace
// tslint:disable-next-line:no-namespace
export namespace REDIS {
    export type TYPE = Redis;

    export const TOKEN = Symbol('REDIS_PROVIDER');

    export const PROVIDER: Provider = {
        provide: TOKEN,

        useFactory: (): TYPE => {
            return new IORedis({
                host: process.env.REDIS_HOST || '127.0.0.1',
                port: +process.env.REDIS_PORT || 6379,
            });
        },
        scope: Scope.TRANSIENT,
    };
}
