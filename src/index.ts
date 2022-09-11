import {
  SevenToSmoke,
  SevenToSmokeParticipant,
} from './competition/seven-to-smoke';
import { Judge } from './participants/judge';

const sevenToSmoke = new SevenToSmoke({
  dancers: [
    new SevenToSmokeParticipant('WhyXce'),
    new SevenToSmokeParticipant('Anfromvietnam'),
    new SevenToSmokeParticipant('Carina'),
    new SevenToSmokeParticipant('Van'),
    new SevenToSmokeParticipant('Jordan'),
    new SevenToSmokeParticipant('Aaron'),
    new SevenToSmokeParticipant('Timo'),
    new SevenToSmokeParticipant('Melise'),
  ],
  judge: new Judge('Eun G'),
});

console.log(sevenToSmoke.toString());
sevenToSmoke.start();
console.log(sevenToSmoke.toString());
