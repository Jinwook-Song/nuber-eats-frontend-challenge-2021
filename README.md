# Nuber Eats Frontend Challenge: Quiz 10

## **Code Challenge**

- 프론트 엔드 파트 시작입니다.
- 챌린지 기간은 2일입니다.
- 이번 챌린지 과제에서는 전에 만든 백엔드 API를 이용하여 로그인을 구현하도록 합니다.
  - [ ] Router 설정(react-router-dom을 이용하여)
  - [ ] apollo-client 설정
  - [ ] react-hooks-form을 이용하여 로그인 스크린과 Form을 만듭니다.
  - [ ] login mutation을 만듭니다(useMutation).
  - [ ] 로그인 token을 저장하도록 합니다
- 로그인 한 유저를 보여주는 페이지는 reactive variables를 이용합니다.
- 샌드박스의 보일러플레이트에는 TailwindCSS 가 링크되어 있습니다. UI 디자인은 너무 신경 안쓰셔도 됩니다. 이 후 챌린지 과제로 나옵니다.

## **TA's 힌트**

- 강의에 나온대로 router를 로그인 한 경우, 로그인 하지 않은 경우로 나눠서 생각하시면 쉽습니다.
- makeVar, useReactiveVar를 사용합니다.
- apollo codegen이 기억 나시나요? 안타깝게 코드샌드박스에서는 apollo codegen을 사용할 수가 없습니다. 방법은 두 가지가 있습니다.
- 방법1: useMutation, useQuery 등의 함수에 type 제공 없이 사용할 수 있도록 설정되어 있습니다.
- 방법2: 코드샌드박스 코드를 다운 받아서 진행한다.(**[후기의 #Assignment 12](https://nomadcoders.co/community/thread/294)** 참고)
- 토큰은 localStorage에 저장하는 방법을 이용합니다.
