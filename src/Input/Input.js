import React from 'react';
import './Input.css';

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.direction = props.inputSettings.direction;
  }

  handleInputChange(e) {
    if (e.target.name === 'ciphertext') {
      this.ciphertext = e.target.value;
    } else if (e.target.name === 'direction') {
      this.direction = Number(e.target.value);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    return this.props.onChange({
      ciphertext: this.ciphertext,
      direction: this.direction,
    });
  }

  render() {
    const { inputSettings } = this.props;
    const { direction } = inputSettings;

    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>Ciphertext Settings</legend>
          <label>
              <span>Text:</span>
              <input
                id="cipher-text"
                name="ciphertext"
                required
                onChange={ this.handleInputChange }
                spellCheck="false"
                pattern="^[A-Za-z]+$"
              ></input>
          </label>

          <input type="submit" value="Submit" />

          <label>
            <input
              type="radio"
              name="direction"
              value="1"
              defaultChecked={direction === 1}
              onChange={ this.handleInputChange }
            />
            <span>Decode</span>
          </label>
          <label>
            <input
              type="radio"
              name="direction"
              value="0"
              defaultChecked={direction === -1}
              onChange={ this.handleInputChange }
            />
            <span>Encode</span>
          </label>

          <details>
            <summary>Instructions</summary>
            <ol>
              <li>Enter <b>ciphertext</b> above (use only English alphabet letters; no spaces, numbers or special characters).</li>
              <li>Hit submit to view results.</li>
            </ol>
          </details>
        </fieldset>
      </form>
    );
  }
}

export default Input;
