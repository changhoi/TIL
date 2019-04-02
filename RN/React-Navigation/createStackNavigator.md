# createStackNavigator

앱이 스크린들 사이로 이동하는 길을 제공한다.

## API Definition

- `createStackNavigator(RouteConfigs, StackNavigatorConfig);`

### RouteConfigs

라우트 설정 객체는 해당 네비게이터에게 무슨 라우터를 나타내야 하는지 말해준다.

```
createStackNavigator({
    Profile: {
        screen: ProfileScreen,
        // StackNavigator에게 로드 되었을 때 navigation prop을 받게 된다.

        path: 'people/:name',
        // 선택적으로, 웹앱에서 사용할 때 사용한다.

        navigationOptions: ({ navigation }) => ({
            title: `${navigation.state.params.name}'s Profile`,
        })
    }

    ...OtherRoutes,
})
```

### StackNavigatorConfig

라우터에 대한 옵션들이다.

- 라우터를 위한 옵션

  - `initialRouteName` - 스택의 기본 화면을 설정한다. route configs 중 하나와 일치해야 한다.
  - `initialRouteParams` - 초기 라우트를 위한 params
  - `initialRouteKey` - 선택적인 초기 라우터의 식별자
  - `defaultNavigationOptions` - 스크린에서 사용될 기본 네비게이션 옵션들
  - `paths` - route configs에서 설정된 패스를 오버라이딩 한다.

- 시각적 옵션
  - `mode` - 랜더링 스타일을 정의
    - `card` - 기본 스타일
    - `modal` - 모달창으로 보여줌
  - `headerMode` - 어떻게 헤더를 렌더링할지
    - `float` - 헤더는 탑에 계속 머물고, 스크린이 변화하는 것처럼 작동한다.
    - `screen` - 각 스크린은 붙어있는 헤더를 가지고 있고, 스크린과 함께 나타나고 사라진다.
    - `none` - 헤더가 없음
  - `headerBackTitleVisible` - 뒤로가기에 타이틀을 제거할 수 있음 제거 할려면 `false`
