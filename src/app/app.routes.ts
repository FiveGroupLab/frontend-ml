import { Routes } from "@angular/router";
import { MainLayoutComponent } from "./layout/main-layout/main-layout.component";

const loadHtnRisk = () =>
  import("./features/hypertension-risk/hypertension-risk.routes").then((r) => r.routes);

export const routes: Routes = [
  {
    path: "",
    redirectTo: "/hypertension-risk/evaluation",
    pathMatch: "full",
  },
  {
    path: "",
    component: MainLayoutComponent,
    children: [
      {
        path: "hypertension-risk",
        loadChildren: loadHtnRisk,
      },
    ],
  },
];
