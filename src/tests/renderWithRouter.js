import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWithRouter = (comp) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{comp}</Router>), history,
  });
};

export default renderWithRouter;
