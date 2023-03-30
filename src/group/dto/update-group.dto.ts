import {ApiProperty} from "@nestjs/swagger";
import {IsOptional, IsString} from "class-validator";

export class UpdateGroupDto {
    @ApiProperty()
    @IsString({message: "Должно быть строкой"})
    readonly name: string;

    @ApiProperty()
    @IsString({message: "Должно быть строкой"})
    @IsOptional()
    readonly description: string;
}
