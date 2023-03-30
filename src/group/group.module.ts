import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import {GroupController} from "./group.controller";
import {ParticipantModule} from "../participant/participant.module";
import {MongooseModule} from "@nestjs/mongoose";
import {Group, GroupSchema} from "./schemas/group.schema";

@Module({
  imports: [
      MongooseModule.forFeature([{name: Group.name, schema: GroupSchema}]),
      ParticipantModule
  ],
  controllers: [GroupController],
  providers: [GroupService]
})
export class GroupModule {}
