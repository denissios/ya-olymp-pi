import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import { GroupModule } from './group/group.module';
import { ParticipantModule } from './participant/participant.module';

@Module({
  imports: [
      MongooseModule.forRoot('mongodb://mongodb:27017/DB'),
      GroupModule,
      ParticipantModule
  ]
})
export class AppModule {}
