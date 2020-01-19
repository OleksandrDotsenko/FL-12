function Fighter({ name, damage, hp, strength, agility }) {
  const MAX_POWER = 100;

  let wins = 0;
  let losses = 0;

  const attackPower = () => Math.floor(Math.random() * MAX_POWER) + 1;

  const hit = (enemy) => {
    const defense = enemy.getStrength() + enemy.getAgility();

    if (defense < MAX_POWER && attackPower() > defense) {
      enemy.dealDamage(damage);

      return true;
    } else {
      return false;
    }
  };

  return {
    getName: () => name,
    getDamage: () => damage,
    getStrength: () => strength,
    getAgility: () => agility,
    getHealth: () => hp,
    logCombatHistory: () => console.log(`Name: ${name}, Wins: ${wins}, Losses: ${losses}`),
    heal: () => 'heal method',
    addWin: () => ++wins,
    addLoss: () => ++losses,
    attack: (enemy) => {
      if (hit(enemy)) {
        console.log(`${name} makes ${damage} to ${enemy.getName()}`);
        // console.log(`${name} makes ${damage} to ${enemy.getName()}`, `[${name} ${hp} : ${enemy.getName()} ${enemy.getHealth()}]`);
      } else {
        console.log(`${name} attack missed`);
      }
    },
    dealDamage: (damage) => {
      if (hp <= damage) {
        hp = 0;
      } else {
        hp -= damage;
      }
    }
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
    return console.log(attacker.getName(), 'has won!');
  }

  if (defender.getHealth()) {
    return console.log(defender.getName(), 'has won!');
  }
}

const myFighter1 = new Fighter({ name: 'Maximus', damage: 25, hp: 100, strength: 30, agility: 25 });
const myFighter2 = new Fighter({ name: 'Drakonus', damage: 30, hp: 100, strength: 40, agility: 25 });

battle(myFighter1, myFighter2);
