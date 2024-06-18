export interface Discontobj {
  type: string;
  permyriad: number;
  value: {
    type: string;
    permyriad: number;
    money: {
      centAmount: number;
    }[];
  };
  target: {
    type: string;
    predicate: string;
  };
  references: {
    typeId: string;
    id: string;
  }[];
}
