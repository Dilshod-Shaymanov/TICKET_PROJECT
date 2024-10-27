import { PartialType } from '@nestjs/mapped-types';
import { CreateCartStatusDto } from './create-cart_status.dto';

export class UpdateCartStatusDto extends PartialType(CreateCartStatusDto) {}
