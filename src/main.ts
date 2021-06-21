import Perceptron from "./models/Perceptron";
import { readCsv } from "./utils/readCsv";

(async () => {
  const base = await readCsv("perceptron_base.csv");
  const teste = await readCsv("perceptron_teste.csv");

  const baseValues = base.map((v) => [Number(v[0]), Number(v[1])]);
  const baseResult = base.map((v) => Number(v[2]));

  const testeValues = teste.map((v) => [Number(v[0]), Number(v[1])]);
  const testeResult = teste.map((v) => Number(v[2]));

  var perceptron = new Perceptron();

  perceptron.trainSet(baseValues, baseResult);

  const result = perceptron.testSet(testeValues, testeResult);

  console.log(result);
})();
