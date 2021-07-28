import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

const renderWhithRouter = (component) => {
  const mockHistory = createMemoryHistory();
  // eslint-disable-next-line testing-library/render-result-naming-convention
  const view = render(
    <Router history={ mockHistory }>
      { component }
    </Router>,
  );
  return { ...view, history: mockHistory };
};

export default renderWhithRouter;
