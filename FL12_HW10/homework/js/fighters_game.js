function Fighter({ name, damage, hp, strength, agility }) {
  const MAX_POWER = 100;
  const TOTAL_HP = 100;

  let wins = 0;
  let losses = 0;

  const _generateAttack = () => Math.floor(Math.random() * MAX_POWER) + 1;

  const attack = (enemy) => {
    const defense = enemy.getStrength() + enemy.getAgility();
    const isAttack = defense < MAX_POWER && _generateAttack() > defense;

    if (isAttack) {
      enemy.dealDamage(damage);
      console.log(`${name} makes ${damage} damage to ${enemy.getName()}`);
      // console.log(`${name} makes ${damage} damage to ${enemy.getName()}`, `[${name} ${hp} : ${enemy.getName()} ${enemy.getHealth()}]`);
    } else {
      console.log(`${name} attack missed`);
    }
  };

  const dealDamage = (damage) => {
    hp = damage >= hp ? 0 : hp - damage;
  };

  const heal = (amount) => {
    const sum = hp + amount;
    hp = sum > TOTAL_HP ? TOTAL_HP : sum;
  };

  const logCombatHistory = () => {
    console.log(`Name: ${name}, Wins: ${wins}, Losses: ${losses}`);
  };

  return {
    getName: () => name,
    getDamage: () => damage,
    getStrength: () => strength,
    getAgility: () => agility,
    getHealth: () => hp,
    addWin: () => ++wins,
    addLoss: () => ++losses,
    logCombatHistory,
    dealDamage,
    attack,
    heal
  };
}

function battle(attacker, defender) {
  if (!attacker.getHealth()) {
    return console.log(attacker.getName(), 'is dead.');
  }

  if (!defender.getHealth()) {
    return console.log(defender.getName(), 'is dead.');
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
const myFighter2 = new Fighter({ name: 'Drakonus', damage: 30, hp: 100, strength: 40, agility: 25 });

battle(myFighter1, myFighter2);
