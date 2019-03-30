# Ajax

- [source](http://www.yes24.com/Product/goods/59410698): 모던자바스크립트 입문

Ajax는 Asynchronous Javascript XML을 뜻하고, XMLHttpRequest라는 자바스크립트의 객체를 이용해서 웹서버와 비동기로 통신하고, DOM을 이용해서 웹 페이지를 동적으로 갱신하는 프로그래밍 기법이다. Ajax에서 뜻하는 것과는 달리 현재는 주로 JSON과 텍스트 데이터를 이용한다.

## 특징

지도 서비스를 통해서 Ajax를 사용한 기술과 기존의 기술을 비교해서 살펴보자

### 기존 서비스

사용자가 찾아보려는 장소가 바뀌면, 클라이언트는 서버에 새로운 지도 정보를 보내달라는 요청을 보낸다. 서버에서는 이 요청을 받아서 새로운 결과를 포함한 전체를 다시 렌더링한다. 이런 통신은 모두 동기적으로 이루어진다.

### Ajax를 사용한 서비스

사용자가 찾아보려는 장소가 바뀌면 클라이언트 측 자바스크립트가 현재 가지고 있는 데이터에서 부족한 부분을 파악하고, 서버에 그 부분만 보내달라는 요청을 한다. 서버는 그 부분만 전송을 하고 클라이언트는 필요한 부분의 DOM만 변경을 한다. 이떄 통신은 모두 비동기적으로 이루어지기 때문에 서버가 데이터를 모두 보내지 않아도 클라이언트를 자유롭게 사용할 수 있다.

## XMLHttpRequest

Ajax를 사용할 때 데이터 송수신에 `XMLHttpRequest` 객체를 사용한다. 비동기 통신은 다음 단계를 거쳐서 진행된다.

1. XMLHttpRequest 객체 생성
2. 서버와 통신할 때 사용할 처리 방법을 등록
3. 요청을 전송하고 통신을 시작

아래 코드는 HTML 문서와 같은 폴더에 위치한 data.txt 파일을 읽어서, 웹 페이지에 표시하는 예제이다.
```
<script>
    window.onload = () => {

        // (1) XMLHttpRequest 객체를 생성한다.
        const req = new XMLHttpRequest();

        // (2) 서버와 통신할 때 사용할 처리 방법을 등록한다.
        req.onreadystatechange = () => {    // readyState 값이 바뀜
           
            // 응답을 모두 수신했을 때,
            if (req.readyState === 4) {
                
                // 서버가 요청을 성공적으로 처리했을 때
                if (req.status === 200) {
                    document.getElementById('view').innerHTML = req.responseText;
                } 
            }
        }

        // (3) 요청을 전송하고 통신을 시작한다.
        req.open("GET", "data.txt");
        req.send(null);
    }
</script>
```

### (1) XMLHttpRequest 객체 생성

XMLHttpRequest 통신을 하려면 먼저 XMLHttpRequest 객체를 생성해야 한다.

`const req = new XMLHttpRequest`

XMLHttpRequest 객체는 아래 프로퍼티와, 메서드를 가지고 있다. 이것들을 사용하면 서버와 비동기 통신 또는 동기 통신을 할 수 있다.

* 프로퍼티
  - `readyStateHTTP`: 통신 상태를 가져온다. (0 ~ 4 사이의 값) - 읽기 전용
  - `response`: 응답 내용을 가져온다. - 읽기 전용
  - `responseType`: 응답 타입을 가져오거나 설정한다. - 쓰기 가능
  - `status`: 요청에 대한 HTTP 상태 코드를 가져온다. - 읽기 전용
  - `statusText`: 요청에 대한 보충 메시지를 가져온다. - 읽기 전용
  - `onreadystatechange`: `readyState` 값이 바뀔 때마다 호출되는 이벤트 처리기

* 메서드
  - `abort()`: 현재 실행 중인 비동기 통신을 중단한다.
  - `getAllResponseHeader()`: 수신한 모든 HTTP 응답 헤더를 가져온다. - `send` 메서드가 성공했을 때만 사용 가능
  - `getResponseHeader(header)`: 특정 HTTP 응답 헤더를 가져온다. - `send` 메서드가 성공했을 때만 사용 가능
  - `open(...)`: HTTP 요청을 초기화한다.
  - `send(data)`:HTTP 요청을 보낸다.
  - `setRequestHeader(header, value)`: 요청 헤더에 정보를 추가한다.

### (2) 서버와 통신할 때 사용할 처리 방법의 등록

비동기 통신을 할 때는 서버와의 통신 상태를 감시할 수 있다. 즉, 통신 상태가 바뀌었을 때 특정 처리를 추가할 수 있다. 통신 상태가 바뀌면 readyState 프로퍼티 값이 바뀐다. 그러면 그 값의 변화를 감지해, `readystatechange` 이벤트를 발생시킨다. 이 이벤트가 발생하면 `onreadystatechange` 에 등록된 이벤트처리기가 작업을 하게 된다.

`req.onreadystatechange = () => { ... };` or  
`req.addEventListener("readyonchange", () => { ... });`  
  
readyState 프로퍼티는 통신 상태에 따라 다음과 같은 값을 가진다.
- 0: 초기화되지 않음: `open` 메서드가 호출된 상태가 아니다.
- 1: 로드 중: `open` 메서드는 호출되었지만, `send`메서드가 호출되지 않았다.
- 2: 로드 완료: `send` 메서드는 호출되었지만, 응답이 되돌아오지 않았다.
- 3: 응답 수신 중: 응답 행과 응답 헤더는 가져왔지만, 메시지 본문을 가져오지 못했다.
- 4: 수신 완료: 모든 응답 메시지를 수신한다.

#### XMLHttpRequest 객체의 이벤트
XMLHttpRequest 객체는 readystatechange 이벤트 외에도 아래 이벤트를 사용할 수 있다.

- `abort`: 요청이 취소되었을 때 발생
- `error`: 요청이 실패했을 때
- `loadend`: 요청이 완료되었을 때 (성공, 실패 상관 없이)
- `load`: 요청을 성공해서 응답을 가져올 수 있을 때
- `loadstart`: start 요청을 보낼 때
- `progress`: 데이터를 주고받는 중
- `timeout`: 요청 시간을 초과했을 때

즉 위 예시에서 `onreadstatechange` 이벤트 처리기를 `load` 이벤트 리스너로 교체할 수 있다

```
req.addEventListener("load", () => {
    document.getElementById("view").innerHTML = req.responseText;
}, false);
```

### (3) 요청 전송하고 통신 시작
마지막으로는 서버에 요청을 보낸다. 서버에 요청을 보내려면 XMLHttpRequest 객체의 `open` 메서드로 요청을 초기화하고 `send` 메서드로 요청을 보낸다.

#### 초기화하기
`open` 메서드는 요청을 초기화한다.  
`req.open(method, url, [,async [,user [,password]]]);`  
인수는 각각 다음과 같은 의미를 갖는다.
- `method`: HTTP 메서드
- `url`: 접근할 URL
- `async`: 비동기 통신 여부 (선택 사항, 기본값은 true - 비동기)
- `user`: 인증할 때의 사용자 이름 (선택 사항, 인증이 필요한 경우 사용)
- `password`: 인증할 때의 암호 (선택 사항, 인증이 필요한 경우 사용)

위 코드에서 `req.open("GET", "data.txt");`에서는 메서드를 `GET`, URL을 상대경로로 지정하고 있는 것이다.

> 크로스 오리진 통신: XMLHttpRequest Level 1까지는 동일 출처 정책에 따라서, 출처가 다른 데이터를 가져올 수 없다. `open`메서드의 인수인 URL에는 같은 서버의 데이터를 상대 경로로 지정하는 것이 일반적이다. 단, XMLHttpRequest Level 2부터는 크로스 오리진 통신을 제한적으로 허용한다. 이 기능은 `CORS`로 구현할 수 있다.

#### GET 메서드로 요청 보내기
GET 메서드를 사용할 때는 직접 `send` 메서드로 요청을 보내서, 서버와 통신을 시작한다.  
`req.send(null)`  
GET 메서드를 사용할 때는 `send` 메서드 인수로 `null`을 지정한다. GET 메서드로 파일을 가져올 때는 서버에 데이터를 보내지 않아도 되지만, 웹 애플리케이션 등에서는 종종 서버에 데이터를 보내는 경우가 있다. 서버는 데이터를 받아 그것을 처리한 결과를 응답으로 반환한다. GET 메서드로 데이터를 보낼 때 쿼리 문자열을 만들어야 한다.  
`req.open("GET", "example.php?name=" + encodeURIComponent(value), true);`

#### POST 메서드로 요청 보내기
POST 메서드를 사용할 때는 보내고자 하는 데이터를 send 메서드의 인수로 넘긴다. 보낼 데이터가 쿼리 문자열이면, 전송하기 전에 `setRequestHeader` 메서드로 `Content-Type` 헤더를 다음과 같이 설정해 주어야 한다.  
`"application/x-www-form-urlencoded"`  
위 GET 메서드로 보낸 요청을 POST를 사용하면 다음과 같다.  
```
req.setRequestHeader("content-type", "application/x-www-form-urlencoded");
req.send("name=" + encodeURIComponent(value));
```
위 코드는 데이터를 쿼리 문자열로 보내고 있지만, 다양한 데이터를 보낼 수 있다.
- `DOMString`: 문자열 데이터
- `FormData`: 폼데이터
- `ArrayBufferView`: 바이너리 데이터
- `Blob`: Blob 객체, File 객체
- `Document`: HTML의 Document 객체