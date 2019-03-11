# Style

리액트 네이티브에서, 스타일을 정의하기 위해 특별한 언어나 문법을 정의할 필요 없다. 너는 그냥 JS를 사용해서 스타일링할 수 있다. 이것을 담당하는 prop 이름은 style이다. style은 이름과 값으로 이루어진 객체를 넣는데, CSS의 이름과 매칭된다. 다만, CSS의 이름들이 camelCasing으로 정의되어 있다. (예. background-color => backgroundColor)

style prop은 평범한 예전 자바스크립트 객체가 될 수 있다. 그것은 가장 간단하고, 예시에서 쓰이는 코드이다. 너는 마찬가지로 스타일을 배열로서 넘길 수도 있다. 배열로 넘겼을 때 마지막 배열은 우선권을 갖기 때문에 이것을 상속받을 속성으로 만들 수 있다. (상속 받을 스타일을 배열의 맨 마지막에 두면, 우선 적용됨)]

컴포넌트가 점점 복잡해지면, StyleSheet.create를 사용하는 것이 훨씬 깔끔하게 된다. 몇 가지의 스타일을 한 공간(스코프)에 정의하는 것을 통해서.

```
import React, {Component} from 'react';
import (AppRegistry, StyleSheet, Text, View) from 'react-native';

const styles = StyleSheet.create({
    bigBlue: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30,
    },
    red: {
        color: 'red',
    },
});

export default class LotsOfStyles extends Component {
    render() {
        return (
            <View>
                <Text style={styles.red}>Red</Text>
                <Text style={styles.bigBlue}>Big Blue</Text>
                <Text style={[styles.red, styles.bigBlue]}>이러면 블루임</Text>
                <Text style={[styles.bigBlue, styles.red]}>이러면 레드임</Text>
            </View>
        );
    }
}
```

일반적인 하나의 패턴은 너의 컴포넌트가 style prop이 승인 받도록 한다. 그리고 그것은 하위 컴포넌트의 스타일로 사용된다.

텍스트 스타일을 커스텀하는 방법은 많다. [Text component reference](https://facebook.github.io/react-native/docs/text)를 확인해보면, 리스트 사용법을 알 수 있다.

5. [Height and Width](https://github.com/changhoi/TIL/blob/master/RN/The%20Basics/RN-5-Height_and_Width.md)