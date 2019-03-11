# Props
대부분의 컴포넌트들은 그것들이 만들어질 때 커스터마이징 가능하다. 이러한 creation parameters를 `props`라고 부른다.
예를 들어서, 아래 코드인 기본적인 RN 컴포넌트를 보자. `image`라는 컴포넌트이다. `image`를 만들 때, `source`라는 이름의 prop을 어떤 이미지가 보여질지를 컨트롤 하기 위해서 사용할 수 있다. 

```
import React, { Component } from 'react';
import { AppRegistry, Image } from 'react-native';

export default class Bananas extends Component {
  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
      <Image source={pic} style={{width: 193, height: 110}}/>
    );
  }
}

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => Bananas);
```

위 코드에서 `{pic}`에서처럼, `JSX`안에 변수를 사용하려면 `{}`를 사용해야 한다. 정확하게 말해서 중괄호 안에서 자바스크립트 표현식을 사용할 수 있다.

개인이 만든 컴포넌트들에서도 `props`를 사용할 수 있다. `this`는 조금씩 다른 상황에서 여러 번 사용할 수 있는 하나의 컴포넌트를 만들 수 있게 해준다. 그냥 `this.props`를 너의 `render`함수 안에서 사용하면된다. 아래 예시를 보자

```
import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';

class Greeting extends Component {
  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <Text>Hello {this.props.name}!</Text>
      </View>
    );
  }
}

export default class LotsOfGreetings extends Component {
  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <Greeting name='Rexxar' />
        <Greeting name='Jaina' />
        <Greeting name='Valeera' />
      </View>
    );
  }
}

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => LotsOfGreetings);
```

`name`을 `prop`으로서 사용했다. 그렇게 해서 `Greeting` 컴포넌트를 어느 정도 커스터마이징 할 수 있도록 만들었다. 즉, 재사용 가능하게 한 것이다.

다른 새로운 것은 `<View>`컴포넌트를 들 수 있다. <View>는 다른 컴포넌트의 컨테이너로서 스타일과 레이아웃을 조정하기에 아주 유용하다.

기본적인 컴포넌트들과 `props`를 이용해서 정적 화면을 만들 수 있게 되었다.

3. [State](https://github.com/changhoi/TIL/blob/master/RN/The%20Basics/RN-3-State.md)