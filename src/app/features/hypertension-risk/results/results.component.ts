import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzCollapseModule } from "ng-zorro-antd/collapse";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzTagModule } from "ng-zorro-antd/tag";
import { TitleComponent } from "../../../shared/components/title/title.component";
import { IHypertensionRiskParams } from "../../../shared/interfaces/hypertension-risk-params.interface";
import { IItemPredictRisk } from "../../../shared/interfaces/predict-risk.interface";

@Component({
  selector: "app-results",
  templateUrl: "./results.component.html",
  styleUrl: "./results.component.scss",
  standalone: true,
  imports: [
    TitleComponent,
    NzGridModule,
    NzButtonModule,
    NzCollapseModule,
    NzTagModule,
    NzSelectModule,
    FormsModule,
  ],
})
export class ResultsComponent implements OnInit {
  totalActivity = "";
  bloodPressure = "";
  weight = "";
  height = "";
  age = "";

  hasRisk = false;

  form: IHypertensionRiskParams | null = null;
  riskData: IItemPredictRisk | null = null;
  selectModel = "XGB";
  listRiskData: IItemPredictRisk[] = [];
  confusionMatrix = "";

  constructor(private router: Router) {}

  ngOnInit(): void {
    const storedData = localStorage.getItem("hypertensionRiskData");
    const storedForm = localStorage.getItem("hypertensionRiskForm");

    if (storedData) {
      const data = JSON.parse(storedData);
      this.listRiskData = data.riesgo_hipertension || [];
      this.riskData =
        this.listRiskData.find((item: IItemPredictRisk) => item.modelo === this.selectModel) ||
        null;
      this.hasRisk = this.riskData?.prediccion === "Sí";
      this.confusionMatrix = this.getConfusionMatrixImage(this.selectModel);
    }
    if (storedForm) {
      this.form = JSON.parse(storedForm);
      if (this.form) {
        this.totalActivity = this.form.totalActivity.toString();
        this.bloodPressure = this.form.bloodPressure.toString();
        this.weight = this.form.weight.toString();
        this.height = this.form.height.toString();
        this.age = this.form.age.toString();
      }
    }
  }

  goToEvaluation() {
    this.router.navigate(["/hypertension-risk/evaluation"]);
  }

  changeModel($event: string) {
    this.selectModel = $event;
    if (this.riskData) {
      this.riskData =
        this.listRiskData.find((item: IItemPredictRisk) => item.modelo === this.selectModel) ||
        null;
      this.hasRisk = this.riskData?.prediccion === "Sí";
      this.confusionMatrix = this.getConfusionMatrixImage(this.selectModel);
    }
  }

  getConfusionMatrixImage(model: string): string {
    switch (model) {
      case "XGB":
        return "./assets/imgs/MC-XGBoost.png";
      case "RF":
        return "./assets/imgs/MC-RandomForest.png";
      case "LOG":
        return "./assets/imgs/MC-LogisticalRegresion.png";
      default:
        return "./assets/imgs/MC-XGBoost.png";
    }
  }
}
