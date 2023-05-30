import * as os from 'os';
import * as si from 'systeminformation';
const frequencyInSeconds: number = Number(process.argv[2]);


setInterval(async () => {
    console.log('Operating System:', os.type());
    console.log('Architecture:', os.arch());
    console.log('Current User Name:', os.userInfo().username);
    console.log('CPU Cores Models:');
    os.cpus().forEach((core, index) => {
        console.log(`Core ${index}: ${core.model}`);
    });

    console.log('CPU Temperature:', await si.cpuTemperature());
    console.log('Graphic Controllers Vendors and Models:');
    const gpuControllers = (await si.graphics()).controllers;
    gpuControllers.forEach((controller, index) => {
        console.log(`GPU ${index} Vendor:, ${controller.vendor}`);
        console.log(`GPU ${index} Model:, ${controller.model}`);
    });

    const memoryUsage = process.memoryUsage();
    console.log(`Total Memory: ${os.totalmem() / 1024 / 1024 / 1024} GB`);
    console.log(`Used Memory: ${memoryUsage.rss / 1024 / 1024} MB`);
    console.log(`Free Memory: ${os.freemem() / 1024 / 1024 / 1024} GB`);

    const battery = await si.battery();
    console.log('Battery Charging:', battery.isCharging ? 'Yes' : 'No');
    console.log('Battery percent:', battery.percent, '%');
    console.log('Battery Remaining Time:', battery.timeRemaining);
}, frequencyInSeconds * 1000);