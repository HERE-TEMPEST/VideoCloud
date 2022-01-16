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
3. video/.... - CRUD видео.\
  Использованные схемы
 + **Video:**
      ```ts
      name: { required: true, type: String }
      path: { required: true, type: String }
      systemname: { required: true, type: String, unique: true }
      type: { required: true, type: String }
      userId: { required: true, type: Types.ObjectId }
      ```
5. share/.... - работы с "шарингом" видео.\
   Использованные схемы
 + **Share:**
      ```ts
      ban: { required: true, type: Array<Types.ObjectId>() }
      userId: { required: true, type: Types.ObjectId }
      videoId: { required: true, type: Types.ObjectId }
      ```
