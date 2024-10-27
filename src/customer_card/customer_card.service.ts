import { Injectable } from "@nestjs/common";
import { CreateCustomerCardDto } from "./dto/create-customer_card.dto";
import { UpdateCustomerCardDto } from "./dto/update-customer_card.dto";
import { InjectModel } from "@nestjs/sequelize";
import { CustomerCard } from "./models/customer_card.model";

@Injectable()
export class CustomerCardService {
  constructor(
    @InjectModel(CustomerCard) private customerCardModel: typeof CustomerCard
  ) {}
  create(createCustomerCardDto: CreateCustomerCardDto) {
    return this.customerCardModel.create(createCustomerCardDto);
  }

  findAll() {
    return this.customerCardModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.customerCardModel.findByPk(id, { include: { all: true } });
  }

  update(id: number, updateCustomerCardDto: UpdateCustomerCardDto) {
    return this.customerCardModel.update(updateCustomerCardDto, {
      where: { id },
    });
  }

  remove(id: number) {
    return this.customerCardModel.destroy({ where: { id } });
  }
}
