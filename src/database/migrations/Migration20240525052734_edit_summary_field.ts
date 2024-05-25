import { Migration } from '@mikro-orm/migrations';

export class Migration20240525052734_edit_summary_field extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `articles` modify `summary` text not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `articles` modify `summary` varchar(255) null;');
  }

}
