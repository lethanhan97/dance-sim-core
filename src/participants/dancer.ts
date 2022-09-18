import { getConditionMultiplier } from '../utils/seed';

type DancerStats = Record<string, number>;

export class Dancer {
  name: string;
  stats: DancerStats;

  constructor(name: string) {
    this.name = name;
    // TODO: Update to get this from constructor instead;
    this.stats = {
      musicality: 20,
      foundation: 30,
    };
  }

  dance() {
    const conditionMultiplier = getConditionMultiplier();
    return Object.keys(this.stats).reduce((aggregator, key) => {
      aggregator[key] = conditionMultiplier * this.stats[key];

      return aggregator;
    }, {} as DancerStats);
  }

  toString() {
    return `${this.name}`;
  }
}
