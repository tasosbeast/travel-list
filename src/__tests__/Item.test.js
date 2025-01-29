import { render, screen, fireEvent } from "@testing-library/react";
import Item from "../components/Item";
import "@testing-library/jest-dom";

describe("Item Component", () => {
  const mockOnDeleteItems = jest.fn();
  const mockOnToggleItems = jest.fn();

  const sampleItem = {
    id: 1,
    description: "Socks",
    quantity: 2,
    packed: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders item with correct content", () => {
    render(
      <Item
        item={sampleItem}
        onDeleteItems={mockOnDeleteItems}
        onToggleItems={mockOnToggleItems}
      />
    );

    expect(screen.getByText("2 Socks")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).not.toBeChecked();
    expect(screen.getByText("❌")).toBeInTheDocument();
  });

  test("handles checkbox toggle", () => {
    render(
      <Item
        item={sampleItem}
        onDeleteItems={mockOnDeleteItems}
        onToggleItems={mockOnToggleItems}
      />
    );

    fireEvent.click(screen.getByRole("checkbox"));
    expect(mockOnToggleItems).toHaveBeenCalledWith(sampleItem.id);
  });

  test("handles delete button click", () => {
    render(
      <Item
        item={sampleItem}
        onDeleteItems={mockOnDeleteItems}
        onToggleItems={mockOnToggleItems}
      />
    );

    fireEvent.click(screen.getByText("❌"));
    expect(mockOnDeleteItems).toHaveBeenCalledWith(sampleItem.id);
  });

  test("applies line-through style when packed", () => {
    const packedItem = { ...sampleItem, packed: true };
    render(
      <Item
        item={packedItem}
        onDeleteItems={mockOnDeleteItems}
        onToggleItems={mockOnToggleItems}
      />
    );

    const textElement = screen.getByText("2 Socks");
    expect(textElement).toHaveStyle({ textDecoration: "line-through" });
  });
});
