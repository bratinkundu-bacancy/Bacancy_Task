const router  = require('express').Router();
const resourceController = require('../Controllers/resources.controller');

router.get('/getAll',async (req,res)=>{
    try{
        let skipRecords = parseInt(req.query.skip);
        let result = await resourceController.getAllResources(skipRecords);
        res.send(result);
    }
    catch(err){
        res.status(500).json({
            status: 'failed',
            error: err,
          });
    } 
});
router.post('/add', async (req,res)=>{
    try{
        let data = req.body;
        await resourceController.addResource(data);
        res.send(JSON.stringify({"status":"User Added successfully!"}))
    }
    catch(err){
        res.status(500).json({
            status: 'failed',
            error: err,
          });
    }
});
router.post('/update', async (req,res)=>{
    try{
        let id = req.body.id;
        let data = req.body;
        await resourceController.updateResource(id,data);
        res.send(JSON.stringify({"status":"User Updated successfully!"}))
    }
    catch(err){
        res.status(500).json({
            status: 'failed',
            error: err,
          });
    }
});
router.post('/delete', async (req,res)=>{
    try{
        const id = req.body.id;
        await resourceController.deleteResource(id);
        res.send(JSON.stringify({"status":"User Deleted successfully!"}))
    }
    catch(err){
        res.status(500).json({
            status: 'failed',
            error: err,
          });
    }
});

module.exports = router;