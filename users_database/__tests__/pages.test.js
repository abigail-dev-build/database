import { fireEvent, render, screen } from "@testing-library/react";
import Home from "../pages/index";
import QueryUserDatabase from "../services/useQuery";
import { QueryClientProvider, QueryClient } from "react-query";

jest.mock("../services/useQuery");
const queryClient = new QueryClient();


describe("Home Page", () => {
  beforeEach(() => {
    QueryUserDatabase.mockImplementation(() => (
      {
        isLoading: false,
        refetch: jest.fn(),
        data: {
          data: [
          {
            id: "1",
            createdAt: "2022-20-10",
            firstName: "Abigail",
            lastName: "Folarin",
          },
          {
            id: "2",
            createdAt: "2022-20-10",
            firstName: "Abigail",
            lastName: "Folarin",
          },
        ],
      },
      }
    ));
  });

  it("render home page", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    // fireEvent.click(screen.getByTestId("add-user")); for wehen loading is true
    fireEvent.click(screen.getByTestId('open-edit-modal'))
  });
});
