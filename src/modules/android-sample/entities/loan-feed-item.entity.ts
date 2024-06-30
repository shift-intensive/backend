import { ApiProperty } from '@nestjs/swagger';

export enum LoanStatus {
  APPROVED = 'APPROVED',
  REGISTERED = 'REGISTERED',
  REJECTED = 'REJECTED'
}

export class LoanFeedItem {
  @ApiProperty({ example: 1, description: 'Идентификатор займа' })
  id: number;

  @ApiProperty({ example: 'Борис', description: 'Имя' })
  first_name: string;

  @ApiProperty({ example: 'Михеев', description: 'Фамилия' })
  last_name: string;

  @ApiProperty({ example: 15000, description: 'Сумма кредита' })
  amount: number;

  @ApiProperty({ example: 1.9, description: 'Процентная ставка' })
  percent: number;

  @ApiProperty({ example: 'APPROVED', description: 'Процентная ставка', enum: LoanStatus })
  status: LoanStatus;
}
