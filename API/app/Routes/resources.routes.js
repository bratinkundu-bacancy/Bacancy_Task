const router  = require('express').Router();
const resourceController = require('../Controllers/resources.controller');

router.get('/getAll',async (req,res)=>{
    try{
        let skipRecords = parseInt(req.query.skip);
        let sortColumn = req.query.sortColumn;
        let sortOrder = req.query.sortOrder;
        let searchText = req.query.searchText;
        let result = await resourceController.getAllResources(skipRecords,sortColumn,sortOrder,searchText);
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
        res.send(JSON.stringify({"status":"Success","message":"User Added successfully!"}))
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
        res.send(JSON.stringify({"status":"Success","message":"User Updated successfully!"}))
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
        res.send(JSON.stringify({"status":"Success","message":"User Deleted successfully!"}))
    }
    catch(err){
        res.status(500).json({
            status: 'failed',
            error: err,
          });
    }
});

module.exports = router;