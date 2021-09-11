const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
//const placar = document.querySelector('.contador');

let isJumping = false;
let isGameOver = false;
let keyUp = true;
let position = 0;
let pontos = 0;

function handleKeyDown(event) {
  if (event.keyCode === 32) {
	  keyUp = false;
    if (!isJumping) {
      jump();
    }
  }
}

function handleKeyUp(event) {
	if (event.keyCode === 32) {
	  keyUp = true;
	}
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 200 || keyUp == true) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 30;
          dino.style.bottom = position + 'px';
        }
      }, 30);
    } else {
      // Subindo
      position += 15;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;

  cactus.classList.add('cactus');
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + 'px';

  let leftTimer = setInterval(() => {
    if (cactusPosition < -60) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}
/*if(isGameOver == false) {
	let pontosMais = setInterval(() => {
		pontos++;
		contador.innerHTML = 'Score: ${pontos}';
	}, 20);
}
*/
createCactus();
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
