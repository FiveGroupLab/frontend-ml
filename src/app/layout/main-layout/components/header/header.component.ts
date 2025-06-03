import { Component } from "@angular/core";
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: "app-header",
  imports: [RouterModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  routes = [{ name: "Evaluación", url: "hypertension-risk/evaluation", active: false }];

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.updateActiveRoute();
    });
    this.updateActiveRoute();
  }

  private updateActiveRoute() {
    const currentUrl = this.router.url.replace(/^\//, "");
    this.routes.forEach((route) => {
      route.active = currentUrl.startsWith(route.url);
    });
  }
}
