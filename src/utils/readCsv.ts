import * as fs from "fs";
import parse = require("csv-parse");

function readCsv(document: string): Promise<Array<Array<number | string>>> {
  const file = `${__dirname}/../../src/data/${document}`;
  const streams = fs.createReadStream(document);

  return new Promise((resolve, reject) => {
    var parser = parse({ delimiter: "," }, function (err, data) {
      resolve(data);
    });
    streams.pipe(parser);
  });
}

export { readCsv };
