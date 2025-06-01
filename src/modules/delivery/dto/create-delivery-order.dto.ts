import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';

import { DeliveryOptionType } from '../entities';
import { Payer } from '../modules';

@InputType('CreateDeliveryOrderPersonDto')
export class CreateDeliveryOrderPersonDto {
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

  @Field(() => String, { nullable: true })
  @ApiProperty({ example: 'middlename', description: 'Отчество', required: false })
  middlename?: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  @ApiProperty({ example: '89990009999', description: 'Телефон' })
  phone: string;
}

@InputType('CreateDeliveryOrderSenderAddressDto')
export class CreateDeliveryOrderSenderAddressDto {
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

@InputType('CreateDeliveryOrderReceiverAddressDto')
export class CreateDeliveryOrderReceiverAddressDto {
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

  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  @ApiProperty({ description: 'Бесконтактная доставка', required: false })
  isNonContact?: boolean;
}

@ArgsType()
export class CreateDeliveryOrderDto {
  @Field(() => String)
  @ApiProperty({ description: 'Идентификатор типа посылки' })
  packageId: string;

  @Field(() => DeliveryOptionType)
  @ApiProperty({ description: 'Тип заказа', enum: DeliveryOptionType })
  optionType: DeliveryOptionType;

  @Field(() => String)
  @ApiProperty({ description: 'Идентификатор города отправки' })
  senderPointId: string;

  @ValidateNested()
  @Field(() => CreateDeliveryOrderSenderAddressDto)
  @ApiProperty({ description: 'Адрес отправителя', type: CreateDeliveryOrderSenderAddressDto })
  senderAddress: CreateDeliveryOrderSenderAddressDto;

  @ValidateNested()
  @Field(() => CreateDeliveryOrderPersonDto)
  @ApiProperty({ description: 'Отправитель', type: CreateDeliveryOrderPersonDto })
  sender: CreateDeliveryOrderPersonDto;

  @Field(() => String)
  @ApiProperty({ description: 'Идентификатор города получения' })
  receiverPointId: string;

  @ValidateNested()
  @Field(() => CreateDeliveryOrderReceiverAddressDto)
  @ApiProperty({ description: 'Адрес получателя', type: CreateDeliveryOrderReceiverAddressDto })
  receiverAddress: CreateDeliveryOrderReceiverAddressDto;

  @ValidateNested()
  @Field(() => CreateDeliveryOrderPersonDto)
  @ApiProperty({ description: 'Получатель', type: CreateDeliveryOrderPersonDto })
  receiver: CreateDeliveryOrderPersonDto;

  @IsNotEmpty()
  @Field(() => Payer)
  @ApiProperty({ description: 'Кто будет оплачивать', enum: Payer })
  payer: Payer;
}
