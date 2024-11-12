import { describe, test, expect } from "@jest/globals";

// describe("hello", () => {
//   test("hello", () => {
//     expect(getThreadId(url_7).toEqual("1312ptq"));
//   });
// });

function sum(a: number, b: number): number {
  return a + b;
}

describe("hello", () => {
  test("hello", () => {
    expect(sum(3, 4)).toBe(7);
  });
});
