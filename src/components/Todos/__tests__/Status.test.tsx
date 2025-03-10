import { render, screen } from "testUtils";
import Status from "components/Todos/Status";
import { useSummary } from "lib/hooks/useSummary";
import { mockStatus } from "components/Todos/__mocks__";

jest.mock("lib/hooks/useSummary");

describe("Status Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useSummary as jest.Mock).mockReturnValue({
      data: mockStatus,
    });
  });

  it("renders the status component", () => {
    render(<Status />);

    expect(screen.getByTestId("done-count")).toHaveTextContent("Done: 2");
    expect(screen.getByTestId("todo-count")).toHaveTextContent("To Do: 1");
    expect(screen.getByTestId("percentage-progress")).toHaveTextContent(
      "66% completed"
    );
  });

  it("displays correct counts when all todos are completed", () => {
    (useSummary as jest.Mock).mockReturnValue({
      data: {
        total: 3,
        done: 3,
      },
    });

    render(<Status />);

    expect(screen.getByTestId("done-count")).toHaveTextContent("Done: 3");
    expect(screen.getByTestId("todo-count")).toHaveTextContent("To Do: 0");
    expect(screen.getByTestId("percentage-progress")).toHaveTextContent(
      "100% completed"
    );
  });

  it("displays correct counts when no todos are completed", () => {
    (useSummary as jest.Mock).mockReturnValue({
      data: {
        total: 3,
        done: 0,
      },
    });

    render(<Status />);

    expect(screen.getByTestId("done-count")).toHaveTextContent("Done: 0");
    expect(screen.getByTestId("todo-count")).toHaveTextContent("To Do: 3");
    expect(screen.getByTestId("percentage-progress")).toHaveTextContent(
      "0% completed"
    );
  });

  it("displays correct counts when there are no todos", () => {
    (useSummary as jest.Mock).mockReturnValue({
      data: {
        total: 0,
        done: 0,
      },
    });

    render(<Status />);

    expect(screen.getByTestId("done-count")).toHaveTextContent("Done: 0");
    expect(screen.getByTestId("todo-count")).toHaveTextContent("To Do: 0");
    expect(screen.getByTestId("percentage-progress")).toHaveTextContent(
      "0% completed"
    );
  });

  it("displays correct percentage progress", () => {
    (useSummary as jest.Mock).mockReturnValue({
      data: {
        total: 3,
        done: 2,
      },
    });

    render(<Status />);

    expect(screen.getByTestId("percentage-progress")).toHaveTextContent(
      "66% completed"
    );
  });
});
