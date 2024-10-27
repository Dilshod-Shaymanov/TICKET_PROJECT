import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { HumanCategory } from "./models/human_category.model";
import { CreateHumanCategoryDto } from "./dto/create-human_category.dto";
import { UpdateHumanCategoryDto } from "./dto/update-human_category.dto";

@Injectable()
export class HumanCategoryService {
  constructor(
    @InjectModel(HumanCategory) private humanCategoryModel: typeof HumanCategory
  ) {}

  async createHumanCategory(createHumanCategoryDto: CreateHumanCategoryDto): Promise<HumanCategory> {
    const human_category = await this.humanCategoryModel.create(
      createHumanCategoryDto
    );
    return human_category;
  }

  async getHumanCategoryies() {
    return this.humanCategoryModel.findAll();
  }
  async getHumanCategoryById(id: number): Promise<HumanCategory> {
    const human_category = await this.humanCategoryModel.findByPk(id);
    if (!human_category) {
      throw new NotFoundException();
    }
    return human_category;
  }

  async getHumanCategoryByName(name: string): Promise<HumanCategory> {
    return this.humanCategoryModel.findOne({ where: { name } });
  }

  async deleteHumanCategoryById(id: number): Promise<number> {
    return this.humanCategoryModel.destroy({ where: { id } });
  }

  async updateHumanCategoryById(
    id: number,
    updateHumanCategoryDto: UpdateHumanCategoryDto
  ): Promise<HumanCategory> {
    const human_category = await this.humanCategoryModel.update(
      updateHumanCategoryDto,
      { where: { id }, returning: true }
    );
    // console.log(human_category);
    return human_category[1][0];
  }
}
