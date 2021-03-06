# Handling Text Input

TextInput은 유저가 텍스트를 입력하도록 해주는 기본적인 컴포넌트이다. 이 컴포넌트는 onChangeText라는 prop을 가지고 있는데 이 prop에는 입력된 텍스트가 변경될 때마다 호출되는 함수가 있다.

유저가 타이핑 할 때를 얘기해보자, 너는 그들의 단어를 다른 언어로 해석해주고 있다. 이 새로운 언어에서는 모든 한 단어가 같은 방법으로 입력된다. 예를 들어서
'ㅗ'라고 치자, 그럼 우리가 '안녕 친구'이라는 말을 하려면 그 언어에서는 ㅗㅗ로 번역된다. 소스 코드는 아래와 같다.

```
import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View } from 'react-native';

export default class PizzaTranslator extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (
      <View style={{padding: 10}}>
        <TextInput
          style={{height: 40}}
          placeholder="Type here to translate!"
          onChangeText={(text) => this.setState({text})}
        />
        <Text style={{padding: 10, fontSize: 42}}>
          {this.state.text.split(' ').map((word) => word && 'ㅗ').join(' ')}
        </Text>
        // state의 text에서 띄어쓰기를 기준으로 문자를 분리하고,
        // 분리된 문자열 배열이 있다면, 'ㅗ'가 반환되고
        // 그것들을 띄어쓰기를 사용해서 묶어놨다.
      </View>
    );
  }
}
```

위 예시에서, 우리는 text를 state에 저장한다. 왜냐면, 그것은 시간이 지날 수록 바뀌기 때문이다.

text input을 사용해서 할 수 있는 것은 많다. 예를 들어서 너는 내부의 텍스트와 유저의 타이핑을 비교할 수 있다. 더 많고 자세한 예시는 여기 [링크](https://facebook.github.io/react-native/docs/textinput) 또는 여기 [링크](https://reactjs.org/docs/forms.html#controlled-components)에서 확인할 수 있다.

8. [Handling Touches]()
