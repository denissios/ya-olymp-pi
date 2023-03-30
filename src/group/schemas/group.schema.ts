import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {ApiProperty} from "@nestjs/swagger";
import {Participant} from "../../participant/schemas/participant.schema";
import mongoose from "mongoose";

export type GroupDocument = Group & Document;

@Schema()
export class Group {
    // id задает сама MongoDB

    @ApiProperty()
    @Prop({type: String, required: true})
    name: string;

    @ApiProperty()
    @Prop({type: String})
    description: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Participant'}]})
    participants: Participant[];
}
export const GroupSchema = SchemaFactory.createForClass(Group);
