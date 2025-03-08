import * as fs from './fileUtils.js'
const file_name = "data.json"

export function addTask(taskDescription){
    let data = fs.readFileSync(file_name);
    let taskId = getTaskCount(data);
    taskId++;
    data[taskId] = getNewTask(taskDescription);
    data["taskCount"] = taskId;
    fs.writeFilesync(file_name,data);
    console.log("task added successfully( id: "+ taskId+ ")");
    return taskId;
}

export function updateTask(taskId, task){
    const data = fs.readFileSync(file_name);
    if(data[taskId]===undefined){
        console.log("no task found with this id: " + taskId)
        process.exit(1);
    }
    if(task.description!==undefined) data[taskId].description = task.description;
    if(task.status!==undefined) data[taskId].status = task.status;
    fs.writeFilesync(file_name, data);
}

export function deleteTask(taskId){
    const data  = fs.readFileSync(file_name);
    if(data[taskId]===undefined){
       console.log("no task found with the taskid:" + takId);
       process.exit(1);
    }
    delete data[taskId];
    fs.writeFilesync(file_name,data);
}

export function getTasks(status){
    const data = fs.readFileSync(file_name);
    delete data.taskCount;
    Object.keys(data).forEach(taskId =>{
        if(status===null || data[taskId].status === status){
            console.log("id:" + taskId + "description:"+
                data[taskId].description +
                 "status: "+ data[taskId].status + 
                 "createDate: "+ data[taskId].createdDate);
        }
    });
}

function getTaskCount(data){
    let taskCount = 0;
    if(data.taskCount !== undefined){
        taskCount = data.taskCount;
    }
    return taskCount;
}

function getNewTask(description){
    return{
        description,
        status:"todo",
        createdDate: new Date(),
        updatedDate: new Date()
    }
}