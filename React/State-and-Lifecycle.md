# State and Lifecycle

시계 컴포넌트를 재사용 가능하고, 캡슐화된 컴포넌트로 만들어보자. 그러기 위해서는 props로 변화를 받아오는게 아니라 state에서 변화가 이루어지도록 해야한다.

```
class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    render() {
        return (
            <div>
                <h1>Hello</h1>
                <h2>{this.state.date.toLocaleTimeString()}</h2>
            </div>
        )
    }
}
```

## Adding Lifecycle Methods to a Class

컴포넌트가 마운트 되고, 언마운트될 때 특정 코드를 실행하도록 특수한 메서드를 선언할 수 있다.

```
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

    //---
  componentDidMount() {

  }

  componentWillUnmount() {

  }
    //---

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

`componentDidMount()` 메서드는 컴포넌트가 결과를 내보낸 후 실행된다.

우린 `componentWillUnmount()`를 사용해서 타이머를 종료할 것이다.

그리고 마지막으로 `tick()` 함수를 실행해서 `Clock` 컴포넌트가 초마다 실행하도록 할 것이다. 이것은 `this.setState()`를 사용해서 컴포넌트 로컬 state를 업데이트하도록 할 것이다.

```
class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMound() {
        this.timerID = setInterval (
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

## Using State Correctly

세 가지 정도의 `state`를 사용할 떄 알아야 할 것이 있다.

1. state를 직접적으로 수정하지 말 것
   `this.state.comment = "Hello" // Wrong`
   `this.setState({comment: 'Hello'}); // Correct`
2. state는 비동기적으로 업데이트 되어야 한다.
   - 아래는 오류가 날 것이다.

```
this.setState({
    counter: this.state.counter + this.props.increment
})
```

수정하기 위해서 아래 형태로 `setState`를 사용하는 것이 좋다.

```
this.setState((state, props) => ({
    counter: state.counter + props.increment
}));
```

3. state 업데이트는 병합이다(?).

- `setState()`를 할 때, 리액트는 현재 state에 제공한 객체를 모두 병합한다. 예를 들어서 독립적인 변수를 아래와 같이 가지고 있다면,

```
constructor(props) {
    super(props);
    this.state = {
        posts: [],
        comment: []
    };
}
```

- 그럼 너는 그들을 독립적으로 업데이트할 수 있다. 분리된 `setState()` 호출을 통해서.

```
componentDidMount() {
    fetchPosts().then(response => {
        this.setState({
            posts: response.posts
        });
    });

    fetchComments().then(response => {
        this.setState({
            comments: response.comments
        })
    })
}
```

- 병합이 얕아서, `this.setState({comments})`는 `this.state.posts`는 그대로 두고 `this.state.comments`를 완전히 대체합니다.

4. 데이터는 아래로 흐른다.

부모나 자식 컴포넌트 둘 다 하나의 컴포넌트가 stateful 한지 stateless한지 알 수 없다. 그리고 그들은 function로 만든건지 class로 만든건지도 신경쓰지 않는다.

그래서 state를 local, encapsulated라고 부른다. 자기 자신을 제외하고는 아무도 접근할 수 없다.

컴포넌트는 state를 props에 전달하는 것을 통해서 자식에게 넘겨줄 수는 있다.
