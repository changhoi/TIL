# Height and Width
컴포넌트의 높이, 넓이는 기기의 스크린 사이즈에 따라서 달라진다.

## Fixed Dimensions
가장 간단한하게 컴포넌트의 dimensions을 설정하는 방법은 고정된 `widh`와 `height`를 스타일에 설정해두는 것이다. 모든 RN의 dimensions는 unitless(하나의 컴포넌트에 묶여있지 않다는 뜻인듯)하다. 그리고 밀도 독립적인 픽셀들로 나타낸다.

```
import React, {Component} from 'react';
import {AppRegistry, View} from 'react-native';

export default class FixedDimsBasic extends Component {
    render() {
        return (
            <View>
                <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}}/>
                <View style={{width: 100, height: 100, backgroundColor: 'skyblue'}}/>
                <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}}/>
            </View>
        );
    }
}
```
위와 같은 방법으로 dimensions를 설정하면, 항상 같은 사이즈로 렌더링한다. (스크린의 dimensios와 상관 없이)

## Flex Dimensions
컴포넌트의 `style`안에서 `flex`를 사용함으로써 사용 가능한 공간에 따라서 크기가 동적으로 변하는 컴포넌트를 만들 수 있다. 일반적으로 `flex:1`을 사용하는 편이다. 그것은 컴포넌트에게 같은 부모 아래 있는 다른 컴포넌트와 균등하게 화면을 공유하면서, 가능한 모든 영역을 채우라는 것을 의미한다. `flex`에 더 큰 숫자가 주어지면, 다른 형제 컴포넌트와 비교해서, 더 높은 비율로 공간을 차지하게 된다.

> 한 컴포넌트는 부모 dimensions이 0보다 클 때만, 가능한 공간을 채울 수 있다. 만약 부모도 마찬가지로 `width` 와 `height`가 고정되어 있거나, `flex`가 지정되지 않았다면, 부모는 0인 dimensions를 갖게 되고, `flex` 자식들은 보이지 않게 된다.

```
import React from 'react';
import {View} from 'react-native';

export default class FlexDimsBasic extends React.Component {
    render() {
        return (
            // 만약 부모의 flex:1 을 지우면, 자식들은 보이지 않게 된다.
            // 부모의 height를 설정해주면 그 사이즈에 맞게 자식들의 크기가 변경된다.
            <View style={{flex: 1}}>
                <View style={{flex: 1, backgroundColor: 'powderblue'}}/>
                <View style={{flex: 2, backgroundColor: 'skyblue'}}/>
                <View style={{flex: 3, backgroundColor: 'steelblue'}}/>
            </View>
        )
    }
}
```

6. [Layout with Flexbox]()