import { Logger, MiddlewareConsumer, NestModule } from '@nestjs/common';
export declare class AppModule implements NestModule {
    static logger: Logger;
    configure(consumer: MiddlewareConsumer): void;
}
