import { expect, describe, test } from "@jest/globals";
import FluentSQLBuilder from "../src/fluentSQL.js";

const data = [
  {
    id: 2,
    name: "Jojo",
    category: "model",
  },
  {
    id: 3,
    name: "Thelma",
    category: "star",
  },
  {
    id: 1,
    name: "Berguin",
    category: "developer",
  },
];

describe("Test suite for FluentSQL Builder", () => {
  test("#for should return a FluentSQLBuilder instance", () => {
    const result = FluentSQLBuilder.for(data);
    const expected = new FluentSQLBuilder(data);

    expect(result).toStrictEqual(expected);
  });

  test("#build should return the empty object instance", () => {
    const result = FluentSQLBuilder.for(data).build();
    const expected = data;

    expect(result).toStrictEqual(expected);
  });

  test("#limit given a collection it should limit data", () => {
    const result = FluentSQLBuilder.for(data).limit(1).build();
    const expected = [data[0]];

    expect(result).toStrictEqual(expected);
  });

  test("#where given a collection it should filter data", () => {
    const result = FluentSQLBuilder.for(data)
      .where({
        category: /^dev/,
      })
      .build();
    const expected = data.filter(
      ({ category }) => category.slice(0, 3) === "dev"
    );

    expect(result).toStrictEqual(expected);
  });

  test("#select given a collection it should return only specific fields in data", () => {
    const result = FluentSQLBuilder.for(data)
      .select(["name", "category"])
      .build();
    const expected = data.map(({ name, category }) => ({ name, category }));

    expect(result).toStrictEqual(expected);
  });

  test("#orderBy given a collection it should order data by field", () => {
    const result = FluentSQLBuilder.for(data).orderBy("name").build();
    const expected = [
      {
        id: 1,
        name: "Berguin",
        category: "developer",
      },
      {
        id: 2,
        name: "Jojo",
        category: "model",
      },
      {
        id: 3,
        name: "Thelma",
        category: "star",
      },
    ];

    expect(result).toStrictEqual(expected);
  });

  test("pipeline", () => {
    const result = FluentSQLBuilder.for(data)
      .where({ category: "developer" })
      .where({ name: /B/ })
      .select(["name", "category"])
      .orderBy("category")
      .build();

    const expected = [
      {
        name: "Berguin",
        category: "developer",
      },
    ];

    expect(result).toStrictEqual(expected);
  });
});
