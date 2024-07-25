# NestJS - Swagger - Documentação de Endpoint

O Swagger é uma biblioteca para documentação de backend, realiza a geração de um site interno que descreve com detalhes cada endpoint e estrutura de entidades presentes sua aplicação.

Além disso também oferece uma interface para que a API seja testada, sem precisar de um cliente HTTP externo (Postman, Insomnia, etc)

## Instalação

- `@nestjs/swagger`
- `swagger-ui-express`

```bash
npm install --save @nestjs/swagger swagger-ui-express
```

## Configuração

Abra o arquivo `main.ts` e adicione o seguinte conteúdo:

`src/main.ts`

```typescript
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Documentação com Swagger - Fábrica de Sinapse')
    .setDescription(
      'O Swagger (aka OpenApi) é uma biblioteca muito conhecida no universo backend, estando disponível para diversas linguagens e frameworks. Ela gera um site interno no seu backend que descreve, com muitos detalhes, cada endpoint e estrutura de entidades presentes na sua aplicação.',
    )
    .setVersion('1.0')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
```

## Acessando

Execute a aplicação

```bash
npm run start:dev
```

Abra a URL no seu navegador

http://localhost:3000/api/

Pronto!

![image](https://github.com/user-attachments/assets/95c6b88b-9e63-49c8-8334-d452074c9e2d)

## Tags
As tags são utilizadas para sinalizar quais controles vão ser adicionados ao swagger, por exemplo para adicionar o `UsersController`, só é nescessario adicionar a tag `@ApiTags('users')` que vem com a biblioteca `@nestjs/swagger`.

`src/users/users.controller.ts`

```typescript
@ApiTags('users')
@Controller('users')
export class UsersController {
  ....
}
```

Salve o arquivo para que o Nest recarregue a aplicação automaticamente e atualize a página do swagger.

## Testando requisições

Para testar a requisições, basta clicar em cima de um dos endpoints desejados para visualizar a sua estrutura.

![image](https://github.com/user-attachments/assets/5bbb4fb4-f88a-4df1-a79e-6ffb281d1bff)

Clique no botão `Try it out` e depois em `Execute` para realizar a requisição HTTP.

![image](https://github.com/user-attachments/assets/ddbfc564-8014-4924-a404-d0be3f6b9591)

## Documentando a declaração de entidades

Adicione comentários antes de cada propriedade e o Swagger irá utilizar as informações dos comentários para exibir na documentação de endpoints.

Exemplo:

`src/users/dto/create-user.dto.ts`

```typescript
export class CreateUserDto {
  /**
   * O nome será utilizado para qualquer coisa (Perfil, Home Page, etc) que precise exibir
   * informações da pessoa conectada.
   * @example Usuario teste
   */
  name: string;

  /**
   * O e-mail é necessário apra o login
   * @example email@email.com
   */
  email: string;

  /**
   * Senha de login
   * @example 123@abc
   */
  password?: string;
}
```

Após isso, é necessario ativar a opção `introspectComments` de configuração do `@nestjs/swagger` no arquivo `nest-cli.json`.

`nest-cli.json`

```json
{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "plugins": [
      {
        "name": "@nestjs/swagger",
        "options": {
          "classValidatorShim": false,
          "introspectComments": true
        }
      }
    ]
  }
}
```
