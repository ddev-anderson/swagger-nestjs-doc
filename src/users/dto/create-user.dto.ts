export class CreateUserDto {
  /**
   * Nome do usuario
   * @example Usuario Teste
   */
  name: string;

  /**
   * Email do usuario
   * @example usuario@email.com
   */
  email: string;

  /**
   * Senha do usuario
   * @example 123@abc
   */
  password: string;
}
