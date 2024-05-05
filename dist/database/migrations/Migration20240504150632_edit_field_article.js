"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20240504150632_edit_field_article = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20240504150632_edit_field_article extends migrations_1.Migration {
    async up() {
        this.addSql('alter table `articles` modify `description` text not null, modify `url` text, modify `image_url` text not null;');
    }
    async down() {
        this.addSql('alter table `articles` modify `description` varchar(255) not null, modify `url` varchar(255), modify `image_url` varchar(255) not null;');
    }
}
exports.Migration20240504150632_edit_field_article = Migration20240504150632_edit_field_article;
//# sourceMappingURL=Migration20240504150632_edit_field_article.js.map