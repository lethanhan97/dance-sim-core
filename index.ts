import {
  SevenToSmoke,
  SevenToSmokeParticipant,
} from './src/competition/seven-to-smoke';

const sevenToSmoke = new SevenToSmoke([
  new SevenToSmokeParticipant('WhyXce'),
  new SevenToSmokeParticipant('Anfromvietnam'),
  new SevenToSmokeParticipant('Carina'),
  new SevenToSmokeParticipant('Van'),
  new SevenToSmokeParticipant('Jordan'),
  new SevenToSmokeParticipant('Aaron'),
  new SevenToSmokeParticipant('Timo'),
  new SevenToSmokeParticipant('Melise'),
]);

console.log(sevenToSmoke.toString());
sevenToSmoke.start();
console.log(sevenToSmoke.toString());
