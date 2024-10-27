import { Injectable } from "@nestjs/common";
import { CreateSeatDto } from "./dto/create-seat.dto";
import { UpdateSeatDto } from "./dto/update-seat.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Seat } from "./models/seat.model";

@Injectable()
export class SeatService {
  constructor(@InjectModel(Seat) private seatModel: typeof Seat) {}
  create(createSeatDto: CreateSeatDto) {
    return this.seatModel.create(createSeatDto);
  }

  findAll() {
    return this.seatModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.seatModel.findByPk(id, { include: { all: true } });
  }

  update(id: number, updateSeatDto: UpdateSeatDto) {
    return this.seatModel.update(updateSeatDto, { where: { id } });
  }

  remove(id: number) {
    return this.seatModel.destroy({ where: { id } });
  }
}
