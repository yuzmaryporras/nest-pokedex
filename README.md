<p align='center'>
  <a href='http://nestjs.com/' target='blank'><img src='https://nestjs.com/img/logo-small.svg' width='200px' alt='Nest Logo'>
</p>

# 🔴 Pockedex API - Learning NestJS + Docker + MongoDB

This project is an API built with [NestJS](https://nestjs.com/) to learn how to build modular and scalable REST APIs while integrating tools like Docker and MongoDB.

---

## 📚 Objective

To progressively learn NestJS by building a API called "Pockedex", practicing the use of Docker, MongoDB integration, DTOs, and best practices in API development.s

---

## 🛠️ Technologies Used

- **Node.js**
- **NestJS**
- **TypeScript**
- **MongoDB + Mongoose**
- **Docker + Docker Compose**
- **ESLint + Prettier**

---


## ▶️ How to Run the Project

1. Clone this repository:

  ```bash
  git clone https://github.com/yuzmaryporras/nest-pokedex.git
  cd nest-pokedex
  ```

2. Install dependencies:

  ```bash
  npm install
  ```

3. Have nest cli instaled:

  ```bash
  npm i -g  @nestjs/cli
  ```

4. Upload database

  ```bash
  docker-compose up -d
  ``` 
5. Clone the file ```.env.template:```  and rename to ```.env```
6. Fill the environment variables defined in ```.env```
7. Run application in dev with

  ```bash
  npm run start:dev
  ``` 
5. Open in browser or use Postman at http://localhost:3000
6. ✅ Execute the Seed to Fill the Database

You can run the seed by visiting the following endpoint:

```bash
GET http://localhost:3000/seed
``` 

This will populate the database with sample Pokémon data.

## Production Build
1. Create the file .env.prod
2. Fill the environment variables of prod
3. Create the new image

```bash
docker-compose -f docker-compose.prod.yaml up --build
```

## 📬 Postman Collection

All available API requests are included in a Postman collection so you can test them easily.

📁 File path:

```bash
postman/pokedex.postman_collection.json
```

You can import this file into Postman to test endpoints like:

```bash
GET /pokemon/:term

GET /pokemon/?limit=5&offset=10 - Pagination

POST /pokemon

PATCH /pokemon/:term

DELETE /pokemon/:id

GET /seed – Populate the database with sample data
```