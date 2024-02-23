
const {sortPages} = require("./report");
const { test, expect } = require("@jest/globals");

test("report", () => {
  const input = {
    "https://wegslane.dev/path": 3,
    "https://wegslane.dev": 6,
  };
  const actual = sortPages(input);
  const expected = [
    ["https://wegslane.dev", 6 ],
    ["https://wegslane.dev/path", 3 ]
  ];
  expect(actual).toEqual(expected);
});


test("report more test", () => {
  const input = {
    "https://wegslane.dev/path": 3,
    "https://wegslane.dev": 6,
    "https://wegslane.dev/path1": 1,
    "https://wegslane.dev/path2": 8,
  };
  const actual = sortPages(input);
  const expected = [
    ["https://wegslane.dev/path2", 8 ],
    ["https://wegslane.dev", 6 ],
    ["https://wegslane.dev/path", 3 ],
    ["https://wegslane.dev/path1", 1 ],
  ];
  expect(actual).toEqual(expected);
});
