import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";
import { ApiResponse } from "../../../shared/interfaces/api-response.interface";
import { HypertensionRiskParams } from "../../../shared/interfaces/hypertension-risk-params.interface";

@Injectable({
  providedIn: "root",
})
export class HypertensionRiskService {
  // private apiUrl = "https://tu-api-url.com/predict-hypertension";

  constructor(private http: HttpClient) {}

  predictRisk(params: HypertensionRiskParams): Observable<ApiResponse> {
    // Simulación de respuesta después de 5 segundos
    const mockResponse: ApiResponse = {
      ok: true,
      message: "Predicción simulada exitosa",
      data: {
        risk: true,
        number: 90.5,
        params,
      },
    };
    return of(mockResponse).pipe(delay(5000));
    // return this.http.post<ApiResponse>(this.apiUrl, params);
  }
}
