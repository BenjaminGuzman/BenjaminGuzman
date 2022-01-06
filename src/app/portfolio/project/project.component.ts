import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent implements OnInit {
  /**
   * Images to show in the slide
   */
  @Input()
  public imagesUrls: string[] = ["/assets/yo3.jpg", "/assets/bg.jpg"];

  /**
   * Project name
   */
  @Input()
  public name: string = "Name";

  public techStack: Technology[] = [Technology.ANGULAR, Technology.NODEJS];
  public links: Link[] = [{
    url: "https://github.com/BenjaminGuzman/SpineWare",
    name: "GitHub",
    imgUrl: "/assets/img/tech/angular.jpg"
  }, {
    url: "https://medium.com/sdhfiosdhfdoi",
    name: "Medium",
  }, {
    url: "https://medium.com/sdhfiosdhfdoi",
    name: "Medium",
    icon: "picture_as_pdf"
  }];

  constructor() { }

  ngOnInit(): void {
  }
}

interface Link {
  url: string
  name: string;
  imgUrl?: string;
  icon?: string;
}

class Technology {
  public static ANGULAR = new Technology("Angular", "/assets/img/tech/angular.jpg", "https://angular.io");
  public static NODEJS = new Technology("Node.js", "/assets/img/tech/node.jpg", "https://nodejs.org");
  private constructor(public name: string, public imgUrl: string, public url: string | null | undefined) {
  }
}
