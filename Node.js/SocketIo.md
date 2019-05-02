# Socket.Io

먼저 ws모듈을 사용하는 것부터 해보자.

## ws 모듈 사용

```
// app.js
import webSocket from './ws';

...

const server = app.listen(process.env.PORT, onServer);
webSocket(server);
/*웹 소켓을 익스프레스 서버에 연결*/

// ws.js
import WebSocket from 'ws'

export default server => {
    const wss = new WS.Server.Server({ server });


    /* 연결 이벤트 리스너: 클라이언트와 서버가 웹소켓 연결을 맺을 때
     * req.headers['x-forwarded-for'] || req.connection.remoteAddress는 클라이언트의 IP를 얻어내는 방법
     *
     */
    wss.on('connection', (ws, req) => {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;


        /*클라이언트로부터 메세지를 받았을 때 발생*/
        ws.on('message', message => {
            console.log(message);
        });


        /*웹소켓 연결 중 문제가 발생 했을 때*/
        ws.on('error', error => {
            console.error(error);
        });


        /* 연결이 끊어졌을 때 발생
         * setInterval을 그대로 두면 메모리 누수가 발생한다.
         */
        ws.on('close', () => {
            console.log('클라이언트 접속 해제', ip);
            clearInterval(ws.clearInterval);
        });


        /*3초마다 연결된 모든 클라이언트에게 메시지를 보내는 부분*/
        const interval = setInterval(() => {
            if (ws.readyState === ws.OPEN) {
            ws.send('클라이언트 <- 서버: 메세지를 보냅니다.');
            }
        }, 3000);
        ws.interval = interval;
    })
}
```

웹소켓의 4가지 상태

- CONNECTING(연결 중)
- OPEN(연결 됨) - 이 상태일 경우에만 메시지를 에러없이 보낼 수 있다.
- CLOSING(닫는 중)
- CLOSED(닫힘)

## 클라이언트 측 웹소켓 사용

웹소켓은 양방향 통신이기 때문에 클라이언트 측에서도 웹소켓을 사용해야 한다. script 태그 안에 웹소켓 코드를 작성해 넣었다.

```
//wsclient.js
window.onload = () => {
    const webSocket = new WebSocket("ws://localhost:8001");
    webSocket.onopen = () => {
        console.log('웹 소켓 연결');
    }

    webSocket.onmessage = () => {
        console.log(event.data);
        webSocket.send('클라이언트 -> 서버: 답장을 보냄');
    }
}
```

## Socket.IO 사용해보기

Socket.IO는 구현하고자 하는 서비스가 조금 더 복잡해지는 경우 사용하는게 ws모듈을 사용하는 것보다 훨씬 편하다.

```
// socket.js
import WebSocket from 'socket.io';


/* 익스프레스 서버와 연결함
 * 두 번째 인자의 객체는 옵션으로, 서버에 관한 설정을 한다.
 * path 옵션은 클라이언트와 연결할 수 있는 경로를 의미한다.
 */
export default server => {
  const io = SocketIO(server, { path: '/socket.io' });


  /* 연결 이후 이벤트 리스너를 붙인다.
   * 'connection'은 클라이언트가 접속했을 때 동작한다.
   * 콜백 함수에 소켓 객체를 넣는다.
   */
  io.on('connection', socket => {
    /* socket.request는 요청 객체에 접근할 때 사용된다.
     * socket.request.res로 응답 객체에 접근할 수 있다.
     * socket.id로 소켓 고유 아이디를 가져올 수 있다.
     */
    const req = socket.request;
    const ip = req.headers['x-forward-for'] || req.connection.remoteAddress;
    console.log('New Client Connected', ip, socket.id, req.ip);


    /* socket 객체에도 이벤트리스너를 붙임
     * 'diconnect'는 클라이언트가 연결을 끊었을 때 발생한다.
     * 'error'는 통신 과정 중 에러가 나왔을 때
     * 'reply'는 사용자가 직접 만든 이벤트이다. 클라이언트측에서 reply라는 이름으로 이벤트를 발생시키면 서버에서 받아서 처리하는 부분이다.
     */
    socket.on('disconnect', () => {
      console.log('클라이언트 접속 해제', ip, socket.id);
      clearInterval(socket.interval);
    });

    socket.on('error', error => {
      console.log(error);
    });

    socket.on('reply', data => {
      console.log(data);
    });


    /* emit 메서드는 첫 번째로 이벤트 이름, 두 번째는 데이터들 받는 메서드이다.
     * 아래 예시에서는 'news'라는 이름의 이벤트 이름으로 'Hello Socket.IO'를 클라이언트에게 전송하고 있다.
     * 클라이언트에서 이 메시지를 수신하기 위해서는 'news'라는 이벤트리스너를 만들어놔야 한다.
     */
    socket.interval = setInterval(() => {
      socket.emit('news', 'Hello Socket.IO');
    }, 3000);
  });
};
```

위 주석에서 쓴 것처럼 클라이언트에서도 이벤트리스너를 달아둬야 한다.

```
//socketClient.js

window.onload = () => {
    const socket = io.connect('http://localhost:8001', {
        path: '/socket.io'
    });
    socket.on('news', (data) => {
        console.log(data);
        socket.emit('reply', 'Hello Node.js');
    })
}

//index.pug

...
    script(src='/socket.io/socket.io.js)
    script(src='./socketClient.js');
```

`/socket.io/socket.io.js`는 Socket.IO에서 클라이언트로 제공하는 스크립트이다. 이 스크립트를 통해서 서버와 유사한 API로 웹 소켓 통신이 가능하다. 스크립트가 제공하는 `io` 객체에 서버 주소를 적어 연결한다. `io` 객체에서 옵션으로 `path`를 적어줬는데 이때 path는 서버의 path 옵션과 일치해야 통신이 가능하다. 소켓 객체에는 서버에서 보내는 news 이벤트를 받기 위한 이벤트리스너가 있다. 그리고 이 이벤트 리스너에서는 `'reply'`라는 이름의 이벤트를 통해 서버에게 응답한다.

- Socket.IO는 실제 실행될 때 폴링 방식으로 서버와 연결한다. 그 후에 웹 소켓을 사용할 수 있다면 웹 소켓으로 업그레이드한다. 웹 소켓을 지원하지 않는 브라우저는 폴링으로 진행된다.

[Expo, RN, Socket.IO, mongoDB 채팅 실습]('../')
