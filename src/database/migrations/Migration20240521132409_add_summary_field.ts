import { Migration } from '@mikro-orm/migrations';

export class Migration20240521132409_add_summary_field extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `articles` add `summary` varchar(255) null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `articles` drop `summary`;');
  }

}
