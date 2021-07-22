import React from 'react';
import { Router } from 'react-router-dom'
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';

const renderWithRouter = (router) => {
    const history = createMemoryHistory();
    return {
        ...render(<Router history={ history }>{ router } </Router>),
        history,
    };
};

export default renderWithRouter;