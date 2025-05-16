import { DataSource } from "typeorm";
import "dotenv/config";
import "reflect-metadata"
import { Task } from "@/schemas/Task.entity";
import { TaskGroup } from "@/schemas/TaskGroup.entity";


const AppDataSource = new DataSource({
  type: "mariadb",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV !== "production",
  logging: process.env.NODE_ENV !== "production",
  entities: [Task, TaskGroup],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: ["src/subscribers/**/*.ts"],
});

export default AppDataSource