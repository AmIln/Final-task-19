import { LineItem } from "../../helpers/interfaces/LineItem";
export async function asyncForEach(
  arr: LineItem[],
  // eslint-disable-next-line no-unused-vars
  callback: (arr0: LineItem, i?: number, arr?: LineItem[]) => Promise<void>,
) {
  for (let i = 0; i < arr.length; i++) await callback(arr[i], i, arr);
}
