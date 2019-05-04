# connect-flash

connect-flash는 일회성 메시지를 웹 브라우저에 나타낼 때 사용된다. 모듈이 `cookie-parser`과 `express-session`을 사용해서 미들웨어에서 이 뒤에 위치해야 한다.

```
import flash from 'connect-flash'

...

app.use(session({ ... }))
app.use(flash());

...
```

`req` 객체에 `req.flash` 메서드를 추가한다. `req.flash(키, 값)`으로 해당 키에 값을 설정하고, `req.flash(키)`로 값을 불러온다.

```
router.get('/flash', (req, res, next) => {
    req.session.message = '세션'
    req.flash('message', 'flash');
    res.redirect('/flash/result');
})

router.get('/flash/result', (req, res, next) => {
    res.send(`${req.session.message ${req.flash('message')}`)
})
```

'/flash'에서 flash 메시지와 session 메시지를 설정한다음, '/flash/result'로 리다이렉트 되면 두 메시지가 모두 보인다. 한 번 사용한 다음 세션 메시지는 사라진다.

일회성 메시지이기 때문에 에러 등의 1회성 메시지를 보내기 좋다.
