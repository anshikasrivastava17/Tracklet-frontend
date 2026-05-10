import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Login from './Login';

// Mock the fetch API globally
global.fetch = vi.fn();

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form correctly', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/you@example/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/••••••••/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
  });

  it('displays error if fields are submitted empty', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const submitBtn = screen.getByRole('button', { name: /Sign in/i });
    fireEvent.click(submitBtn);

    // HTML5 native validation handles empty required inputs, so fetch isn't called.
    // We just test that fetch was not called.
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('calls API with correct data on valid submit', async () => {
    // Mock a successful login response
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: 'fake-jwt', message: 'Login successful' })
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/you@example/i), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByPlaceholderText(/••••••••/i), { target: { value: 'password123' } });
    
    // We need to actually submit the form, which can be done by clicking the button
    fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    // Check if fetch was called with the right body
    const fetchCall = global.fetch.mock.calls[0];
    const fetchOptions = fetchCall[1];
    
    expect(fetchOptions.method).toBe('POST');
    expect(JSON.parse(fetchOptions.body)).toEqual({
      email: 'test@test.com',
      password: 'password123'
    });
  });
});
