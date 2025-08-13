export interface IProject {
  id: number;
  nombre_proyecto: string;
  direccion: string;
  aprobacion12cuotas: string | null;
  tipo: string;
  ubicacion: string;
  estado: string;
  created_at: string;
  updated_at: string;
}

export interface IImage {
  tipo: string;
  url: string;
  formato: string;
}

export interface IProperty {
  id: number;
  titulo: string;
}

export interface IResult{
    success: boolean,
    data: IProperty[]
}
