import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetCarsRentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Идентификатор аренды' })
  carsRentId: string;
}
