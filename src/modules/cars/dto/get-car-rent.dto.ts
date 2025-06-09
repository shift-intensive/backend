import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetCarRentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Идентификатор аренды' })
  carRentId: string;
}
