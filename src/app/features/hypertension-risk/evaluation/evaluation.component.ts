import { Component } from "@angular/core";
import { TitleComponent } from "../../../shared/components/title/title.component";
import { NzAlertModule } from "ng-zorro-antd/alert";
@Component({
  selector: "app-evaluation",
  imports: [TitleComponent, NzAlertModule],
  templateUrl: "./evaluation.component.html",
  styleUrl: "./evaluation.component.scss",
})
export class EvaluationComponent {}
