import { Migration } from '@mikro-orm/migrations';

export class Migration20240525043623_remove_field_vote_count_article extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `articles` drop `vote_count`;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `articles` add `vote_count` int null;');
  }

}
