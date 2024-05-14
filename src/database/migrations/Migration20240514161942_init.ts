import { Migration } from '@mikro-orm/migrations';

export class Migration20240514161942_init extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `categories` (`id` varchar(255) not null, `created_at` datetime not null, `updated_at` datetime not null, `deleted_at` datetime null, `name` varchar(255) not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `articles` (`id` varchar(255) not null, `created_at` datetime not null, `updated_at` datetime not null, `deleted_at` datetime null, `author` varchar(255) not null, `title` varchar(255) not null, `description` text not null, `url` text null, `image_url` text not null, `content` longtext null, `published_at` datetime not null, `view_count` int null, `vote_count` int null, `category_id` varchar(255) null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `articles` add fulltext index `articles_author_index`(`author`);');
    this.addSql('alter table `articles` add fulltext index `articles_title_index`(`title`);');
    this.addSql('alter table `articles` add fulltext index `articles_description_index`(`description`);');
    this.addSql('alter table `articles` add fulltext index `articles_content_index`(`content`);');

    this.addSql('create table `users` (`id` varchar(255) not null, `created_at` datetime not null, `updated_at` datetime not null, `deleted_at` datetime null, `auth_id` varchar(255) null, `email` varchar(255) not null, `name` varchar(255) not null, `password` varchar(255) null, `role` varchar(255) not null, `photo` varchar(255) null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `users` add unique `users_auth_id_unique`(`auth_id`);');
    this.addSql('alter table `users` add unique `users_email_unique`(`email`);');

    this.addSql('create table `checklist` (`id` varchar(255) not null, `created_at` datetime not null, `updated_at` datetime not null, `deleted_at` datetime null, `article_id` varchar(255) not null, `user_id` varchar(255) not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `checklist` add index `checklist_article_id_index`(`article_id`);');
    this.addSql('alter table `checklist` add index `checklist_user_id_index`(`user_id`);');

    this.addSql('alter table `articles` add constraint `articles_category_id_foreign` foreign key (`category_id`) references `categories` (`id`) on update cascade on delete set null;');

    this.addSql('alter table `checklist` add constraint `checklist_article_id_foreign` foreign key (`article_id`) references `articles` (`id`) on update cascade;');
    this.addSql('alter table `checklist` add constraint `checklist_user_id_foreign` foreign key (`user_id`) references `users` (`id`) on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `articles` drop foreign key `articles_category_id_foreign`;');

    this.addSql('alter table `checklist` drop foreign key `checklist_article_id_foreign`;');

    this.addSql('alter table `checklist` drop foreign key `checklist_user_id_foreign`;');

    this.addSql('drop table if exists `categories`;');

    this.addSql('drop table if exists `articles`;');

    this.addSql('drop table if exists `users`;');

    this.addSql('drop table if exists `checklist`;');
  }

}
