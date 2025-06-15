import { ArgsType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';

@ValidatorConstraint({ name: 'timestamp', async: false })
export class TimestampValidator implements ValidatorConstraintInterface {
  public validate(value: number, _arguments: ValidationArguments): boolean {
    if (typeof value !== 'number') return false;

    if (value.toString().length !== 13) return false;

    const date = new Date(value);
    return !Number.isNaN(date.getTime());
  }

  public defaultMessage(_arguments: ValidationArguments): string {
    return 'Дата должна быть передана в формате timestamp (миллисекунды)';
  }
}

@ArgsType()
export class CreateRentDto {
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

  @Field(() => Number)
  @ApiProperty({
    example: 1717236000000,
    description: 'Дата начала аренды (timestamp в миллисекундах)'
  })
  @IsNumber()
  @Validate(TimestampValidator)
  startDate: number;

  @Field(() => Number)
  @ApiProperty({
    example: 1717610400000,
    description: 'Дата окончания аренды (timestamp в миллисекундах)'
  })
  @IsNumber()
  @Validate(TimestampValidator)
  endDate: number;

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
