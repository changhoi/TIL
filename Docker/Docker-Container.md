# Docker Container

- 도커 컨테이너는 OS 파일시스템, 애플리케이션이 함께 있는 가상환경 박스이다.

## Lifecycle

- 도커 컨테이너는 실행, 정지, 파기 상태로 구성된다.

### 실행

- `sudo docker container run` 명령의 파라메터로 지정된 도커 이미지를 바탕으로 컨테이너가 만들어지면, 이미지를 생성했을 때 사용된 Dockerfile의 `CMD`, `ENTRYPOINT` 인스트럭션에서 정의된 앱이 실행된다. 앱이 실행 중인 상태가 컨테이너의 실행 중인 상태라고 볼 수 있다.

### 정지

- 실행이 끝난 상태. HTTP 요청을 대기하는 앱의 경우는 실행 시간이 길겠지만, 명령을 수행하고 정지하는 앱도 존재함. 컨테이너가 정지되면 컨테이너가 종료된 시점의 상태가 저장된다. 즉, 정지시킨 컨테이너를 다시 실행할 수 있다.

### 파기

- 정지 상태에 있는 컨테이너는 위에서 언급한 것처럼 종료된 시점이 저장되어있다. 컨테이너는 디스크 용량을 차지하게 되므로 불필요한 컨테이너는 완전히 삭제하는 것이 좋다.

## 명령어

### `docker container run`

- 이미지로부터 컨테이너를 생성하고 실행한다. (실행 상태로 만들기 위해 사용함)
- `sudo docker container run (options) 이미지이름:태그 (명령 + 명령 파라메터)`
    - `sudo docker container run -d -p 4000:8000 test:latest`
    - 위 명령어를 통해서 `test:latest` 이미지를 바탕으로 백그라운드에서 컨테이너를 동작시킬 수 있다. (`-d`가 백그라운드 동작 옵션)
    - `-p` 옵션은 포트포워딩이다. 호스트의 4000번 포트와 컨테이너의 8000번 포트를 연결한 것이다.
    - `-t` 옵션: 유사 터미널 기능을 활성화 한다.
    - `-i` 옵션: 컨테이너의 표준입력과 연결을 유지함 `-it`로 두 옵션을 같이 사용하는 경우가 많음
    - `--rm` 옵션: 컨테이너가 정지되면 자동으로 파기함 (한 번 실행하는 컨테이너 사용시 유용함)

### `docker container ls`
- 컨테이너 목록을 살펴볼 수 있다. 디폴트는 실행 상태에 있는 컨테이너만 보여주는 것 같음
- `sudo docker container ls (options)`
    - `-q` 옵션: 컨테이너 아이디만 나오도록 함
    - `--filter "컬럼=값"`: 목록을 필터링 함. but 컬럼 이름 그대로를 컬럼에 넣는거는 아닌 것 같음. `"name=컨테이너명"`인데, `"ancestor=이미지이름:태그"`임 
    - `-a` 옵션: 정지 상태인 컨테이너도 포함해서 보여줌

- 컬럼 항목은 다음과 같음
    - `CONTAINER ID`: 컨테이너 식별용 ID
    - `IMAGE`: 컨테이너 만들 때 사용된 도커 이미지
    - `COMMAND`: 컨테이너에서 실행되는 앱 프로세스
    - `CREATE`: 컨테이너 생성 후 지난 시간
    - `STATUS`: 컨테이너 상태 (Up, Exited)
    - `PORTS`: 포트포워딩 관계
    - `NAMES`: 컨테이너 이름

### `docker container stop`

- 실행 중인 컨테이너를 멈춘다
- `sudo docker container stop 컨테이너이름 or 컨테이너ID`

### `docker container restart`

- 정지 상태 컨테이너를 재시작할 때 사용한다.
- `sudo docker container restart 컨테이너이름 or 컨테이너ID`

### `docker container rm`

- 컨테이너를 완전히 파기할 때 사용한다.
- `sudo docker container rm 컨테이너이름 or 컨테이너ID`
    - `-f` 옵션: 현재 실행 중인 컨테이너를 삭제하려면 사용한다.

### `docker container logs`

- 실행 중인 도커 컨테이너의 출력 내용을 볼 수 있음. (파일 등에 출력된 로그는 볼 수 없고 표준 출력만 볼 수 있음)
- 디버깅시 사용하기 좋음
- `sudo docker container logs (options) 컨테이너이름 or 컨테이너ID`
    - `-f` 옵션: 새롭게 출력되는 내용을 계속 보여줌

### `docker container cp`

- 컨테이너간, 또는 호스트 컨테이너간 파일 복사 명령어
- Dockerfile의 `COPY` 인스트럭션은 호스트에서 컨테이너로 복사해오는 파일을 정의한 것이고, 이 명령어는 실행 중인 컨테이너와 파일을 주고 받을 때 사용한다.
- `sudo docker container cp (options) 컨테이너이름 or 컨테이너ID:원본파일 대상 위치`
    - 위 명령어로 컨테이너에서 호스트 현재 폴더로 복사가 가능하다.
- `sudo docker container cp 파일이름 컨테이너이름 or 컨테이너ID:컨테이너 복사 위치`
    - 위 명령어로 호스트의 파일을 컨테이너에 복사할 수 있다.