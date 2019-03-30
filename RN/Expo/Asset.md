# Asset

이 모듈은 Expo의 asset system에 인터페이스를 제공한다. 하나의 asset은 개발자의 앱이 실행하는 동안 필요한 소스코드에 옆에서 붙어있는 어떤 파일이다. Expo의 asset system은 React Native와 통합해서, 개발자가 `require('path/to/file)`을 통해서 파일을 참조할 수 있도록 해준다. 이것은 개발자가 RN에서 `Image` 컴포넌트를 사용할 때 어떻게 static image files를 참조할 것인지에 대한 것 이다.

## Installation

- 이 API는 [managed](https://docs.expo.io/versions/v32.0.0/introduction/managed-vs-bare/#managed-workflow) app에서는 미리 깔려있고, [bare](https://docs.expo.io/versions/v32.0.0/introduction/managed-vs-bare/#bare-workflow) 리액트 네이티브 앱에서 사용하려면 링크 [installation instructions](https://github.com/expo/expo/tree/master/packages/expo-asset)에 나오는 대로 설치한 후 API를 사용할 수 있다.

## API

```
// In managed apps:
import { Asset } from 'expo';

// in bare apps:
import { Asset } from 'expo-asset';
```

이 클래스는 app의 asset을 나타낸다. 이것은 asset에 대한 메타데이터를 준다. (asset의 name이나 type처럼) 그리고 asset data를 로드하는데 편의를 제공해준다.

- `name`: 확장자 명을 제외한 이름이 담겨있다. 또한 `@`가 붙은 부분도 제외된다 (이미지의 scale 요소를 구체화 하는데 사용되는 부분임)

- `type`: asset의 확장자를 나타낸다
- `hash`: asset의 데이터의 MD5 해시를 나타낸다.
- `uri`: 외부 서버에 있는 asset의 데이터를 가리키는 URI이다. 앱을 출시할 때 이것은 Expo의 asset server를 가리킨다. Expo CLI를 사용할 때 이 URI는 개발자의 컴퓨터에서 동작하고 있는 Expo CLI의 서버를 가리킨다. 그리고 그 asset은 개발자의 컴퓨터로부터 직접적으로 전달된다.
- `localUri`: 만약 asset이 `downloadAsync()`를 호출함으로써 다운로드 되었다면, 디바이스에서 asset 데이터를 담고 있는 로컬파일을 가리키고 있는 `file://` URI가 된다.
- `height`: asset이 이미지라면, 이미지의 (scale factor로 나누어진) height가 저장된다.
- `downloadAsync()`: asset 데이터를 디바이스의 캐시 디렉토리에 있는 로컬 파일에 다운로드 한다. promise가 에러 없이 수행되고 나면, `localUri` 필드는 로컬 파일을 가리키게 된다.

### `Asset.loadAsync(modules)`

`Asset.fromModule(module).downloadAsync`를 감싸고 있는 헬퍼이다.

#### Arguments

- modules (Array<number>|number) -- `require('path/to/file')`의 내용을 담고 있는 배열이다. 배열이 아닌 하나의 모듈이 될 수도 있다 (Array<number> 이거나 number 이거나).

#### Returns

- asset이 디스크에 저장되었을 때의 resolver를 담고 있는 Promise를 리턴한다.

### `Asset.fromModule(module)`

- 인자로 주어진 모듈에게 받은 asset을 나타내는 `Asset` 인스턴스를 리턴한다

#### Arguments

- module(number) -- asset에 대한 `require('path/to/ file')` 값이다.

#### Returns

- asset에 대한 `Asset` 인스턴스이다.

#### Example

```
const imageURI = Asset.fromModule(require('./images/hello.jpg')).uri;
```

이 코드의 값으로 `imageURI`는 `images/hello.jpg` 컨탠츠가 읽힐 수 있는 원격 URI를 준다 (저장하고 있게 된다).
