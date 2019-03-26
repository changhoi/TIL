# Queries

- 이 부분에서는 GraphQL data를 fetch하기 위해서, 어떻게 Query components를 만드는지 배운다. 그리고 어떻게 Apollo Client가 에러를 tracking하고, states를 불러오는 것을 통해서, 개발자의 데이터 관리 코드를 간단하게 만드는지도 배운다

- 이 페이지는 GQL Queries를 빌딩하는 것에 어느정도 친숙함이 있다고 가정하고 진행된다. 아니라면 [가이드](https://graphql.org/learn/queries/)를 좀 읽고 올 것.

- 아래 예시는 개발자가 이미 Apollo Client를 설정하고, `ApolloProvider` 컴포넌트까지 설정했다고 가정한다. 아니라면 [GetStarted](./GetStarted.md)를 볼 것

## The Query Component

- `Query` 컴포넌트를 만들기 위해서는 GraphQL 쿼리 문자열을 `gql`에 감싸서 `this.props.query`에 넘기면 된다. 그리고 뭐를 랜더링 할지 말하는 함수를 아래 `this.props.children`에 넘겨주면 된다. `Query` 컴포넌트는 [render prop](https://reactjs.org/docs/render-props.html) 패턴을 사용한 리액트 컴포넌트의 예시이다. 리액트는 개발자가 loading, error, data 프로퍼티들을 담고있는 Apollo Client 객체와 함께 제공한 함수를 실행할 것이다.

```
import gql from "graphql-tag";
import { Query } from "react-apollo";

// 먼저 gql을 이용해서 쿼리를 만든다
const GET_DOGS = gql`
    {
        dogs {
            id
            breed
        }
    }
`;

const Dogs = ({onDogSelected}) => (

    //query prop에 만들어진 gql을 넣는다
    <Query query={GET_DOGS}>

        // loading, error, data값을 받아서 사용한다
        {({loading, error, data}) => {
            if(loading) return "Loading";
            if(error) return `Error! ${error.message}`;

            return (
                <select name="dog" onChange={onDogSelected}>
                    {data.dog.map(dog => (<option key={dog.id} value={dog.breed}>
                        {dog.breed}
                    </option>
                    ))}
                </select>
            );
        }}
    </Query>
);
```

## Receiving data

- Apollo Client에서 내부적으로 `Query` 컴포넌트를 통해 데이터를 붙일 때, 무슨 일이 일어나는지 함 보자.

  1. `Query` 컴포넌트가 마운트 될 때, Apollo Client는 쿼리를 위해서 observable을 만든다. 우리의 컴포넌트는 Apollo Client cache를 통해서 쿼리의 결과를 구독한다 (챙겨갈 수 있다는 의미인듯)
  2. 먼저 우리는 쿼리 결과를 Apollo cache에서 로딩하려고 한다. 만약 거기에 없으면 우리는 서버에다가 요청을 보낸다.
  3. 한 번 데이터가 오면, 우리는 그것을 nomalize 하고 Apollo cache에 저장한다. `Query` 컴포넌트가 결과를 구독하기 때문에, 데이터를 반응적으로 업데이트한다.

- Apollo Client의 캐싱을 보기 위해서, `DogPhoto` 컴포넌트를 빌드해보자. `DogPhoto`는 상위 `Dogs` 컴포넌트로부터 현재 우리의 폼값을 반영하는 `breed` prop을 받는다.

```
const GET_DOG_PHOTO = gql`
    query Dog($breed: String!) {
        dog(breed: $breed) {
            id
            displayImage
        }
    }
`;

const DogPhoto = ({breed}) => {
    <Query query={GET_DOG_PHOTO} variables={{breed}}>
        {({ loading, error, data }) => {
            if(loading) return null;
            if(error) return `Error!: ${error"}`;
            return (
                <img src={data.dog.displayImage}>
            );
        }}
    </Query>
};
```

- 여기 예시에서는 `Query` 컴포넌트에 `variables` prop을 사용하는데 이건 개발자의 GraphQL 쿼리에 보내고 싶은 변수들을 담고 있는 객체이다.

- 'bulldog'을 선택하고, 다른 종을 다시 선택한다음 다시 'bulldog'으로 바꾸면 곧바로 이미지가 나올 것이다. 이게 Apollo cache가 하는 일이다.

## Polling and refetching

- 우리가 캐시된 데이터 말고 새로운 데이터가 필요한 경우에는 어떻게 할까? 두 가지 솔루션이 있는데 polling과 refetching이 있다.

- Polling은 구체적인 interval로 query를 refetch하는 것을 야기함으로써 개발자가 거의 실시간 데이터를 얻을 수 있게 도와준다. Polling 하려면, 간단하게 `pollInterval` prop을 `Query` 컴포넌트에 전달해주면 된다 (ms단위임). 만약에 0으로 전달하면 그 쿼리는 poll되지 않을 것이다 (작동 안한다는 뜻인듯?). 그리고 개발자는 또한 `startPolling`과 `stopPolling` 함수를 사용해서 dynamic polling을 실행할 수도 있다.

  > Dynamic Polling에 대해서는 설명이 좀 없는 것 같다. (아마 내가 모르는 듯) 예제를 찾아볼 필요가 있음

```
const DogPhoto = ({breed}) => (
    <Query
        query={GET_DOG_PHOTO}
        varibales={{breed}}
        skip={!breed}
        pollInterval={500}
    >
        {({loading, error, data, startPolling, stopPolling}) =>
            if (loading) return null;
            if (error) return `Error!: ${error}`;

            return <img src={data.dog.displayImage}>;
        }
    </Query>
);
```

- 위 예제에서는 새로운 개 이미지를 0.5초마다 한 번씩 볼 수 있게 되어있다. Polling은 거의 실시간 데이터를 복잡한 셋팅 없이 진행할 수 있는 좋은 방법이다.

- 만약 개발자가 user의 액션에 따라서 쿼리를 reload하고 싶다면? 그때는 `refetch` 함수를 쓰면 된다. 우리는 `DogPhoto` 컴포넌트에 refetch 트리거 버튼을 추가했다(아래 예시). refetch는 변수들을 받는데 만약 새로운 변수를 넘기지 않으면 그건 그냥 이전 쿼리를 그대로 보여줄 것이다.

```
const DogPhoto = ({breed}) => (
    <Query
        query={GET_DOG_PHOTO}
        variables={{breed}}
        skip={!breed}
    >
        {({loading, error, data, refetch}) => {
            if (loading) return null;
            if (error) return `Error!: ${error}`;

            return (
                <div>
                    <img src={data.dog.display.Image}>
                    <button onclick={() => refetch()}>
                        Refetch!
                        //왜 onClick{refetch}가 아닐까
                    </button>
                </div>
            );
        }}
    </Query>
);
```

- 버튼을 클릭하면 UI에서 새로운 dog photo가 생성되는 것을 알 수 있다. Refetching의 경우는 fresh data를 보증하는 좋은 방법이다. 하지만 이 방법은 복잡한 loading state를 더해야 한다. 다음 섹션에서 우리는 복잡한 loading과 error state를 다루는 전략을 배울 것이다.

## Loading and error state

- 우리가 polling 하거나 refetching 할 때 loading state에는 무슨 일이 일어날까?
- 위 refetching 예시에서, 버튼을 클릭하면 새로운 데이터가 도착하기 전까지 새로 랜더링되지 않는 것을 볼 수 있다. 만약 우리가 사진을 refetching하고 있다는 것을 유저에게 보여주고 싶다면 어떻게 해야할까?
- Apollo Client는 우리 쿼리의 status에 대해서 잘 다듬어진 정보를 `result` 객체의 `networkStatus` 속성을 제공한다. 그리고 개발자는 `notifyOnNetworkStatusChange` prop을 `true`로 설정해야한다.

```
const DogPhoto = ({ breed }) => (
    <Query
        query={GET_DOG_PHOTO}
        variables={{breed}}
        skip={!breed} // 왜 이건 뭔지 안알려주지 나왔나?
        notifyOnNetwortStatusChange // true 안붙이네
    >
        {({ loading, error, data, refetch, networkStatus }) => {
            if (networkStatus === 4) return "Refetching";
            if (loading) return null;
            if (error) return `Error!: ${error}`;

            return (
                <div>
                    <img src={data.dog.displayImage}>
                <button onClick={() => refetch()}> Refetch! </button>
                </div>
            )
        }}
    </Query>
);
```

- `networkStatus` 프로퍼티는 1-8까지를 나타내는 enum이다. 각 값은 다른 loading status를 가리킨다. 4는 refetch와 동시에 발생한다. 하지만, polling과 pagination을 위한 숫자이기도하다. 다른 상태를 가리키는 숫자들이 궁금하면 [ref](https://www.apollographql.com/docs/react/api/react-apollo/#graphql-query-data-networkStatus)를 찾아볼 것.
- error 상태도 `Query` 컴포넌트의 `errorPolicy` prop을 커스텀해서 반응할 수 있다. 기본 값은 모든 GraphQL 에러를 runtime error로 처리하는 `none`이다. error 이벤트 안에서 Apollo Client는 요청과 함께 오는 어떤 데이터든 버린다. 그리고 error 프로퍼티를 true로 설정한다.

## Manually firing a query

- 리액트가 `Query` 컴포넌트를 마운트 할 때, Apollo Client는 자동적으로 너의 query를 fires off한다 (실행일듯?). 만약 개발자가 쿼리가 실행되는 것을 유저가 action을 할 때로 미루고 싶으면 어떻게 할까? 예를 들어서 버튼을 누를 때로! 그런 경우에는 우리는 ApolloConsumer 컴포넌트를 사용하고 직접 client.query()를 실행한다.

```
import React, {Component} from 'react';
import {ApolloConsumer} from 'react-apollo';

class DelayedQuery extends Component {
    state = {dog: null};

    onDogFetched = dog => this.setState(()=>({ dog }));
    render() {
        return (
            <ApolloConsumer>
                {client => {
                    <div>
                        {this.state.dog && <img src={this.state.dog.displayImage}/>}
                        <button
                            onClick={async () => {
                                const {data} = await client.query({
                                    query: GET_DOG_PHOTO,
                                    variables: {breed: 'bulldog'}
                                });
                                this.onDogFetched(data.dog);
                            }}
                        >
                            Click Me!
                        </button>
                    </div>
                }}
            </ApolloConsumer>
        );
    }
}
```

- 이 방법은 준나 장황해서, `Query` 컴포넌트를 사용하는 걸 추천한다.
- 위 예시들의 완성된 예제는 다음 [링크](https://codesandbox.io/s/n3jykqpxwm)에서 확인 가능하다

## Query API overview

- `Query` 컴포넌트 API를 배우고 싶으면 [레퍼런스](https://www.apollographql.com/docs/react/api/react-apollo.html)를 보자

### Props

`query`하고 `children`만 필수고 나머지는 옵션이다.

- `query`: DocumentNode
- `children`: (result: QueryResult) => React.ReactNode
- `variables`: {[key: string]: any} -> 쿼리가 실행될 때 필요로하는 모든 변수를 담고있는 객체
- `pollInterval`: number
- `notifyOnNetworkStatusChange`: boolean
- `skip`: boolean -> true이면, 쿼리가 전체적으로 스킵된다.

### Render prop function

쿼리 결과를 담고 있는 객체이고, 몇 도움되는 함수들이 있다.

- `data`: TData
- `loading`: boolean
- `error`: ApolloError
- `variables`: {[key: string]: any}
- `networkStatus`: NetworkStatus
- `startPolling`: (interval:number)=>void
- `stopPolling`: ()=>void
- `client`: ApolloClient -> Apollo Client인스턴스가 담긴다.

## Next steps

- [Mutations]():Mutation components를 살펴보자.
- [Local state management](): `apollo-link-state`를 가지고 로컬데이터를 어떻게 받아오는지
- [Pagination](): `fetchMore`를 사용하면 더 쉽게 페이지네이션을 할 수 있다.
