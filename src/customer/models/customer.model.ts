import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Cart } from "../../cart/models/cart.model";
import { CustomerAddress } from "../../customer_address/models/customer_address.model";
import { CustomerCard } from "../../customer_card/models/customer_card.model";
import { Language } from "../../language/models/language.model";

interface ICustomerCreationAttr {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birth_date: Date;
  gender: string;
  hashed_refresh_token?: string;
  hashed_password: string;
  languageId: number;
}

@Table({ tableName: "customer", timestamps: false })
export class Customer extends Model<Customer, ICustomerCreationAttr> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  first_name: string;

  @Column({ type: DataType.STRING })
  last_name: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.STRING })
  phone: string;
  @Column({ type: DataType.DATEONLY })
  birth_date: Date;

  @Column({ type: DataType.ENUM("erkak", "ayol") })
  gender: string;

  @Column({ type: DataType.STRING })
  hashed_password: string;

  @Column({ type: DataType.STRING })
  hashed_refresh_token: string;

  @ForeignKey(() => Language)
  @Column({ type: DataType.INTEGER })
  languageId: number;

  @BelongsTo(() => Language)
  language: Language;

  @HasMany(() => Cart)
  cart: Cart[];

  @HasMany(() => CustomerAddress)
  customerAddress: CustomerAddress[];

  @HasMany(() => CustomerCard)
  customerCard: CustomerCard[];
}
