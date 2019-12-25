const play = confirm('Do you want to play a game?');

const MIN = 0;
const MAX = 8;
const attempts = 3;

const prizes = {
  max: 100,
  mid: 50,
  min: 25
};

if (!play) {
  alert('You did not become a billionaire, but can.');
} else {
  const rndPocket = Math.floor(Math.random() * (MAX + 1));
  console.log(rndPocket);

  let attempt = 0;

  while (attempt < attempts) {
    let userPocket = prompt(`Attempt ${attempt + 1}. Enter userPocket number from ${MIN} to ${MAX}`, MIN);
    userPocket = userPocket === null || userPocket.trim().length <= 0 ? NaN : Number(userPocket);

    if (!isNaN(userPocket) && userPocket >= MIN && userPocket <= MAX) {
      if (userPocket === rndPocket) {
        let prize;
        switch (attempt) {
          case 0:
            prize = prizes.max;
            break;
          case 1:
            prize = prizes.mid;
            break;
          default:
            prize = prizes.min;
            break;
        }

        alert(`Congratulation, you won! Your prize is: ${prize}$. Do you want to continue?`);

        break;
      }

      attempt++;
    }
  }
}
