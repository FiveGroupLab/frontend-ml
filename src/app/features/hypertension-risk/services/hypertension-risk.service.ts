import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "../../../shared/interfaces/api-response.interface";
import { HypertensionRiskParams } from "../../../shared/interfaces/hypertension-risk-params.interface";

@Injectable({
  providedIn: "root",
})
export class HypertensionRiskService {
  private apiUrl = "https://backend-ml-misz.onrender.com/predict";

  constructor(private http: HttpClient) {}

  predictRisk(params: HypertensionRiskParams): Observable<ApiResponse> {
    const body = {
      peso: Number(params.weight),
      estatura: Number(params.height),
      actividad_total: Number(params.totalActivity),
      tension_arterial: Number(params.bloodPressure),
      edad: Number(params.age),
    };
    return this.http.post<ApiResponse>(this.apiUrl, body);
  }
}
