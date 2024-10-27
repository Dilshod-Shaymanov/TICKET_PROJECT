import { Test } from "@nestjs/testing";
import { UsersController } from "../users.controller";
import { UsersService } from "../users.service";
import { JwtService } from "@nestjs/jwt";
import { Users } from "../models/user.model";
import { CreateUserDto } from "../dto/create-user.dto";
import { userStub } from "./stubs/user.stub";
import { UpdateUserDto } from "../dto/update-user.dto";
jest.mock("../users.service");

describe("Users controller", () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, JwtService],
    }).compile();

    usersController = moduleRef.get<UsersController>(UsersController);
    usersService = moduleRef.get<UsersService>(UsersService);
  });

  it("Users controller should be defined", () => {
    expect(usersController).toBeDefined();
  });
  it("Users service should be defined", () => {
    expect(usersService).toBeDefined();
  });
  describe("create user", () => {
    describe("when create user is called", () => {
      let user: Users;
      let createUsersdto: CreateUserDto;
      beforeAll(async () => {
        createUsersdto = {
          name: userStub().name,
          email: userStub().email,
          role_value: userStub().email,
          password: userStub().password,
        };
        user = await usersController.create(createUsersdto);
        console.log(user);
      });
      it("than it should call userService", () => {
        expect(usersService.create).toHaveBeenCalledWith(createUsersdto);
      });
      test("Than it should return user", () => {
        expect(user).toEqual(userStub());
      });
    });
  });
  describe("Findall users", () => {
    describe("when find all users are called", () => {
      let users: Users[];
      beforeAll(async () => {
        users = await usersController.findAll();
      });
      it("than it should be called", () => {
        expect(usersService.findAll).toHaveBeenCalled();
      });
      it("than it should be return users", () => {
        expect(users).toEqual([userStub()]);
      });
    });
  });
  describe("Find user byId", () => {
    describe("When findById is called", () => {
      let user: Users;
      let id: number;
      beforeAll(async () => {
        id = 1;
        user = await usersController.findOne(id.toString());
      });
      it("then it should call usersSerice.findOne", () => {
        expect(usersService.findOne).toHaveBeenCalledWith(id);
      });
      it("then it should return a user", () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe("Delete userById", () => {
    describe("when delete userById is called", () => {
      let id: number;
      let response: { message: string };
      beforeAll(async () => {
        id = 1;
        response = usersController.remove(id.toString());
      });
      it("then it should call usersService.remove", () => {
        expect(usersService.remove).toHaveBeenCalledWith(id);
      });
      it("then it should return a success", () => {
        expect(response).toEqual({ message: "Foydalanuvchi o'chirildi" });
      });
    });
  });
  describe("Update userById", () => {
    describe("When updateUserById is called", () => {
      let updateUserDto: UpdateUserDto;
      let user: Users;
      let id: number;

      beforeAll(async () => {
        id = 1;
        updateUserDto = {
          email: userStub().email,
          name: userStub().name,
          role_value: userStub().role_value,
          password: userStub().password,
        };
        const [affectedCount, affectedRows] = await usersController.update(
          id.toString(),
          updateUserDto
        );
        user = affectedRows[0];
      });

      it("then it should call usersService.update", () => {
        expect(usersService.update).toHaveBeenCalledWith(id, updateUserDto);
      });

      it("then it should return updated user", () => {
        expect(user).toEqual(userStub());
      });
    });
  });
});
