const createdbg=require("debug");

function makelogger(namespace){
return createdbg(`app:${namespace}`)
}

module.exports=makelogger;