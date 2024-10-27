import { Module } from "@nestjs/common";
import { HumanCategoryController } from "./human_category.controller";
import { HumanCategoryService } from "./human_category.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { HumanCategory } from "./models/human_category.model";

@Module({
  imports: [SequelizeModule.forFeature([HumanCategory])],
  controllers: [HumanCategoryController],
  providers: [HumanCategoryService],
})
export class HumanCategoryModule {}
