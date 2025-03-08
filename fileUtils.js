import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

export function readFileSync(fileName){
    try{
        const filePath = path.join(_dirname, fileName);
        // if(fs.existsSync(filePath)){
        //     fs.writeFileSync(filePath,JSON.stringify({taskCount:0},null,2));
        // }
        const data = fs.readFileSync(filePath,'utf-8');
        return JSON.parse(data);
    }
    catch(err){
        if(err.code === 'ENOENT'){
            return {};
        }
        console.log(err);
        console.log("error occured while reading data file");
        process.exit(1);
    }
}

export function writeFilesync(fileName, fileData){
    try{
        const filePath = path.join(_dirname,fileName);
        fs.writeFileSync(filePath,JSON.stringify(fileData,null,2),'utf-8');

    }
    catch(err){
        console.log("error occured while writing the data file");
        process.exit(1);
    }
}