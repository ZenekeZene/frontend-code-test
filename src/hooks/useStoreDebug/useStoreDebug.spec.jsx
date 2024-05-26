import React from "react";
import { render } from "@testing-library/react";
import { useStoreDebug } from "./useStoreDebug";
import { fakeStore } from "../../stores/__mocks__/MainStore.mock";

const DummyComponent = ({ store }) => {
  useStoreDebug(store);

  return null;
};

describe("useStoreDebug hook:", () => {
  test("should not log when not in development mode", () => {
    window.console = { log: vi.fn() };
    const env = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";

    render(<DummyComponent store={fakeStore} />);

    fakeStore.boxes[0].toggleName();

    expect(window.console.log).not.toHaveBeenCalled();

    process.env.NODE_ENV = env;
  });

  test("should log when in development mode", () => {
    window.console = { log: vi.fn() };
    const env = process.env.NODE_ENV;
    process.env.NODE_ENV = "development";

    render(<DummyComponent store={fakeStore} />);

    fakeStore.boxes[0].toggleName();

    expect(window.console.log).toHaveBeenCalled();

    process.env.NODE_ENV = env;
  });
});
