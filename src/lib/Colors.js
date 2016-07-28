import axios from 'axios';
import localforage from 'localforage';

const body = document.querySelector('body');
const fallback = {
  colorone: '#001F3F',
  colorTwo: '#FF4136'
};

class Colors {
  constructor(x) {
    this.random(x);
    this.checkStore();
  }

  style(y, z) {
    body.style.background = y;
    body.style.color = z;
  }

  store(x) {
    return localforage.setItem('random', x).then(() => {
      localforage.getItem('random');
    });
  }

  checkStore() {
    let store;

    localforage.getItem('random', function (err, value) {
      if (err) {
        console.log(err);
      } else {
        store = value;
      }
    });

    return store;
  }

  set(x) {
    this.store(x);
    this.style(x.colorOne, x.colorTwo);
  }

  random(x) {
    return axios.get(x).then(r => {
      const data = r.data.most_active_20;
      const i = Math.floor(Math.random() * 20);

      const clrv = {
        colorOne: data[i].color_one,
        colorTwo: data[i].color_two
      };
      this.set(clrv);
    }).catch(err => {
      console.warn('Uhhh the API might be down cause this happened....');
      console.warn(err);

      this.style(fallback.colorOne, fallback.colorTwo);
    });
  }
}

export default Colors;
