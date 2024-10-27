import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketStatusDto } from './create-ticket_status.dto';

export class UpdateTicketStatusDto extends PartialType(CreateTicketStatusDto) {}
