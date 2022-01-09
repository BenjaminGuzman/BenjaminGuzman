export enum IconType {
  class = "class",
  img = "img"
}

export interface Technology {
  // id: string;
  name: string;
  acronym?: string;
  url?: string;
  icon: string;
  iconType: IconType;
}

/*
{
    name: "SpineWare",
    imgUrls: ["/assets/img/spineware/sw.png"],
    techStack: [TechnologyC.JAVA],
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
    techStack: [TechnologyC.JAVA],
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
    techStack: [TechnologyC.JAVA],
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
    techStack: [TechnologyC.JAVA],
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
    techStack: [TechnologyC.JAVA],
    links: [{
      url: "https://gituhub.com/BenjaminGuzman/SpineWare",
      imgUrl: "/assets/img/tech/python.png",
      name: "GitHub"
    }],
    description: "Super description",
    tags: ["#desktop-app", "#computer-vision"]
  }
 */
