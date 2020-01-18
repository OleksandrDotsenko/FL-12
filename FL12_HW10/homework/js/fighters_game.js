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

function battle(fighter1, fighter2) {
  const hp1 = fighter1.getHealth;
  const hp2 = fighter2.getHealth;

  if (!hp1()) {
    console.log(`${fighter1.getName()} is dead.`);
  } else if (!hp2()) {
    console.log(`${fighter2.getName()} is dead.`);
  } else {
    while (hp1() && hp2()) {
      fighter1.attack(fighter2);

      if (hp2()) {
        fighter2.attack(fighter1);
      }
    }

    if (hp1()) {
      console.log(`${fighter1.getName()} has won!`);
    } else {
      console.log(`${fighter2.getName()} has won!`);
    }
  }
}

const myFighter1 = new Fighter({ name: 'Maximus', damage: 25, hp: 100, strength: 30, agility: 25 });
const myFighter2 = new Fighter({ name: 'Drakonus', damage: 30, hp: 100, strength: 40, agility: 25 });

// test
battle(myFighter1, myFighter2);
