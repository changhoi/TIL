# Navigation prop reference

각 `screen` 컴포넌트는 `navigation` prop을 자동적으로 받게 된다. 그 prop은 네비게이션 액션을 보내는 다양한 함수를 제공한다. `navigation` prop은 다음과 같이 생겼다.

- `this.props.navigation`
  - `navigate` - 다른 스크린으로 간다.
  - `goBack` - 작동하는 화면을닫고 스택으로 돌아간다.
  - `addListener` - 네비게이션의 라이프사이클을 주시한다.
  - `isFocused` - 스크린이 선택되어 있으면 `true` 아니면 `false`
  - `state` - 현재의 state/routes
  - `setParams` - 라우트의 params를 바꾼다
  - `getParam` - 구체적인 param을 받는다.
  - `dispatch` - router에 액션을 전송한다.
  - `dangerouslyGetParent` - 부모 네비게이터를 리턴하는 함수

중요한 것은 `navigation` prop이 모든 컴포넌트들을 통과하지 않는다는 것이다. 오직 `screen` 컴포넌트들만 이 prop을 자동적으로 받는 것이다.

### Navigator-dependent function

추가적인 함수가 몇 개 더 있다. 만약 stack navigator이라면, 몇 개의 `navigate`와 `goBack`의 대체제가 있다.

- `this.props.navigation`
  - `push` - 새로운 라우터를 스택에 푸시한다
  - `pop` - 스택으로 돌아간다
  - `popToTop` - 최상위 스택으로 돌아간다
  - `replace` - 현재 라우트를 새로운 것으로 대체한다
  - `dismiss` - 현재 스택을 버린다.

만약 drawer navigator라면, 아래 것들이 또한 가능하다.

- `this.props.navigation`
  - `openDrawer` - drawer를 연다
  - `closeDrawer` - drawer를 닫는다.
  - `toggleDrawer` - state를 토글한다. (닫고 열린 상태를 뒤바꿈)

## Common API reference

### navigate

다른 스크린으로 연결할 때 호출한다. 아래 인자 값을 사용한다.

- `navigation.navigate({ routeName, params, action, key })`
- `navigation.navigate(routeName, params, action)`

  - `routeName` - 앱의 라우터 어딘가에 등록된 목적지
  - `params` - 목적지 라우터와 합쳐질 Params
  - `action` - 자식 라우터를 돌릴 때 하위 액션

### goBack

어떤 라우터로 돌아가야 하는지 구체적으로 선택적으로 key를 제공한다. 기본적으로 `goBack`은 호출되었던 라우트를 닫을 것이다. 어느 곳이든 돌아가는게 목적이라면, `.gobBack(null);`을 쓴다.
