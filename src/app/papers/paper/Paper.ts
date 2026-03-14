import {Link} from "../../Link";

export interface Paper {
  /**
   * Title of the paper
   */
  title: string;

  /**
   * Images to show in the slide
   */
  imgUrls: string[];

  /**
   * Journal or conference name
   */
  journal: string;

  /**
   * Paper date
   */
  date: string;

  /**
   * Brief description or abstract
   */
  description: string;

  /**
   * Links associated with the paper
   */
  links: Link[];
}
