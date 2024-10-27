import { Module } from "@nestjs/common";
import { SeatTypeController } from "./seat_type.controller";
import { SeatTypeService } from "./seat_type.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { SeatType } from "./models/seat-type.model";

@Module({
  imports: [SequelizeModule.forFeature([SeatType])],
  controllers: [SeatTypeController],
  providers: [SeatTypeService],
})
export class SeatTypeModule {}
