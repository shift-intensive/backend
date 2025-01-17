import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

@InputType()
class UpdateProfileProfileDto {
  @IsString()
  @IsOptional()
  @Field(() => String)
  @ApiProperty({ example: 'firstname', description: 'Имя', required: false })
  firstname?: string;

  @IsString()
  @IsOptional()
  @Field(() => String)
  @ApiProperty({ example: 'middlename', description: 'Отчество', required: false })
  middlename?: string;

  @IsString()
  @IsOptional()
  @Field(() => String)
  @ApiProperty({ example: 'lastname', description: 'Фамилия', required: false })
  lastname?: string;

  @IsString()
  @IsOptional()
  @Field(() => String)
  @ApiProperty({ example: 'email@gmail.com', description: 'Почта', required: false })
  email?: string;

  @IsString()
  @IsOptional()
  @Field(() => String)
  @ApiProperty({ example: 'city', description: 'Город', required: false })
  city?: string;
}

@ArgsType()
export class UpdateProfileDto {
  @IsObject()
  @IsNotEmpty()
  @Field(() => UpdateProfileProfileDto)
  @ApiProperty({ description: 'Данные пользователя', type: UpdateProfileProfileDto })
  profile: UpdateProfileProfileDto;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  @ApiProperty({ example: '89990009999', description: 'Номер телефона' })
  phone: string;
}
