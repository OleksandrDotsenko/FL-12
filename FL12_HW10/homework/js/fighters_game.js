function Fighter({ name, damage, hp, strength, agility }) {
  const totalHealth = hp;

  let wins = 0;
  let losses = 0;

  const rnd = (max) => Math.floor(Math.random() * max) + 1;

  return {
    getName: () => {
      return name;
    },
    getDamage: () => {
      return damage;
    },
    getStrength: () => {
      return strength;
    },
    getAgility: () => {
      return agility;
    },
    getHealth: () => {
      return hp;
    },
    addWin: () => {
      ++wins;
    },
    addLoss: () => {
      ++losses;
    },
    logCombatHistory: () => {
      console.log(`Name: ${name}, Wins: ${wins}, Losses: ${losses}`);
    },
    dealDamage: (damage) => {
      hp = damage >= hp ? 0 : hp - damage;
    },
    attack: (enemy) => {
      const maxProbability = 100;
      const attackChance = maxProbability - (enemy.getStrength() + enemy.getAgility());
      const attackSuccess = attackChance > 0 && rnd(maxProbability) <= attackChance;
      let message = '';

      if (attackSuccess) {
        const damageAmount = damage < 1 ? 1 : damage;
        enemy.dealDamage(damageAmount);
        message = `${name} makes ${damageAmount} damage to ${enemy.getName()}`;
        // message = `${name} makes ${damageAmount} damage to ${enemy.getName()}, [${name} ${hp} : ${enemy.getName()} ${enemy.getHealth()}]`;
      } else {
        message = `${name} attack missed`;
      }
      console.log(message);
    },
    heal: (amount) => {
      amount += hp;
      hp = amount > totalHealth ? totalHealth : amount;
    }
  };
}

function battle(attacker, defender) {
  if (!attacker.getHealth()) {
    return console.log(attacker.getName(), "is dead and can't fight.");
  }

  if (!defender.getHealth()) {
    return console.log(defender.getName(), "is dead and can't fight.");
  }

  let firstFighterAttacks = true;
  let everyoneIsAlive = true;

  while (everyoneIsAlive) {
    if (firstFighterAttacks) {
      attacker.attack(defender);
    } else {
      defender.attack(attacker);
    }
    firstFighterAttacks = !firstFighterAttacks;
    everyoneIsAlive = attacker.getHealth() && defender.getHealth();
  }

  if (attacker.getHealth()) {
    attacker.addWin();
    defender.addLoss();
    return console.log(attacker.getName(), 'has won!');
  }

  if (defender.getHealth()) {
    defender.addWin();
    attacker.addLoss();
    return console.log(defender.getName(), 'has won!');
  }
}

const myFighter1 = new Fighter({ name: 'Maximus', damage: 25, hp: 100, strength: 30, agility: 25 });
const myFighter2 = new Fighter({ name: 'Drakonus', damage: 30, hp: 100, strength: 40, agility: 20 });

battle(myFighter1, myFighter2);
