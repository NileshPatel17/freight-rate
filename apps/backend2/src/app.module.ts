import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database/database.module';
import { FrightModule } from './fright/fright.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    FrightModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
