import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

/**
 * Data Transfer Object (DTO) for logging in a user.
 */
export class LoginDto {
  /**
   * The username of the user.
   * @type {string}
   * @memberof LoginDto
   * @example 'johndoe'
   * @minLength 3
   * @maxLength 20
   * @isNotEmpty
   * @isString
   */  
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  /**
   * The password of the user.
   * @type {string}
   * @memberof LoginDto
   * @example 'password123'
   * @minLength 8
   * @maxLength 20
   * @isNotEmpty
   * @isString
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;


}
