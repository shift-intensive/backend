import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString
} from 'class-validator';

@InputType()
export class CreateRent {
  @Field(() => String)
  @ApiProperty({ example: 'car123', description: 'Идентификатор автомобиля' })
  @IsString()
  carId: string;

  @Field(() => String)
  @ApiProperty({ example: 'Москва, ул. Ленина, 12', description: 'Место получения автомобиля' })
  @IsString()
  pickupLocation: string;

  @Field(() => String)
  @ApiProperty({ example: 'Москва, ул. Тверская, 15', description: 'Место возврата автомобиля' })
  @IsString()
  returnLocation: string;

  @Field(() => String)
  @ApiProperty({ example: '2025-06-01T10:00:00Z', description: 'Дата начала аренды (ISO формат)' })
  @IsDateString()
  startDate: string;

  @Field(() => String)
  @ApiProperty({
    example: '2025-06-05T18:00:00Z',
    description: 'Дата окончания аренды (ISO формат)'
  })
  @IsDateString()
  endDate: string;

  @Field(() => Number)
  @ApiProperty({ example: 15000, description: 'Итоговая стоимость аренды' })
  @IsNumber()
  totalPrice: number;

  @Field(() => String)
  @ApiProperty({ example: 'Иван', description: 'Имя арендатора' })
  @IsString()
  firstName: string;

  @Field(() => String)
  @ApiProperty({ example: 'Иванов', description: 'Фамилия арендатора' })
  @IsString()
  lastName: string;

  @Field(() => String)
  @ApiProperty({ example: 'Иванович', description: 'Отчество арендатора', required: false })
  @IsString()
  @IsOptional()
  middleName?: string;

  @Field(() => String)
  @ApiProperty({ example: '1990-01-01', description: 'Дата рождения арендатора (ISO формат)' })
  @IsDateString()
  birthDate: string;

  @Field(() => String)
  @ApiProperty({ example: 'ivan@example.com', description: 'Email арендатора' })
  @IsEmail()
  email: string;

  @Field(() => String)
  @ApiProperty({ example: '79876543210', description: 'Телефон арендатора в формате 7XXXXXXXXXX' })
  @IsPhoneNumber('RU')
  phone: string;

  @Field(() => String, { nullable: true })
  @ApiProperty({
    example: 'Позвонить за 1 час до выдачи',
    description: 'Комментарий арендатора',
    required: false
  })
  @IsOptional()
  @IsString()
  comment?: string;
}
