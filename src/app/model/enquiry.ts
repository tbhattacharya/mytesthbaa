import { Location } from './location';
import { Article } from './article';
export interface GeneralEnquiries {
    Article: Article;
    Locations: Array<Location>;
}
