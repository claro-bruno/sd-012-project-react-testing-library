import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  render(
    <Router history={ history } >
      { component }
    </Router>
  );

  return history;
}

export default renderWithRouter;