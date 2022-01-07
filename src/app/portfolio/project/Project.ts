import {Technology} from "../Technology";
import {Link} from "../../Link";

export interface Project {
  /**
   * Images to show in the slide
   */
  imgUrls: string[];

  /**
   * Project name
   */
  name: string;

  /**
   * Technology stack used for to develop the project
   */
  techStack: Technology[];

  links: Link[];

  description: string;

  tags: string[];
}
