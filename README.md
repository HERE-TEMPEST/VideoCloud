# VideoCloud

#### Описание приложения:
Галерея видеозаписей пользователей с функционалом для "шаринга" видео другим пользователям.
Приложение состоит из 3 частей:
1. Авторизация/регистрация(jwt, refresh token).
2. CRUD для модели Видео.
3. Логика передачи прав для просмотра видео другим пользователям.

В ходе разработки было использован **Express**, фреймворк web-приложений для Node.js.Также в проекте использована документоориентированная система управления базами данных **MongoDB**. Все **secret-значения** были вынесены в файл **.env**, который был внесен в .gitignore. В ходе разработки был использован язык **TypeScript**. Тестирование приложения происходило в **Postman**.

Все **source** файлы вынесены в папку **src**.
Стартовым файлом являеться index.ts в папке src.

**Маршрутизация**
1. user/.... - регистрация/авторизация\
  Запросы, которые были реализованы:
  + /registration - добавление нового пользователя( post-запрос)
  + /login - авторизация пользователя( post-запрос)
  + /logout - выход из приложения( post-запрос)
  + /refresh - обновление access token( get-запрос)
  + /all - получение всех пользователей( get-запрос)\
  Использованные схемы:
 + **User:**
      ```ts
        email: { required: true, type: String, unique: true }
        password: { required: true, type: String }
      ```
 + **Token:**
    ```ts
      refreshToken: { required: true, type: String }
      userId: { required: true, type: Types.ObjectId }
    ```
2. video/.... - CRUD видео.\
  Запросы, которые были реализованы:
  + /:videoId - удаление видео по его ID( delete-запрос, videoId - query-параметр) 
  + /:videoId - скачать видео по его ID( get-запрос, videoId - query-параметр)
  + / - получить все видео пользователя(get-запрос)
  + /users/:userId/:videoId - получить видео данного пользователя по ID(get-запрос, videoId и userId - query-параметры)
  + /users/:userId/ - получить видео другого пользователя по ID(get-запрос, videoId - query-параметр)
  + / - загрузить на сервер видео(post-запрос)
  + /:videoId - изменить название видео(put-запрос)\
  Использованные схемы:
 + **Video:**
      ```ts
      name: { required: true, type: String }
      path: { required: true, type: String }
      systemname: { required: true, type: String, unique: true }
      type: { required: true, type: String }
      userId: { required: true, type: Types.ObjectId }
      ```
3. share/.... - работы с "шарингом" видео.\
4.   Запросы, которые были реализованы:
  + /access/:videoId - разрешить доступ к видео(put-запрос, videoId - query-параметр) 
  + /accessAll/:videoId - разрешить доступ к видео всем пользователям(put-запрос, videoId - query-параметр)
  + /ban/:videoId - запретить доступ к видео(put-запрос, videoId - query-параметр) 
  + /banAll/:videoId - запретить доступ к видео всем пользователям(put-запрос, videoId - query-параметр)\
   Использованные схемы:
 + **Share:**
      ```ts
      ban: { required: true, type: Array<Types.ObjectId>() }
      userId: { required: true, type: Types.ObjectId }
      videoId: { required: true, type: Types.ObjectId }
      ```

