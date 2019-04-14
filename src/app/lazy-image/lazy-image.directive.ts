import { Input, OnInit, ViewChild, ElementRef, Directive } from "@angular/core";

const intersectionObserverOptions = { threshold: [0, 1] };

@Directive({
  selector: "img[lazy-img]"
})
export class LazyImageDirective implements OnInit {
  private intObv = new IntersectionObserver(this.onChange.bind(this), intersectionObserverOptions);
  private show = false;

  @Input() src!: string;

  constructor(private elementRef: ElementRef<HTMLImageElement>) {}

  ngOnInit() {
    this.intObv.observe(this.elementRef.nativeElement);
  }

  onChange(entries: IntersectionObserverEntry[], _observer: IntersectionObserver) {
    if (!this.show) {
      this.show = entries[0].intersectionRatio > 0;

      if (this.show) {
        this.elementRef.nativeElement.src = this.src;
        this.intObv.disconnect();
      }
    }
  }
}
