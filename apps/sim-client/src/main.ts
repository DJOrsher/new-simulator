import { helloCore } from '@threeflightsim/core';

const root = document.getElementById('app');
if (root) {
  root.textContent = `Boot: ${helloCore()}`;
}
