import React from 'react';
import './App.css';
import Input from './Input/Input';
import Output from './Output/Output';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ciphertext: null,
      inputSettings: {
        direction: 1,
      },
    };
  }

  _shift(char, by) {
    const letterInAlphabet = char.charCodeAt(0) - 65 - by;
    const modifier = letterInAlphabet < 0 ? 26 : 0;
    return String.fromCharCode(letterInAlphabet + modifier + 65);
  }

  _computePermutations(ciphertext, inputSettings) {
    const results = [];
    const ctArray = [...ciphertext || []].map(c => c.toUpperCase());

    if (inputSettings.direction === 1) {
      for (let ii = 1; ii < 26; ii++) {
        this._insert(results, ctArray, ii);
      }
    } else {
      for (let ii = 25; ii > 0; ii--) {
        this._insert(results, ctArray, ii);
      }
    }

    return results;
  }

  _insert(results, ctArray, ii) {
    results.push({
      chars: ctArray.map((char, i) => ({
        key: i,
        c: this._shift(char, ii),
      })),
    });
  }

  onChange(vals) {
    const {
      ciphertext,
      direction,
    } = vals;

    const inputSettings = { ...this.props.inputSettings, ...{ direction } };

    const permutations = this._computePermutations(ciphertext, inputSettings);
    this.setState({
      ciphertext,
      permutations,
      inputSettings,
    });
  }

  render() {
    const {
      ciphertext,
      inputSettings,
      permutations,
    } = this.state;

    return (
      <div>
        <Input
          onChange={ props => this.onChange(props) }
          inputSettings={ inputSettings }
        />
        <Output
          ciphertext={ ciphertext }
          permutations={ permutations }
          inputSettings={ inputSettings }
        />
      </div>
    );
  }
}

export default App;
