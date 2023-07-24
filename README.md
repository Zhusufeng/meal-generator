# Meal Generator

You can check it out at https://meal-generator-nine.vercel.app/

## About

This is a meal planning app for families. I made it to use it myself.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). I referenced the [MongoDB with Mongoose example](https://github.com/vercel/next.js/tree/canary/examples/with-mongodb-mongoose).

## Tech

- React, Next.js, Vercel
- MongoDB, Mongoose, Mongo Atlas
- TypeScript
- SWR
- Axios
- Ant Design

## Getting Started

1. Get a copy of the repo locally

```bash
  git clone https://github.com/Zhusufeng/meal-generator.git
```

2. Install the dependencies

```bash
  npm i
```

3. Get MongoDB up and running.
   1. If you don't have a MongoDB and have Docker, you get an instance running using the following command:
   ```bash
     docker run -d -p 27017:27017 --name my-mongo-db mongo
   ```
4. Create a database in your MongoDB. I used the GUI, MongoDB Compass, and named mine "meal-generator".
5. Create a copy of the file `env.local.example` and rename it `env.local`. Fill out the environment variables, including your MongoDB connection string.
6. Run the development server.

```bash
  npm run dev
```

7. Go to your browser to view it at http://localhost:3000/
