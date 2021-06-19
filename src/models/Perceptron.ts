class Perceptron {
  debug = false;

  weights = [];

  threshold = 1;

  learningrate = 0.1;

  data = [];

  train(inputs: number[], expected: number) {
    while (this.weights.length < inputs.length) {
      this.weights.push(Math.random());
    }

    // adiona peso pro bias
    if (this.weights.length == inputs.length) {
      this.weights.push(1);
    }

    var result = this.predict(inputs);
    this.data.push({ input: inputs, target: expected, prev: result });

    // if (this.debug)
    //   console.log(
    //     "> training %s, expecting: %s got: %s",
    //     inputs,
    //     expected,
    //     result
    //   );

    if (result == expected) {
      return true;
    } else {
      // if (this.debug)
      //   console.log("> adjusting this.weights...", this.weights, inputs);
      for (var i = 0; i < this.weights.length; i++) {
        var input = i == inputs.length ? this.threshold : inputs[i];
        this.adjust(result, expected, input, i);
      }
      // if (this.debug) console.log(" -> this.weights:", this.weights);
      return false;
    }
  }

  retrain() {
    const length = this.data.length;
    let success = true;
    for (let i = 0; i < length; i++) {
      let training = this.data.shift();
      success = this.train(training.input, training.target) && success;
    }
    return success;
  }

  adjust(result, expected, input, index) {
    var d = this.delta(result, expected, input, this.learningrate);
    this.weights[index] += d;
    if (isNaN(this.weights[index]))
      throw new Error("this.weights[" + index + "] went to NaN!!");
  }

  delta(actual: number, expected: number, input: number, learnrate: number) {
    return (expected - actual) * learnrate * input;
  }

  predict(inputs?: number[]) {
    const bias = this.threshold * this.weights.slice(-1)[0];

    const result = inputs.reduce((acc, value, i) => {
      acc += inputs[i] * this.weights[i];
      return acc;
    }, bias);

    return result > 0 ? 2 : 1;
  }

  trainSet(set: number[][], results: number[], cycles: number) {
    set.forEach((b, i) => {
      this.train(b, results[i]);
    });

    let i = 0;
    while (i++ < cycles && !this.retrain()) {}
  }

  test(setTest: number[][], resultsTest: number[]) {
    let err = 0;
    let hits = 0;

    setTest.forEach((v, i) => {
      const result = this.predict(v);

      console.log(`Resultado: ${result} - Esperado: ${resultsTest[i]}`);

      if (result === resultsTest[i]) {
        hits++;
      } else {
        err++;
      }
    });

    return { err, hits, weights: this.weights };
  }
}

export default Perceptron;
