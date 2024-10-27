import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Venue } from "./models/venue.model";
import { CreateVenueDto } from "./dto/create-venue.dto";
import { UpdateVenueDto } from "./dto/update-venue.dto";

@Injectable()
export class VenueService {
  constructor(@InjectModel(Venue) private venueModel: typeof Venue) {}

  async createVenue(createVenueDto: CreateVenueDto): Promise<Venue> {
    return this.venueModel.create(createVenueDto);
  }

  async getAllVenues(): Promise<Venue[]> {
    return this.venueModel.findAll({include:{all:true}});
  }
  async getVenueById(id: number): Promise<Venue> {
    return this.venueModel.findByPk(id);
  }
  async deleteVenueById(id: number): Promise<number> {
    return this.venueModel.destroy({ where: { id } });
  }
  async updateVenueById(
    id: number,
    updateVenueDto: UpdateVenueDto
  ): Promise<Venue> {
    const venue = await this.venueModel.update(updateVenueDto, {
      where: { id },
      returning: true,
    });
    return venue[1][0];
  }
}
