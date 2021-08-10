import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';

const historyRender = (component) => {
  const history = createMemoryHistory();
  return ({ ...render(
    <Router history={ history }>
      {component}
    </Router>,
  ),
  history,
  });
};

export default historyRender;
