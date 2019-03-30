# Promise

[source](https://joshua1988.github.io/web-development/javascript/promise-for-beginners/)

## 비동기 처리

비동기 처리는 자바스크립트가 특정 코드의 연산이 끝날 때까지 코드의 실행을 멈추지 않고 다음 코드를 먼저 실행하는 자바스크립트의 특성을 의미한다.

## Example

`setTimeout`, `addEventListener` 메서드, `XMLHttpRequest` 객체의 작업은 비동기적으로 실행된다. `setTimeout` 함수로는 인수로 받은 콜백 함수를 일정 시간이 흐른 후 실행하도록 예약하는 처리만 하고, 그 다음에는 곧장 다음 코드가 실행된다. 0초로 적어놓으면 호출 스탹에 실행 문맥의 작업이 모두 끝날 때까지 기다렸다가 0초 후 가능한 빨리 실행하는 동작을 취한다.    

그러나 실행 순서가 중요한 경우도 있다. 이런 상황에서 코드를 실행 순서에 따라 실행하려고 하면, 콜백 함수를 중첩하는 방법을 사용하고는 한다.
```
const sleep = (callback) {
    setTimeout(() => callback(), 10000);
}

sleep (() => {
    console.log("A");
    sleep(() => {
        console.log("B");
        sleep(() => {
            console.log("C");
        })
    })
})

// A, B, C 순서로 표시된다.
```
그러나 이러한 방법은 코드를 이해하기 어렵다. 이러한 코드를 콜백 지옥이라고 한다. 이러한 문제는 Promise를 사용해서 해결할 수 있다.

## Promise란?

[비동기 처리에](#비동기-처리) 사용되는 객체이다. Promise는 비동기 처리를 실행하고 그 처리가 끝난 후에 다름 처리를 실행하기 위한 용도로 사용한다. Promise를 사용하려면 먼저 Promise 객체를 생성해야 한다.
- `const promise = new Promise((resolve, reject) => { ... });`

Promise에는 실행하고자 하는 처리를 작성한 함수를 인수로 넘긴다. 그리고 이 함수는 다음과 같은 인수를 받는다.
- `resolve`: 함수 안의 처리가 끝났을 때 호출해야 하는 콜백 함수. `resolve` 함수에는 어떠한 값도 인수로 넘길 수가 있다. 이 값은 다음 처리를 실행하는 함수에 전달된다.
- `reject`: 함수 안의 처리가 실패했을 때 호출해야 하는 콜백 함수. `reject` 함수에는 어떠한 값도 인수로 넘길 수 있고, 대부분의 경우 오류 메시지 문자열을 인수로 사용한다.

또 Promise는 세 가지 상태 (states)를 갖는다. 즉, 처리 과정을 말한다.
- Pending(대기): 비동기 처리 로직이 아직 완료 안된 상태
- Fulfiled(이행): 비동기 처리가 완료되어 프로미스 결과 값을 반환해준 상태
- Rejected(실패): 비동기 처리가 실패하거나 오류가 발생한 상태

```
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("A");
        resolve();
    }, 1000);
});
promise.then(() => {
    console.log("B");
})

// Promise {[[PromiseStatus]]: "pending", [[PromiseValue]]: undefined}
// A
// B
```

이 코드를 실행하면 1초 후 "A"가 표시되고, 그 다음 "B"가 표시된다. Promise에 인수로 넘긴 함수는 비동기 처리를 수행하는 함수이고, 1초 후에 "A"를 표시하고, 그 다음에는 함수resolve를 호출해서 promise 안의 처리를 종료시킨다. resolve 함수가 실행되면 then 메서드에 등록한 함수가 호출된다.  
  
- 먼저 `const promise = new Promise(...);`에서 Pending 상태가 된다.  
- 그 다음 `const promise = new Promise((resolve, reject) => { ... resolve(); })` 처럼 resolve를 실행하면 Fulfiled 상태가 된다. 그리고 이행 상태가 되면 `then()`을 이용해서 처리 결과를 받을 수 있다. `promise.then(...)`
- 다만 `reject();`가 있으면 Reject 상태가 된다. 그리고 실패 상태가 되면 실패한 이유 (실패 처리의 결과 값)를 `catch()`로 받을 수 있게 된다.

... ing