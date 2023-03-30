import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Group, GroupDocument} from "./schemas/group.schema";
import {Model} from "mongoose";
import {CreateGroupDto} from "./dto/create-group.dto";
import {UpdateGroupDto} from "./dto/update-group.dto";
import {AddParticipantInGroupDto} from "./dto/add-participant-in-group.dto";
import {ParticipantService} from "../participant/participant.service";

@Injectable()
export class GroupService {
    constructor(@InjectModel(Group.name) private groupRepository: Model<GroupDocument>,
                private participantService: ParticipantService) {}

    async createGroup(dto: CreateGroupDto) {
        const group = await this.groupRepository.create(dto);
        return group.id;
    }

    async getGroups() {
        return this.groupRepository.find({}, {participants: 0, __v: 0})
    }

    async getGroup(id: string) {
        const group = await this.groupRepository.findById(id)
            .populate({path: 'participants', populate: {path: 'recipient'}});
        if(!group) {
            throw new HttpException('Группа не найдена', HttpStatus.NOT_FOUND)
        }
        return group;
    }

    async updateGroup(id: string, dto: UpdateGroupDto) {
        if(dto.name === '') {
            throw new HttpException('Имя не может быть пустым', HttpStatus.BAD_REQUEST)
        }
        return this.groupRepository.findByIdAndUpdate(id, dto, {new: true});
    }

    async deleteGroup(id: string) {
        const group = this.groupRepository.findByIdAndDelete(id);
        if(!group) {
            throw new HttpException('Группа не найдена', HttpStatus.NOT_FOUND)
        }
        return group;
    }

    async addParticipantInGroup(id: string, dto: AddParticipantInGroupDto) {
        const group = await this.groupRepository.findById(id);
        if(!group) {
            throw new HttpException('Группа не найдена', HttpStatus.NOT_FOUND)
        }
        const participant = await this.participantService.createParticipant(dto.name, dto.wish);
        group.participants.push(participant);
        await group.save();
        return participant.id;
    }

    async deleteParticipantInGroup(groupId: string, participantId: string) {
        const group = await this.groupRepository.findByIdAndUpdate(
            groupId,
    {$pull: {participants: participantId}}
        );
        if(!group) {
            throw new HttpException('Группа не найдена', HttpStatus.NOT_FOUND)
        }
        await this.participantService.deleteParticipant(participantId);
        return participantId;
    }

    async tossGroup(id: string) {
        const group = await this.groupRepository.findById(id)
            .populate({path: 'participants'});
        if(!group) {
            throw new HttpException('Группа не найдена', HttpStatus.NOT_FOUND)
        }
        if(group.participants.length < 3) {
            throw new HttpException('Количество участников группы меньше 3', HttpStatus.CONFLICT)
        }
        await Promise.all(group.participants.map(async (p, i, arr) => {
            if(i !== arr.length - 1) {
                await this.participantService.setRecipient(p, arr[i + 1])
            } else {
                await this.participantService.setRecipient(p, arr[0]);
            }
        }));

        return this.groupRepository.findById(id)
            .populate({path: 'participants', populate: {path: 'recipient'}});
    }

    async getRecipient(groupId: string, participantId: string) {
        const group = await this.groupRepository.findById(groupId);
        if(!group) {
            throw new HttpException('Группа не найдена', HttpStatus.NOT_FOUND)
        }
        return this.participantService.getRecipient(participantId);
    }
}
