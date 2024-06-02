import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { CheckList } from "src/entities/checklist.entity";
import { SearchResultDTO } from "../search/dto/search.dto";
import { plainToInstance } from "class-transformer";
import { CategoryDTO } from "../category/dtos/category.dto";

@Injectable()
export class ChecklistService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(CheckList)
    private readonly checklistRepository: EntityRepository<CheckList>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}
  async getMycheckList(loginID: string) {
    try {
      const checkLists = await this.checklistRepository.find(
        {
          user: { id: loginID },
        },
        {
          populate: ["article", "article.category"],
        }
      );
      const articles = checkLists.map((el) => {
        const dto = plainToInstance(SearchResultDTO, el.article);
        dto.category = plainToInstance(CategoryDTO, el.article.category);
        dto.isChecked = true;
        return dto;
      });
      return articles;
    } catch (error) {
      this.logger.error(
        "Calling getMycheckList()",
        error,
        ChecklistService.name
      );
      throw error;
    }
  }
}
