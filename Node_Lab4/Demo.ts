/*Напишіть скрипт, який отримує з командного рядка числовий параметр – частоту в секундах.
Скрипт має виводити на кожному тику (визначеному частотою) наступну системну інформацію:

    - operating system;
- architecture;
- current user name;
- cpu cores models;
- cpu temperature;
- graphic controllers vendors and models;
- total memory, used memory, free memory в GB;
- дані про батарею (charging, percent, remaining time).

Знайдіть і використайте функціональність підходящих модулів.
*/
/*import * as si from 'systeminformation';*/


import * as os from 'os';
const si = require('systeminformation');

const frequency : number = Number(process.argv[2]);

async function printData(freq : number, func: ()=> Promise<Data> )  {

    console.log("i work ))) ")
    setInterval( async () => {
        const result: Promise<Data> = func();
        console.log(result+" !!!!!!!");
    }, freq * 1000);

}


const getCpuCoresModels = (): Map<number, string> => {
    const map = new Map();
    os.cpus().forEach((core, index) => map.set(index, core.model +" getCpuCoresModels "));
    console.log(map)
    return map;

};

async function getGpuControllers(): Promise<Map<string, string>> {
    const dataMap = new Map<string, string>();

    const gpuControllers = (await si.graphics()).controllers;
    gpuControllers.forEach((controller, index) => {
        dataMap.set(`GPU${index}Vendor`, controller.vendor);
        dataMap.set(`GPU${index}Model`, controller.model);
    });

    return dataMap;
}


async function generateSystemData(){
    const memoryUsage = process.memoryUsage();
    const battery = await si.battery();
    const data: Data = {
        typeOs: os.type() + " Operating System",
        architectureOs: os.arch() + " architecture",
        currentUserName: os.userInfo().username + " current user name",
        cpuCoresModels: await getCpuCoresModels() ,
        cpuTemperature: await si.cpuTemperature() +"cpuTemperature()",
        graphicControllersVendorsAndModels: " graphic controllers vendors and models" + getGpuControllers(),
        memory: {
            totalMemory: "Total Memory: " + os.totalmem() / 1024 / 1024 / 1024
                + "GB",
            usedMemory: "Used Memory: " + memoryUsage.rss / 1024 / 1024 + "MB",
            freeMemory: "Free Memory: " + os.freemem() / 1024 / 1024 / 1024 + " GB",
        },

        batteryInfo: {
            charging:  battery.isCharging ? 'Yes' : 'No',
            inPercent: 'Battery percent:' + battery.percent +'%',
            remainingTime: 'Battery Remaining Time:'+ battery.timeRemaining,
        }

    }
    console.log(JSON.stringify(data, null, 2));
    return data
}


printData(frequency, generateSystemData)



interface Data{
    typeOs:string
    architectureOs: string
    currentUserName: string
    cpuCoresModels : Map<number, string>
    cpuTemperature: string;
    graphicControllersVendorsAndModels: string
    memory :{
        totalMemory: string,
        usedMemory:string,
        freeMemory:string,
    },
    batteryInfo:{
        charging:string,
        inPercent:string,
        remainingTime:string
    }
}