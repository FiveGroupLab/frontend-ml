import { Component } from "@angular/core";
import { TitleComponent } from "../../../shared/components/title/title.component";
import { AnimationOptions, LottieComponent } from "ngx-lottie";
import { Router } from "@angular/router";

@Component({
  selector: "app-processing",
  imports: [TitleComponent, LottieComponent],
  templateUrl: "./processing.component.html",
  styleUrl: "./processing.component.scss",
})
export class ProcessingComponent {
  options: AnimationOptions = {
    path: "/assets/lottie/medical.json",
  };

  constructor(private router: Router) {
    setTimeout(() => {
      this.router.navigate(["/hypertension-risk/results"]);
    }, 5000);
  }
}
