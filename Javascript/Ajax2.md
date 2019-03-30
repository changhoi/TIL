# Ajax

## 응답 받기

`send` 메서드로 데이터를 보내기 전에 `responseType` 프로퍼티로 응답 데이터를 받는다. `send` 메서드로 데이터를 보내기 전에 `responseType` 프로퍼티에 값을 받고자 하는 데이터 타입을 설정해 준다.  
- `req.responseType = "json";`

위 방법으로 응답 데이터로 JSON을 받을 수 있다. 아래는 `response` 프로퍼티에 설정할 수 있는 데이터 타입 값을 보여준다. 생략 시에 "text"가 된다. 
- response의 데이터 타입: 설명 - responseType의 값
- `DOMString`: 텍스트 - "text" (default)
- `JSON`: JSON 문자열을 파싱한 JSON 객체 - "json"
- `ArrayBuffer`: 형식화 배열(TypedArray) - "arraybuffer"
- `Blob`: Blob 객체 - "blob"
- `Document`: HTML의 Document 객체 - "document"

## JSON 데이터 받기
JSON을 받는 방법은 `responseText` 프로퍼티로 JSON 문자열을 받는 방법과, `response` 프로퍼티로 JSON 문자열을 받는 방법을 설명한다.

### `responseText` 프로퍼티 활용
JSON 파일인 data.json을 GET 메서드로 가져온 다음 `requestText` 프로퍼티를 이용해 문자열로 받고, 그것을 다시 `jsonObj`라는 JSON 객체로 생성한다. 코드는 아래와 같다.

```
<script>
    window.onload = () => {
        const req = new XMLHttpRequest();

        let jsonObj;
        req.addEventListener("load", () => {
            jsonObj = JSON.parse(req.responseText);
            console.log(jsonObj);
        }, false);

        req.open("GET", "data.json", true);
        req.send(null);
    }
</script>
```

### `response` 프로퍼티 활용

`response` 프로퍼티는 XMLHttpRequest Level 2부터 새롭게 추가된 프로퍼티이다. 아래 코드는 data.json이라는 json 파일을 GET으로 가져오고, response 프로퍼티를 이용해 JSON으로 받아, jsonObj에 대입하는 코드이다

```
<script>
    window.onload = () => {
        const req = new XMLHttpRequest();
        
        let jsonObj;
        req.addEventListener("load", () => {
            jsonObj = req.response;
            console.log(jsonObj);
        }, false);
        req.responseType = "json";

        req.open("GET", "data.json", true);
        req.send(null);
    }
</script>
```