import { Injectable } from "@nestjs/common";
import { CreateVenuePhotoDto } from "./dto/create-venue_photo.dto";
import { UpdateVenuePhotoDto } from "./dto/update-venue_photo.dto";
import { InjectModel } from "@nestjs/sequelize";
import { VenuePhoto } from "./models/veneu_photo.model";
import { FileService } from "../file/file.service";

@Injectable()
export class VenuePhotoService {
  constructor(
    @InjectModel(VenuePhoto) private venuePhotoModel: typeof VenuePhoto,
    private readonly fileService: FileService
  ) {}

  async create(
    createVenuePhotoDto: CreateVenuePhotoDto,
    image: any
  ): Promise<VenuePhoto> {
    const fileName = await this.fileService.saveFile(image);

    return this.venuePhotoModel.create({
      ...createVenuePhotoDto,
      url: fileName,
    });
  }

  async findAll(): Promise<VenuePhoto[]> {
    return this.venuePhotoModel.findAll({ include: { all: true } });
  }

  async findById(id: number): Promise<VenuePhoto> {
    return this.venuePhotoModel.findByPk(id, { include: { all: true } });
  }

  async update(
    id: number,
    updateVenuePhotoDto: UpdateVenuePhotoDto
  ): Promise<VenuePhoto> {
    const veneu_photo = await this.venuePhotoModel.update(updateVenuePhotoDto, {
      where: { id },
      returning: true,
    });

    return veneu_photo[1][0];
  }

  async remove(id: number): Promise<number> {
    return this.venuePhotoModel.destroy({ where: { id } });
  }
}
