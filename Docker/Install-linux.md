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