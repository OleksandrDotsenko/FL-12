function Fighter({ name, damage, hp, strength, agility }) {
  let wins = 0;
  let losses = 0;

  return {
    getName: () => name,
    getDamage: () => damage,
    getStrength: () => strength,
    getAgility: () => agility,
    getHealth: () => hp,
    attack: () => 'attack action',
    logCombatHistory: () => console.log(`Name: ${name}, Wins: ${wins}, Losses: ${losses}`),
    heal: () => 'heal method',
    dealDamage: () => 'damage action',
    addWin: () => ++wins,
    addLoss: () => ++losses
  };
}

const myFighter = new Fighter({ name: 'Maximus', damage: 25, hp: 100, strength: 30, agility: 25 });

// test
console.log('getName:', myFighter.getName());
console.log('getDamage:', myFighter.getDamage());
console.log('getStrength:', myFighter.getStrength());
console.log('getAgility:', myFighter.getAgility());
console.log('getHealth:', myFighter.getHealth());
console.log(myFighter.attack());
console.log(myFighter.dealDamage());
myFighter.logCombatHistory();
console.log(myFighter.addWin());
console.log(myFighter.addLoss());
myFighter.logCombatHistory();
console.log(myFighter.addWin());
console.log(myFighter.addLoss());
myFighter.logCombatHistory();
