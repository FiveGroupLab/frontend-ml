import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzGridModule } from "ng-zorro-antd/grid";
import { TitleComponent } from "../../../shared/components/title/title.component";
import { IHypertensionRiskParams } from "../../../shared/interfaces/hypertension-risk-params.interface";

@Component({
  selector: "app-results",
  templateUrl: "./results.component.html",
  styleUrl: "./results.component.scss",
  standalone: true,
  imports: [TitleComponent, NzGridModule, NzButtonModule],
})
export class ResultsComponent implements OnInit {
  totalActivity = "";
  bloodPressure = "";
  weight = "";
  height = "";
  age = "";

  hasRisk = false;

  form: IHypertensionRiskParams | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.hasRisk = params["data"] === "true";
      this.form = params["form"] ? JSON.parse(params["form"]) : null;

      if (this.form) {
        this.totalActivity = this.form.totalActivity.toString();
        this.bloodPressure = this.form.bloodPressure.toString();
        this.weight = this.form.weight.toString();
        this.height = this.form.height.toString();
        this.age = this.form.age.toString();
      }
    });
  }

  goToEvaluation() {
    this.router.navigate(["/hypertension-risk/evaluation"]);
  }
}
