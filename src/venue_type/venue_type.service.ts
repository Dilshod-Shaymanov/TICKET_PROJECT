import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { VenueType } from "./models/venue-type.model";
import { CreateVenueTypeDto } from "./dto/create-venue_type.dto";
import { UpdateVenueTypeDto } from "./dto/update-venue_type.dto";

@Injectable()
export class VenueTypeService {
  constructor(
    @InjectModel(VenueType) private venueTypeModel: typeof VenueType
  ) {}
  async createVenueType(
    createVenueTypeDto: CreateVenueTypeDto
  ): Promise<VenueType> {
    const venue_type = await this.venueTypeModel.create(createVenueTypeDto);
    return venue_type;
  }

  async getAllVenueType(): Promise<VenueType[]> {
    return this.venueTypeModel.findAll({ include: { all: true } });
  }
  async getVenueTypeById(id: number): Promise<VenueType> {
    return this.venueTypeModel.findByPk(id);
  }

  async deleteVenueTypeById(id: number): Promise<number> {
    return this.venueTypeModel.destroy({ where: { id } });
  }
  async updateVenueTypeById(
    id: number,
    updateVenueTypeDto: UpdateVenueTypeDto
  ): Promise<VenueType> {
    const venue_type = await this.venueTypeModel.update(updateVenueTypeDto, {
      where: { id },
      returning: true,
    });
    return venue_type[1][0];
  }
}
