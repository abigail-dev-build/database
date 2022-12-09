import {
  render,
} from '@testing-library/react';
import Home from '../pages/index'

describe('Home Page', () => {
  it('render home page', () => {
    render(<Home />)
  })
});