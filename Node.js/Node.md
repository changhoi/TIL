# Node.js 내장 객체

## global

- 브라우저에서 `window`와 동일한 기능을 함.
- 전역 객체이므로 모든 파일에서 접근할 수 있다.

## __filename, __dirname
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