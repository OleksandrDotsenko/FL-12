function Fighter({ name, damage, hp, strength, agility }) {
  const totalHealth = hp;

  let wins = 0;
  let losses = 0;

  const rnd = (max) => Math.floor(Math.random() * max) + 1;

  return {
    getName: () => name,
    getHealth: () => hp,
    getDamage: () => damage,
    getAgility: () => agility,
    getStrength: () => strength,
    addWin: () => ++wins,
    addLoss: () => ++losses,
    logCombatHistory: () => {
      console.log(`Name: ${name}, Wins: ${wins}, Losses: ${losses}`);
    },
    dealDamage: (damage) => {
      hp = damage >= hp ? 0 : hp - damage;
    },
    attack: (enemy) => {
      const maxProbability = 100;
      const attackChance = maxProbability - (enemy.getStrength() + enemy.getAgility());
      const attackSuccess = isNaN(attackChance) ? true : attackChance > 0 && rnd(maxProbability) <= attackChance;
      let message = '';

      if (attackSuccess) {
        const damageAmount = damage < 1 ? 1 : damage;
        enemy.dealDamage(damageAmount);
        message = `${name} makes ${damageAmount} damage to ${enemy.getName()}`;
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
  const attackerName = attacker.getName();
  const defenderName = defender.getName();

  let attackerIsAlive = attacker.getHealth() > 0;
  let defenderIsAlive = defender.getHealth() > 0;

  if (!attackerIsAlive || !defenderIsAlive) {
    if (!attackerIsAlive) {
      console.log(`${attackerName} is dead and can't fight.`);
    }

    if (!defenderIsAlive) {
      console.log(`${defenderName} is dead and can't fight.`);
    }

    return;
  }

  let firstFighterAttacks = true;

  while (attackerIsAlive && defenderIsAlive) {
    if (firstFighterAttacks) {
      attacker.attack(defender);
    } else {
      defender.attack(attacker);
    }
    firstFighterAttacks = !firstFighterAttacks;
    attackerIsAlive = attacker.getHealth() > 0;
    defenderIsAlive = defender.getHealth() > 0;
  }

  if (attackerIsAlive) {
    attacker.addWin();
    defender.addLoss();
    console.log(`${attackerName} has won!`);
  }

  if (defenderIsAlive) {
    defender.addWin();
    attacker.addLoss();
    console.log(`${defenderName} has won!`);
  }
}
