import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { CheckList } from "src/entities/checklist.entity";
import { SearchResultDTO } from "../search/dto/search.dto";
import { plainToInstance } from "class-transformer";
import { CategoryDTO } from "../category/dtos/category.dto";
import { Vote } from "src/entities/vote.entity";

@Injectable()
export class ChecklistService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(CheckList)
    private readonly checklistRepository: EntityRepository<CheckList>,
    @InjectRepository(Vote)
    private readonly voteRepository: EntityRepository<Vote>,
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

      let articleVotes = [];
      if (loginID) {
        const voteRes = await this.voteRepository.find({
          user: { id: loginID },
        });
        articleVotes = voteRes.map((el) => el.article.id);
      }

      const articles = await Promise.all(
        checkLists.map(async (el) => {
          const dto = plainToInstance(SearchResultDTO, el.article);
          dto.category = plainToInstance(CategoryDTO, el.article.category);
          dto.isChecked = true;
          dto.isVoted = articleVotes.includes(el.article.id);
          dto.voteCount = await this.voteRepository.count({
            article: { id: dto.id },
          });
          return dto;
        })
      );

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
