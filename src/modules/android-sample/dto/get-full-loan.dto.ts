import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetFullLoanDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Идентификатор займа' })
  loanId: string;
}
