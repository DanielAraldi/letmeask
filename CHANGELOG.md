## 1.0.0 (2024-02-02)


### Features

* added `isOutlined` property to `Button` component to be outline ([6a39275](https://github.com/DanielAraldi/letmeask/commit/6a3927569e55bf3ac128d53755cb331ae960daa1))
* added a question as answered and highlighted ([abbe85d](https://github.com/DanielAraldi/letmeask/commit/abbe85d63ac9e02921996f71400081c955e8f3e3))
* added children as property to the `Question` component ([eda821f](https://github.com/DanielAraldi/letmeask/commit/eda821f11c206c71e2287dd7930ff54584401360))
* added close room functionality to `AdminRoom` ([477ddb1](https://github.com/DanielAraldi/letmeask/commit/477ddb1d467b57d3f7e47c9a7bb0d8f7b823340d))
* added functionality for remove highlight of the question when it's highlighted ([e3b5a7d](https://github.com/DanielAraldi/letmeask/commit/e3b5a7d45189f199a1239fbe6f3477e3226fa648))
* added it functionality like and dislike a question ([14b9375](https://github.com/DanielAraldi/letmeask/commit/14b9375d40c50bc11a0065e3557d4a2005054962))
* added methods to join and create an room ([2db1741](https://github.com/DanielAraldi/letmeask/commit/2db174196d7d3701ef9f224b6cf4dd1e6c586a38))
* added remove a question functionality ([45eb589](https://github.com/DanielAraldi/letmeask/commit/45eb589e78f7dbb1e82f53f08b330bb1fd85989e))
* added the firebase configurations for auth and realtime database ([1eaff83](https://github.com/DanielAraldi/letmeask/commit/1eaff831e2b358f1ef927590a649aeca40ff097a))
* consuming and listening questions made in the room ([9e576fe](https://github.com/DanielAraldi/letmeask/commit/9e576fe4d3166beb7f18aac18c981647f4147c8e))
* created `Button` component with your types and added it to `Home` page ([2623dd1](https://github.com/DanielAraldi/letmeask/commit/2623dd1652643bbef0f071a4b6545f4e013187c4))
* created `NotFound` page ([8b7df19](https://github.com/DanielAraldi/letmeask/commit/8b7df193c277bf50b551ada07e946ad395f6e998))
* created `Question` component and added it in the `Room` page ([f19a8c8](https://github.com/DanielAraldi/letmeask/commit/f19a8c8f5423da236af91fd80dbccac7532b3ca6))
* created `Room` page with your structure and styles (that isn't complete still) ([7aa72ed](https://github.com/DanielAraldi/letmeask/commit/7aa72ed7f1521b77f108d0bf7213019e0db8cea3))
* created `RoomCode` component with your types ([893e6cf](https://github.com/DanielAraldi/letmeask/commit/893e6cfb7001d8693d417d6452742b9c38f71d3c))
* created `useAuth` hook and added yours methods to make sign in with Google to create a room ([bc330ec](https://github.com/DanielAraldi/letmeask/commit/bc330ec0a7dc534e5a347d7ba5396e2ff35379a2))
* created `useToast` hook to manager toasts in the application and configured `Toaster` to show the toasts ([7c44a5e](https://github.com/DanielAraldi/letmeask/commit/7c44a5e4fc6a0eabd9e37b9bb3226daa83699922))
* created contexts to authentication user with Google via firebase ([5ba8b69](https://github.com/DanielAraldi/letmeask/commit/5ba8b698884d61bb6796da24e2cd0fff898582db))
* created routes to navigate between pages ([0261f97](https://github.com/DanielAraldi/letmeask/commit/0261f97b81ad56d59168f0b4ca29a1dd3379fbc6))
* created structure and some styles of the  page ([efcfbce](https://github.com/DanielAraldi/letmeask/commit/efcfbce7e6229e281fe0f7de2ad97073dbc2f161))
* created structure of the `Home` page ([a5df5b6](https://github.com/DanielAraldi/letmeask/commit/a5df5b6bc4672f6b12163ac722efa31c81c1b5d9))
* created type to firebase object returned by database and hook types ([8da6712](https://github.com/DanielAraldi/letmeask/commit/8da671244386472ad7b72e79a3064f638dd24207))
* exported methods that's going to manager firebase realtime database ([f91c71e](https://github.com/DanielAraldi/letmeask/commit/f91c71e7868d0995a1063183d9b2d2963c9d8778))
* it's finished the creation new question in the rooms ([0dac4bb](https://github.com/DanielAraldi/letmeask/commit/0dac4bbcbe0c32ab61aa78da4a4f13a39845d28f))
* start the project ([b141d18](https://github.com/DanielAraldi/letmeask/commit/b141d18034828e39f69344cc6f7011c237023f21))


### Bug Fixes

* add redirection user to `NotFound` when room is closed ([f2b5429](https://github.com/DanielAraldi/letmeask/commit/f2b54293f666ff681f1130fa864ff8b48138167c))
* add sort questions to send highlight questions to the list top and answered questions to the list bottom ([cc94c16](https://github.com/DanielAraldi/letmeask/commit/cc94c162105fb5920ecb0976b189241a608ce888))
* added reset on routes when the user close a room ([7bf18f2](https://github.com/DanielAraldi/letmeask/commit/7bf18f23773053041f86be76920b833c46251179))
* added text message telling "Ainda não há perguntas feitas nesta sala" when there isn't questions ([565d8ab](https://github.com/DanielAraldi/letmeask/commit/565d8ab48ca4c8726dd1f1280655989ec6ba51ea))
* added the correct route to user be thrown when it create a room and it was removed a random zero aside the room title ([c1786ae](https://github.com/DanielAraldi/letmeask/commit/c1786aee038145332360602cc69edb4d63d43ba6))
* created `navigateToHome` function to throw user from `Home` page when it's logged ([2f9194b](https://github.com/DanielAraldi/letmeask/commit/2f9194b59b4e810ffbc5cf233d72aa9211b56a04))
* moved code of the `updateUserIfAlreadySignIn` function to `useEffect` to execute `unsubscribe` event correctly ([0adbbc1](https://github.com/DanielAraldi/letmeask/commit/0adbbc1a6d79488794a3f67daf3162d45bd46211))
* redirect user to admin route and it's admin of the room ([a4c0d8b](https://github.com/DanielAraldi/letmeask/commit/a4c0d8b64ceea395edd2b05a13a6b6d9f249abd6))


### Performance Improvements

* created `useRoom` hook to manage room's title and questions ([4cbfc7f](https://github.com/DanielAraldi/letmeask/commit/4cbfc7f6a993735fe7c655e586b466bff4e65d6a))
