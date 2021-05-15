import { buildQueryText } from "./src/services/DataLoader";


test('buildQueryText', () => {
  const queryParams = {
    name1: "test1",
    name2: "test2"
  }

  const result = buildQueryText(queryParams);
  const expected = "&name1=test1&name2=test2";
  expect(result).toBe(expected);
});
