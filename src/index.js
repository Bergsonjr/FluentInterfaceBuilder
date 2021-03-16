import data from "./../database/data.json";
import FluentSQLBuilder from "./fluentSQL";

const result = FluentSQLBuilder.for(data).build();

console.table(result);
