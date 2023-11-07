import { ApiProperty } from '@nestjs/swagger';
import { IsString, Min, Max } from 'class-validator';

export class InLogDTO {
  @IsString()
  @ApiProperty()
  @Min(5)
  @Max(100)
  token: string;

  @IsString()
  @ApiProperty()
  @Min(5)
  @Max(100)
  operation: string;

  @IsString()
  @ApiProperty()
  username: string;
}
