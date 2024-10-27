import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "../../users.service";
import { userStub } from "./user.stub";
import { JwtService } from "@nestjs/jwt";
import { RolesService } from "../../../roles/roles.service";
import { getModelToken } from "@nestjs/sequelize";
import { Users } from "../../models/user.model";
import { Roles } from "../../../roles/models/roles.model";
import { CreateUserDto } from "../../dto/create-user.dto";
import { UpdateUserDto } from "../../dto/update-user.dto";

describe("Users service", () => {
  let usersService: UsersService;
  const mockUsersModel = {
    create: jest.fn().mockImplementation(userStub),
    findOne: jest.fn().mockImplementation(userStub),
    findAll: jest.fn().mockImplementation(() => [userStub()]),
    findByPk: jest.fn().mockImplementation(userStub),
    update: jest.fn().mockImplementation(() => [1, [userStub()]]),
    destroy: jest.fn(),
  };
  const mockRolesModel = {
    findOne: jest.fn().mockImplementation((value: string) => "USER"),
  };
  beforeAll(async () => {
    const modulRef: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        UsersService,
        JwtService,
        RolesService,
        {
          provide: getModelToken(Users),
          useValue: mockUsersModel,
        },
        {
          provide: getModelToken(Roles),
          useValue: mockRolesModel,
        },
      ],
    }).compile();
    usersService = modulRef.get<UsersService>(UsersService);
  });
  it("Should be defined", () => {
    expect(usersService).toBeDefined();
  });

  describe("createUsers", () => {
    describe("when create User is called", () => {
      let createUsersDto: CreateUserDto;
      let newUser: Users;
      beforeAll(async () => {
        createUsersDto = {
          name: userStub().name,
          email: userStub().email,
          role_value: userStub().role_value,
          password: userStub().password,
        };
        newUser = await usersService.create(createUsersDto);
        console.log(newUser);
      });
      it("should be create new user", async () => {
        expect(newUser).toMatchObject({
          ...userStub(),
          roles: ["USER"],
        });
      });
    });
  });
  describe("getOneUser", () => {
    describe("when getOneUSer is called", () => {
      it("then it should call userService", async () => {
        expect(await usersService.findOne(userStub().id)).toEqual(userStub());
      });
    });
  });
  describe("getAllUser", () => {
    describe("when getAllUser is called", () => {
      it("then it should call userService", async () => {
        expect(await usersService.findAll()).toEqual([userStub()]);
      });
    });
  });

  describe("updateUser", () => {
    describe("when update user is called", () => {
      let updateUserDto: UpdateUserDto;
      let user: Users;
      let affectedRows: Users;
      let affectCount: number;

      beforeAll(async () => {
        updateUserDto = {
          name: userStub().name,
          email: userStub().email,
          role_value: userStub().role_value,
          password: userStub().password,
        };
        [affectCount, [affectedRows]] = await usersService.update(
          userStub().id,
          updateUserDto
        );
        user = affectedRows[0];
      });
      it("should be upate user", () => {
        expect(affectedRows).toMatchObject(userStub());
      });
    });
  });
});
