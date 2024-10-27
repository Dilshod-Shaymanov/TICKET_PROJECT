import { Injectable } from "@nestjs/common";
import { CreateEventTypeDto } from "./dto/create-event_type.dto";
import { UpdateEventTypeDto } from "./dto/update-event_type.dto";
import { InjectModel } from "@nestjs/sequelize";
import { EventType } from "./models/event_type.model";

@Injectable()
export class EventTypeService {
  constructor(
    @InjectModel(EventType) private eventTypeModel: typeof EventType
  ) {}
  create(createEventTypeDto: CreateEventTypeDto) {
    return this.eventTypeModel.create(createEventTypeDto);
  }

  findAll() {
    return this.eventTypeModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.eventTypeModel.findByPk(id, { include: { all: true } });
  }

  async update(
    id: number,
    updateEventTypeDto: UpdateEventTypeDto
  ): Promise<EventType> {
    const event_type = await this.eventTypeModel.update(updateEventTypeDto, {
      where: { id },
      returning: true,
    });
    return event_type[1][0];
  }

  remove(id: number) {
    return this.eventTypeModel.destroy({ where: { id } });
  }
}
