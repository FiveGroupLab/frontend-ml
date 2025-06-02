import { Routes } from "@angular/router";
import { EvaluationComponent } from "./evaluation/evaluation.component";
import { ProcessingComponent } from "./processing/processing.component";
import { ResultsComponent } from "./results/results.component";

export const routes: Routes = [
  {
    path: "",
    children: [
      { path: "", redirectTo: "evaluation", pathMatch: "full" },
      { path: "evaluation", component: EvaluationComponent },
      { path: "processing", component: ProcessingComponent },
      { path: "results", component: ResultsComponent },
    ],
  },
];
