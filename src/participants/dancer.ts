// TODO Can consider splitting points from Dancer class
// since points is purely a SevenToSmoke concept. Can
// consider making a SevenToSmokeCompetitor that extends
// Dancer class
export class Dancer {
  name: string;
  points: number;

  constructor(name: string) {
    this.name = name;
    this.points = 0;
  }

  toString() {
    return `${this.name}: ${this.points}`;
  }
}
