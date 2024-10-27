import { Injectable } from "@nestjs/common";
import { CreateCustomerAddressDto } from "./dto/create-customer_address.dto";
import { UpdateCustomerAddressDto } from "./dto/update-customer_address.dto";
import { InjectModel } from "@nestjs/sequelize";
import { CustomerAddress } from "./models/customer_address.model";

@Injectable()
export class CustomerAddressService {
  constructor(
    @InjectModel(CustomerAddress)
    private customerAddressModel: typeof CustomerAddress
  ) {}
  create(createCustomerAddressDto: CreateCustomerAddressDto) {
    return this.customerAddressModel.create(createCustomerAddressDto);
  }

  findAll() {
    return this.customerAddressModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.customerAddressModel.findByPk(id, { include: { all: true } });
  }

  update(id: number, updateCustomerAddressDto: UpdateCustomerAddressDto) {
    return this.customerAddressModel.update(updateCustomerAddressDto, {
      where: { id },
    });
  }

  remove(id: number) {
    return this.customerAddressModel.destroy({ where: { id } });
  }
}
