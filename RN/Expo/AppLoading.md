# AppLoading

이 컴포넌트가 하나만 있다면 이 컴포넌트는 Expo에게 계속해서 loading screen을 열고 있으라고 말해주는 컴포넌트이다. 이 컴포넌트는 캐시와 폰트, 로고, 아이콘 등 다른 assets를 다운받는 동안에 사용하기 유용하다.

## Installation

- [managed](https://docs.expo.io/versions/v32.0.0/introduction/managed-vs-bare/#managed-workflow) app에서는 미리 깔려있고, [bare](https://docs.expo.io/versions/v32.0.0/introduction/managed-vs-bare/#bare-workflow) 리액트 네이티브 앱인 경우 사용할 수 없다

## Usage

1.

```
import React from 'react';
import { Image, Text, View } from 'react-native';
import { Asset, AppLoading } from 'expo';

export default class App extends React.Component {
    state = {
        isReady: false
    };

    render() {
        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._cacheResourceAsync}
                    onFinish={() => this.setState({ isReady: true})}
                    onError={console.warn}
                />
            );
        }

        return (
            <View style={{flex: 1}}>
                <Image source={require('./assets/images/expo-icon-png')} />
                <Image source={require('./assets/images/slack-icon.png')} />
            </View>
        );
    }

    async _cacheResourcesAsync() {
        const images = [
            require('./assets/images/expo-icon.png'),
            require('./assets/images/slack-icon.png'),
        ];

        const cacheImages = images.map((image) => {
            return Asset.fromModule(image).downloadAsync();
        });
        return Promise.all(cacheImages)
    }
}

```

2.

```
export default class App extends React.Component {
  state = {
    loaded: false
  };

  handleError = error => console.log(error);

  handleLoaded = () => this.setState({ loaded: true });

  loadAssets = async () => {
    await Font.loadAsync({
      ...Ionicons.font
    });
  };

  render() {
    const { loaded } = this.state;
    if (loaded) {
      return (
        <>
          <StatusBar barStyle="light-content" />
          <MainNavigation />
        </>
      );
    } else {
      return (
        <AppLoading
          startAsync={this.loadAssets}
          onFinish={this.handleLoaded}
          onError={this.handleError}
        />
      );
    }
  }
}
```

## props

- `startAsync (function)` -- `function`은 Promise를 리턴한다, 그리고 Promise는 앱이 필요한 assets을 로딩을 하는 것을 마쳤을 때 resolve할 수 있어야 한다.
- `onError (function)` -- 만약 `startAsync` 에서 에러를 throw하면 `onError`에 제공된 함수로 에러가 넘어간다
- `onFinish (function)` -- (`startAsync`가 있다면, 필수임) `startAsync` 가 resolves 하거나 rejects 하면, 이것은 state를 설정하고 `<AppLoading>` 컴포넌트를 언마운트 한다.
