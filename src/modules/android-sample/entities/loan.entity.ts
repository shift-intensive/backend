import { ApiProperty } from '@nestjs/swagger';

import { LoanFeedItem } from './loan-feed-item.entity';

export class Loan extends LoanFeedItem {
  @ApiProperty({ example: '+77259786293', description: 'Номер телефона' })
  phone: string;

  @ApiProperty({ example: '2024-05-25T12:01:44Z', description: 'Дата выдачи кредита' })
  date: string;

  @ApiProperty({ example: 20, description: 'Срок кредита' })
  period: number;
}
