class Perceptron {
  weights = [0, 0, 1];

  threshold = 1;

  learnTaxe = 0.1;

  data = [];

  /**
   * Retorna valor da previsão
   */
  predict(inputs?: number[]) {
    const biasWeight = this.weights.slice(-1)[0];
    const bias = this.threshold * biasWeight;

    const result = inputs.reduce((acc, _, i) => {
      acc += inputs[i] * this.weights[i];
      return acc;
    }, bias);

    return result > 0 ? 2 : 1;
  }

  /**
   * Treina o algoritmo prediction
   * @param set Valores para treinar
   * @param results Resultado dos valores a serem testados
   * @param cycles Quantidade de ciclos de treinamento
   */
  trainSet(set: number[][], results: number[]) {
    set.forEach((b, i) => {
      this.train(b, results[i]);
    });
  }

  /**
   * Testa o algoritmo prediction
   * @param setTest Valores de teste
   * @param resultsTest Resultado dos testes
   * @returns
   */
  testSet(setTest: number[][], resultsTest: number[]) {
    let err = 0;
    let hits = 0;

    setTest.forEach((v, i) => {
      const result = this.predict(v);

      if (result === resultsTest[i]) {
        hits++;
      } else {
        err++;
      }
    });

    return {
      err,
      hits,
      weights: this.weights.slice(0, -1),
      bias: this.weights.slice(-1)[0],
    };
  }

  /**
   * Treina o perceptron a partir de um novo dado
   * @param inputs
   * @param expected
   * @returns
   */
  private train(inputs: number[], expected: number): boolean {
    const result = this.predict(inputs);
    this.data.push({ input: inputs, target: expected, prev: result });

    if (result == expected) return true;

    this.weights = this.weights.map((weight, i) => {
      const isLast = i == inputs.length;
      const input = isLast ? this.threshold : inputs[i];
      return this.calcWeight(result, expected, input, this.learnTaxe, weight);
    });

    return false;
  }

  /**
   * Aplica a formula de calculo de peso - wi + nx(d-y)
   * @param actual
   * @param expected
   * @param input
   * @param learnrate
   * @param index
   * @returns
   */
  private calcWeight(
    actual: number,
    expected: number,
    input: number,
    learnrate: number,
    weight: number
  ) {
    return (expected - actual) * learnrate * input + weight;
  }
}

export default Perceptron;
