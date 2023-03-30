import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Participant, ParticipantDocument} from "./schemas/participant.schema";

@Injectable()
export class ParticipantService {
    constructor(@InjectModel(Participant.name) private participantRepository: Model<ParticipantDocument>) {}

    async createParticipant(name: string, wish: string) {
        return await this.participantRepository.create({name, wish});
    }

    async deleteParticipant(id: string) {
        const participant = await this.participantRepository.findByIdAndDelete(id);
        if(!participant) {
            throw new HttpException('Участник не найден', HttpStatus.NOT_FOUND)
        }
        return participant;
    }

    async getRecipient(participantId: string) {
        const participant = await this.participantRepository.findById(participantId);
        if(!participant) {
            throw new HttpException('Участник не найден', HttpStatus.NOT_FOUND)
        }
        return participant.recipient;
    }

    async setRecipient(participantId: Participant, recipientId: Participant) {
        const participant = await this.participantRepository.findById(participantId);
        participant.recipient = await this.participantRepository.findById(recipientId);

        await participant.save();
    }
}
