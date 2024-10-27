// import { PartialType } from "@nestjs/mapped-types";
// import { CreateVenuePhotoDto } from "./create-venue_photo.dto";

// export class UpdateVenuePhotoDto extends PartialType(CreateVenuePhotoDto) {}
export class UpdateVenuePhotoDto {
  url?: string;
  venueId?: number;
}
