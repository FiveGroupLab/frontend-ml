export interface IItemPredictRisk {
  modelo: string;
  prediccion: string;
  respuesta: string;
}

export interface IPredictRisk {
  riesgo_hipertension: IItemPredictRisk[];
}
