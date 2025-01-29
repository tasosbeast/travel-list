import { render, screen, fireEvent } from "@testing-library/react";
import Form from "../components/Form";
import "@testing-library/jest-dom";

describe("Form Component", () => {
  const mockOnAddItems = jest.fn();

  beforeEach(() => {
    mockOnAddItems.mockClear();
  });

  test("renders form with all elements", () => {
    render(<Form onAddItems={mockOnAddItems} />);

    expect(screen.getByText("What do you want to pack?")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("...Item")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("Add");
  });

  test("handles input changes", () => {
    render(<Form onAddItems={mockOnAddItems} />);

    const input = screen.getByPlaceholderText("...Item");
    const select = screen.getByRole("combobox");

    fireEvent.change(input, { target: { value: "Socks" } });
    fireEvent.change(select, { target: { value: "2" } });

    expect(input.value).toBe("Socks");
    expect(select.value).toBe("2");
  });

  test("submits form with valid data", () => {
    const mockDateNow = jest
      .spyOn(Date, "now")
      .mockImplementation(() => 123456789);

    render(<Form onAddItems={mockOnAddItems} />);

    const input = screen.getByPlaceholderText("...Item");
    const select = screen.getByRole("combobox");
    const form = screen.getByText("Add").closest("form");

    fireEvent.change(input, { target: { value: "Socks" } });
    fireEvent.change(select, { target: { value: "2" } });
    fireEvent.submit(form);

    expect(mockOnAddItems).toHaveBeenCalledWith({
      description: "Socks",
      quantity: 2,
      packed: false,
      id: 123456789,
    });

    mockDateNow.mockRestore();
  });

  test("clears input after submission", () => {
    render(<Form onAddItems={mockOnAddItems} />);

    const input = screen.getByPlaceholderText("...Item");
    const select = screen.getByRole("combobox");

    fireEvent.change(input, { target: { value: "Socks" } });
    fireEvent.change(select, { target: { value: "2" } });
    fireEvent.submit(document.querySelector(".add-form"));

    expect(input.value).toBe("");
    expect(select.value).toBe("1");
  });
});
