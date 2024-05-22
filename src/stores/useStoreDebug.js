import { onSnapshot } from "mobx-state-tree"

const debugStore = (store) => {
	onSnapshot(store, snapshot => {
		console.log(snapshot);
	});
};

export { debugStore };
