# 도커 설치 (리눅스)

## 과정

1. apt 패키지 관리자 패키지 목록 업데이트
    - `sudo apt update -y`

2. 도커 CE가 의존 중인 여러 패키지 설치
    - `sudo apt install -y apt-transport-https ca-certificates curl software-properties-common`
3. 도커 패키지 저장소를 apt에 등록
    - `curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -`
    - `sudo add-apt-repository \
    "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
    $(lsb_release -cs) \
    stable"`
4. 다시 패키지 목록 업데이트
    - `sudo apt update -y`
5. 설치할 버전 정해서 도커 CE 설치
    - `sudo apt install -y docker-ce`

> CF. 도커 CE는 커뮤니티 에디션을 뜻함. 다른 버전으로는 EE(엔터프라이즈 에디션)이 있음 EE는 유료이고, 도커 회사의 기술지원, 다양한 운영체제를 지원함

## 추가 작업

- 기본적으로 리눅스에서 설치하면 유저가 `docker user group`에 속해있지 않다. 그래서 명령어를 다룰 때 `sudo`를 반드시 붙여야 하는데, 그렇게 하기 싫다면 유저를 `docker user group`에 넣어줘야 한다.

- `sudo usermod -aG docker ${USER}`

- 로그아웃 후 다시 로그인 해야 한다.
- 실행 시 `config.json` 권한 에러가 나는 경우에는 아래 명령어를 추가로 입력했다.

- `sudo chown "$USER":"$USER" /home/"$USER"/.docker -R`
- `sudo chmod g+rwx "/home/$USER/.docker" -R`
