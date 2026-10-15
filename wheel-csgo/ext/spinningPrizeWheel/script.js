// Default constants
// const { StreamerbotClient } = window;
const params = new URLSearchParams(window.location.search); // Get URL Parameters
const ANNOUNCE_WINNER_ACTION_ID = '6c00f131-30f5-4991-8e1a-eafdb5f497c8'; // `Spinning Prize Wheel Winner` action
const GET_GROUP_DATA_ACTION_ID = '7189d25b-0a6d-4706-9f31-6cd205415634'; // `Spinning Prize Wheel Send Group Data` action
const tickSound = document.getElementById('tickSound'); // Free sound found at https://freesound.org/people/door15studio/sounds/244774/

// Can use URL parameters to set different options
function decodeBase64(base64EncodedStr) {
  return atob(base64EncodedStr);
}

// Function to get boolean value from URL parameter
function getBooleanParam(paramName) {
  const params = new URLSearchParams(window.location.search);
	const paramValue = params.get(paramName);
	return paramValue === 'true'; // Convert the string to boolean
}

function getUrlParameters() {
	const params = new URLSearchParams(window.location.search);                                               // Get URL parameters from browser                                        
  const host = params.get('host') || '127.0.0.1'; // URL parameter for Streamer.bot Websocket server host, default 127.0.0.1
  const port = params.get('port') || 8080; // URL parameter for Streamer.bot Websocket server port, default 8080
  const password = params.has('password') ? decodeBase64(params.get('password')) : undefined;
  const scheme = getBooleanParam('secure') ? 'wss' : 'ws';
  const endpoint = params.get('endpoint') || '/';
  const instance = params.get('instance') || '0';
  return { host, port, scheme, endpoint, password, instance };
}

// Streamer.bot Client Connect
const { host, port, scheme, endpoint, password, instance } = getUrlParameters();
const sbClient = new StreamerbotClient({
  host: host,
  port: port,
  scheme: scheme,
  endpoint: endpoint,
  password,
  onConnect: (sbInfo) => {
    const sbName = sbInfo.name;
    console.log(`Connected to Streamer.bot '${sbName}' on ${host}:${port}`);
    sbClient.doAction(GET_GROUP_DATA_ACTION_ID,
      { 'instance': instance }
    ); // Tell Streamer.bot to send back data
  }
});

// Global variables
let receivedUserInfos = []; // Array containing username, userId, and platform
let useCustom = false; // Bool for sending back to Streamer.bot
let names = []; // Array used for building the wheel

// middle image
let picture = params.get('img') || './logo.png';

document.getElementById('image').src = picture;

/**
 * Prize data will space out evenly on the deal wheel based on the amount of items available.
 * @param text [string] name of the prize
 * @param color [string] background color of the prize
 * @param reaction ['resting' | 'dancing' | 'laughing' | 'shocked'] Sets the reaper's animated reaction
 */
const colors = [
  'hsl(197 30% 43%)',
  'hsl(173 58% 39%)',
  'hsl(43 74% 66%)',
  'hsl(27 87% 67%)',
  'hsl(12 76% 61%)',
  'hsl(350 60% 52%)',
  'hsl(91 43% 54%)',
  'hsl(140 36% 74%)'
];
const reactions = ['resting', 'dancing', 'laughing', 'shocked'];
const prizes = () =>
  names.map((name, idx) => {
    let colorIdx = idx >= colors.length ? idx % colors.length : idx;
    return {
      text: name,
      color: colors[colorIdx],
      reaction: reactions[Math.floor(Math.random() * reactions.length)]
    };
  });

const wheel = document.querySelector('.deal-wheel');
const spinner = wheel.querySelector('.spinner');
const trigger = wheel.querySelector('.btn-spin');
const ticker = wheel.querySelector('.ticker');
const reaper = wheel.querySelector('.grim-reaper');
const prizeSlice = () => 360 / prizes().length;
const prizeOffset = () => Math.floor(180 / prizes().length);
const spinClass = 'is-spinning';
const selectedClass = 'selected';
const spinnerStyles = window.getComputedStyle(spinner);
let tickerAnim;
let rotation = 0;
let currentSlice = 0;
let prizeNodes;

const createPrizeNodes = () => {
  prizes().forEach(({ text, color, reaction }, i) => {
    const rotation = prizeSlice() * i * -1 - prizeOffset();

    spinner.insertAdjacentHTML(
      'beforeend',
      `<li class='prize' data-reaction=${reaction} style='--rotate: ${rotation}deg'>
        <span class='text'>${text}</span>
      </li>`
    );
  });
};

const createConicGradient = () => {
  spinner.setAttribute(
    'style',
    `background: conic-gradient(
      from -90deg,
      ${prizes()
        .map(
          ({ color }, i) =>
            `${color} 0 ${(100 / prizes().length) * (prizes().length - i)}%`
        )
        .reverse()}
    );`
  );
};

const setupWheel = () => {
  createConicGradient();
  createPrizeNodes();
  prizeNodes = wheel.querySelectorAll('.prize');
};

const spinertia = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const runTickerAnimation = () => {
  // https://css-tricks.com/get-value-of-css-rotation-through-javascript/
  const values = spinnerStyles.transform.split('(')[1].split(')')[0].split(',');
  const a = values[0];
  const b = values[1];
  let rad = Math.atan2(b, a);

  if (rad < 0) rad += 2 * Math.PI;

  const angle = Math.round(rad * (180 / Math.PI));
  const slice = Math.floor(angle / prizeSlice());

  if (currentSlice !== slice) {
    ticker.style.animation = 'none';
    setTimeout(() => (ticker.style.animation = null), 10);
    currentSlice = slice;

    // Play the tick sound
    tickSound.currentTime = 0;
    tickSound.play();
  }

  tickerAnim = requestAnimationFrame(runTickerAnimation);
};

const selectPrize = () => {
  const selected = Math.floor(rotation / prizeSlice());
  prizeNodes[selected].classList.add(selectedClass);
  reaper.dataset.reaction = prizeNodes[selected].dataset.reaction;

  // send answer to streamer.bot
  const resultText = prizeNodes[selected].textContent.trim();

  const { userName, userId, platform } = receivedUserInfos[selected]; // Obtain the winner's information from receivedUserInfos array
  sendWinner(resultText, userName, userId, platform);
};

function triggerSpin() {
  setupWheel();

  if (reaper.dataset.reaction !== 'resting') {
    reaper.dataset.reaction = 'resting';
  }

  trigger.disabled = true;
  rotation = Math.floor(Math.random() * 360 + spinertia(2000, 5000));
  prizeNodes.forEach((prize) => prize.classList.remove(selectedClass));
  wheel.classList.add(spinClass);
  spinner.style.setProperty('--rotate', rotation);
  ticker.style.animation = 'none';
  runTickerAnimation();
}

spinner.addEventListener('transitionend', () => {
  cancelAnimationFrame(tickerAnim);
  trigger.disabled = false;
  trigger.focus();
  rotation %= 360;
  selectPrize();
  wheel.classList.remove(spinClass);
  spinner.style.setProperty('--rotate', rotation);
});

async function sendWinner(resultText, userName, userId, platform) {
  try {
    console.log('userName', userName);
    console.log('userId', userId);
    console.log('platform', platform);
    console.log('useTextFile', useCustom);
    sbClient.doAction(
      ANNOUNCE_WINNER_ACTION_ID,
      {
        'winner': resultText,
        'userName': userName,
        'userId': userId,
        'platform': platform,
        'useTextFile': useCustom
      }
    );
  } catch (error) {
    console.error('Error executing action: ', error);
  }
}

// Define a function to process the received data from Streamer.bot
function processData(data) {
  console.log('Received JSON data:', data); // Log received JSON data

  if (!data || !Array.isArray(data)) {
    console.error('Invalid or missing groupData in the received data:', data);
    return;
  }

  // Iterate over each item in the received data array
  data.forEach(item => {
    // Extract username, userId, and platform from the item
    const { userName, userId, platform } = item;

    // Perform further processing or actions with the extracted data
    updateWheelWithUserInfo(userName, userId, platform);
  });

  // Log the names array
  console.log('Names array:', names);
}

function updateWheelWithUserInfo(userName, userId, platform) {
  // Create an object with the received user information
  const userInfo = {
    userName: userName,
    userId: userId,
    platform: platform
  };

  // Add received user information to the wheel entries
  receivedUserInfos.push(userInfo);

  // Extract user names and add them to the names array
  const newUserName = userInfo.userName;
  /* if (!names.includes(newUserName)) {
    names.push(newUserName);
  } */
  names.push(newUserName);
}

async function initiateStreamerbotClient() {
  /* Wait for the General.Custom event to be received
     containing data either from names.txt or
     User Group Entries
  */
  return new Promise(resolve => {
    sbClient.on('General.Custom', (wsdata) => {
      console.log(wsdata);
      if (wsdata.data.extensionName === 'spinningPrizeWheel') {
        const { instance } = getUrlParameters();
        if (instance !== wsdata.data.instance) {
          console.error(`browser instance '${instance}' does not match received instance: '${wsdata.data.instance}'`);
        } else {
          console.log('Custom Event:', wsdata.data);
          // const data = JSON.parse(wsdata);
          if (wsdata.data.useCustom === true) {
            useCustom = true;
            console.log('useCustom', wsdata.data.useCustom);
          }
    
          if (wsdata.data && wsdata.data.groupData && Array.isArray(wsdata.data.groupData)) {
            processData(wsdata.data.groupData);
          }  
        }
        // Resolve the Promise once the event is received
        resolve();
      }
    });
  });
}

async function main() {
  await initiateStreamerbotClient();
  setTimeout(triggerSpin, 250);
}

main();
