import React from 'react';
import { Router } from 'react-router-dom';
import { CreateMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWithRouter = (component) => {
  const history = CreateMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

export default renderWithRouter;
