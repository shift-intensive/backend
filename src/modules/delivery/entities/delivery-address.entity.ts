import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType('DeliverySenderAddressInput')
@ObjectType()
export class DeliverySenderAddress {
  @Field(() => String)
  @ApiProperty({ example: 'street', description: 'Улица' })
  street: string;

  @Field(() => String)
  @ApiProperty({ example: 'house', description: 'Номер дома' })
  house: string;

  @Field(() => String)
  @ApiProperty({ example: 'apartment', description: 'Номер квартиры' })
  apartment: string;

  @Field(() => String, { nullable: true })
  @ApiProperty({ example: 'comment', description: 'Комментарий' })
  comment?: string;
}

@InputType('DeliveryReceiverAddressInput')
@ObjectType()
export class DeliveryReceiverAddress {
  @Field(() => String)
  @ApiProperty({ example: 'street', description: 'Улица' })
  street: string;

  @Field(() => String)
  @ApiProperty({ example: 'house', description: 'Номер дома' })
  house: string;

  @Field(() => String)
  @ApiProperty({ example: 'apartment', description: 'Номер квартиры' })
  apartment: string;

  @Field(() => String, { nullable: true })
  @ApiProperty({ example: 'comment', description: 'Комментарий' })
  comment?: string;

  @Field(() => Boolean, { nullable: true })
  @ApiProperty({ description: 'Бесконтактная доставка', required: false })
  isNonContact?: boolean;
}
