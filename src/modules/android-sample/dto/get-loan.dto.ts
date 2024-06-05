import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetLoanDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Идентификатор займа' })
  loanId: string;
}
