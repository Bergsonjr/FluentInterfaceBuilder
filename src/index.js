import data from "./../database/data.json";
import FluentSQLBuilder from "./fluentSQL.js";

const result = FluentSQLBuilder.for(data)
  .where({ registered: /^(2020|2019)/ })
  .where({ category: /^(developer|quality assurance)/ })
  .where({ phone: /\((852|854)\)/ })
  .select(["name", "company", "phone", "registered", "category"])
  .orderBy("registered")
  .build();

console.table(result);
