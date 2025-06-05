import { Component } from "@angular/core";
import { AnimationOptions, LottieComponent } from "ngx-lottie";
import { TitleComponent } from "../../../shared/components/title/title.component";

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
}
