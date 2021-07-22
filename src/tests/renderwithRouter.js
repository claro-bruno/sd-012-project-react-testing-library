import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';

const renderWithRouter = (component) => {
  const mockHistory = createMemoryHistory();

  return { ...render(
    <Router history={ mockHistory }>
      { component }
    </Router>,
  ),
  history: mockHistory };
};

export default renderWithRouter;
