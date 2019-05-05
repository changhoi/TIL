# Passport.js

[source](http://www.passportjs.org/docs/authenticate/)
source - Node.js 교과서

Passport는 로그인 과정을 대신 해주는 모듈이다.

```
// app.js

import passport from 'passport';
import passportConfig from './passport';

...

passportConfig(passport);

...

app.use(passport.initialize()); // req에 passport 설정을 넣는다.
app.use(passport.session());    // req.session에 passport 정보를 저장한다.
```

> `passport.session()`은 `express-session` 이후에 사용해야 한다.

## serializeUser, deserializeUser

- `serializeUser`는 `req.session` 객체에 어떤 데이터를 저장할지 선택한다. 매개변수로 `user`를 받고 `done` 함수에 두 번째 인자로 `user.id`를 넘겨준다. (`done`의 첫 번째 인자는 에러 발생 시 사용함)

- `deserializeUser`는 요청할 때마다 `passport.session()` 미들웨어가 호출하는 함수이다. `serializeUser`로 session에 저장된 유저를 조회한다. 조회한 정보를 `req.user`에 저장한다. 즉, `req.user`를 통해 로그인한 사용자의 정보를 가져올 수있다.
```
// passport/index.js
import db from '../models'
import local from './localStrategy';

export default (passport) => {
    passport.serializeUser((user, done) => {
    done(null, user.id);
    })

    passport.deserializeUser((id, done) => {
        db.User.findOne({where: { id }})
            .then(user => done(null, user))
            .catch(e => done(e))
    })

    local(passport)
}
```

전체 과정은 아래와 같다.
1. 로그인 요청
2. `passport.authenticate()`
3. 로그인 전략 수행
4. 성공 시 사용자 정보 객체와 함께 `req.login` 호출
5. `req.login` 메서드가 `passport.serializeUser` 호출
6. `req.session`에 `user.id` 저장
7. 로그인 끝
8. 모든 요청에 `passport.session()` 미들웨어가 `passport.deserializeUser` 메서드를 호출
9. DB에서 사용자 조회
10. 조회한 사용자를 `req.user`에 저장

3번의 로그인 전략은 어떻게 로그인 과정을 처리할 것인지에 대한 내용들이다. 아래에는 라우팅이고 그 아래 로컬 로그인에 대해서 다룬다. 

## authenticate, Strategy

```
// routers/auth.js
import express from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';

import db from '../models'; 

const router = express.Router();

...

router.post('/signup', async (req, res, next) => {
    const { username, passport } = req.body;
    try {
        const existUser = await db.User.findOne({ where: { username }});
        if (existUser) {
            req.flash('signupError', '이미 가입된 아이디');
        }
        return res.redirect('/signup');

        // 이미 가입된 아이디가 아닌 경우 아래
        const hashedPassword = await bcrypt.hash(password, 12);

        await db.User.create({
            username, 
            password: hashedPassword
        });
        return res.redirect('/');
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.post('/login', (req, res, next) => {
    
    /* 아래 함수는 로컬 로그인 전략을 수행한다. 전략 성공 or 실패 후 콜백 함수가 실행된다. authError가 있으면 실패, 두번 째에 user가 있다면 성공한 것으로 login 메서드를 호출함 */ 
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            req.flash('loginError', info.message);
            return res.redirect('/');
        }

        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        })
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
})

export default router;
```

아래는 로컬 전략이다.
```
// passport/localStrategy.js
import Local from 'passport-local';
import bcrypt from 'bcrypt';

import db from '../models'

const Strategy = Local.Strategy;

export default (passport) => {

    /* usernameField, passwordField에 req.body와 일치하는 문자열을 넣으면 됨 */

    passport.use(new Strategy({
        usernameField: 'username',
        passwordField: 'password'
    }, async (username, password, done) => {
        /* 실제 전략을 수행하는 함수. done 함수는 passport.authenticate의 콜백 함수이다*/
        try {
            const existUser = await db.User.find({ where: { username }});

            if (existUser) {
                const result = await bcrypt.compare(password, exUser.password);

                if (result) {
                    done(null, existUser);
                } else {
                    done(null, false, { message: '비밀번호 오류'});
                }
            } else {
                done(null, false, { message: '없는 회원' })
            }
        } catch (e) {
            console.error(e);
            done(e);
        }
    }))
}
```

[JWT 토큰 인증](./jsonwebtoken.md)
[SNS 인증](./Passport-sns.md)