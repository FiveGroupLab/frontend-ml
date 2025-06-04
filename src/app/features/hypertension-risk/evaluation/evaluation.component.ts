import { Component, inject } from "@angular/core";
import { TitleComponent } from "../../../shared/components/title/title.component";
import { NzAlertModule } from "ng-zorro-antd/alert";
import { NzFormModule } from "ng-zorro-antd/form";
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzButtonModule } from "ng-zorro-antd/button";
import { Router } from "@angular/router";

@Component({
  selector: "app-evaluation",
  imports: [
    TitleComponent,
    NzAlertModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzInputNumberModule,
    NzGridModule,
    NzButtonModule,
  ],
  templateUrl: "./evaluation.component.html",
  styleUrl: "./evaluation.component.scss",
})
export class EvaluationComponent {
  private fb = inject(NonNullableFormBuilder);
  private router = inject(Router);
  validateForm = this.fb.group({
    totalActivity: this.fb.control("", [Validators.required]),
    bodyMass: this.fb.control("", [Validators.required]),
    bloodPressure: this.fb.control("", [Validators.required]),
    averageWeight: this.fb.control("", [Validators.required]),
    averageHeight: this.fb.control("", [Validators.required]),
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log("submit", this.validateForm.value);
      this.router.navigate(["/hypertension-risk/processing"]);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
