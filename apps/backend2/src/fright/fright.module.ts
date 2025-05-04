import { Module } from '@nestjs/common';
import { DatabaseModule } from "../database/database.module";
import { FrightController } from './fright.controller';
import { FrightService } from './fright.service';

@Module({
    imports:[DatabaseModule],
    controllers:[FrightController],
    providers:[FrightService]
})
export class FrightModule {}