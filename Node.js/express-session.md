# express-session

[source](https://ocsusu.tistory.com/55)
[source](https://dalkomit.tistory.com/72)

HTTP Session은 클라이언트가 서버로 http 요청을 보내면, 서버에서 request-header 필드에 cookie를 확인해서 해당 session-id를 보냈는지 확인한다. 만약 없으면 session-id를 만들고, 클라이언트에게 response-header 필드에 set-cookie 값으로 session-id를 발행한다. 이때 발행된 쿠키는 메모리(브라우저)에 저장되고 세션 종료 시 같이 종료된다.
express-session은 Express에서 세션을 관리하기 위해 필요한 미들웨어이다

## 사용해보기

```
import session from 'session';

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}))
```

- `secret`: 쿠키의 변조를 막기 위한 값, 세션을 암호화하여 저장한다.
- `resave`: 세션의 변경 값이 없어도 항상 저장할지 정하는 값(document에서는 false를 권장)
- `saveUninitialized`: 세션이 저장되기 전에 uninitialized 상태로 미리 만들어서 저장

```
app.get('/', (req, res) => {
    ...
    session = req.session;
    session.token = token;
})
```

- session.key = value 형태로 세션에 변수를 설정할 수 있다.

```
req.session.destroy((err) = > {
    ...
})
```

- 세션은 `destroy()`함수를 사용해서 제거한다. 콜백 함수를 안에 넣을 수 있는데 콜백 함수 안에서는 세션을 사용할 수 없다.

## 다른 옵션들

- `proxy`: 프록시를 믿을 것인지, https와 관련해 필요한 옵션
- `cookie`: 세션과 함께 쿠키를 사용할 수 있는데 객체로서 들어간다. 안에는 secure, maxAge 같은 옵션을 또 사용할 수 있다. 보통 쿠키 옵션에는 `httpOnly: true, secure: false`를 사용한다
