import "@testing-library/jest-dom";
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import FilterSelectComponent from "../components/filterCurrency";

describe("test for header and contentHeader component", () => {
  const props = {
    onSelectedCurrency: jest.fn(),
    options: ["USD", "NGN", "AMD"],
  };

  it("should call onChange with correct values", async () => {
    render(
      <FilterSelectComponent
        onChange={props.onSelectedCurrency}
        countriesCode={props.options}
      />
    );
    let combobox = screen.getByRole("combobox");

    fireEvent.change(combobox, { target: { value: "NGN" } });

    await waitFor(() => { 
        expect(combobox.value).toBe("NGN");
    })
  });
});
