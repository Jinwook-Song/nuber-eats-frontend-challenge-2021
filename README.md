# Nuber Eats Frontend Challenge: Quiz 13

## **Code Challenge**

Hi everyone! Here are the best submissions from the previous assignment!

- **[@tony .hwang.developer님의 work](https://codesandbox.io/s/z1hmr)**
- **[@jonganebski 님의 work](https://codesandbox.io/s/mystifying-kepler-yxtqz)**
- **[@tony 님의 work](https://codesandbox.io/s/podcast-frontend-forked-wuxsy)**
- **[@sk97kang 님의 work](https://codesandbox.io/s/day21-22-htfj0)**
- **[@dongyeol01 님의 work](https://codesandbox.io/s/nest-challenge-12-6r0k6)**

오늘의 블루프린트는 **[@tony .hwang.developer](https://nomadcoders.co/users/tony.hwang.developer)**의 작품 입니다.

- 오늘은 지금까지 만든 페이지(스크린)와 컴포넌트들을 테스트 할 차례입니다.
- 현재 테스트 커버리지는 아래 그림과 같은 상태입니다. 이번 3일 동안의 목표는 아래 커버리지 상태를 100%로 만드는 것입니다(최대한, 할 수 있는 만큼).

![https://i.imgur.com/N8mNGg8.png](https://i.imgur.com/N8mNGg8.png)

- 블루프린트에서 `episodes.spec.tsx`, `podcasts.spec.tsx`, `login.spec.tsx` and `create-account.spec.tsx` 파일들을 보실 수 있습니다. 이 파일들은 이미 `mock-apollo-client`설정이 되어 있습니다.
- 먼저 샌드박스에서 컴퓨터로 코드를 다운로드 하시고, `npm i` 한 후에 `npm run test:coverage`를 입력해보세요. 테스트 하려면 콘솔에 `test:coverage`를 입력하시면 됩니다.
- 제출은 `코드 샌드박스` 링크, 또는 `깃헙` 커밋 링크를 보내주시면 됩니다.

## **TA's 힌트**

- 백엔드에서도 다뤘던 유닛테스트입니다. 설정과 테스트 방법이 당연하지만 사뭇 다르기 때문에 강의 내용과 문서, 검색 등을 활용하시어 최대한 커버리지를 채우면 되겠습니다.
- 블루프린트에 웬만한 것들이 셋팅(test-utils.tsx)이 되어 있어서 테스트 설정에 대한 고민은 덜어두시고 쾌적하게 테스트 하시면 되겠습니다.
- 유닛테스트의 기본목적은 똑같기 때문에, 테스트하려는 스크린, 컴포넌트를 제외한 요소인 데이터 fetching 같은 것은 mocking 해야 합니다. jest의 mockResolvedValue 등을 이용하시면 됩니다.
- **[act](https://testing-library.com/docs/react-testing-library/api/#act)**나 **[waitFor](https://testing-library.com/docs/dom-testing-library/api-async/#waitfor)**를 잘 활용하셔야 합니다. mutation, query 같은 작업을 서버에 요청하는 작업이나 유저 입력을 mocking하는 부분, 렌더링 부분, state change 등에서 act 나 waitFor를 활용하지 않으시면 원하시는 테스트 결과가 나오지 않을 수 있습니다.
- apollo client를 이용하여 resolved value를 같은 것을 mocking하실 때, **[\_\_typename](https://www.apollographql.com/docs/react/development-testing/testing/#setting-addtypename)**에 주의하세요.
- react router dom과 같은 패키지들을 mocking할 때 주의하셔야 합니다. 전체 패키지 중에 일부만 mocking하는 부분이 강의에서 나오는데 참고바랍니다. `힌트: jest.requireActual`
- handleSubmit 콜백함수 때문에 100% 커버리지 채우기는 어려울 수 있습니다.
