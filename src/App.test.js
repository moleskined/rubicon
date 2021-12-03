import { render, fireEvent } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

it('generates correct shift results', () => {
  const {
    getByLabelText,
    getByDisplayValue,
  } = render(<App />, container);

  const input = getByLabelText('Text:');
  const submit = getByDisplayValue('Submit');

  act(() => {
    fireEvent.change(input, { target: { value: "ABC" } });
    submit.click();
  });

  const rows = document.querySelectorAll('output table tr');

  // Should be 26 rows
  expect(rows.length).toBe(26);

  // First row should be ABC
  let rowValues = [...rows[0].querySelectorAll('td')].map(c => c.textContent).join('');
  expect(rowValues).toBe('ABC');

  // Last row should be BCD
  rowValues = [...rows[rows.length - 1].querySelectorAll('td')].map(c => c.textContent).join('');
  expect(rowValues).toBe('BCD');

  // 12th row should be OPQ
  rowValues = [...rows[12].querySelectorAll('td')].map(c => c.textContent).join('');
  expect(rowValues).toBe('OPQ');
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});