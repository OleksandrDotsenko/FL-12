let play = confirm('Do you want to play a game?');

const attempts = 3;
const pocket_term = 4;
const prize_factor = 2;
const pocket_max_default = 8;
const prize_max_default = 100;
const prize_mid_default = 50;
const prize_min_default = 25;

if (play) {
  let pocket_min = 0;
  let pocket_max = pocket_max_default;

  let pocket_rnd;

  let prize_max = prize_max_default;
  let prize_mid = prize_mid_default;
  let prize_min = prize_min_default;

  let message = '';
  let input;
  let attempt = 0;
  let prize_user = 0;
  let prize_possible;
  let continues = false;

  do {
    if (continues) {
      pocket_max += pocket_term;
      prize_max *= prize_factor;
      prize_mid *= prize_factor;
      prize_min *= prize_factor;

      continues = false;
    } else {
      pocket_max = pocket_max_default;
      prize_max = prize_max_default;
      prize_mid = prize_mid_default;
      prize_min = prize_min_default;

      prize_user = 0;
    }

    attempt = 0;
    pocket_rnd = Math.floor(Math.random() * (pocket_max + 1));

    while (attempt < attempts) {
      switch (attempt) {
        case 0:
          prize_possible = prize_max;
          break;
        case 1:
          prize_possible = prize_mid;
          break;
        default:
          prize_possible = prize_min;
          break;
      }

      message = `Choose a roulette pocket number from ${pocket_min} to ${pocket_max}`;
      message += `\nAttempts left: ${attempts - attempt}`;
      message += `\nTotal prize: ${prize_user}$`;
      message += `\nPossible prize on current attempt: ${prize_possible}$`;

      input = prompt(message, '');
      input = input === null || input.trim().length <= 0 ? NaN : Number(input);

      if (isNaN(input)) {
        attempt++;
      } else {
        if (input === pocket_rnd) {
          switch (attempt) {
            case 0:
              prize_user += prize_max;
              break;
            case 1:
              prize_user += prize_mid;
              break;
            default:
              prize_user += prize_min;
              break;
          }
          attempt = attempts;
          continues = confirm(`Congratulation, you won! Your prize is: ${prize_user} $. Do you want to continue?`);
        } else {
          attempt++;
        }
      }
    }

    if (attempt >= attempts && !continues) {
      alert(`Thank you for your participation. Your prize is: ${prize_user} $`);
      play = confirm('Want to play again?');
    }
  } while (play);
} else {
  alert('You did not become a billionaire, but can.');
}
