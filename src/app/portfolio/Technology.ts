export class Technology {
  public static ANGULAR = new Technology("Angular", "/assets/img/tech/angular.png", "https://angular.io");
  public static NODEJS = new Technology("Node.js", "/assets/img/tech/node.png", "https://nodejs.org");
  public static JAVA = new Technology("Java 8+", "/assets/img/tech/java.png", "https://openjdk.java.net");

  private constructor(public name: string, public imgUrl: string, public url: string | null | undefined) {
  }
}
