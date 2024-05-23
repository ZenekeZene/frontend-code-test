import { types } from "mobx-state-tree";

const dummyBoxModel = types
  .model("Box", {
    name: "foo",
  })
  .actions((box) => ({
    toggleName: () => {
      box.name = box.name === "foo" ? "bar" : "foo";
    },
  }));

const MainStoreMock = types.model("MainStoreMock", {
  boxes: types.array(dummyBoxModel),
});

const storeMocked = MainStoreMock.create({ boxes: [{ name: "foo" }] });

export default storeMocked;
