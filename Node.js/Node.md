# Node.js 내장 객체, 모듈

source: Node.js 교과서

## global

- 브라우저에서 `window`와 동일한 기능을 함.
- 전역 객체이므로 모든 파일에서 접근할 수 있다.

## **filename, **dirname

경로에 대한 정보를 제공한다. 보통 `path`와 함께 사용된다.

```
console.log(__filename);    // /Users/changhoi/.../Node.js/test.js
console.log(__dirname);     // /Users/changhoi/.../Node.js
```

## process

현재 실행 중인 노드 프로세스에 대한 정보를 담고 있다.

```
$ node
> process.version
'v10.15.3'  // 노드의 버전
> process.arch
'x64'   // 프로세서 아키텍처 정보
> process.platform
'darwin' // 운영체제 플랫폼 정보
> process.pid
20392   // 현재 프로세스의 아이디, 여러 프로세스를 가질 때 사용 가능
> process.uptime()
197.401 // 프로세스 시작 후 흐른 시간, 단위는 초
> process.execPath
'/usr/local/bin/node' // 노드 경로
> process.cwd()
'/User/.../Javascript' // 프로세스 실행 위치
```

### process.env

시스템의 환경변수를 담고 있다. 또한 서비스의 중요한 키를 저장하는 공간으로도 사용된다. `process.env`에 중요한 정보를 넣는 방법은 운영체제마다 차이가 있지만, [`dotenv`](./dotenv.md)를 사용하면 동일하게 사용할 수 있다.

### process.nextTick(콜백)

이벤트루프가 다른 콜백 함수들보다 nextTick()의 콜백 함수를 우선 처리하도록 만든다. Promise도 nextTick처럼 다른 콜백들보다 우선되기 때문에 nextTick다음 promise가 나온다. nextTick이 promise보다 우선순위가 높은 것 같다.

[code](./promise.nextTick.js)

## os

운영체제의 정보를 가져올 때 사용된다.

```
$ node
> os.arch()     // 프로세서 아키텍처 정보
'x64'
> os.platform() // 프로세서 플랫폼 정보
'darwin'
> os.type()     // 운영체제의 종류
'Darwin'
> os.uptime()   // OS가 부팅 이후 흐른 초
9518
> os.hostname() // 컴퓨터 이름
'ch-macmini.local'
> os.release()  // 운영체제 버전
'18.5.0'
> os.homedir()  // 홈 디렉토리 경로
'/Users/changhoi'
> os.tmpdir()   // 임시 파일 저장 경로
'/var/folder/c6/...'
> os.cpus()     // 컴퓨터의 코어 정보
[ { model: 'Intel(R) Core(TM) i7-8700B CPU @ 3.20GHz,
    speed: 3200,
    times:
      { user: 455640, nice: 0, sys: 359440, idle: 8978100, irq: 0}
  },
  ...
]
> os.freemem()  // 사용 가능한 메모리
8425877504
os.totalmem()   // 전체 메모리
17179869184
```

## path

폴더와 파일의 경로를 쉽게 사용하도록 도와주는 모듈. 운영체제별로 다른 경로 구분자 때문에 사용한다. 보통 윈도우는 `\`으로 구분하는 반면, POSIX 계열은 `/`를 사용한다.

[code](./path.js)
