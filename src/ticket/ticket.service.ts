import { Injectable } from "@nestjs/common";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { UpdateTicketDto } from "./dto/update-ticket.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Ticket } from "./models/ticket.model";

@Injectable()
export class TicketService {
  constructor(@InjectModel(Ticket) private ticketModel: typeof Ticket) {}
  create(createTicketDto: CreateTicketDto) {
    return this.ticketModel.create(createTicketDto);
  }

  findAll() {
    return this.ticketModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.ticketModel.findByPk(id, { include: { all: true } });
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return this.ticketModel.update(updateTicketDto, { where: { id } });
  }

  remove(id: number) {
    return this.ticketModel.destroy({ where: { id } });
  }
}
