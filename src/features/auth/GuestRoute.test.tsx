import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import GuestRoute from "./GuestRoute";
import { useAuth } from "./use-auth";

vi.mock("./use-auth", () => ({
  useAuth: vi.fn(),
}));

const mockedUseAuth = vi.mocked(useAuth);

function renderGuestRoute() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  const router = createMemoryRouter(
    [
      {
        element: <GuestRoute />,
        children: [{ path: "/login", element: <h1>Login Page</h1> }],
      },
      { path: "/", element: <h1>Dashboard</h1> },
    ],
    { initialEntries: ["/login"] },
  );

  return render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}

describe("GuestRoute", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders login page for unauthenticated users", () => {
    mockedUseAuth.mockReturnValue({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    renderGuestRoute();

    expect(screen.getByRole("heading", { name: "Login Page" })).toBeInTheDocument();
  });

  it("redirects authenticated users to the dashboard", () => {
    mockedUseAuth.mockReturnValue({
      user: { id: "user-1", email: "test@example.com", name: "Test User" },
      isAuthenticated: true,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    renderGuestRoute();

    expect(screen.getByRole("heading", { name: "Dashboard" })).toBeInTheDocument();
  });
});
