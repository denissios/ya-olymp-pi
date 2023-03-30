import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {GroupService} from "./group.service";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {CreateGroupDto} from "./dto/create-group.dto";
import mongoose from "mongoose";
import {Group} from "./schemas/group.schema";
import {UpdateGroupDto} from "./dto/update-group.dto";
import {AddParticipantInGroupDto} from "./dto/add-participant-in-group.dto";
import {Participant} from "../participant/schemas/participant.schema";

@Controller('group')
export class GroupController {
    constructor(private groupService: GroupService) {}

    @ApiOperation({summary: "Добавление группы"})
    @ApiResponse({status: 200, type: mongoose.Schema.Types.ObjectId})
    @Post()
    createGroup(@Body() dto: CreateGroupDto) {
        return this.groupService.createGroup(dto);
    }

    @ApiOperation({summary: "Получить группы без участников"})
    @ApiResponse({status: 200, type: [Group]})
    @Get()
    getGroups() {
        return this.groupService.getGroups();
    }

    @ApiOperation({summary: "Получить группу"})
    @ApiResponse({status: 200, type: Group})
    @Get(':id')
    getGroup(@Param('id') id: string) {
        return this.groupService.getGroup(id);
    }

    @ApiOperation({summary: "Изменить группу"})
    @ApiResponse({status: 200, type: Group})
    @Put(':id')
    updateGroup(@Param('id') id: string,
                @Body() dto: UpdateGroupDto) {
        return this.groupService.updateGroup(id, dto);
    }

    @ApiOperation({summary: "Удалить группу"})
    @ApiResponse({status: 200, type: Group})
    @Delete(':id')
    deleteGroup(@Param('id') id: string) {
        return this.groupService.deleteGroup(id);
    }

    @ApiOperation({summary: "Добавление участника в группу"})
    @ApiResponse({status: 200, type: String})
    @Post(':id/participant')
    addParticipantInGroup(@Body() dto: AddParticipantInGroupDto,
                          @Param('id') id: string) {
        return this.groupService.addParticipantInGroup(id, dto);
    }

    @ApiOperation({summary: "Удаление участника из группы"})
    @ApiResponse({status: 200, type: String})
    @Delete(':groupId/participant/:participantId')
    deleteParticipantInGroup(@Param('groupId') groupId: string,
                             @Param('participantId') participantId: string) {
        return this.groupService.deleteParticipantInGroup(groupId, participantId);
    }

    @ApiOperation({summary: "Проведение жеребьевки в группе"})
    @ApiResponse({status: 200, type: Participant})
    @Post(':id/toss')
    tossGroup(@Param('id') id: string) {
        return this.groupService.tossGroup(id);
    }

    @ApiOperation({summary: "Получение информации для конкретного участника группы, кому он дарит подарок"})
    @ApiResponse({status: 200, type: Participant})
    @Get(':groupId/participant/:participantId/recipient')
    getRecipient(@Param('groupId') groupId: string,
                 @Param('participantId') participantId: string) {
        return this.groupService.getRecipient(groupId, participantId);
    }
}
