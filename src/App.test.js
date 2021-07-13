import { render, screen } from "@testing-library/react";
import App from "./App";

import "@testing-library/jest-dom/extend-expect";

test("renders the component", async () => {
  render(<App />);

  const connect = await screen.findByText("Connect");

  expect(connect).toBeInTheDocument();
});
