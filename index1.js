import * as readline from "readline";
import * as os from 'os';
import fs from 'fs';
import path from 'path';



const userInfo = os.userInfo();
const userName = userInfo.username;

const cpuInfo = os.cpus();
const numOfCpus = os.cpus().length;

const userHomeDir = os.homedir();
const cpuArch = os.arch();
const hostName = os.hostname();
const platform = os.platform();
const memory = os.totalmem();

const testFolder = '../fs_task';

const goodByeMessage = `Thank you ${userName}, goodbye!`;

console.log(`Welcome ${userName}!`);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.on('SIGINT', () => {
    console.log(goodByeMessage);
    process.exit();
});

let answerArr = [];

function createCommand(question) {

    rl.question(question, (answer) => {

        answerArr = answer.split(' ');

        if (answerArr.length == 2 && answerArr[0] == 'add') {
            fs.open(answerArr[1], 'w', function (err, file) {
                console.log(`The new file is created!`);
            });
        } else if (answerArr.length == 3 && answerArr[0] == 'rn') {
            fs.rename(answerArr[1], answerArr[2], () => {
                console.log("\nFile Renamed!\n");
            });
        } else if (answerArr.length == 3 && answerArr[0] == 'cp') {
            fs.copyFile(answerArr[1], answerArr[2], () => {
                console.log("The copy is created!");
            });
        } else if (answerArr.length == 3 && answerArr[0] == 'mv') {

            const currentPath = path.join(answerArr[1])
            const newPath = path.join(answerArr[2], answerArr[1])

            fs.rename(currentPath, newPath, function (err) {
                if (err) {
                    throw err
                } else {
                    console.log("Successfully moved the file!")
                }
            })
        }
        else if (answerArr.length == 2 && answerArr[0] == 'rm') {
            fs.unlink(answerArr[1], (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Deleted!');
                }
            });
        } else if (answer == 'ls') {
            const pathDir = path.resolve();
            let arr = [];

            var files = fs.readdirSync(pathDir);
            files.forEach(file => {
                let fileStat = fs.statSync(pathDir + '/' + file).isDirectory();
                fileStat ? arr.push({ Name: file, Type: 'directory' }) : arr.push({ Name: file, Type: 'file' });
            });
            console.table(arr);

        } else if (answer == '.exit') {
            console.log(goodByeMessage);
            process.exit();
        } else if (answer == 'os --cpus') {
            let cpuModels = [];
            for (let cpu of cpuInfo) {
                cpuModels.push(cpu.model + "\r\n");
            }
            console.log(`Overall amount of CPU models is ${numOfCpus}. \r\n`, `CPU models are: \r\n ${cpuModels}`);
        } else if (answer == 'os --homedir') {
            console.log(userHomeDir);
        } else if (answer == 'os --username') {
            console.log(userName);
        } else if (answer == 'os --architecture') {
            console.log(cpuArch);
        } else if (answer == 'os --hostname') {
            console.log(hostName);
        } else if (answer == 'os --platform') {
            console.log(platform);
        } else if (answer == 'os --memory') {
            console.log(memory);
        } else {
            console.log("Invalid input.");
        }
        createCommand(question);
    })

}

createCommand("Type command >> ");