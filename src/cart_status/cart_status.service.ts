import { Injectable } from "@nestjs/common";
import { CreateCartStatusDto } from "./dto/create-cart_status.dto";
import { UpdateCartStatusDto } from "./dto/update-cart_status.dto";
import { InjectModel } from "@nestjs/sequelize";
import { CartStatus } from "./models/cart_status.model";

@Injectable()
export class CartStatusService {
  constructor(
    @InjectModel(CartStatus) private cartStatusModel: typeof CartStatus
  ) {}
  create(createCartStatusDto: CreateCartStatusDto) {
    return this.cartStatusModel.create(createCartStatusDto);
  }

  findAll() {
    return this.cartStatusModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.cartStatusModel.findByPk(id, { include: { all: true } });
  }

  update(id: number, updateCartStatusDto: UpdateCartStatusDto) {
    return this.cartStatusModel.update(updateCartStatusDto, {
      where: { id },
    });
  }

  remove(id: number) {
    return this.cartStatusModel.destroy({ where: { id } });
  }
}
