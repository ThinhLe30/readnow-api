import { Migration } from '@mikro-orm/migrations';

export class Migration20240504150632_edit_field_article extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `articles` modify `description` text not null, modify `url` text, modify `image_url` text not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `articles` modify `description` varchar(255) not null, modify `url` varchar(255), modify `image_url` varchar(255) not null;');
  }

}
