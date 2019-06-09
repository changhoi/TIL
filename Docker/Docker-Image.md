# Docker Image

- 도커 사용법은 이미지를 다룰 때와 컨테이너 다룰 때로 나눌 수 있다.
- 도커 이미지란 도커 컨테이너를 만들기 위한 템플릿이라고 볼 수 있다.
- 도커 이미지는 운영 체제 파일 시스템, 컨테이너 위에서 실행하기 위한 애플리케이션, 의존 라이브러리, 실행 환경의 설정 정보 등을 포함하는 아카이브이다.
- 이미지를 다루는 도커 명령어를 확인하려면 `docker image --help`를 사용하면 된다.

## 이미지 관련 명령어

### `docker image build`
- Dockerfile에 기술된 구성을 따라 도커 이미지를 생성한다.
- `sudo docker image build -t 이미지이름:태그이름 Dockerfile 경로`
    - `-t`: 이미지명과 태그 명을 붙이는 옵션이다. 태그 이름은 생략할 수 있고 생략하면 `latest`로 자동 설정된다.
- `sudo docker image build -f Dockerfile이름 -t 이미지이름:태그이름 Dockerfile 경로`
    - `-f`: Dockerfile의 이름이 Dockerfile이 아닌 경우 Dockerfile의 이름을 지정할 때 사용할 수 있다.
- `sudo docker image build --pull=true 이미지이름:태그이름 .`
    - `--pull=true`: Dockerfile에서 `FROM` 인스트럭션에서 지정한 베이스 도커 이미지를 강제로 받도록 한다. (이미 한 번 받으면 호스트에 저장이 되는데 저장된 경우에는 원래는 새로 받지 않는다. `--pull=true` 옵션으로 `FROM` 인스트럭션 수행을 강제한다.)
    - 베이스 도커 이미지가 변경되었을 경우에 사용할 수 있다. (도커 허브의 이미지는 변경되었지만, 같은 이름:태그가 호스트 운영 체제에 존재하면 Dockerfile에서 `FROM`을 수행하지 않는다.) 최신 베이스 이미지를 사용할 때 해당 옵션을 붙여서 빌드하면 된다.

### `docker image pull`
- 도커 허브에서 도커 이미지를 내려받을 때 사용한다.
- `docker image pull (options) 레포지토리(:태그이름)`
- 레포지토리 이름, 태그는 도커 허브에 존재하는 것이어야 한다.
- 태그 이름을 생략하면 기본값으로 지정된 태그가 적용된다. (보통은 `latest`)

### `docker image ls`
- 보유하고 있는 도커 이미지 목록을 보여준다.
- `docker image pull`을 사용해 내려받은 도커 이미지, `docker image build`를 사용한 이미지도 보여준다.

### `docker image tag`
- 이미지의 특정 버전에 태그를 붙인다.
- 이미지의 새로운 버전은 `IMAGE ID`를 통해서 구분할 수 있다.
- 애플리케이션을 수정한 후 이미지를 빌드하면 새로운 이미지가 된다. (다른 `IMAGE ID`를 할당받는다.) 즉, Dockfile을 편집했을 때뿐만 아니라 `COPY` 대상(애플리케이션)이 변경되어도 `IMAGE ID`가 바뀐다.
- 태그는 하나의 이미지에만 연결된다. 즉 1:1로 연결되므로, 이전 latest 태그가 붙었던 이미지는 새로운 latest 태그가 붙은 이미지가 나오면 `<none>`으로 바뀐다.
- `sudo docker image tag 기존이미지명:태그 새이미지명:태그`
    - `sudo docker image tag test:latest test:1.0`
    - 해당 명령을 실행하면 `test:latest`와 `test:1.0`이 공존하는 것을 알 수 있다.

### `docker image push`
- 이미지를 도커 허브 등의 레지스트리에 등록할 때 사용한다.
- `docker image push (options) 레포지토리:태그` 

### `docker search`
- 도커 허브에 등록된 레포지토리를 검색한다.
- `sudo docker search (options) 키워드`