import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { CenterComponent } from "../../shared/components/center/center.component";
import { HeaderComponent } from "./components/header/header.component";

@Component({
  selector: "app-main-layout",
  imports: [RouterOutlet, CenterComponent, HeaderComponent],
  templateUrl: "./main-layout.component.html",
  styleUrl: "./main-layout.component.scss",
})
export class MainLayoutComponent {}
