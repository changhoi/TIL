# Web Socket

source: Node.js 교과서
[source](https://victorydntmd.tistory.com/250)

## 웹 소켓?

- 웹소켓은 HTML5에서 새로 추가된, 실시간 양방향 데이터 전송 기술이다. HTTP와 다르게 WS라는 프로토콜을 사용한다. 웹소켓 방식 이전에는 HTTP에서 업데이트가 있는지 지속적으로 확인하고 있으면 새로 받아오는 폴링(polling)방법이었다. 웹소켓은 클라이언트와 연결된 상태로, 업데이트 내용을 알려주는 방식이다. HTTP 프로토콜과 포트를 공유할 수 있기 때문에 다른 포트에 연결할 필요도 없다.

## ws 프로토콜

- HTTP에서 WS으로 프로토콜 전환을 **WebSocket HandShake**라고 한다. 브라우저는 프로토콜을 HTTP에서 Websocket으로 전환하려는 요청을 Header에 Upgrade속성을 추가해서 서버로 보낸다. 이 요청을 받은 서버가 ws 프로토콜을 이해하면 프로토콜 전환에 동의하고 브라우저와 서버는 ws 프로토콜을 사용하게 된다. 전환된 이후 HTTP는 중단되고 ws연결로 대체된다.

> cf. Server Sent Event (SSE)
> EventSource라는 객체를 사용해서 한 번만 연결하면, 서버가 클라이언트에 지속적으로 데이터를 보내주는 방식이다. 웹소켓과 다른 점은 클라이언트에서 서버로는 데이터를 보낼 수 없다는 것이다.

[Socket.io](../Node.js/SocketIo.md)
