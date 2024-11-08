import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_PIPE } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "~/src/aggregates/users/users.module";
import { TypeOrmConfigs } from "~/src/shared/core/infrastructure/Config";
import { AllExceptionFilter } from "~/src/shared/filters/GrpcExceptionFilter";
import { GrpcValidationPipe } from "~/src/shared/pipes/GrpcValidationPipe";

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: [".env", ".env.dev"],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigs,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: GrpcValidationPipe,
    },
  ],
})
export class AppModule {}
