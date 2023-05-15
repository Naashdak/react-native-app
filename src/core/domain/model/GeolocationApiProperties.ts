export type GeolocationApiProperties = {
    centre: Geometry
    code: string
    codesPostaux: string[]
    nom : string
}

type Geometry = {
    type: string;
    coordinates: number[];
  }
  