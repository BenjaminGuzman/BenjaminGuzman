import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Project} from "./project/Project";
import {Technology} from "./Technology";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioComponent implements OnInit {
  public projects: Project[] = [{
    name: "SpineWare",
    imgUrls: ["/assets/img/spineware/sw.png"],
    techStack: [Technology.JAVA],
    links: [{
      url: "https://gituhub.com/BenjaminGuzman/SpineWare",
      imgUrl: "/assets/img/tech/python.png",
      name: "GitHub"
    }],
    description: "Super description",
    tags: ["#desktop-app", "#computer-vision"]
  }, {
    name: "Microstart",
    imgUrls: ["/assets/img/spineware/sw.png"],
    techStack: [Technology.JAVA],
    links: [{
      url: "https://gituhub.com/BenjaminGuzman/SpineWare",
      imgUrl: "/assets/img/tech/python.png",
      name: "GitHub"
    }],
    description: "Super description",
    tags: ["#desktop-app", "#computer-vision"]
  }, {
    name: "GQLFedUtils",
    imgUrls: ["/assets/img/spineware/sw.png"],
    techStack: [Technology.JAVA],
    links: [{
      url: "https://gituhub.com/BenjaminGuzman/SpineWare",
      imgUrl: "/assets/img/tech/python.png",
      name: "GitHub"
    }],
    description: "Super description",
    tags: ["#desktop-app", "#computer-vision"]
  }, {
    name: "Row Reduction",
    imgUrls: ["/assets/img/spineware/sw.png"],
    techStack: [Technology.JAVA],
    links: [{
      url: "https://gituhub.com/BenjaminGuzman/SpineWare",
      imgUrl: "/assets/img/tech/python.png",
      name: "GitHub"
    }],
    description: "Super description",
    tags: ["#desktop-app", "#computer-vision"]
  }, {
    name: "Punnett Square",
    imgUrls: ["/assets/img/spineware/sw.png"],
    techStack: [Technology.JAVA],
    links: [{
      url: "https://gituhub.com/BenjaminGuzman/SpineWare",
      imgUrl: "/assets/img/tech/python.png",
      name: "GitHub"
    }],
    description: "Super description",
    tags: ["#desktop-app", "#computer-vision"]
  }];

  constructor() { }

  ngOnInit(): void {
  }

}
