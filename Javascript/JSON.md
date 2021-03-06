# JSON

source: 모던자바스크립트 입문

- JSON을 사용하면 다른 프로그래밍 언어와 데이터 송수신이 간단해진다.
- JSON은 자바스크립트 객체를 문자열로 표현하는 데이터 포맷이다.
- 객체 직렬화: 컴퓨터의 메모리 속에 있는 객체를 똑같은 객체로 환원할 수 있는 문자열로 변환하는 과정

## 표기 방법

- JS 리터럴 표기법에 기반을 두고 있음
- 객체의 프로퍼티 이름은 큰따옴표로 묶은 문자열로 표기한다.
- 숫자, 논리값, 배열은 JS와 동일한 방법으로 표기, 문자열은 반드시 큰따옴표
  - ex) '{"name": "chkim", "age": 24}'

## JSON 변환과 환원

### JS 객체를 JSON 문자열로 변환: `JSON.stringify`

- 이 메서드는 인수로 받은 객체를 JSON 문자열로 바꾸어 반환한다.
- `JSON.stringify(value[, replacer[, space]])`
- `value`에는 변환할 객체 지정, 이하 인수는 선택
- `replacer`에 함수를 넣으면 문자열로 만드는 프로퍼티의 키와 값을 함수의 인수로 받아서, 프로퍼티 값을 표현하는 문자열을 반환한다.
- `replacer`에 배열을 넣으면 배열의 요소로 객체의 프로퍼티 이름을 필터링한다.
- `space`에는 출력하는 문자열을 구분할 때 사용할 공백 문자를 지정한다.

```
// ex. replacer에 배열
JSON.stringify({x: 1, y: 2, z: 3}, ["x", "z"])
// '{"x": 1, "z": 3}'
```

```
// ex. space 사용
JSON.stringify({x: 1, y: 2}, null, '\t');
// '{
//    "x":1,
//    "y":2
//  }'
```

### JSON 문자열을 JS 객체로 환원: `JSON.parse`

- 인수로 받은 문자열을 JS 객체로 환원해 반환한다.
- `JSON.parse(text[, reviver])`
- 두 번째 인수에는 프로퍼트의 키와 값을 인수로 받는 함수를 지정할 수 있다. 이 함수는 환원될 객체의 프로퍼티 값을 반환해야만 한다.
