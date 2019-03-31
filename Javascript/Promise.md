# Promise

[source 1](https://joshua1988.github.io/web-development/javascript/promise-for-beginners/)
[source 2: 모던 자바스크립트 입문](http://www.yes24.com/Product/goods/59410698)

## 비동기 처리

비동기 처리는 자바스크립트가 특정 코드의 연산이 끝날 때까지 코드의 실행을 멈추지 않고 다음 코드를 먼저 실행하는 자바스크립트의 특성을 의미한다.

## 동기 처리 하는 방법 - 콜백 함수

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

## resolve와 then

resolve 함수는 Promise를 종료시킨다. resolve 함수에 인수로 넘긴 값은 then 메서드에 인수로 넘긴 함수에 전달되어 다음 처리를 위해 사용된다.

- `promise.then(outFulfilled);`

onFullfilled 함수는 성공 콜백 함수라고 하고, promise 안의 처리가 정상적으로 끝났을 때 호출되는 함수이다. onFulfiled 함수는 인수로 response를 받는다. 이것은 promise 안에서 resolve 함수를 실행할 때 넘긴 인수이다.

## reject와 catch

reject 함수는 Promise를 실패처리하고 종료시킨다. resolve 함수처럼 reject 함수에도 값을 넘길 수 있다. reject 함수가 실행되면 then 메서드에 넘긴 함수는 실행되지 않는다. 그 대신 catch 메서드에 넘긴 함수가 실행된다.

- promise.catch(onRejected);

onRejected 함수는 실패 콜백 함수라고 하고, promise 안의 처리가 실패로 끝났을 때 호출되는 함수이다. onReject 함수는 인수로 error를 받으며 이것은 promise 안에서 reject 함수를 실행했을 때 넘긴 인수읻 .

## Promise로 비동기 처리 연결

Promise로 비동기 처리를 여러 개 연결해서 순차적으로 실행하려면, then 메서드 안에서 실행하는 성공 콜백 함수가 Promise 객체를 반환하도록 해야 한다.

```
const buyAsync = (mymoney) => (
    new Promise((resolve, reject) => {
        setTimeout(() => {
            const payment = parseInt(prompt("금액 입력"));
            const balance = mymoney - payment;
            if (balance > 0) {
                console.log(`${payment}원을 지불했습니다.`);
                resolve(balance);
            } else {
                reject(`잔액이 ${mymoney} 입니다.`);
            }
        }, 1000);
    });
)

buyAsync(500)
    .then((balance) => {
        console.log(`잔액은 ${balance}원 입니다.`);
        return buyAsync(balance);
    })
    .then((balance) => {
        console.log(`잔액은 ${balance}원 입니다.`);
        return buyAsync(balance);
    })
    .then((balance) => {
        console.log(`잔액은 ${balance}원 입니다.`);
        return buyAsync(balance);
    })
    .catch(e => {
        console.log(e);
    })
```

## 비동기 처리 병렬로 처리

여러 비동기 처리를 병렬로 실행하는 방법을 보자

### Promise.all 메서드

Promise 객체의 all 메서드를 사용하면 비동기 처리 여러 개를 병렬로 실행할 수 있다. 모든 처리가 성공적으로 끝났을 때만 그 다음 작업을 실행할 수 있다.

- `Promise.all(iterable);`

all 메서드의 인수인 iterable은 Promise 객체가 요소로 들어 있는 반복 가능한 객체이다. 예를 들어서 배열을 안에 넘기면, 배열 요소의 Promise 객체를 병렬로 실행한다. 그리고 인수로 넘긴 모든 Promise 객체가 resolve 함수를 호출하면 then 메서드에 지정한 함수를 실행할 수 있다. 그때 then에 넘긴 함수는 인수로 response라는 배열을 받게 된다. 그 배열에는 앞서 모든 Promise 객체가 실행한 resolve 함수의 인수가 담겨있다. iterable 중 하나라도 실패로 끝난 Promise 객체가 있다면, 가장 먼저 실패로 끝난 Promise 객체에서 실행한 reject 함수의 인수를 실패 콜백 함수에 인수로 넘긴다.

```
const buyAsync = (name, mymoney) => (
    new Promise((resolve, reject) => {
        setTimeout(() => {
            const payment = parseInt(prompt("금액 입력"));
            const balance = mymoney - payment;
            if (balance > 0) {
                console.log(`${name}: ${payment}원 지불 완료`);
                resolve(balance);
            } else {
                reject(`${name}: 잔액이 부족합니다.`);
            }
        }, 1000);
    });
)

Promise.all([
    buyAsync("Tom", 500);
    buyAsync("Huck", 600);
    buyAsync("Becky", 1000);
])
    .then((balance) => {
        console.log(balance);
    })
    .catch(e => {
        console.log(e);
    })
```

### Promise.race 메서드

Promise.race 메서드는 가장 먼저 종료한 Promise 결과만 다음 작업으로 보내준다. 즉, 먼저 종료한 작업이 성공했을 때는 성공 콜백을, 실패했을 때는 실패 콜백을 호출한다. 나머지 작업도 실행은 되는데, 가장 먼저 종료한 작업의 결괏값만 반환한다.

- `Promise.race(iterable);`
