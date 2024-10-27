import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { HumanCategoryModule } from "./human_category/human_category.module";
import { HumanCategory } from "./human_category/models/human_category.model";
import { LoggerMiddleware } from "./middleware/logger.middleware";
import { HumanCategoryController } from "./human_category/human_category.controller";
import { VenueTypeModule } from "./venue_type/venue_type.module";
import { VenueType } from "./venue_type/models/venue-type.model";
import { SeatTypeModule } from "./seat_type/seat_type.module";
import { SeatType } from "./seat_type/models/seat-type.model";
import { VenueModule } from "./venue/venue.module";
import { Venue } from "./venue/models/venue.model";
import { VenuePhotoModule } from "./venue_photo/venue_photo.module";
import { VenuePhoto } from "./venue_photo/models/veneu_photo.model";
import { RegionModule } from "./region/region.module";
import { Region } from "./region/models/region.model";
import { DistrictModule } from "./district/district.module";
import { District } from "./district/models/district.model";
import { SeatModule } from "./seat/seat.module";
import { Seat } from "./seat/models/seat.model";
import { EventTypeModule } from "./event_type/event_type.module";
import { EventModule } from "./event/event.module";
import { EventType } from "./event_type/models/event_type.model";
import { LanguageModule } from "./language/language.module";
import { Event } from "./event/models/event.model";
import { Language } from "./language/models/language.model";
import { TicketModule } from "./ticket/ticket.module";
import { TicketStatusModule } from "./ticket_status/ticket_status.module";
import { TicketStatus } from "./ticket_status/models/ticket_status.entity";
import { Ticket } from "./ticket/models/ticket.model";
import { CartStatusModule } from "./cart_status/cart_status.module";
import { BookingStatusModule } from "./booking_status/booking_status.module";
import { BookingStatus } from "./booking_status/models/booking_status.model";
import { CartStatus } from "./cart_status/models/cart_status.model";
import { CartModule } from "./cart/cart.module";
import { CustomerModule } from "./customer/customer.module";
import { Cart } from "./cart/models/cart.model";
import { Customer } from "./customer/models/customer.model";
import { BookingModule } from "./booking/booking.module";
import { Booking } from "./booking/models/booking.model";
import { CustomerAddressModule } from "./customer_address/customer_address.module";
import { CustomerAddress } from "./customer_address/models/customer_address.model";
import { CustomerCardModule } from "./customer_card/customer_card.module";
import { CustomerCard } from "./customer_card/models/customer_card.model";
import { VenueVenueTypeModule } from "./venue_venue_type/venue_venue_type.module";
import { VenueVenueType } from "./venue_venue_type/models/venue_venue_type.model";
import { RolesModule } from "./roles/roles.module";
import { Roles } from "./roles/models/roles.model";
import { UsersModule } from "./users/users.module";
import { Users } from "./users/models/user.model";
import { UserRoles } from "./users/models/user-role.model";
import { AuthModule } from "./auth/auth.module";
import { AdminModule } from "./admin/admin.module";
import { Admin } from "./admin/models/admin.model";
import { FileModule } from "./file/file.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "static"),
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        HumanCategory,
        VenueType,
        SeatType,
        Venue,
        VenuePhoto,
        Region,
        District,
        Seat,
        EventType,
        Event,
        Language,
        TicketStatus,
        Ticket,
        BookingStatus,
        CartStatus,
        Cart,
        Customer,
        Booking,
        CustomerAddress,
        CustomerCard,
        VenueVenueType,
        Roles,
        Users,
        UserRoles,
        Admin,
      ],
      autoLoadModels: true,
      synchronize: true,
      sync: { alter: true },
      logging: false,
    }),
    HumanCategoryModule,
    VenueTypeModule,
    SeatTypeModule,
    VenueModule,
    VenuePhotoModule,
    RegionModule,
    DistrictModule,
    SeatModule,
    EventTypeModule,
    EventModule,
    LanguageModule,
    TicketModule,
    TicketStatusModule,
    CartStatusModule,
    BookingStatusModule,
    CartModule,
    CustomerModule,
    BookingModule,
    CustomerAddressModule,
    CustomerCardModule,
    VenueVenueTypeModule,
    RolesModule,
    UsersModule,
    AuthModule,
    AdminModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(HumanCategoryController);
  }
}
