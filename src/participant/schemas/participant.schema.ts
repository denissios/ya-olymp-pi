import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {ApiProperty} from "@nestjs/swagger";
import mongoose from "mongoose";

export type ParticipantDocument = Participant & Document;

@Schema()
export class Participant {
    // id задает сама MongoDB

    @ApiProperty()
    @Prop({type: String, required: true})
    name: string;

    @ApiProperty()
    @Prop({type: String})
    wish: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Participant'})
    recipient: Participant;
}
export const ParticipantSchema = SchemaFactory.createForClass(Participant);
