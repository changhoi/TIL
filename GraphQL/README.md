# [graphql.org](https://graphql.org/graphql-js/)

## GraphQL.js tutorial

- [x] graphql.js
- [x] express-graphql
- [x] graphql Client
- [x] Basic Types
  - `buildSchema`에게 문자열로 넘기는 것을 통해서 schema를 지정 가능함
  - Types (nullable): `String`, `Int`, `Float`, `Boolean`, `ID`
  - 강제하기 (cannot be nullable): `String!`, `Int!`, ...
  - 리스트 사용: `[Int]`, `[Float]`, ...
- [x] Passing Arguments
  - schema에서 적을 때 쿼리를 받는 내용을 적는다
- 그 때 인자값을 받을 수 있다  
   ex. `type Query { rollDice(numDice:Int!, numSides: Int):[Int]}`
- 위의 경우 resolver는 **하나의 객체**를 인자로 받게 된다.  
  ex. `const root = {rollDice: (args) => { ... }}`  
  ex. `const root = {rollDice: ({numDice, numSides}) => { ... }}`
- api call을 할 때는 각각 이름에 맞는 자료형을 넣어야 한다.  
  ex. `{rollDice(numDice:3, numSides:6)}`
- [x] Object Types
  - GraphQL schema 언어에서, 새로운 객체 타입을 지정하는 것은 Query를 정의할 때와 동일하다. 각 Object는 특수한 타입을 반환하는 필드나, arguments를 갖는 함수를 가질 수 있다.
  - 객체 안의 객체를 지정할 때, resolver역시 `class`로 지정할 수 있음
- [x] Mutation an Input Types
  - Mutation도 resolver를 통해서 가능하다.
  - Mutation은 `type`키워드 대신 `input` 키워드를 지정해서 스키마를 깔끔하게 만들 수 있다.
  - 또한 업데이트와 생성을 동시에 처리하도록 시킬 수 있다.
  - 반환하는 타입을 해당 변경 사항이 생기는 타입으로 지정했을 때, 클라이언트측에서는 최근 수정된 정보를 받을 수 있다.
  - input type은 다른 객체 형식의 필드들을 가질 수는 없다. 기본적인 스칼라 타입, 리스트, 다른 인풋 타입을 받을 수 있다.
  - 보통 mutation 해야하는 것에 `Input`을 붙이는게 컨벤션이다.
- [x] Autentication and Express Middleware
  - `express-graphql`을 미들웨어로 express에 섞는 건 간단하다. 특히 권한을 다루는 패턴에 아주 좋다
  - Graphql Resolver를 미들웨어로 사용하기 위해서는 일반적인 Express앱 처럼 미들웨어로 사용하면 된다. 그 때 `request`객체는 두 번째 인자값으로 어떤 resolver든 사용할 수 있다 (`response`로서)
  - REST API에서는 권한 확인은 보통 header에서 토큰이 있는지를 확인하는 것으로 이루어진다. Express middleware는 이러한 헤더를 처리하고, authentication data를 express request 객체에 넣는다. (`Passport`, `express-jwt`, `express-session` 등) 이러한 모듈들은 `express-graphql`과 함께 작동한다.

## Advanced Guides

- [ ] Constructing Types

## Other Source

- [ ] Youtube [The Net Ninja](https://www.youtube.com/watch?v=Y0lDGjwRYKw&list=PL4cUxeGkcC9iK6Qhn-QLcXCXPQUov1U7f)
