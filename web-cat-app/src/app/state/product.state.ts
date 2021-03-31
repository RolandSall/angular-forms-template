export enum DataStateEnum {'LOADING' = 1, 'LOADED' = 2, 'ERROR' = 3}

export interface AppDataState<T>{
  dataState?: DataStateEnum;
  data?: T;
  errorMessage?: string;
}
