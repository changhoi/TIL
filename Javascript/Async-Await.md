# Async Await

[source1](https://www.zerocho.com/category/ECMAScript/post/58d142d8e6cda10018195f5a) - Zerocho
[source2](https://www.youtube.com/watch?v=JzXjB6L99N4) - 코드종

- 노드 7.6부터 지원되는 기능
- 장황한 Promise코드를 보안할 수 있다.

```
const findUser = async () => {
    try {
        let user = await Users.findOne({}).exec();
        ...
    } catch (e) {
        console.error(e);
    }
}
```

- await을 사용하려면 async 함수 안에서 사용해야 한다. await이 Promise를 받아서 처리하는 키워드이다.
- async 코드는 에러가 발생했을 때 분기가 일어나지 않고 그대로 실행된다. 따라서 try catch를 사용해서 명시적으로 에러를 처리해야 한다.
- async 함수는 return 또는 throw 값이 담긴 Promise를 리턴한다.
- await은 Promise가 resolve되어서 결과값이 넘어올 때까지 기다림

```
const asyncFunction = async () => {
    return 'value'
}

asyncFunction().then((res) => {
    console.log(res);
})
```

```
const anotherAsync = async () => {
    try {
        const valueCatch = await asyncFunction();
    } catch (e) {
        console.error(e);
    }
}
```
