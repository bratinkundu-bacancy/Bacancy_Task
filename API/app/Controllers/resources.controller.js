const Users = require('../Models/user.model');

exports.getAllResources = async (skipRecords) => {
    try {
        return await Users.find({}).skip(skipRecords).limit(10);
    } 
    catch (err) {
        throw new Error(` Error: ${err}`);
    }
}
exports.updateResource = async (id,data) => {
    try{
        await Users.findByIdAndUpdate(id,data);
    }
    catch(err){
        throw new Error(` Error: ${err}`);
    }
}
exports.addResource = async (data) => {
    try{
        console.log(data)
        await Users.create(data);
    }
    catch(err){
        console.log(err)
        throw new Error(` Error: ${err}`);
    }
    
}
exports.deleteResource = async (id) => {
    try{
        return await Users.findByIdAndDelete(id, () => {
            console.log(`deleteById success : ${id}`);
          });
    }
    catch(err){
        throw new Error(` Error: ${err}`);
    }
}