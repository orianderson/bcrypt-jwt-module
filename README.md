# Validação de usuários e estratégia de autenticação

1 - Licença: MIT <br />
2 - Versão: 2.0.0 <br />
3 - Dependências: <br />

- Bcrypt <br />
- jsonwebtoken

## bcrypt-jwt-module

Este projeto tem a finalidade de facilitar a implementação de métodos de validação de usuários e evitar repetição de códigos: uma vez que pode ser usado em qualquer sistema que utilize como estratégias autenticação de usuários a partir de senhas armazenadas no formato hash.

Também é possível gerar e verificar se o token, no formato jwt, é válido implementados nos sistemas cujo estratégia de autenticação é neste formato.

Para além do hashing de senhas e validação do usuários, podemos importar e executar os métodos do objeto `authService`, são eles: `signInUser`, `validadeRefreshToken`, `validadeAccessToken`.

Caso de uso do método `signInUser`:

```
payload = {
    email, name, id, password
}

authService.signInUser(password, secret, payload)

output = {
    email, name, id, accessToken, refreshToken
}
```

Caso de uso do método `validadeRefreshToken`, para verificar se o refreshToken (válido por 3 dias) é valido e retornar um accessToken (válido por 15 minutos).

```

authService.validadeRefreshToken(refreshToken, secret)

output = {
    accessToken
}
```

Caso de uso do método `validadeAccessToken`, para verificar se o accessToken (válido por 15 minutos). Sendo válido retorna uma objeto de identificação.

```

authService.validadeAccessToken(accessToken, secret)

output = {
    id
}
```

Também a possibilidade de utilizar diretamente os serviços: BcryptService e JwtService.

## Caso de uso - Hashing

```
import { BcryptService } from "bcrypt-jwt-module";

const bcrypt = new BcryptService();

async function hashPassword() {
    const hashpassword = await bcrypt.hash("strongpassword");

    return hashpassword;
}

async function comparePassword (password) {
    const isUser = await bcrypt.compare(password, hashPassword)

    return isUser;
}
```

## Caso de uso - Json Web Token

```
import { JwtService } from "bcrypt-jwt-module";

const jwt = new JwtService();

function createToken() {
    const payload = {
        _id: "userId"
    }

    const options = {
        secret: "string",
        expiresIn: "15m"
    }
    const token = jwt.createToken(payload, options);

    return token;
}
```

```
function verifyToken (token) {
    const payload = jwt.checkToken(token, secret)

    <!-- payload is the user payload or error message (jwt expired or invalid signature) -->

    return payload;
}
```

## Instalação

```
npm i bcrypt-jwt-module
```

ou

```
yarn add bcrypt-jwt-module
```

## Documentação de suporte (terceiros)

1. [Bcrypt](https://www.npmjs.com/package/bcrypt)
2. [Json Web Token](https://www.npmjs.com/package/jsonwebtoken)

## Contato

[Linkedin](https://www.linkedin.com/in/-anderson-oliveira/)
