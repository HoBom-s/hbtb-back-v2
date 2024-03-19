# HoBom Tech Blog BackEnd

**호봄 프로젝트**는 '하고 싶은 개발'을 원없이 하기 위해 시작되었습니다.  
**호봄 테크 블로그**는 우리의 개발 여정을 기록하고 공유하기 위한 서비스 입니다: **https://hbtb.vercel.app**

**HoBom project** is named after our initial, has begun to freely do all the development we want regardless of companies' technical limitation.  
**Hobom Tech Blog** is kind of an archive where we can record the content of our wildest dreams: **https://hbtb.vercel.app**

<br/>

## 기술 스택(Tech Stack)

`NodeJs` `Express` `TypeScript` `TypeORM` `MySQL`  
`AWS-RDS` `AWS-S3` `Redis`

- WAS distribution on `CLOUDTYPE` free-tier
- DB distribution on `AWS-RDS` free-tier
- [Image WAS](https://github.com/HoBom-s/hb-imageServer) distribution on `Koyeb` free-tier  
   ※ 호봄 프로젝트 확장을 위해 이미지 서버 별도 구축  
   ※ Built a sepearate image server for the sake of HoBom service expansion

<br/>

## 시작하기(Getting started)

Of course, `.env` on private note.

```bash
# Git clone
git clone https://github.com/HoBom-s/hbtb-back-v2.git

# start
npm install
npm run dev
```

<br/>

## Swagger(API docs)

API 파악을 위해 간소화된 Swagger를 제공합니다: **[HBTB-API-v2](https://port-0-hbtb-back-v2-17xco2nlslu0q3q.sel5.cloudtype.app/api/v2/docs/)**

Please check simplified api docs on **[HBTB-API-v2](https://port-0-hbtb-back-v2-17xco2nlslu0q3q.sel5.cloudtype.app/api/v2/docs/)**.

<br/>

## 기능(Features)

### 1. Users

- User basic CRUD, signup, login, logout
- [JWT](https://jwt.io/) authentication, authorization with authValidateMiddleware (Access token, Refresh token)
- Upload profile image using multer and s3 (with [image server](https://github.com/HoBom-s/hb-imageServer)).

### 2. Articles

- Article basic CRUD, search, pagination
- Upload thumbnail using multer and s3 (with [image server](https://github.com/HoBom-s/hb-imageServer)).
- [Relations](https://typeorm.io/relations)(Join) with Tags and Users entity using TypeORM.

### 3. Tags

- 게시글 태그: 키워드 서칭 등에 사용  
  Articles' tags for keyword searching.
- Tag basic CRUD

### 4. Categories

- 카테고리: 페이지 헤더 및 푸터에 삽입 될 메뉴 카테고리  
  Menus to be placed on page header and footer.
- Category basic CRUD

### Middleware

1. auth.middleware : Authorization and authentication based on [JWT](https://jwt.io/)(Access, Refresh token)
2. param.middleware : Request params validation using [Joi](https://joi.dev/) schema
3. body.middleware : Request body validation using [Joi](https://joi.dev/) schema
4. cache.middleware : Caching articles and tags using [Redis](https://redis.io/)
5. error.middleware : Using customized error middleware

### Logging

- Using [winston](https://www.npmjs.com/package/winston), [winston-daily-rotate-file](https://www.npmjs.com/package/winston-daily-rotate-file), and [morgan](https://www.npmjs.com/package/morgan) for logging and tracking issues

### Redis

- Caching patterns: `Look Aside` + `Write Around`  
  (more about this on below **TroubleShooting** note)

<br/>

## 문제 해결(TroubleShooting)

- **_...ing..._** WIP on Notion **_...ing..._**
