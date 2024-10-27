import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import { Test, TestingModule } from "@nestjs/testing";

describe("User (e2e)", () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    const response = await request(app.getHttpServer())
      .post("/auth/signin")
      .send({
        email: "azamatbeksjon@gmail.com",
        password: "12345",
      });

    token = response.body.token;
    console.log("token", response.body.token);
  }, 10000);

  it("/users (GET) --> 200 OK", async () => {
    return request(app.getHttpServer())
      .get("/users")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);
  }, 10000);
  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });
});
