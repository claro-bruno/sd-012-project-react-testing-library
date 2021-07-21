import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const renderWithRouter = (component) => {
  const mockHistory = createMemoryHistory();
  return {
    ...render(
      <Router history={ mockHistory }>
        {component}
      </Router>,
    ),
    history: mockHistory,
  };
};

export default renderWithRouter;
