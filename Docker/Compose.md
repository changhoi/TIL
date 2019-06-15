# Compose

- 일반적으로 실제 서비스는 단일 앱, 미들웨어로 이루어진게 아니라 프론트에 리버스프록시 역할을 하는 서버를 두고, 뒤로 비지니스 로직이 담긴 서버, 데이터 스토어 등과 통신하는 구조이다.
- 즉 단일 애플리케이션에 특화된 도커 여러 개와 통신이 필요하다는 것을 의미한다. 이러한 상황에서는 여러 요소를 고려해야 하는데 여러 컨테이너 실행을 관리하게 도와주는 것이 `docker-compose`이다.
- 컴포즈는 `yaml` 포맷으로 기술된 설정 파일이다.
- 리눅스에서는 docker를 설치할 때 함께 설치되지 않아서 별도로 설치를 해줘야 한다.

## Install (linux)

- `sudo curl -L https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose`
- 위 url에서 1.24.0은 작성일 기준 최신 버전이다. 최신 버전은 [여기]https://github.com/docker/compose/releases)서 확인 가능하다
- 설치 이후 `sudo chmod +x /usr/local/bin/docker-compose`를 사용해서 실행 권한을 추가해준다.
- `docker-compose version` 명령어로 버전을 확인할 수 있으면 설치가 된 것.

## 명령어

명령어를 입력하기 전에 `docker-compose.yml`을 작성해준다. 파일 명을 다르게 하면 기본적으로는 오류가 나는 것 같다.

```
version: "3"
services:
    test:
        image: test:1.0
        ports:
            - 8000:8080
    test2:
        build: .
        ports:
            - 9000:8080
```

- `test`: 컨테이너 이름이고, 그 이후로는 어떤 이미지를 사용할지, 포트를 어떻게 사용할지를 설정한다.
- `image`: 도커 이미지를 설정한다.
- `ports`: 포트포워딩을 설정한다.
- `build`: Dockerfile이 위치한 상대 경로를 넣는다.

### `docker-compose up`

- `docker-compose.yml` 파일에 정의한대로 컨테이너를 실행한다.
- `build`가 지정된 경우에는 이미지를 빌드해서 사용한다. 이미 빌드한 적 있는 이미지인 경우에는 빌드를 생략하지만 `--build` 옵션을 사용하면 빌드를 강제할 수 있다. (개발 과정에서는 이미지가 수정될 일이 많으므로, `--build` 옵션을 사용하는 것이 좋다.)

### `docker-compose down`

- `docker-compose.yml`에 정의된 모든 컨테이너가 정지된다.