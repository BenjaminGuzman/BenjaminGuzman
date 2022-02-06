import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-matrix-animation',
  templateUrl: './matrix-animation.component.html',
  styleUrls: ['./matrix-animation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatrixAnimationComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("canvas")
  public canvas: ElementRef<HTMLCanvasElement> = null as unknown as ElementRef;

  @Output()
  public onEnd: EventEmitter<void> = new EventEmitter<void>();

  public isShowing: boolean = true;

  private ctx: CanvasRenderingContext2D = null as unknown as CanvasRenderingContext2D;
  private width: number = 600; // initial width (will change later)
  private height: number = 1200; // initial height (will change later)

  private readonly charWidth: number = 20; // char width in pixels
  private readonly font: string = `${this.charWidth}px monospace`;

  /**
   * Array of y coordinates (top to bottom) at which a text should be drawn in the next iteration
   * {@link matrixAnimation}
   */
  private y: number[] = [];

  /**
   * Number of calls to {@link matrixAnimation}
   */
  private i: number = 0;

  // @ts-ignore
  private intervalId: NodeJS.Timeout;

  /**
   * Number of iterations to be made to complete the animation
   */
  private readonly nIterations: number = 60;

  /**
   * Refresh rate of the canvas (in millis)
   */
  private readonly refreshRate: number = 60;

  private msg: string = "Loading...";
  private msgLenPx: number = 0;

  constructor(private changeDetectorRef: ChangeDetectorRef, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(platformId) && navigator.hardwareConcurrency >= 4) { // probably the computer can handle a greater refresh rate
      this.refreshRate /= 2;
      this.nIterations *= 2;
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId))
      return;

    this.intervalId = setInterval(() => this.matrixAnimation(), this.refreshRate);

    // set width and height so the browser has a hint of how many pixels are in there and draw them with a good resolution
    this.width = this.canvas.nativeElement.width = this.canvas.nativeElement.offsetWidth;
    this.height = this.canvas.nativeElement.height = this.canvas.nativeElement.offsetHeight;

    this.ctx = this.canvas.nativeElement.getContext("2d") as CanvasRenderingContext2D;

    const nCols = Math.floor(this.width / this.charWidth);

    // start with characters in random positions
    this.y = Array.from({length: nCols}, () => Math.random() * 3 * this.charWidth + this.charWidth);

    // measure the message to be written
    this.ctx.font = this.font;
    this.msgLenPx = this.ctx.measureText(this.msg).width;
  }

  private matrixAnimation() {
    // dim the opacity of the canvas html element on each iteration
    this.canvas.nativeElement.setAttribute("style", `opacity: ${(this.nIterations - this.i) / this.nIterations}`);

    // Draw a semitransparent black rectangle on top of previous drawing
    // this will be drawn on top of the previous character, which will give the sense of the previous character being dimmed out
    this.ctx.fillStyle = "#00000011";
    this.ctx.fillRect(0, 0, this.width, this.height);

    // color and font for text
    this.ctx.fillStyle = "#00ff00";
    this.ctx.font = this.font;

    // for each column put a random character at the end
    this.y.forEach((y, i) => {
      const rand = Math.random();
      const char = String.fromCharCode(rand * 255);

      const x = i * this.charWidth;

      this.ctx.fillText(char, x, y);

      if (y > 100 + rand * 10000) // randomly reset the end of the column if it's at least 100px high
        this.y[i] = 0;
      else // otherwise, just move the y coordinate for the column charWidth px down
        this.y[i] = y + this.charWidth;
    });

    // add a small animation with the dots ...
    if (this.i % 5 == 0) { // modulo 5 to execute the code not on every call, 'cause that doesn't look good
      if (this.msg.endsWith("..."))
        this.msg = this.msg.slice(0, this.msg.length - 3);
      else
        this.msg += '.';
    }

    // draw the rectangle containing the message
    this.ctx.fillStyle = "#000000";
    this.ctx.strokeStyle = "#ffffff";
    this.ctx.beginPath();
    this.ctx.rect(
      this.width / 2 - this.msgLenPx / 2 - 20,
      this.height / 2 - this.charWidth / 2 - 10,
      20 + this.msgLenPx + 20,
      10 + this.charWidth + 10
    );
    this.ctx.fill();
    this.ctx.stroke();

    // draw the message inside the rectangle
    this.ctx.fillStyle = "#00ff00";
    this.ctx.font = this.font;
    this.ctx.fillText(
      this.msg,
      this.width / 2 - this.msgLenPx / 2,
      this.height / 2 + this.charWidth / 2 - 4 // -4 is just a hard-coded value
    );

    ++this.i;

    if (this.i >= this.nIterations) {
      clearInterval(this.intervalId);
      this.isShowing = false;
      this.changeDetectorRef.markForCheck();
      this.onEnd.emit();
    }
  }

}
