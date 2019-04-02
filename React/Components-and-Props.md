# Component and Props

개념적으로, 컴포넌트는 JS의 함수와 유사하다. 컴포넌트는 임의로 입력을 받고 React 요소를 보여준다.

## Function and Class Components

컴포넌트를 쓰는 가장 쉬운 방법은 함수로 작성하는 것.

- `const Welcome = props => <h1> Hello! {props.name}</h1>;`

이 함수는 유효하다. 왜냐면 하나의 props라는 객체 인자를 받고, 리액트 엘리먼트를 리턴하기 때문에. 이러한 컴포넌트를 function component라고 한다.

다른 방법으로는 클래스를 쓰면 된다

```
class Welcome extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}
```

위 두 방법은 보이는 입장에서는 똑같다.

## Props are Read-Only

함수로든 클래스로든 컴포넌트를 만들었으면 props는 수정 불가능하다. 리액트에는 한 가지 중요한 규칙이 있다.

- **모든 리액트 컴포넌트들은 props의 관점에서 반드시 순수 함수처럼 작동해야 한다.**

순수 함수는 인자값이 변화하지 않는 것이고, 비순수 함수는 인자가 변화하는 함수이다. 당연히 UI는 동적이고 변화하기 때문에 컴포넌트의 state를 사용해서 변화를 만들어낸다.
