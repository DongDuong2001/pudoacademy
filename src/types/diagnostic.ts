export type DangerLevel = "INFO" | "WARNING" | "DANGER";

export interface CheckStep {
  stepNumber: number;
  action: string;
  expectedResult: string;
  measuredTool: "VOM_DC" | "VOM_AC" | "AMPERE_METER" | "MANIFOLD_GAUGE" | "MEGOHM_METER";
}

export interface ErrorCodeItem {
  code: string;
  brand: "DAIKIN" | "PANASONIC" | "CASPER" | "TOSHIBA" | "MITSUBISHI" | "CARRIER" | "LG";
  title: string;
  symptom: string;
  rootCauses: string[];
  safetyLevel: DangerLevel;
  steps: CheckStep[];
}
