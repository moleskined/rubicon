import React from 'react';
import './Output.css';

class Output extends React.Component {
  _renderResultsTable(ciphertext, permutations, inputSettings) {
    const results = [];
    const ctArray = [...ciphertext].map(c => c.toUpperCase());

    results.push(
      <tr key="0">
        <th rowSpan={26} className="shift-by"><span>Shift By:</span></th>
        <th>{ 0 }</th>{ ctArray.map((c, i) => <td key={i}>{c}</td>) }
      </tr>
    );

    permutations.forEach((p, i) => {
      results.push(
        <tr key={i + 1}>
          <th>{(i + 1) * inputSettings.direction * -1}</th>{ p.chars.map((c, i) => <td key={i}>{ c.c }</td>) }
        </tr>
      );
    });

    return results;
  }

  render() {
    const {
      ciphertext,
      permutations,
      inputSettings,
    } = this.props;

    if (!ciphertext) {
      return null;
    }

    return (
      <output>
        <table>
          <caption>Results</caption>
          <tbody>
            { this._renderResultsTable(ciphertext, permutations, inputSettings) }
          </tbody>
        </table>
      </output>
    );
  }
}

export default Output;