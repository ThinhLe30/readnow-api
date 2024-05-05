"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20240504150358_new_article_and_category = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20240504150358_new_article_and_category extends migrations_1.Migration {
    async up() {
        this.addSql('create table `categories` (`id` varchar(255) not null, `created_at` datetime not null, `updated_at` datetime not null, `deleted_at` datetime null, `name` varchar(255) not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;');
        this.addSql('create table `articles` (`id` varchar(255) not null, `created_at` datetime not null, `updated_at` datetime not null, `deleted_at` datetime null, `author` varchar(255) not null, `title` varchar(255) not null, `description` varchar(255) not null, `url` varchar(255) null, `image_url` varchar(255) not null, `content` longtext null, `published_at` datetime not null, `category_id` varchar(255) not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;');
        this.addSql('alter table `articles` add unique `articles_category_id_unique`(`category_id`);');
        this.addSql('create table `users` (`id` varchar(255) not null, `created_at` datetime not null, `updated_at` datetime not null, `deleted_at` datetime null, `auth_id` varchar(255) not null, `email` varchar(255) not null, `name` varchar(255) not null, `role` varchar(255) not null, `photo` varchar(255) null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;');
        this.addSql('alter table `users` add unique `users_auth_id_unique`(`auth_id`);');
        this.addSql('alter table `users` add unique `users_email_unique`(`email`);');
        this.addSql('alter table `articles` add constraint `articles_category_id_foreign` foreign key (`category_id`) references `categories` (`id`) on update cascade;');
    }
    async down() {
        this.addSql('alter table `articles` drop foreign key `articles_category_id_foreign`;');
        this.addSql('drop table if exists `categories`;');
        this.addSql('drop table if exists `articles`;');
        this.addSql('drop table if exists `users`;');
    }
}
exports.Migration20240504150358_new_article_and_category = Migration20240504150358_new_article_and_category;
//# sourceMappingURL=Migration20240504150358_new_article_and_category.js.map