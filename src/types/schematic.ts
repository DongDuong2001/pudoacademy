export interface TestPoint {
  id: string;
  name: string;
  nominalVoltage: string;
  signalType: "DC" | "AC" | "PULSE" | "RESISTANCE";
  expectedRange: string;
  description: string;
  coordinate: {
    x: number; // percentage 0-100
    y: number; // percentage 0-100
  };
}

export interface SchematicComponent {
  id: string;
  code: string; // e.g., IC1, PC1, R101, C204
  name: string;
  functionDesc: string;
}

export interface SchematicData {
  id: string;
  title: string;
  diagramCode: string;
  description: string;
  warningNotice?: string;
  testPoints: TestPoint[];
  components: SchematicComponent[];
}
