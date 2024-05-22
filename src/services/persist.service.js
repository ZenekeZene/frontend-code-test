import localForage from 'localforage';
import { persist as mstPersist } from 'mst-persist';

const persistStoreName = 'folder-creator-by-zenekezene';

const PersistService = ({ store, whitelist }) => {

	const persist = () => mstPersist(persistStoreName, store, {
			storage: localForage,
			jsonify: false,
			whitelist,
		})
		.catch(() => console.log(`${persistStoreName} could not be hydrated`));

	return {
		persist,
	};
};

export { PersistService };
