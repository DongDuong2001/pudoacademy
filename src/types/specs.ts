export interface TechnicalSpecRow {
  parameter: string;
  nominalValue: string;
  tolerance?: string;
  unit: string;
  notes?: string;
}

export interface SpecGroup {
  groupName: string;
  specs: TechnicalSpecRow[];
}

export interface EquipmentSpecs {
  modelNumber: string;
  brand: string;
  type: string;
  refrigerant: "R32" | "R410A" | "R22" | "R134a";
  groups: SpecGroup[];
}
