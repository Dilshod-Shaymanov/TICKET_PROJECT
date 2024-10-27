import { Module } from '@nestjs/common';
import { VenueVenueTypeService } from './venue_venue_type.service';
import { VenueVenueTypeController } from './venue_venue_type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { VenueVenueType } from './models/venue_venue_type.model';

@Module({
  imports:[SequelizeModule.forFeature([VenueVenueType])],
  controllers: [VenueVenueTypeController],
  providers: [VenueVenueTypeService],
})
export class VenueVenueTypeModule {}
