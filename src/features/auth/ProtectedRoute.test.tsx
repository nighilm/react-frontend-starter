import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "./use-auth";

vi.mock("./use-auth", () => ({
  useAuth: vi.fn(),
}));

const mockedUseAuth = vi.mocked(useAuth);

function renderProtectedRoute(initialEntry = "/") {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  const router = createMemoryRouter(
    [
      {
        element: <ProtectedRoute />,
        children: [{ path: "/", element: <h1>Private Dashboard</h1> }],
      },
      { path: "/login", element: <h1>Login Page</h1> },
    ],
    { initialEntries: [initialEntry] },
  );

  return render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}

describe("ProtectedRoute", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("redirects unauthenticated users to login", () => {
    mockedUseAuth.mockReturnValue({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    renderProtectedRoute();

    expect(screen.getByRole("heading", { name: "Login Page" })).toBeInTheDocument();
  });

  it("renders protected content for authenticated users", () => {
    mockedUseAuth.mockReturnValue({
      user: { id: "user-1", email: "test@example.com", name: "Test User" },
      isAuthenticated: true,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    renderProtectedRoute();

    expect(screen.getByRole("heading", { name: "Private Dashboard" })).toBeInTheDocument();
  });
});
