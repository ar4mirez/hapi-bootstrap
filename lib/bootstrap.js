import glue from 'glue';
import confidence from 'confidence';
import manifest from './manifest';

const criteria = {
    env: process.env.NODE_ENV
};

const store = new confidence.Store(manifest);

const composeOptions = {
    relativeTo: `${process.cwd()}/lib/plugins`
};

export default glue.compose.bind(glue, store.get('/', criteria), composeOptions);
