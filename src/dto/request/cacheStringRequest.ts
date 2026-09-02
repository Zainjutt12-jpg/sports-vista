import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export default class CacheStringReqDto {
  @IsOptional()
  @IsInt()
  userId?: number;

  @IsOptional()
  @IsInt()
  vendorId?: number;

  @IsString()
  @MaxLength(1000, { message: 'Cache string must not exceed 1000 characters.' })
  cacheString: string;
}
