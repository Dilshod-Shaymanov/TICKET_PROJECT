import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Cart } from "../../cart/models/cart.model";

interface ICartStatusCreationAttr {
  name: string;
}

@Table({ tableName: "cart_status", timestamps: false })
export class CartStatus extends Model<CartStatus, ICartStatusCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Cart status unikal id (autoIncrement) ",
  })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({
    example: "Completed",
    description: "Cart status nomi",
  })
  @Column({ type: DataType.STRING })
  name: string;

  @HasMany(() => Cart)
  cart: Cart[];
}
