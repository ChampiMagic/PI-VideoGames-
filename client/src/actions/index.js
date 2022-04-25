import axios from 'axios';

const LOADINGON = 'LOADINGON';
const LOADINGOFF = 'LOADINGOFF';



export function loadingON() {
  return {
    type: LOADINGON,

  }
}

export function loadingOFF() {
  return {
    type: LOADINGOFF,

  }
}
