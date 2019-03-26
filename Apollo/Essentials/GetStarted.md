# Get started

## Create a Client

- GraphQL 서버 앤드 포인트가 필요함

```
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "URI"
});
```

- 위 코드에서 uri에서 데이터를 fetch 해오는 클라이언트를 만들었음
- 만든 클라이언트에서 `client.query()`로 쿼리를 보낼 수 있다.

```
import gql from "graphql-tag";

client.query({
    query: gql`
        {
            movies {
                title
            }
        }
    `
})
.then(result => console.log(result))
```

## Connect your client to React

- Apollo Client를 React에 연결하려면, `ApolloProvider` 컴포넌트를 사용해야한다. 이 컴포넌트는 리액트의 context provider와 유사하다.
- 리액트 앱을 감싸고 client를 컨택스트 안에 넣는다 (컴포넌트 트리 어느 곳이든 접근할 수 있도록)
- ApolloProvider 컴포넌트는 앱의 상단에 위치하도록 하는게 좋다.

```
import React from "react";
import { render } from "react-dom";

import { ApolloProvider } from "react-apollo";

const App = () => (
    <ApolloProvider client={client}>
        <div>
            <h2>First Apollo App!</h2>
        </div>
    </ApolloProvider>
);

render(<App/>>, document.getElementById("root"))
```

## Request data

- `ApolloProvider`를 끼우고 나서는 이제 `Query` 컴포넌트를 사용해서 데이터를 요청할 수 있다. `Query`는 `react-apollo`에서 온 컴포넌트이다.
- 먼저 `gql`로 감싸진 쿼리를 `query prop`에 넣어야 한다.
- 그 다음, `children prop`에 무엇을 랜더링할지 **함수**를 넣어줘야 한다. 랜더링되는 함수는 {loading: , error: , data: }를 가지고 있는 객체를 같이 넘겨 받는 함수이다.

```
import { Query } from "react-apollo";
import gql from "graphql-tag";

const ExchangeRates = () => {
    <Query
        query={gql`
            {
                rates(currency: "USD") {
                    currency
                    rate
                }
            }
        `}
    >
    {({loading, error, data}) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        return data.rates.map(({currency, rate}) => (<div key={currency}><p>{currency}: {rate}</p>
        </div>
        ));
    }}
    </Query>
}
```

- 공식 문서에서 구현한 React - Apollo 말고 [React Native - Apollo](https://codesandbox.io/s/xk7zw3n4)를 구경하자

## Apollo Boost

- 위 예제에서 봤듯, Apollo Client를 빠르게 설정하기 위해 Apollo Boost를 사용했다. 시작하기 위해서는 endpoint를 설정하는 것만으로도 가능하지만, 여러 옵션을 통해서, local state management, authentication, error handling 하는 것도 가능하다.

- Apollo Boost는 몇 가지 패키지를 포함하고 있다

  - `apollo-client`: Where all the magic happens
  - `apollo-cache-inmemory`: Our recommended cache
  - `apollo-link-http`: An Apollo Link for remote data fetching
  - `apollo-link-error`: An Apollo Link for error handling
  - `apollo-link-state`: An Apollo Link for local state management

- `apollo-boost`에서 임포트한 `ApolloClient`에 넣을 수 있는 옵션이 몇 개 있다.

  - `uri`: String -> GraphQL 서버 앤드포인트를 넣는다 Default는 `/graphql`
  - `fetchOptions`: Object -> fetch에 넣고 싶은 어떤 옵션이든 넣는다. 이 옵션들은 static해서 각 request를 변화시키지 않는다.
  - `credentials`: String -> `same-origin`이 기본 값이다. 이 옵션은 유저가 리퀘스트와 함께 쿠키를 보내야하는지를 가리킬 때 사용한다.
  - `header`: Object -> Header의 키/값 쌍을 리퀘스트와 함께 보낸다.
  - `fetch`: GlobalFetch['fetch'] -> ??
  - `cache`: ApolloCache -> `ApolloCache`가 사용된다 기본 값은 `apollo-cache-inmemory`에서 임포트한 `InMemoryCache`이다. 이 옵션은 `apollo-cache-persist`와 함께 커스텀된 캐시를 사용할 때 아주 유용하다.
  - 몇 개 더 있는데 일단 생략

## Next Steps

- [Queries](./Queries.md): 쿼리 배우기
- [Mutations](./Mutations.md): 뮤테이션 배우기
- [Apollo Client API](./ApolloClientRef.md): API 레퍼런스 보기
