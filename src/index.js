import './style.scss';

function importAll(r) {
    return r.keys().map(r);
}

import { tmgems } from './js/gems';

const gems = importAll(require.context('./gems/', true, /\.(png|jpe?g|gif)$/));

boot();

function boot(){

    tmgems({assets:gems});

}