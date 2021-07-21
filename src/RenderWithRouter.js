import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

const renderWithRouter = (component) => {
  const mockHistory = createMemoryHistory();
  const obj = render(
    <Router history={ mockHistory } >
      { component }
    </Router>
  );
  return { ...obj, history: mockHistory };
}

export default renderWithRouter;