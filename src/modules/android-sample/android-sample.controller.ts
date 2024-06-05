import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BaseResolver } from '@/utils/services';

import { LOAN_FEED_ITEMS, LOANS } from './constants';
import { GetLoanDto } from './dto';
import { Loan, LoanFeedItem } from './entities';

@ApiTags('🤖 android')
@Controller('/android')
export class AndroidSampleController extends BaseResolver {
  @Get('/loans')
  @ApiOperation({ summary: 'получить займы' })
  @ApiResponse({
    status: 200,
    description: 'loan feed',
    type: [LoanFeedItem]
  })
  getLoanFeed(): LoanFeedItem[] {
    return LOAN_FEED_ITEMS;
  }

  @Get('/loans/:loanId')
  @ApiOperation({ summary: 'получить займ' })
  @ApiResponse({
    status: 200,
    description: 'loan',
    type: Loan
  })
  getFullLoan(@Param() params: GetLoanDto): Loan {
    const loan = LOANS.find((loan) => loan.id === Number(params.loanId));

    if (!loan) {
      throw new BadRequestException(this.wrapFail('Займ не найден'));
    }

    return LOANS.find((loan) => loan.id === Number(params.loanId));
  }
}
