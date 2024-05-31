import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BaseResolver } from '@/utils/services';

import { EXPENDED_LOANS, LOANS } from './constants';
import { GetFullLoanDto } from './dto';
import { ExpendedLoan, Loan } from './entities';

@ApiTags('🤖 android')
@Controller('/android')
export class AndroidSampleController extends BaseResolver {
  @Get('/loans')
  @ApiOperation({ summary: 'получить займы' })
  @ApiResponse({
    status: 200,
    description: 'loans',
    type: [Loan]
  })
  getLoans(): Loan[] {
    return LOANS;
  }

  @Get('/loans/:id')
  @ApiOperation({ summary: 'получить займ' })
  @ApiResponse({
    status: 200,
    description: 'loan',
    type: ExpendedLoan
  })
  getFullLoan(@Param() params: GetFullLoanDto): ExpendedLoan {
    return EXPENDED_LOANS.find((loan) => loan.id === Number(params.loanId));
  }
}
