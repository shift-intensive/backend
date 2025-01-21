import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';

import { OrderedPizza } from '../entities';

@InputType('CreatePizzaPaymentPersonDto')
export class CreatePizzaPaymentPersonDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  @ApiProperty({ example: 'firstname', description: 'Имя' })
  firstname: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  @ApiProperty({ example: 'lastname', description: 'Фамилия' })
  lastname: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  @ApiProperty({ example: 'middlename', description: 'Отчество', required: false })
  middlename?: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  @ApiProperty({ example: '89990009999', description: 'Телефон' })
  phone: string;
}

@InputType('CreatePizzaPaymentAddressDto')
export class CreatePizzaPaymentAddressDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  @ApiProperty({ example: 'street', description: 'Улица' })
  street: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  @ApiProperty({ example: 'house', description: 'Номер дома' })
  house: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  @ApiProperty({ example: 'apartment', description: 'Номер квартиры' })
  apartment: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  @ApiProperty({ example: 'comment', description: 'Комментарий', required: false })
  comment?: string;
}

@InputType('CreatePizzaPaymentDebitCardDto')
export class CreatePizzaPaymentDebitCardDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  @ApiProperty({ example: '1111 1111', description: 'Номер карты' })
  pan: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  @ApiProperty({ example: '11/11', description: 'Срок действие карты' })
  expireDate: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  @ApiProperty({ example: '111', description: 'Код карты' })
  cvv: string;
}

@ArgsType()
export class CreatePizzaPaymentDto {
  @ValidateNested()
  @Field(() => CreatePizzaPaymentAddressDto)
  @ApiProperty({ description: 'Адрес доставки', type: CreatePizzaPaymentAddressDto })
  @Type(() => CreatePizzaPaymentAddressDto)
  receiverAddress: CreatePizzaPaymentAddressDto;

  @ValidateNested()
  @Field(() => CreatePizzaPaymentPersonDto)
  @ApiProperty({ description: 'Данные пользователя', type: CreatePizzaPaymentPersonDto })
  @Type(() => CreatePizzaPaymentPersonDto)
  person: CreatePizzaPaymentPersonDto;

  @ValidateNested()
  @Field(() => CreatePizzaPaymentDebitCardDto)
  @ApiProperty({ description: 'Банковская карта', type: CreatePizzaPaymentDebitCardDto })
  @Type(() => CreatePizzaPaymentDebitCardDto)
  debitCard: CreatePizzaPaymentDebitCardDto;

  @ValidateNested()
  @Field(() => [OrderedPizza])
  @ApiProperty({ description: 'Пиццы', type: [OrderedPizza] })
  @Type(() => OrderedPizza)
  pizzas: OrderedPizza[];
}
