import { IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
  // Check Query Parameter Validation
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly year: number;

  @IsString({ each: true })
  readonly genres: string[];
}
