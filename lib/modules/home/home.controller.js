const homeController = (() => {
    'use strict';
   
    const utilityHelper = require('../../helpers/utilities.helpers');
    var fs = require('fs');

    function home() {}

    const _p = home.prototype;

    _p.getHomeVideo = async(req, res, next) => {
        try{
            const queryParam = {
                divName : 'home_video'
            }
            const dbResp = await req.db.collection('home').find(queryParam).toArray();
            if (dbResp && dbResp.length > 0){
                dbResp[0].imgUrl = `${req.protocol}://${req.get('host')}${dbResp[0].path}/${dbResp[0].fileName}`;
                return dbResp     
            }else{
                return "Sucess"
            }

        }catch(e){
            var stack = new Error().stack
            req.logger.error(e,stack);
            return false;
        }
    }

    _p.setHomeVideo = async(req, res, next) => {
        try{
            const result = await req.db.collection('home').find({}).toArray();
            if (result && result.length > 0){
                result[0].imgUrl = `${req.protocol}://${req.get('host')}/${result[0].path}/${result[0].fileName}`;
                return "video already present"                 
            }else{
                let fileData = req.files.file;
                let file_path = process.env.HOME_VIDEO_PATH
                let file_name = fileData.name;
                var dir = process.env.HOME_VIDEO_DIRECTORY;
                if (!fs.existsSync(dir)) {
                    await fs.mkdirSync(dir);
                    await fs.mkdirSync(dir + '/home_video');
                } else if (fs.existsSync(dir)) {
                    if (!fs.existsSync(dir + '/home_video')) {
                        await fs.mkdirSync(dir + '/home_video');
                    }
                }
                
                await fileData.mv(`${process.env.HOME_VIDEO_DIRECTORY}/${file_name}`, (err) => {
                    if (err) {
                        return res.status(400).send(new response.BAD_REQUEST(false, err, "File store error").response);;
                    }
                });

                let updateData = {
                    divName: 'home_video',
                    path: file_path,
                    fileName: file_name,
                    quote: req.body.quote,
                    author: req.body.author
                };

                const updateSucess = await req.db.collection('home').insertOne(updateData);

                if(updateSucess){
                    return "sucessfully added"
                }else{
                    let error = "error in updating data in db";
                    req.logger.error(error);
                    return error;
                }

            }
        }catch(e){
            var stack = new Error().stack
            req.logger.error(e,stack);
            return false;
        }
    }

    _p.updateHomeVideo = async(req, res, next) => {
        try{
            const result = await req.db.collection('home').find({divName: 'home_video'}).toArray();
            if (result && result.length > 0){
                await fs.unlinkSync(`${process.env.HOME_VIDEO_DIRECTORY}/${result[0].fileName}`);
            }

        }catch(e){
            var stack = new Error().stack
            req.logger.error(e,stack);
            return false;        
        }
    }

    return {
        getHomeVideo : _p.getHomeVideo,
        setHomeVideo : _p.setHomeVideo
    }

})();

module.exports = homeController;