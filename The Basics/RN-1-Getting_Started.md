# Getting Started
`Expp`는 가장 쉽게 `React Native` (이하 RN) Application을 만드는 방법이다. `Expo`는 어떤 툴을 설치하거나 설정할 필요 없이 네이티브 코드를 짤 수 있는 프로젝트를 만들도록 한다.

`Expo`를 설치하는 방법은 아래와 같다. 설치 이후에는 CLI 명령어를 실행할 수 있게 된다.
`npm install -g expo-cli`

설치 이후 `expo init AwesomeProject`를 사용해서 이름이 AwesomeProject인 네이티브 프로젝트를 만들 수 있다.

# Learn the Basics
RN은 `React`와 유사하지만, 네이티브 컴포넌트를 사용한다. (웹 컴포넌트 대신에) 따라서 기본적인 RN 앱의 구조를 이해하기 위해서는 몇 가지의 React 개념을 알아야 한다. (예를 들어서, `JSX`, `components`, `state`, `props`) 만약 이미 React에 대해서 알고 있더라도, RN에만 해당되는 구체적인 것들에 대해 공부해야 한다. (네이티브 컴포넌트가 이에 해당됨) 이하 내용들은 `React`에 대한 경험과 무관하게 볼 수 있는 내용으로 작성된다.

[RN Repl](https://snack.expo.io)에서 실습할 수 있다.


## Hello World!
```
//App.js

import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class HelloWorldApp extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Hello world!</Text>
      </View>
    );
  }
}
```

이것 중 몇 가지들은 아마 그냥 자바스크립트처럼 보이지 않을 수도 있다. ([ES6](https://babeljs.io/docs/en/learn/), `JSX`(<Text>, <View>)) `JSX`는 XML이 포함되어 있는 문법이다. 일반적인 마크업에 코드를 넣기 위한 템플릿과 다르게, `JSX`는 코드안에 마크업을 넣기 위한 템플릿의 일종이라고 보면 된다. 마치 HTML처럼 보이는데 HTML 태그 대신 React Component를 사용한 것이다. 위 코드에서는 `<Text>`가 기본 텍스트 디스플레이 컴포넌트로 내장되어 있는 것이다. 그리고 `<View>`는 `<div>`나 `<span>` 같은 것이다.

## Components

결과에서 볼 수 있듯, 위 코드는 새로운 컴포넌트인 `HelloWorldApp`을 정의한 것이다. 너가 RN 앱을 빌딩할 때 너는 새로운 컴포넌트들을 많이 만들게 될것이다. 스크린(모바일 화면 등)에서 보이는 어떤 것이든 컴포넌트의 일종이다. 컴포넌트는 단지 `render`만 있으면 되기 때문에 아주 간단해질 수 있다. `render`는 `JSX`를 리턴하는 함수이다.