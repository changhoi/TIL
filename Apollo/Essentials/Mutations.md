# Mutation

## Mutation Component

- `Mutation`컴포넌트는 UI에서 mutation을 수행하기 위해 필요하다. `Mutation` 컴포넌트를 만들려면, GraphQL 뮤테이션 문자열을 gql에 감싸서 `this.props.mutation`에 넣어주면 된다. 그러면 `this.props.children`에게 무엇을 랜더링할지 말해주는 함수를 제공한다.

- `Mutation` 컴포넌트는 [render prop](https://reactjs.org/docs/render-props.html) 패턴을 가지고 있는 리액트 컴포넌트의 일종이다. 리액트는 개발자가 mutate 함수와, mutation 결과가 있는 객체와 함께 제공한 render prop 함수를 호출할 것이다. 그 객체는 loading, error, called, data 정보를 담고 있다.

```
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const ADD_TODO = gql`
  mutation AddTodo($type: String!) {
    addTodo(type: $type) {
      id
      type
    }
  }
`;

const AddTodo = () => {
  let input;

  return (
    <Mutation mutation={ADD_TODO}>
      {(addTodo, { data }) => (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              addTodo({ variables: { type: input.value } });
              input.value = "";
            }}
          >
            <input
              ref={node => {
                input = node;
              }}
            />
            <button type="submit">Add Todo</button>
          </form>
        </div>
      )}
    </Mutation>
  );
};
```

- `Mutation` 컴포넌트는 자식으로서 하나의 함수가 필요하다 (그리고 render prop function으로 호출함). render prop 함수의 첫 번째 인자는 mutate 함수이다. 그 함수는 선택적으로 `variables`, `optimisticResponse`, `refetchQueries`, `update`를 취한다. 하지만 이 값들을 props로서 Mutation component에 넘길 수도 있다. 위 예시에서느 우리는 variables와 함께 폼을 제출하기 위해서 mutate function (addTodo)를 사용했다.

...ing
