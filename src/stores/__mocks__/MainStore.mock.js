import { types } from "mobx-state-tree";
import { BoxModel } from "../models/BoxModel";
import { MainStore } from "../MainStore";

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

export const getStoreMockedWithBoxes = (boxes) => MainStore.create({ boxes });

export const createMockedBox = ({ id, text, left = 0, top = 0 }) => {
  return BoxModel.create({
    id,
    width: 10,
    height: 10,
    left,
    top,
    text,
    color: 'black',
    backgroundColor: 'back',
  });
};

export const fakeStore = MainStoreMock.create({ boxes: [{ name: "foo" }] });
