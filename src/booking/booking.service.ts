import { Injectable } from "@nestjs/common";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Booking } from "./models/booking.model";

@Injectable()
export class BookingService {
  constructor(@InjectModel(Booking) private bookingModel: typeof Booking) {}
  create(createBookingDto: CreateBookingDto) {
    return this.bookingModel.create(createBookingDto);
  }

  findAll() {
    return this.bookingModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.bookingModel.findByPk(id, { include: { all: true } });
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return this.bookingModel.update(updateBookingDto, { where: { id } });
  }

  remove(id: number) {
    return this.bookingModel.destroy({ where: { id } });
  }
}
