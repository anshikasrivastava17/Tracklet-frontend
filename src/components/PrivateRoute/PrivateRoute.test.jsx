import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

describe('PrivateRoute Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should redirect to /login when user is NOT authenticated', () => {
    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/login" element={<div data-testid="login-page">Login Page</div>} />
          <Route
            path="/protected"
            element={
              <PrivateRoute>
                <div data-testid="protected-content">Protected Content</div>
              </PrivateRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    // Should NOT see protected content
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
    
    // Should see login page (meaning it redirected)
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });

  it('should render children when user IS authenticated', () => {
    // Simulate logged-in state
    localStorage.setItem('userEmail', 'test@test.com');

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/login" element={<div data-testid="login-page">Login Page</div>} />
          <Route
            path="/protected"
            element={
              <PrivateRoute>
                <div data-testid="protected-content">Protected Content</div>
              </PrivateRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    // Should see protected content
    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
    
    // Should NOT see login page
    expect(screen.queryByTestId('login-page')).not.toBeInTheDocument();
  });
});
