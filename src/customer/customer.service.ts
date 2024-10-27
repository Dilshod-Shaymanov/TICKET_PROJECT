import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Customer } from "./models/customer.model";
import { JwtService } from "@nestjs/jwt";
import { hash, compare } from "bcrypt";
import { SigInCustomerDto } from "./dto/sigin-customer.dto";

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer) private customerModel: typeof Customer,
    private readonly jwtService: JwtService
  ) {}
  async create(createCustomerDto: CreateCustomerDto) {
    const hashed_password = await hash(createCustomerDto.password, 7);
    const newCustomer = await this.customerModel.create({
      ...createCustomerDto,
      hashed_password,
    });

    return newCustomer;
  }

  findAll() {
    return this.customerModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.customerModel.findByPk(id, { include: { all: true } });
  }

  async update(
    id: number,
    updateCustomerDto: UpdateCustomerDto
  ): Promise<Customer> {
    const customer = await this.customerModel.update(updateCustomerDto, {
      where: { id },
      returning: true,
    });
    return customer[1][0];
  }

  remove(id: number) {
    return this.customerModel.destroy({ where: { id } });
  }

  async customerSignIn(sigInCustomerDto: SigInCustomerDto) {
    const customer = await this.customerModel.findOne({
      where: { email: sigInCustomerDto.email },
    });

    if (!customer) {
      throw new UnauthorizedException("Email yoki parol noto'g'ri");
    }
    const isValidPassword = await compare(
      sigInCustomerDto.password,
      customer.hashed_password
    );
    if (!isValidPassword) {
      throw new UnauthorizedException("Email yoki parol noto'g'ri");
    }
    const payload = {
      email: customer.email,
      sub: customer.id,
      first_name: customer.first_name,
    };
    const token = this.jwtService.sign(payload);
    customer.hashed_refresh_token = token;
    await customer.save();
    const response = {
      message: "Muvvafaqiyatli tizimga kirildi",
      token,
    };
    return response;
  }

  async customerSignOut(id: number) {
    const update = await this.customerModel.findByPk(id);
    update.hashed_refresh_token = null
    await update.save();
    return {
      message:"SignOut successfully"
    }
  }
  
}
