# Encryption and Hashing package

1 - The present package has the implementation of Bcrypt to hash and compare password to verify the user credentials to local authentication strategy.

2 - Also has the Jwt implementation to generate and verify token to jwt authentication strategy.

This project has suporte to typescript with the types.

## Install

with npm

```
npm i bcrypt-jwt-module
```

with yarn

```
yarn add bcrypt-jwt-module
```

## Documentation to suporte this project (third party)

1. [Bcrypt](https://www.npmjs.com/package/bcrypt)
2. [Json Web Token](https://www.npmjs.com/package/jsonwebtoken)

## Use case - Hashing

```
import { BcryptService } from "bcrypt-jwt-module";

const bcrypt = new BcryptService();

async function hashPassword() {
    const hashpassword = await bcrypt.hash("strongpassword");

    return hashpassword;
}
```

```
async function comparePassword (password) {
    const isUser = await bcrypt.compare(password, hashPassword)

    return isUser;
}
```

## Use case - Json Web Token

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
