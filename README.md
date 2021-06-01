# Nuber Eats Frontend Challenge: Quiz 12

## **Code Challenge**

Hello everyone! I hope you had a good weekend! Today's blueprint is based on the awesome **[work](https://codesandbox.io/s/assignment13-7l09m)** of **[@minikim 님](https://nomadcoders.co/users/minikim)**! On this two day challenge we are going to build **two** screens, after the user logs in, the user will go to 'Home', there it can see all the podcasts in a nice list! When the user clicks on a podcast, the user can see the episodes of the podcast. That's it!

- [x] Podcast List 만들기
  - 로그인 후 이동할 페이지입니다.
  - 팟캐스트 리스트들을 보여주면 됩니다.
- [x] Podcast Detail 만들기
  - 위의 팟캐스트 리스트 페이지에서 팟캐스트를 클릭하면 나오는 페이지 입니다.
  - 팟캐스트의 세부 에피소드들을 보여주시면 됩니다.

Here are two examples of the Google Podcasts app:

**Podcasts List**

![https://i.imgur.com/7JdseeF.jpg](https://i.imgur.com/7JdseeF.jpg)

**Podcast Detail**

![https://i.imgur.com/jNijGbz.jpg](https://i.imgur.com/jNijGbz.jpg)

## **TA's 힌트**

- 페이지를 만드시기 전에 request header에 token을 넘겨주는 작업이 필요합니다.
- context link(setContext)를 활용하여 context에 token을 넘겨줄 수 있습니다.
- recount router dom을 이용하여 podcast detail의 route를 만들어 주세요.
- 테스트 data는 백엔드의 playground에서 충분히 만들고 테스트 해보시는 것을 권해드립니다.
- useQuery를 이용하여 podcast, episode의 data를 백엔드에서 가져온 후 react로 렌더링하면 과제 자체는 완성이 됩니다.
