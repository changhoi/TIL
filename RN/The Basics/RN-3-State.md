# State

컴포넌트를 컨트롤하는 데이타는 두 가지 종류 중에 하나이다. `props`와 `state`. `props`는 부모에 의해서 결정되고, 고정되어 컴포넌트의 라이프타임 동안 변화하지 않는다. 변화하는 데이타를 위해서는 `state`를 사용해야 한다.

일반적으로, 너는 `state`를 생성자에서 초기화 해주어야 한다. 그리고 변수를 바꾸기 위해서는 `setState` 함수를 호출해야 한다.

예를 들어서, 항상 깜빡이는 화면을 만들려고 한다고 치자, 그 텍스트는 `blinking` 컴포넌트가 시작되면 자동적으로 텍스트가 설정되어야 한다. 그래서, 그 텍스트는 스스로가 `prop`이다. 지금 텍스트의 상태가 On인지 Off인지는 계속해서 변화한다. 따라서 이것은 `state`이어야 한다.

```
import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';

class Blink extends Component {
    constructor(props) {
        super(props);
        this.state = { isShowingText: true };
        
        setInterval(() => (
            this.setState(previousState => (
                { isShowingText: !previousState.isShowingText }
            ))
        ), 1000);
    }

    render() {
        if(!this.state.isShowingText){
            return null;
        }

        return (
            <Text> {this.props.text}</Text>
        );
    }
}

export default class BlinkApp extends Component{
    render() {
        return (
            <View>
                <Blink text='I love to blink'/>
                <Blink text='Yes blinking is so great'/>
                <Blink text='Why did they ever take this out of HTML'/>
                <Blink text='Look at me look at me look at me'/>
            </View>
        )
    }
}
```

실제 앱에서는 너느 아마 timer와 함께 state를 설정하지는 않을 것이다. 너는 아마 새로운 데이터가 서버로부터 올 때 `state`를 새로 설정할 것이다. 너는 또한 `state container`로서 `Redux` 또는 `Mobx`를 사용할 수도 있다. (데이터 흐름을 통제하기 위해서) 이러한 경우에는 너는 아마 너의 `state`를 `Redux`나 `Mobx`를 사용해서 설정할 것이다. (`setState` 없이도.)

`setState`가 호출되면, BlinkApp은 컴포넌트를 새로 랜더링한다(`re-render`). 위 예시에서는 초당 한 번씩 랜더링을 새로 할 것이다.

`state`는 React에서 작동하던 대로 작동한다. 따라서 `state`에 대해서 더 자세히 알아야 한다면, [ReactComponent API](https://reactjs.org/docs/react-component.html#setstate)를 확인해보자.

4. [Style](https://github.com/changhoi/TIL/blob/master/RN/The%20Basics/RN-4-Style.md)