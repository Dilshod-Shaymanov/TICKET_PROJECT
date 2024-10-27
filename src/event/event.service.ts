import { BadRequestException, Injectable, Query } from "@nestjs/common";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Event } from "./models/event.model";
import { Sequelize } from "sequelize-typescript";
import { Ticket } from "../ticket/models/ticket.model";
import { Seat } from "../seat/models/seat.model";
import { Op } from "sequelize";
import { TicketStatus } from "../ticket_status/models/ticket_status.entity";
import { TicketStatusService } from "../ticket_status/ticket_status.service";
@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event) private eventModel: typeof Event,
    private readonly ticketStatusService: TicketStatusService,
    private readonly sequelize: Sequelize
  ) {}
  create(createEventDto: CreateEventDto) {
    return this.eventModel.create(createEventDto);
  }

  findAll() {
    return this.eventModel.findAll({ include: { all: true } });
  }


  async getSeatByTicketStatusName() {
    const ticket_status = await this.ticketStatusService.findByName("paid");

    if (!ticket_status) {
      throw new BadRequestException("TicketStatus not found");
    }
    const soldSeats = await this.eventModel.findAll({
      include: [
        {
          model: Ticket,
          include: [
            {
              model: Seat,
              required: true,
            },
            {
              model: TicketStatus,
              where: {
                id: ticket_status.id,
              },
              required: true,
            },
          ],
        },
      ],
    });
    const seats = [];
    soldSeats.forEach((event) => {
      if (Array.isArray(event.tickets)) {
        event.tickets.forEach((ticket) => {
          seats.push(ticket.seat);
        });
      } else {
        console.log("Tickets is not an array:", event.tickets);
      }
    });

    return seats;
  }

  // async getSoldSeat() {
  //   const [getSeat] = await this.sequelize.query(`
  //   SELECT s.* FROM event e
  //   LEFT JOIN ticket t ON e.id = t."eventId"
  //   LEFT JOIN ticket_status ts ON t."ticket_statusId" = ts.id
  //   LEFT JOIN seat s ON t."seatId" = s.id
  //   WHERE ts.name = 'paid'
  // `);
  //   return getSeat;
  // }


  // async getSoldSeatThroughBelongstoMany() {
  //   const soldSeats = await this.eventModel.findAll({
  //     include: [
  //       {
  //         model: Ticket,
  //         include: [
  //           {
  //             model: Seat,
  //             required: true,
  //             attributes: [
  //               "id",
  //               "sector",
  //               "row_number",
  //               "number",
  //               "location",
  //               "venueId",
  //               "seat_typeId",
  //             ],
  //           },
  //           {
  //             model: TicketStatus,
  //             where: {
  //               name: {
  //                 [Op.eq]: "paid",
  //               },
  //             },
  //             // required: true,
  //           },
  //         ],
  //       },
  //     ],
  //   });

  //   return soldSeats;
  // }

  findOne(id: number) {
    return this.eventModel.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const event = await this.eventModel.update(updateEventDto, {
      where: { id },
      returning: true,
    });
    return event[1][0];
  }

  remove(id: number) {
    return this.eventModel.destroy({ where: { id } });
  }
}
