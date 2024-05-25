import { Migration } from "@mikro-orm/migrations";

export class Migration20240525053241_create_table_vote extends Migration {
  async up(): Promise<void> {
    this.addSql(
      "create table `votes` (`id` varchar(255) not null, `created_at` datetime not null, `updated_at` datetime not null, `deleted_at` datetime null, `article_id` varchar(255) not null, `user_id` varchar(255) not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;"
    );
    this.addSql(
      "alter table `votes` add index `votes_article_id_index`(`article_id`);"
    );
    this.addSql(
      "alter table `votes` add index `votes_user_id_index`(`user_id`);"
    );

    this.addSql(
      "alter table `votes` add constraint `votes_article_id_foreign` foreign key (`article_id`) references `articles` (`id`) on update cascade;"
    );
    this.addSql(
      "alter table `votes` add constraint `votes_user_id_foreign` foreign key (`user_id`) references `users` (`id`) on update cascade;"
    );
  }

  async down(): Promise<void> {
    this.addSql("drop table if exists `votes`;");
  }
}
