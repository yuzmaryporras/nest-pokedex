<p align='center'>
  <a href='http://nestjs.com/' target='blank'><img src='https://nestjs.com/img/logo-small.svg' width='200px' alt='Nest Logo'>
</p>

# 🔴 Pockedex API - Learning NestJS + Docker + MongoDB

This project is an API built with [NestJS](https://nestjs.com/) to learn how to build modular and scalable REST APIs while integrating tools like Docker and MongoDB.

---

## 📚 Objective

To progressively learn NestJS by building a Pokémon-style API called "Pockedex", practicing the use of Docker, MongoDB integration, DTOs, and best practices in API development.

---

## 🛠️ Technologies Used

- **Node.js**
- **NestJS**
- **TypeScript**
- **MongoDB**
- **Docker + Docker Compose**
- **ESLint + Prettier**

---

## 📁 Project Structure

```bash
src/
│
├── app.module.ts         # Root module
├── main.ts               # Entry point
│
├── pokemon/              # Pokémon module
│   ├── dto/
│     ├── create-pokemon.dto.ts
│   ├── interfaces/
│     ├── pokemon.interface.ts
│   ├── entities/
│     ├── pokemon.entity.ts
│   ├── pokemon.module.ts
│   ├── pokemon.controller.ts
│   └── pokemon.service.ts
│
├── seed/                 # Seed module
│   ├── data/
│     ├──

``` 

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

3. Have nest instaled:

```bash
 npm i -g  @nestjs/cli
```

4. Upload database

```bash
 docker-compose up -d
``` 
