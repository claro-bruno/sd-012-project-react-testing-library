// Fonte: https://trybecourse.slack.com/files/U017M2QDTAS/F01MKS0NT6F/zoom_0.mp4?origin_team=TMDDFEPFU&origin_channel=C01T2C18DSM

import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();

  return {
    ...render(
      <Router history={ history }>
        { component }
      </Router>,
    ),
    history,
  };
};

export default renderWithRouter;
