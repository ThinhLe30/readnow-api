import { BaseUUID } from './baseUUID.enity';
import { Category } from './category.entity';
export declare class Article extends BaseUUID {
    author: string;
    title: string;
    description: string;
    url?: string;
    imageURL: string;
    content: string;
    publishedAt: Date;
    category: Category;
}
