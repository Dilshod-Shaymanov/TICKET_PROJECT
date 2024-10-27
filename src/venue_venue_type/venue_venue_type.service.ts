import { Injectable } from "@nestjs/common";
import { CreateVenueVenueTypeDto } from "./dto/create-venue_venue_type.dto";
import { UpdateVenueVenueTypeDto } from "./dto/update-venue_venue_type.dto";
import { InjectModel } from "@nestjs/sequelize";
import { VenueVenueType } from "./models/venue_venue_type.model";

@Injectable()
export class VenueVenueTypeService {
  constructor(
    @InjectModel(VenueVenueType)
    private venueVenueTypeModel: typeof VenueVenueType
  ) {}
  create(createVenueVenueTypeDto: CreateVenueVenueTypeDto) {
    return this.venueVenueTypeModel.create(createVenueVenueTypeDto);
  }

  findAll() {
    return this.venueVenueTypeModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.venueVenueTypeModel.findByPk(id, { include: { all: true } });
  }

  update(id: number, updateVenueVenueTypeDto: UpdateVenueVenueTypeDto) {
    return this.venueVenueTypeModel.update(updateVenueVenueTypeDto, {
      where: { id },
    });
  }

  remove(id: number) {
    return this.venueVenueTypeModel.destroy({ where: { id } });
  }
}
