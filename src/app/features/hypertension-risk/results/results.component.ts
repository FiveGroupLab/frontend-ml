import { Component } from "@angular/core";
import { TitleComponent } from "../../../shared/components/title/title.component";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzButtonModule } from "ng-zorro-antd/button";
import { Router } from "@angular/router";

@Component({
  selector: "app-results",
  templateUrl: "./results.component.html",
  styleUrl: "./results.component.scss",
  standalone: true,
  imports: [TitleComponent, NzGridModule, NzButtonModule],
})
export class ResultsComponent {
  bodyMass = "12313";
  totalActivity = "123";
  bloodPressure = "123";
  averageWeight = "11";
  averageHeight = "222";
  age = "332";

  hasRisk = false;
  riskPercent = 90;

  constructor(private router: Router) {}

  goToEvaluation() {
    this.router.navigate(["/hypertension-risk/evaluation"]);
  }
}
