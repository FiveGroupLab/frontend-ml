import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IHypertensionRiskParams } from "../../../shared/interfaces/hypertension-risk-params.interface";
import { IPredictRisk } from "../../../shared/interfaces/predict-risk.interface";

@Injectable({
  providedIn: "root",
})
export class HypertensionRiskService {
  private apiUrl = "https://backendml-production.up.railway.app/predict";

  constructor(private http: HttpClient) {}

  predictRisk(
    params: IHypertensionRiskParams,
  ): Observable<{ ok: boolean; message?: string; data?: unknown }> {
    const body = {
      peso: Number(params.weight),
      estatura: Number(params.height),
      actividad_total: Number(params.totalActivity),
      tension_arterial: Number(params.bloodPressure),
      edad: Number(params.age),
    };
    return this.http.post<IPredictRisk>(this.apiUrl, body).pipe(
      map((response: IPredictRisk) => ({
        ok: true,
        message: "",
        data: response.riesgo_hipertension === "Sí",
      })),
    );
  }
}
