# Layout with Flexbox

컴포넌트는 자식 레이아웃을 `flexbox`를 사용해서 구체화할 수 있다. `flexbox`는 다른 스크린 화면에서 일관된 레이아웃을 보여주기 위해서 디자인되었다.

너는 일반적으로 `flexDirection`, `alignItems`, `justifyContent`를 합쳐서 사용할 것이다.

> `flexbox`는 `CSS`에서와 동일하게 작동한다. 몇 가지가 다른데, `flexDirection`의 기본 방향이 `row`라는 점과, `flex`의 인자 값이 오직 한자리 숫자만 가능하다는 점이 다르다.

## Flex Direction

`flexDirection`을 컴포넌트의 `style`에 붙이는 것은 레이아웃에 주요한 축을 결정하는 것이다. 자식들은 `flexDirection`이 `row`일 때 수평적으로 정렬되고, `column` 값일 때 수직적으로 정렬된다. 기본 값은 column이다.

## Justify Content

스타일에 `justifyContent`를 적용하는 것은 자식 요소들의 분산되는 거리를 조절할 때 사용한다. (당연히 축에 따라서, 수직적으로 분산되거나, 수평적으로 분산됨) 가능한 옵션들은 다음과 같다.

- `flex-start`
- `center`
- `flex-end`
- `space-around`: 처음과 마지막 공백은 일반 공백의 1/2가 되는듯
- `space-between`: 가장 처음과 마지막 자식이 스크린 끝에 붙음
- `space-evenly`: 남는 공간들이 모두 균등해짐 (처음과 끝에 남는 공간도)

## Align Items

`alignItems`를 설정해서 자식들의 2차 축(메인 축이 x축이면 2차 축은 y, 2차 축은 내가 그냥 지은 이름임)을 조절한다. 가능한 옵션은 다음과 같다.

- `flex-start`
- `center`
- `flex-end`
- `stretch`: 자식의 메인 축 방향의 dimensions를 최대로 늘린다. (메인 축이 row면 height가 최대, column인 경우엔 width가 최대)

> `stretch`가 효과를 갖기 위해서는, 자식들이 2차 축에 대해서 고정된 dimensions를 가지고 있지 않아야 한다. 아래 예시에서 `alignItems: stretch`는 자식의 `width: 50`이 없어지기 전까지는 작동하지 않는다.

```
import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';

export default class AlignItemsBasics extends Component {
  render() {
    return (
      // Try setting `alignItems` to 'flex-start'
      // Try setting `justifyContent` to `flex-end`.
      // Try setting `flexDirection` to `row`.
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
      }}>
        <View style={{width:50, height:50, backgroundColor: 'powderblue'}} />
        <View style={{height: 50, backgroundColor: 'skyblue'}} />
        <View style={{height: 100, backgroundColor: 'steelblue'}} />
      </View>
    );
  }
};
```

기타 다른 레이아웃에 대한 prop은 [링크](https://facebook.github.io/react-native/docs/layout-props)에 있다

7. [Handling Text Input]()
