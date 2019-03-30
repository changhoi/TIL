# Ajax

## 크로스 오리진 통신
XMLHttpRequest는 동일 출처 정책을 준수하기 때문에, 크로스 오리진 통신을 할 수 없다. 단, 아래 기법을 사용해서 크로스 오리진 통신이 가능하다.
- JSONP
- CORS
- postMessage

크로스 오리진 통신을 활용하면, 다른 웹사이트의 정보를 모아 하나의 웹 서비스를 구축하는 매시업을 구현할 수 있다.

## JSONP
JSON with Padding 이라는 뜻이고, "script 요소의 src 속성이 가리키는 자바스크립트 파일은 다른 도메인에 위치하더라도 읽어 들일 수 있다" 라는 성질을 이용한 기법이다. Padding 이라는 단어에는 JSON 데이터에 함수 이름을 추가했다는 뜻이 담겨져 있다. 

1. 외부 서버가 다음과 같은 자바스크립트 파일 jsonp.js를 제공하게 만든다. 이파일에는 JSON 데이터를 show라는 함수의 인수로 지정한 JSONP 데이터가 들어가 있다.
```
show({
    "name": "apple",
    "price": 100
})
```
2. 클라이언트에서는 마우스를 클릭하는 등의 이벤트가 발생했을 때 DOM을 사용해서 script 요소를 생성한다. 이때 script 요소의 src 속성 값으로 1. 에서 외부 서버에 마련해 둔 자바스크립트 파일인 jsonp.js의 주소를 대입한다.
3. 그러면 jsonp.js 파일을 클라이언트가 받게 된다.
4. 클라이언트에 함수 show가 정의되어 있으면, 클라이언트가 자바스크립트 파일을 받아서 실행하게 된다.

이때 외부 서버에 작성된 코드 jsonp.js가 클라이언트에 정의된 함수인 show를 실행한다는 점을 알 수 있다.

## CORS
서버의 데이터를 다른 웹 사이트에서도 읽을 수 있게 하려면 서버 응답에 `Access-Control-Allow-Origin`이라는 HTTP 헤더를 추가해야 한다. 구체적으로는 다음과 같다.

### .htaccess 파일을 사용하는 방법
서버의 읽기와 쓰기를 관리하는 디렉토리 안에 있는 .htaccess 파일에 다음 설정을 추가한다.  
- `Header append Access-Control-Allow-Origin: "http://example.com:8000"`  

이 문자열은 `"http://example.com:8000"`의 읽기와 쓰기를 허용하겠다는 뜻이다. 모든 사이트를 대상으로 읽기와 쓰기를 허용하려면 다음처럼 URL 부분에 *을 적어주면 된다.
- `Header append Access-Control-Allow-Origin: *`

### CGI에서 응답 헤더를 설정하는 방법
### postMessage
