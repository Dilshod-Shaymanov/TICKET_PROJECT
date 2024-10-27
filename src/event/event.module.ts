import { Module } from "@nestjs/common";
import { EventService } from "./event.service";
import { EventController } from "./event.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Event } from "./models/event.model";
import { Seat } from "../seat/models/seat.model";
import { TicketStatus } from "../ticket_status/models/ticket_status.entity";
import { TicketStatusModule } from "../ticket_status/ticket_status.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Event, Seat, TicketStatus]),
    TicketStatusModule,
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
