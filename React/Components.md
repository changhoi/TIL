# Components

리액트 컴포넌트는 UI를 독립적으로 분리시킬 수 있도록 한다. 리액트 컴포넌트는 `React.Component` 또는 `React.PureComponent`의 자식 클래스로서 정의될 수 있다.

## The Component Lifecycle

각 컴포넌트들은 몇 개의 lifecycle method를 가지고 있다. 그래서 오버라이드해서 각 라이프사이클에 지정한 코드를 돌릴 수가 있다. 아래는 자주 쓰이는 라이프사이클 메서드이다.

- [라이프사이클 cheat sheet](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

- Mounting: 아래 메서드들은 순서대로 컴포넌트 인스턴스가 만들어지고, DOM에 삽입될 때 작동된다.

  1. `constructor(props)`

     - 만약, state를 초기화 하지 않고, 메서드를 묶지 않는다면, constructor를 실행할 필요 없다. constructor는 컴포넌트가 마운트되기 전에 불려진다. React.Component 자식 클래스가 constructor를 수행하면 반드시 다른 문장을 수행하기 전에 `super(props)`를 해주어야 한다. 그렇지 않으면, `this.props`는 undefined 될 것이다.

     - 일반적으로 React의 constructor는 두 가지 목적으로 사용된다.

       1. this.state에 객체를 할당함으로써 local state를 초기화 하려고
       2. event handler 메서드들을 인스턴스에 묶기 위해서

     - constructor 안에서는 setState를 하지 않는게 좋다. 그 대신, 만약 로컬 state를 사용해야한다면, 초기 state를 this.state에 직접적으로 할당해라. constructor만이 유일하게 `this.state`에 직접적으로 할당할 수 있는 곳이다. 다른 곳에서는 `this.setState()`를 써야 한다.
       > state에 props를 복사하는 것을 피해라
       ```
       constructor(props) {
           super(props);
           this.state = {color: props.color};
           // 이러지 말 것
       }
       ```

2. `render()`

   - 실행되면, this.props와 this.state를 확인하고 아래 타입 중 하나를 리턴해야 한다.

     - React Elements
     - Arrays and fragments
     - Portals
     - String and number
     - Boolean or null

3. `componentDidMount()`

   - 컴포넌트가 DOM에 올라가자 마자 즉시 불려진다. DOM node를 요구하는 초기화는 이 단계에서 이루어져야 한다. 만약 원격 endpoint에서 데이터를 로드해와야 할 필요가 있다면, 이곳이 네트워크 요청일 실행하기 좋은 곳이다.
   - 이 함수는 어떤 subscriptions를 설정하기 좋은 곳이다. 만약 그렇게 해야한다면, `componentWillUnmount()`에서 구독을 취소하는 것을 잊지말자.
   - 만약 여기에 `setState()`를 하게 되면 추가적인 렌더링을 하게 될 것이다. 이것은 초기 상태를 보여주지는 않겠지만, 성능 이슈가 될 수 있다. 대부분의 경우에, 개발자는 초기 상태를 constructor()에다가 할당하는게 좋다. 하지만, 이렇게 짜는게 필요할 수도 있다. 모달창이나 툴팁을 열어야 하는 경우

- Unmounting: 이 메서드는 컴포넌트가 DOM에서 제거될 때 발생한다.

  1. `componentWillUnmount()`

  - 이 메서드는 컴포넌트가 언마운트 되기 직전에 실행되는 함수이다. 필요한 cleanup이 여기서 이루어져야 한다. 타이머를 종료시키든, 네트워크 request를 종료하든, subscription을 끝내든.
  - 여기서 setState()를 하는 것은 좋지 않다. 왜냐면 컴포넌트가 다시 렌더링 될 것이기 때문이다.

- 거의 안쓰이는 Lifecycle

  1. `shouldComponentUpdate(nextProps, nextState)`

  - 리액트가 컴포넌트의 결과가 현재 state나 props에 변화를 끼치지 않았다면, 알도록 하는 역할을 한다. 디폴트는 state가 변화할 때마다 re-render하고, 대부분의 케이스에서 이렇게 사용할 것이다.
  - `shouldComponentUpdate()`는 렌더링된 후, 새로운 props나 state가 받아졌을 때 불려진다. 기본값은 true이다. 이 함수는 초기 렌더나 forceUpdate()가 사용될 때는 불려지지 않는다.
  - 성능 최적화를 위해 사용해야 하고, 렌더링을 막기위해 사용하면 버그가 있을 수 있다. 또한 직접 함수를 쓰기 보다는 `PureComponent`를 쓰는게 더 좋다. `PureComponent`는 props와 state의 얕은 비교를 수행하고, 필요한 업데이트를 스킵할 확률을 줄여준다.

## React.Component

리액트 컴포넌트의 기본이 되는 클래스이다.

## React.PureComponent

React.Component와 유사하지만, 차이점은 React.Component는 `ShouldComponentUpdate()`를 실행하지 않는다는 차이점이 있다. 하지만 `React.PureComponent`는 그것을 prop과 state을 얕게 비교하면서 수행한다.  
만약 리액트 컴포넌트의 `render()` 함수가 같은 props와 state가 주어지면 같은 결과를 내는 거라면, 그냥 PureComponent를 쓰면 성능이 향상된다.

## [Component vs PureComponent vs Functional Component](https://www.vobour.com/%EB%A6%AC%EC%95%A1%ED%8A%B8-react-%EC%9D%B4%ED%95%B4-%EA%B8%B0%EC%B4%88-component-vs-purecomp)
