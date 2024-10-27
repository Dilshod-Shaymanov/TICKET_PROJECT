import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { EventTypeService } from "./event_type.service";
import { CreateEventTypeDto } from "./dto/create-event_type.dto";
import { UpdateEventTypeDto } from "./dto/update-event_type.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { EventType } from "./models/event_type.model";

@ApiTags("Hodisa turi")
@Controller("event-type")
export class EventTypeController {
  constructor(private readonly eventTypeService: EventTypeService) {}

  @ApiOperation({ summary: "Yangi tadbir turini yaratish" })
  @ApiResponse({
    status: 201,
    description: "Tadbir turi muvaffaqiyatli yaratildi.",
    type: EventType,
  })
  @Post()
  create(@Body() createEventTypeDto: CreateEventTypeDto) {
    return this.eventTypeService.create(createEventTypeDto);
  }

  @ApiOperation({ summary: "Barcha tadbir turlarini olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha tadbir turlari muvaffaqiyatli olindi.",
    type: [EventType],
  })
  @Get()
  findAll() {
    return this.eventTypeService.findAll();
  }

  @ApiOperation({ summary: "Bitta tadbir turini olish" })
  @ApiResponse({
    status: 200,
    description: "Tadbir turi muvaffaqiyatli topildi.",
    type: EventType,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.eventTypeService.findOne(+id);
  }

  @ApiOperation({ summary: "Bitta tadbir turini o'zgaritirish" })
  @ApiResponse({
    status: 200,
    description: "Tadbir turi muvaffaqiyatli o'zgartirildi.",
    type: EventType,
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateEventTypeDto: UpdateEventTypeDto
  ) {
    return this.eventTypeService.update(+id, updateEventTypeDto);
  }
  @ApiOperation({ summary: "Bitta tadbir turini o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Tadbir turi muvaffaqiyatli o'chirildi.",
    type: EventType,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.eventTypeService.remove(+id);
  }
}
