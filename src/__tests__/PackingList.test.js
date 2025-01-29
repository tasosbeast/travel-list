import { render, screen, fireEvent } from "@testing-library/react";
import PackingList from "../components/PackingList";
import "@testing-library/jest-dom";

const sampleItems = [
  { id: 1, description: "Socks", quantity: 2, packed: false },
  { id: 2, description: "Charger", quantity: 1, packed: true },
  { id: 3, description: "Book", quantity: 3, packed: false },
];
describe("PackingList Component", () => {
  const mockOnDeleteItems = jest.fn();
  const mockOnToggleItems = jest.fn();
  const mockOnClearList = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders empty list", () => {
    render(
      <PackingList
        items={[]}
        onDeleteItems={mockOnDeleteItems}
        onToggleItems={mockOnToggleItems}
        onClearList={mockOnClearList}
      />
    );

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  describe("PackingList Component Extended Tests", () => {
    const mockOnDeleteItems = jest.fn();
    const mockOnToggleItems = jest.fn();
    const mockOnClearList = jest.fn();

    test("select element has correct default value", () => {
      render(
        <PackingList
          items={sampleItems}
          onDeleteItems={mockOnDeleteItems}
          onToggleItems={mockOnToggleItems}
          onClearList={mockOnClearList}
        />
      );
      const select = screen.getByRole("combobox");
      expect(select.value).toBe("input");
    });

    test("select element contains all sorting options", () => {
      render(
        <PackingList
          items={sampleItems}
          onDeleteItems={mockOnDeleteItems}
          onToggleItems={mockOnToggleItems}
          onClearList={mockOnClearList}
        />
      );
      const options = screen.getAllByRole("option");
      expect(options).toHaveLength(4);
      expect(options[0]).toHaveValue("input");
      expect(options[1]).toHaveValue("packed");
      expect(options[2]).toHaveValue("description");
      expect(options[3]).toHaveValue("quantity");
    });

    test("maintains original order with input sort", () => {
      render(
        <PackingList
          items={sampleItems}
          onDeleteItems={mockOnDeleteItems}
          onToggleItems={mockOnToggleItems}
          onClearList={mockOnClearList}
        />
      );
      const items = screen.getAllByRole("listitem");
      expect(items[0]).toHaveTextContent("Socks");
      expect(items[1]).toHaveTextContent("Charger");
      expect(items[2]).toHaveTextContent("Book");
    });
  });

  test("sorts items by different criteria", () => {
    render(
      <PackingList
        items={sampleItems}
        onDeleteItems={mockOnDeleteItems}
        onToggleItems={mockOnToggleItems}
        onClearList={mockOnClearList}
      />
    );

    const sortSelect = screen.getByRole("combobox");

    // Test description sort
    fireEvent.change(sortSelect, { target: { value: "description" } });
    const items = screen.getAllByRole("listitem");
    expect(items[0]).toHaveTextContent("Book");

    // Test packed sort
    fireEvent.change(sortSelect, { target: { value: "packed" } });
    expect(screen.getAllByRole("listitem")[0]).toHaveTextContent("Socks");

    // Test quantity sort
    fireEvent.change(sortSelect, { target: { value: "quantity" } });
    expect(screen.getAllByRole("listitem")[0]).toHaveTextContent("Charger");
  });

  test("clear list button works", () => {
    render(
      <PackingList
        items={sampleItems}
        onDeleteItems={mockOnDeleteItems}
        onToggleItems={mockOnToggleItems}
        onClearList={mockOnClearList}
      />
    );

    fireEvent.click(screen.getByText("Clear list"));
    expect(mockOnClearList).toHaveBeenCalledTimes(1);
  });
});
