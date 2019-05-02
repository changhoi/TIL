# Cookie Parser

[source](https://www.npmjs.com/package/cookie-parser)

Cookie 쿠키를 쉽게 추출할 수 있도록 해주는 미들웨어이다.
Cookie header를 파싱하고 `req.cookies`를 쿠키 이름들로 키값이 정해진 객체로 채운다. 선택적으로 `secret` 문자열을 넘겨줄 수 있고, 그 값은 req.secret에 할당된다. 그래서 다른 미들웨어에서 사용할 수 있다.

## API

```
import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser);
```

- `cookieParser(sercret, options)`
  - `secret`: string 이거나 array이다. 스트링이 주어지면, secret으로 사용하고, 배열이 주어지면 할당되지 않은 쿠키에 순서대로 적용된다. (? 뭔소리)
  - `options`: 객체 형태로, `cookie.parse`에 두 번째 옵션으로 넘겨진다. [cookie](https://www.npmjs.com/package/cookie)는 다른 모듈임

## options

- `maxAge`: 만료 시간을 밀리초 단위로 설정
- `path`: cookie 경로, default "/"
- `domain`: 도메인 네임, default "loaded"
- `httpOnly`: Boolean, `true`일 때 Express는 브라우저에게 이 쿠키가 서버 사이드에서만 접근할 수 있어야 한다고 전달한다. (클라이언트 사이드 JS 막음)
- `expires`: 쿠키의 만료 날짜를 GMT 시간으로 설정한다. 지정하지 않거나, 0으로 지정되어 있는 경우 session cookie를 생성한다.
- `secure`: HTTPS에서만 cookie를 사용할 수 있게 한다.
- `signed`: Boolean, `true`일 때 쿠키가 signed되고, 접근할 때 `req.signedCookie`를 사용해서 접근해야 한다.

> signed cookie: 값에 서명이 첨부된 쿠키를 뜻한다. value의 암호화를 의미하는 듯 싶음
