import { SevenToSmoke } from './src/competition/seven-to-smoke';
import { Dancer } from './src/participants/dancer';

const sevenToSmoke = new SevenToSmoke([
  new Dancer('WhyXce'),
  new Dancer('Anfromvietnam'),
  new Dancer('Carina'),
  new Dancer('Van'),
  new Dancer('Jordan'),
  new Dancer('Aaron'),
  new Dancer('Timo'),
  new Dancer('Melise'),
]);

console.log(sevenToSmoke.toString());
sevenToSmoke.start();
console.log(sevenToSmoke.toString());
