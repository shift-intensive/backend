import { ApiProperty } from '@nestjs/swagger';

import { Loan } from './loan.entity';

export class ExpendedLoan extends Loan {
  @ApiProperty({ example: '+77259786293', description: 'Номер телефона' })
  phone: string;

  @ApiProperty({ example: '2024-05-25T12:01:44Z', description: 'Дата выдачи кредита' })
  date: string;

  @ApiProperty({ example: 20, description: 'Срок кредита' })
  period: number;
}
