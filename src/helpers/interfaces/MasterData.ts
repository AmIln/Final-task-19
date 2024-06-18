import { Current } from "./Current";

export interface MasterData {
  current: Current;
  hasStagedChanges: boolean;
  published: boolean;
  staged: Current;
}
