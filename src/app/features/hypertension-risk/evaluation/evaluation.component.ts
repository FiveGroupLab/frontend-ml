import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NzAlertModule } from "ng-zorro-antd/alert";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import { NzToolTipModule } from "ng-zorro-antd/tooltip";
import { Subject } from "rxjs";
import { switchMap, takeUntil } from "rxjs/operators";
import { TitleComponent } from "../../../shared/components/title/title.component";
import { IApiResponse } from "../../../shared/interfaces/api-response.interface";
import { IHypertensionRiskParams } from "../../../shared/interfaces/hypertension-risk-params.interface";
import { ProcessingComponent } from "../processing/processing.component";
import { HypertensionRiskService } from "../services/hypertension-risk.service";

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
    ProcessingComponent,
    NzIconModule,
    NzToolTipModule,
  ],
  templateUrl: "./evaluation.component.html",
  styleUrl: "./evaluation.component.scss",
})
export class EvaluationComponent implements OnDestroy, OnInit {
  private fb = inject(NonNullableFormBuilder);
  private router = inject(Router);
  private hypertensionRiskService = inject(HypertensionRiskService);

  private apiTrigger$ = new Subject<IHypertensionRiskParams>();

  private destroy$ = new Subject<void>();

  public validateForm = this.fb.group({
    totalActivity: this.fb.control("", [Validators.required]),
    bloodPressure: this.fb.control("", [Validators.required]),
    weight: this.fb.control("", [Validators.required]),
    height: this.fb.control("", [Validators.required]),
    age: this.fb.control("", [Validators.required]),
  });

  public loading = false;

  constructor() {
    this.subscribeToApi();
  }

  ngOnInit(): void {
    localStorage.removeItem("hypertensionRiskData");
    localStorage.removeItem("hypertensionRiskForm");
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private subscribeToApi(): void {
    this.apiTrigger$
      .pipe(
        switchMap((params: IHypertensionRiskParams) =>
          this.hypertensionRiskService.predictRisk(params),
        ),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (response: IApiResponse) => this.handleApiResponse(response),
        error: () => this.handleApiError(),
      });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const params = this.validateForm.value as IHypertensionRiskParams;
      this.loading = true;
      this.apiTrigger$.next(params);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  private handleApiResponse(response: IApiResponse): void {
    this.loading = false;
    console.log("Respuesta de la API:", response);
    localStorage.setItem("hypertensionRiskData", JSON.stringify(response.data));
    localStorage.setItem("hypertensionRiskForm", JSON.stringify(this.validateForm.value));
    if (response.ok) {
      this.router.navigate(["/hypertension-risk/results"]);
    }
  }

  private handleApiError(): void {
    this.loading = false;
    console.error("Error en la petición:");
  }
}
