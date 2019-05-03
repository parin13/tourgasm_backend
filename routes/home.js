const response = require('./responseHandler');
var fs = require('fs');

// Home Video and quote

const getHomeVideo = async (req, res) => {
    try {
        db.collection("home").find({
            divName: 'home_video'
        }).toArray((err, result) => {
            if (err) res.send(new response.BAD_REQUEST(false, err, "Database Error").response);
            if (result.length == 0) {
                res.send(new response.SUCCESS(true, null, "Success").response);
            } else {
                result[0].imgUrl = `${req.protocol}://${req.get('host')}/${result[0].path}/${result[0].fileName}`;
                res.send(new response.SUCCESS(true, result, "Success").response);
            }
        });

    } catch (err) {
        res.status(400).send(new response.BAD_REQUEST(false, err, "Failed").response);
    }
}

const setHomeVideo = async (req, res) => {
    try {
        db.collection("home").find({}).toArray(async (err, result) => {
            if (err) res.status(400).send(new response.BAD_REQUEST(false, err, "Database Error").response);
            if (result.length > 0) {
                result[0].imgUrl = `${req.protocol}://${req.get('host')}/${result[0].path}/${result[0].fileName}`;
                res.send(new response.SUCCESS(false, result, "Already present").response);
            } else {
                let file = req.files.file;
                let file_path = 'uploads/home/home_video';
                let file_name = file.name;
                var dir = 'public/uploads/home';
                if (!fs.existsSync(dir)) {
                    await fs.mkdirSync(dir);
                    await fs.mkdirSync(dir + '/home_video');
                } else if (fs.existsSync(dir)) {
                    if (!fs.existsSync(dir + '/home_video')) {
                        await fs.mkdirSync(dir + '/home_video');
                    }
                }
                await file.mv(`public/${file_path}/${file_name}`, (err) => {
                    if (err) {
                        return res.status(400).send(new response.BAD_REQUEST(false, err, "File store error").response);;
                    }
                });

                let req_data = {
                    divName: 'home_video',
                    path: file_path,
                    fileName: file_name,
                    quote: req.body.quote,
                    author: req.body.author
                };

                db.collection("home").insertOne(req_data, (err, result) => {
                    if (err) res.status(400).send(new response.BAD_REQUEST(false, err, "Database Error").response);
                    res.send(new response.SUCCESS(true, null, "Successfully added").response);
                });
            }
        });
    } catch (err) {
        res.status(400).send(new response.BAD_REQUEST(false, err, "Failed").response);
    }
}

const updateHomeVideo = async (req, res) => {
    try {
        db.collection("home").find({
            divName: 'home_video'
        }).toArray(async (err, result) => {

            if (req.files) {
                await fs.unlinkSync(`public/${result[0].path}/${result[0].fileName}`);
                let file = req.files.file;
                let file_path = 'uploads/home/home_video';
                let file_name = file.name;
                await file.mv(`public/${file_path}/${file_name}`, (err) => {
                    if (err) {
                        return res.status(400).send(new response.BAD_REQUEST(false, err, "File store error").response);;
                    }
                });
                let newvalues = {
                    $set: {
                        path: file_path,
                        fileName: file_name,
                        quote: req.body.quote,
                        author: req.body.author
                    }
                };
                db.collection("home").updateOne({
                    divName: 'home_video'
                }, newvalues, (err, result) => {
                    if (err) res.status(400).send(new response.BAD_REQUEST(false, err, "Database Error").response);
                    res.send(new response.SUCCESS(true, null, "Successfully updated").response);
                });
            } else {
                let newvalues = {
                    $set: {
                        quote: req.body.quote,
                        author: req.body.author
                    }
                };
                db.collection("home").updateOne({
                    divName: 'home_video'
                }, newvalues, (err, result) => {
                    if (err) res.status(400).send(new response.BAD_REQUEST(false, err, "Database Error").response);
                    res.send(new response.SUCCESS(true, null, "Successfully updated").response);
                });
            }
        });

    } catch (err) {
        res.status(400).send(new response.BAD_REQUEST(false, err, "Failed").response);
    }
}

// Home main slide show

const getHomeMainSlideShow = async (req, res) => {
    try {
        db.collection("home").find({
            divName: 'home_main_slideshow'
        }).toArray((err, result) => {
            if (err) res.send(new response.BAD_REQUEST(false, err, "Database Error").response);

            if (result.length == 0) {
                res.send(new response.SUCCESS(true, null, "Success").response);
            } else {
                for (let i = 0; i < result.length; i++) {
                    result[i].imgUrl = `${req.protocol}://${req.get('host')}/${result[i].path}/${result[i].fileName}`;
                }
                res.send(new response.SUCCESS(true, result, "Success").response);
            }
        });

    } catch (err) {
        res.status(400).send(new response.BAD_REQUEST(false, err, "Failed").response);
    }
}

const setHomeMainSlideShow = async (req, res) => {
    try {
        let file = req.files.slide;
        let file_name = file.name;

        let file_path = 'uploads/home/home_main_slideshow';
        var dir = 'public/uploads/home';
        if (!fs.existsSync(dir)) {
            await fs.mkdirSync(dir);
            await fs.mkdirSync(dir + '/home_main_slideshow');
        }
        if (!fs.existsSync(`public/${file_path}`)) {
            await fs.mkdirSync(dir + '/home_main_slideshow');
        }
        await file.mv(`public/${file_path}/${file_name}`, (err) => {
            if (err) {
                res.status(400).send(new response.BAD_REQUEST(false, err, "File store error").response);;
            }
            req_data = {
                id: new Date().getTime().toString(),
                divName: 'home_main_slideshow',
                path: file_path,
                fileName: file_name,
                title: req.body.title,
                desp: req.body.desp,
                price: req.body.price,
                type: req.body.type,
                duration: req.body.duration,
                date: req.body.date,
                linkTo: req.body.link
            };
            db.collection("home").insertOne(req_data, (err, result) => {
                if (err) res.status(400).send(new response.BAD_REQUEST(false, err, "Database Error").response);
                res.send(new response.SUCCESS(true, null, "Successfully added").response);
            });
        });
    } catch (err) {
        res.status(400).send(new response.BAD_REQUEST(false, err, "Failed").response);
    }
}

const updateHomeMainSlideShow = async (req, res) => {
    try {
        var query = {
            id: req.body.id
        };
        db.collection("home").find(query).toArray(async (err, result) => {
            if (result.length == 0) {
                res.status(200).send(new response.SUCCESS(false, null, "Wrong id").response);
            } else {
                await fs.unlinkSync(`public/${result[0].path}/${result[0].fileName}`);

                let file = req.files.slide;
                let file_path = 'uploads/home/home_main_slideshow';
                let file_name = file.name;
                await file.mv(`public/${file_path}/${file_name}`, (err) => {
                    if (err) {
                        return res.status(400).send(new response.BAD_REQUEST(false, err, "File store error").response);;
                    }
                });
                let newvalues = {
                    $set: {
                        path: file_path,
                        fileName: file_name,
                        title: req.body.title,
                        desp: req.body.desp,
                        price: req.body.price,
                        type: req.body.type,
                        duration: req.body.duration,
                        date: req.body.date,
                        linkTo: req.body.link
                    }
                };
                db.collection("home").updateOne({
                    id: req.body.id
                }, newvalues, (err, result) => {
                    if (err) res.status(400).send(new response.BAD_REQUEST(false, err, "Database Error").response);
                    res.send(new response.SUCCESS(true, null, "Successfully updated").response);
                });
            }
        });

    } catch (err) {
        res.status(400).send(new response.BAD_REQUEST(false, err, "Failed").response);
    }
}

// events

const getSingleEvent = async (req, res) => {
    try {
        db.collection("events").find({
            id: req.query.id
        }).toArray((err, result) => {
            if (err) res.send(new response.BAD_REQUEST(false, err, "Database Error").response);
            if (result.length == 0) {
                res.send(new response.SUCCESS(true, null, "Success").response);
            } else {
                for (let i = 0; i < result.length; i++) {
                    result[i].imgUrl = `${req.protocol}://${req.get('host')}/${result[i].path}/${result[i].fileName}`;
                }
                res.send(new response.SUCCESS(true, result, "Success").response);
            }
        });
    } catch (err) {
        res.status(400).send(new response.BAD_REQUEST(false, err, "Failed").response);
    }
}

const getAllEvents = async (req, res) => {
    try {
        db.collection("events").find({
            divName: 'events'
        }).toArray((err, result) => {
            if (err) res.send(new response.BAD_REQUEST(false, err, "Database Error").response);
            if (result.length == 0) {
                res.send(new response.SUCCESS(true, null, "Success").response);
            } else {
                for (let i = 0; i < result.length; i++) {
                    result[i].imgUrl = `${req.protocol}://${req.get('host')}/${result[i].path}/${result[i].fileName}`;
                }
                res.send(new response.SUCCESS(true, result, "Success").response);
            }
        });
    } catch (err) {
        res.status(400).send(new response.BAD_REQUEST(false, err, "Failed").response);
    }
}

const setEvents = async (req, res) => {
    try {
        let file = req.files.file;
        let file_name = file.name;

        let file_path = 'uploads/home/events';
        var dir = 'public/uploads/home';
        if (!fs.existsSync(dir)) {
            await fs.mkdirSync(dir);
            await fs.mkdirSync(dir + '/events');
        }
        if (!fs.existsSync(`public/${file_path}`)) {
            await fs.mkdirSync(dir + '/events');
        }
        await file.mv(`public/${file_path}/${file_name}`, (err) => {
            if (err) {
                res.status(400).send(new response.BAD_REQUEST(false, err, "File store error").response);;
            }
            req_data = {
                id: new Date().getTime().toString(),
                divName: 'events',
                path: file_path,
                fileName: file_name,
                title: req.body.title,
                desp: req.body.desp,
                type: req.body.type,
                category: req.body.category
            };
            db.collection("events").insertOne(req_data, (err, result) => {
                if (err) res.status(400).send(new response.BAD_REQUEST(false, err, "Database Error").response);
                res.send(new response.SUCCESS(true, null, "Successfully added").response);
            });
        });
    } catch (err) {
        console.log(err);

        res.status(400).send(new response.BAD_REQUEST(false, err, "Failed").response);
    }
}

const updateEvents = async (req, res) => {
    try {
        db.collection("events").find({
            id: req.body.id
        }).toArray(async (err, result) => {
            if (result.length == 0) {
                res.status(200).send(new response.SUCCESS(false, null, "Wrong id").response);
            }
            if (req.files) {
                if (fs.existsSync(`public/${result[0].path}/${result[0].fileName}`)) {
                    await fs.unlinkSync(`public/${result[0].path}/${result[0].fileName}`);
                }

                let file = req.files.file;
                let file_path = 'uploads/home/events';
                let file_name = file.name;
                await file.mv(`public/${file_path}/${file_name}`, (err) => {
                    if (err) {
                        return res.status(400).send(new response.BAD_REQUEST(false, err, "File store error").response);;
                    }
                });
                let newvalues = {
                    $set: {
                        path: file_path,
                        fileName: file_name,
                        title: req.body.title,
                        desp: req.body.desp,
                        price: req.body.price,
                        type: req.body.type,
                        category: req.body.category
                    }
                };
                db.collection("events").updateOne({
                    id: req.body.id
                }, newvalues, (err, result) => {
                    if (err) res.status(400).send(new response.BAD_REQUEST(false, err, "Database Error").response);
                    res.send(new response.SUCCESS(true, null, "Successfully updated").response);
                });
            } else {
                let newvalues = {
                    $set: {
                        title: req.body.title,
                        desp: req.body.desp,
                        price: req.body.price,
                        type: req.body.type,
                        category: req.body.category
                    }
                };
                db.collection("events").updateOne({
                    id: req.body.id
                }, newvalues, (err, result) => {
                    if (err) res.status(400).send(new response.BAD_REQUEST(false, err, "Database Error").response);
                    res.send(new response.SUCCESS(true, null, "Successfully updated").response);
                });
            }
        });

    } catch (err) {
        res.status(400).send(new response.BAD_REQUEST(false, err, "Failed").response);
    }
}

// event packages

const getSinglePackage = async (req, res) => {
    try {
        db.collection("packages").find({
            id: req.query.id
        }).toArray((err, result) => {
            if (err) res.send(new response.BAD_REQUEST(false, err, "Database Error").response);
            if (result.length == 0) {
                res.send(new response.SUCCESS(true, null, "Success").response);
            } else {
                for (let i = 0; i < result.length; i++) {
                    result[i].imgUrl = `${req.protocol}://${req.get('host')}/${result[i].path}/${result[i].fileName}`;
                }
                res.send(new response.SUCCESS(true, result, "Success").response);
            }
        });
    } catch (err) {
        res.status(400).send(new response.BAD_REQUEST(false, err, "Failed").response);
    }
}

const getAllPackages = async (req, res) => {
    try {
        db.collection("packages").find({
            divName: 'event_packages',
            event_id: req.query.event_id
        }).toArray((err, result) => {
            if (err) res.send(new response.BAD_REQUEST(false, err, "Database Error").response);
            if (result.length == 0) {
                res.send(new response.SUCCESS(true, null, "Success").response);
            } else {
                for (let i = 0; i < result.length; i++) {
                    result[i].imgUrl = `${req.protocol}://${req.get('host')}/${result[i].path}/${result[i].fileName}`;
                }
                res.send(new response.SUCCESS(true, result, "Success").response);
            }
        });
    } catch (err) {
        res.status(400).send(new response.BAD_REQUEST(false, err, "Failed").response);
    }
}

const setPackages = async (req, res) => {
    try {
        let file = req.files.file;
        let file_name = file.name;

        let file_path = 'uploads/home/packages';
        var dir = 'public/uploads/home';
        if (!fs.existsSync(dir)) {
            await fs.mkdirSync(dir);
            await fs.mkdirSync(dir + '/packages');
        }
        if (!fs.existsSync(`public/${file_path}`)) {
            await fs.mkdirSync(dir + '/packages');
        }
        await file.mv(`public/${file_path}/${file_name}`, (err) => {
            if (err) {
                res.status(400).send(new response.BAD_REQUEST(false, err, "File store error").response);;
            }
            req_data = {
                id: new Date().getTime().toString(),
                divName: 'event_packages',
                path: file_path,
                fileName: file_name,
                title: req.body.title,
                desp: req.body.desp,
                price: req.body.price,
                type: req.body.type,
                duration: req.body.duration,
                date: req.body.date,
                overview: req.body.overview,
                details: req.body.details,
                faq: req.body.faq,
                event_id: req.body.event_id
            };
            db.collection("packages").insertOne(req_data, (err, result) => {
                if (err) res.status(400).send(new response.BAD_REQUEST(false, err, "Database Error").response);
                res.send(new response.SUCCESS(true, null, "Successfully added").response);
            });
        });
    } catch (err) {
        res.status(400).send(new response.BAD_REQUEST(false, err, "Failed").response);
    }
}

const updatePackages = async (req, res) => {
    try {
        db.collection("packages").find({
            id: req.body.id
        }).toArray(async (err, result) => {
            if (result.length == 0) {
                res.status(200).send(new response.SUCCESS(false, null, "Wrong id").response);
            }
            if (req.files) {
                if (fs.existsSync(`public/${result[0].path}/${result[0].fileName}`)) {
                    await fs.unlinkSync(`public/${result[0].path}/${result[0].fileName}`);
                }
                let file = req.files.file;
                let file_path = 'uploads/home/packages';
                let file_name = file.name;
                await file.mv(`public/${file_path}/${file_name}`, (err) => {
                    if (err) {
                        return res.status(400).send(new response.BAD_REQUEST(false, err, "File store error").response);;
                    }
                });
                let newvalues = {
                    $set: {
                        path: file_path,
                        fileName: file_name,
                        title: req.body.title,
                        desp: req.body.desp,
                        price: req.body.price,
                        type: req.body.type,
                        duration: req.body.duration,
                        date: req.body.date,
                        overview: req.body.overview,
                        details: req.body.details,
                        faq: req.body.faq
                    }
                };
                db.collection("packages").updateOne({
                    id: req.body.id
                }, newvalues, (err, result) => {
                    if (err) res.status(400).send(new response.BAD_REQUEST(false, err, "Database Error").response);
                    res.send(new response.SUCCESS(true, null, "Successfully updated").response);
                });
            } else {
                let newvalues = {
                    $set: {
                        title: req.body.title,
                        desp: req.body.desp,
                        price: req.body.price,
                        type: req.body.type,
                        duration: req.body.duration,
                        date: req.body.date,
                        overview: req.body.overview,
                        details: req.body.details,
                        faq: req.body.faq
                    }
                };
                db.collection("packages").updateOne({
                    id: req.body.id
                }, newvalues, (err, result) => {
                    if (err) res.status(400).send(new response.BAD_REQUEST(false, err, "Database Error").response);
                    res.send(new response.SUCCESS(true, null, "Successfully updated").response);
                });
            }
        });

    } catch (err) {
        res.status(400).send(new response.BAD_REQUEST(false, err, "Failed").response);
    }
}

// get popular events

const getPopularEvents = async (req, res) => {
    try {
        db.collection("events").find({
            divName: 'events',
            type: 'popular'
        }).toArray((err, result) => {
            if (err) res.send(new response.BAD_REQUEST(false, err, "Database Error").response);
            if (result.length == 0) {
                res.send(new response.SUCCESS(true, null, "Success").response);
            } else {
                for (let i = 0; i < result.length; i++) {
                    result[i].imgUrl = `${req.protocol}://${req.get('host')}/${result[i].path}/${result[i].fileName}`;
                }
                res.send(new response.SUCCESS(true, result, "Success").response);
            }
        });
    } catch (err) {
        res.status(400).send(new response.BAD_REQUEST(false, err, "Failed").response);
    }
}

const setPopularEvents = async (req, res) => {
    try {
        let newvalues = {
            $set: {
                type: 'popular',
            }
        };
        db.collection("packages").updateOne({
            id: req.body.id
        }, newvalues, (err, result) => {
            if (err) res.status(400).send(new response.BAD_REQUEST(false, err, "Database Error").response);
            res.send(new response.SUCCESS(true, null, "Successfully updated").response);
        });
    } catch (err) {
        res.status(400).send(new response.BAD_REQUEST(false, err, "Failed").response);
    }
}


// tours

const getSingleTour = async (req, res) => {
    try {
        db.collection("tours").find({
            id: req.query.id
        }).toArray((err, result) => {
            if (err) res.send(new response.BAD_REQUEST(false, err, "Database Error").response);
            if (result.length == 0) {
                res.send(new response.SUCCESS(true, null, "Success").response);
            } else {
                for (let i = 0; i < result.length; i++) {
                    result[i].imgUrl = `${req.protocol}://${req.get('host')}/${result[i].path}/${result[i].fileName}`;
                }
                res.send(new response.SUCCESS(true, result, "Success").response);
            }
        });
    } catch (err) {
        res.status(400).send(new response.BAD_REQUEST(false, err, "Failed").response);
    }
}

const getAllTours = async (req, res) => {
    try {
        db.collection("tours").find({}).toArray((err, result) => {
            if (err) res.send(new response.BAD_REQUEST(false, err, "Database Error").response);
            if (result.length == 0) {
                res.send(new response.SUCCESS(true, null, "Success").response);
            } else {
                for (let i = 0; i < result.length; i++) {
                    result[i].imgUrl = `${req.protocol}://${req.get('host')}/${result[i].path}/${result[i].fileName}`;
                }
                res.send(new response.SUCCESS(true, result, "Success").response);
            }
        });
    } catch (err) {
        res.status(400).send(new response.BAD_REQUEST(false, err, "Failed").response);
    }
}

const setTours = async (req, res) => {
    try {
        let file = req.files.file;
        let file_name = file.name;

        let file_path = 'uploads/home/tours';
        var dir = 'public/uploads/home';
        if (!fs.existsSync(dir)) {
            await fs.mkdirSync(dir);
            await fs.mkdirSync(dir + '/tours');
        }
        if (!fs.existsSync(`public/${file_path}`)) {
            await fs.mkdirSync(dir + '/tours');
        }
        await file.mv(`public/${file_path}/${file_name}`, (err) => {
            if (err) {
                res.status(400).send(new response.BAD_REQUEST(false, err, "File store error").response);;
            }
            req_data = {
                id: new Date().getTime().toString(),
                divName: 'tours',
                path: file_path,
                fileName: file_name,
                title: req.body.title,
                desp: req.body.desp,
                type: req.body.type
            };
            db.collection("tours").insertOne(req_data, (err, result) => {
                if (err) res.status(400).send(new response.BAD_REQUEST(false, err, "Database Error").response);
                res.send(new response.SUCCESS(true, null, "Successfully added").response);
            });
        });
    } catch (err) {
        res.status(400).send(new response.BAD_REQUEST(false, err, "Failed").response);
    }
}

const updateTours = async (req, res) => {
    try {
        db.collection("tours").find({
            id: req.body.id
        }).toArray(async (err, result) => {
            if (result.length == 0) {
                res.status(200).send(new response.SUCCESS(false, null, "Wrong id").response);
            }
            if (req.files) {
                if (fs.existsSync(`public/${result[0].path}/${result[0].fileName}`)) {
                    await fs.unlinkSync(`public/${result[0].path}/${result[0].fileName}`);
                }
                let file = req.files.file;
                let file_path = 'uploads/home/tours';
                let file_name = file.name;
                await file.mv(`public/${file_path}/${file_name}`, (err) => {
                    if (err) {
                        return res.status(400).send(new response.BAD_REQUEST(false, err, "File store error").response);;
                    }
                });
                let newvalues = {
                    $set: {
                        path: file_path,
                        fileName: file_name,
                        title: req.body.title,
                        desp: req.body.desp,
                        type: req.body.type
                    }
                };
                db.collection("tours").updateOne({
                    id: req.body.id
                }, newvalues, (err, result) => {
                    if (err) res.status(400).send(new response.BAD_REQUEST(false, err, "Database Error").response);
                    res.send(new response.SUCCESS(true, null, "Successfully updated").response);
                });
            } else {
                let newvalues = {
                    $set: {
                        title: req.body.title,
                        desp: req.body.desp,
                        type: req.body.type
                    }
                };
                db.collection("tours").updateOne({
                    id: req.body.id
                }, newvalues, (err, result) => {
                    if (err) res.status(400).send(new response.BAD_REQUEST(false, err, "Database Error").response);
                    res.send(new response.SUCCESS(true, null, "Successfully updated").response);
                });
            }
        });

    } catch (err) {
        res.status(400).send(new response.BAD_REQUEST(false, err, "Failed").response);
    }
}

// tour packages

const getSingleTourPackage = async (req, res) => {
    try {
        db.collection("packages").find({
            id: req.query.id
        }).toArray((err, result) => {
            if (err) res.send(new response.BAD_REQUEST(false, err, "Database Error").response);
            if (result.length == 0) {
                res.send(new response.SUCCESS(true, null, "Success").response);
            } else {
                for (let i = 0; i < result.length; i++) {
                    result[i].imgUrl = `${req.protocol}://${req.get('host')}/${result[i].path}/${result[i].fileName}`;
                }
                res.send(new response.SUCCESS(true, result, "Success").response);
            }
        });
    } catch (err) {
        res.status(400).send(new response.BAD_REQUEST(false, err, "Failed").response);
    }
}

const getAllTourPackages = async (req, res) => {
    try {
        db.collection("packages").find({
            divName: 'tour_packages',
            tour_id: req.query.tour_id
        }).toArray((err, result) => {
            if (err) res.send(new response.BAD_REQUEST(false, err, "Database Error").response);
            if (result.length == 0) {
                res.send(new response.SUCCESS(true, null, "Success").response);
            } else {
                for (let i = 0; i < result.length; i++) {
                    result[i].imgUrl = `${req.protocol}://${req.get('host')}/${result[i].path}/${result[i].fileName}`;
                }
                res.send(new response.SUCCESS(true, result, "Success").response);
            }
        });
    } catch (err) {
        res.status(400).send(new response.BAD_REQUEST(false, err, "Failed").response);
    }
}

const setTourPackages = async (req, res) => {
    try {
        let file = req.files.file;
        let file_name = file.name;

        let file_path = 'uploads/home/tours';
        var dir = 'public/uploads/home';
        if (!fs.existsSync(dir)) {
            await fs.mkdirSync(dir);
            await fs.mkdirSync(dir + '/tours');
        }
        if (!fs.existsSync(`public/${file_path}`)) {
            await fs.mkdirSync(dir + '/tours');
        }
        await file.mv(`public/${file_path}/${file_name}`, (err) => {
            if (err) {
                res.status(400).send(new response.BAD_REQUEST(false, err, "File store error").response);;
            }
            req_data = {
                id: new Date().getTime().toString(),
                divName: 'tour_packages',
                path: file_path,
                fileName: file_name,
                title: req.body.title,
                desp: req.body.desp,
                price: req.body.price,
                type: req.body.type,
                duration: req.body.duration,
                date: req.body.date,
                overview: req.body.overview,
                details: req.body.details,
                faq: req.body.faq,
                tour_id: req.body.tour_id
            };
            db.collection("packages").insertOne(req_data, (err, result) => {
                if (err) res.status(400).send(new response.BAD_REQUEST(false, err, "Database Error").response);
                res.send(new response.SUCCESS(true, null, "Successfully added").response);
            });
        });
    } catch (err) {
        res.status(400).send(new response.BAD_REQUEST(false, err, "Failed").response);
    }
}

const updateTourPackages = async (req, res) => {
    try {
        db.collection("packages").find({
            id: req.body.id
        }).toArray(async (err, result) => {
            if (result.length == 0) {
                res.status(200).send(new response.SUCCESS(false, null, "Wrong id").response);
            }

            if (req.files) {
                if (fs.existsSync(`public/${result[0].path}/${result[0].fileName}`)) {
                    await fs.unlinkSync(`public/${result[0].path}/${result[0].fileName}`);
                }

                let file = req.files.file;
                let file_path = 'uploads/home/tour';
                let file_name = file.name;
                await file.mv(`public/${file_path}/${file_name}`, (err) => {
                    if (err) {
                        return res.status(400).send(new response.BAD_REQUEST(false, err, "File store error").response);;
                    }
                });
                let newvalues = {
                    $set: {
                        path: file_path,
                        fileName: file_name,
                        title: req.body.title,
                        desp: req.body.desp,
                        price: req.body.price,
                        type: req.body.type,
                        duration: req.body.duration,
                        date: req.body.date,
                        overview: req.body.overview,
                        details: req.body.details,
                        faq: req.body.faq
                    }
                };
                db.collection("packages").updateOne({
                    id: req.body.id
                }, newvalues, (err, result) => {
                    if (err) res.status(400).send(new response.BAD_REQUEST(false, err, "Database Error").response);
                    res.send(new response.SUCCESS(true, null, "Successfully updated").response);
                });
            } else {
                let newvalues = {
                    $set: {
                        title: req.body.title,
                        desp: req.body.desp,
                        price: req.body.price,
                        type: req.body.type,
                        duration: req.body.duration,
                        date: req.body.date,
                        overview: req.body.overview,
                        details: req.body.details,
                        faq: req.body.faq
                    }
                };
                db.collection("packages").updateOne({
                    id: req.body.id
                }, newvalues, (err, result) => {
                    if (err) res.status(400).send(new response.BAD_REQUEST(false, err, "Database Error").response);
                    res.send(new response.SUCCESS(true, null, "Successfully updated").response);
                });
            }
        });

    } catch (err) {
        res.status(400).send(new response.BAD_REQUEST(false, err, "Failed").response);
    }
}

// get popular events

const getPopularTours = async (req, res) => {
    try {
        db.collection("packages").find({
            divName: 'tour_packages',
            type: 'popular'
        }).toArray((err, result) => {
            if (err) res.send(new response.BAD_REQUEST(false, err, "Database Error").response);
            if (result.length == 0) {
                res.send(new response.SUCCESS(true, null, "Success").response);
            } else {
                for (let i = 0; i < result.length; i++) {
                    result[i].imgUrl = `${req.protocol}://${req.get('host')}/${result[i].path}/${result[i].fileName}`;
                }
                res.send(new response.SUCCESS(true, result, "Success").response);
            }
        });
    } catch (err) {
        res.status(400).send(new response.BAD_REQUEST(false, err, "Failed").response);
    }
}

const setPopularTours = async (req, res) => {
    try {
        let newvalues = {
            $set: {
                type: 'popular',
            }
        };
        db.collection("tours").updateOne({
            id: req.body.id
        }, newvalues, (err, result) => {
            if (err) res.status(400).send(new response.BAD_REQUEST(false, err, "Database Error").response);
            res.send(new response.SUCCESS(true, null, "Successfully updated").response);
        });
    } catch (err) {
        res.status(400).send(new response.BAD_REQUEST(false, err, "Failed").response);
    }
}

const getFeaturedEvents = async (req, res) => {
    try {
        db.collection("packages").find({
            divName: 'event_packages',
            type: 'featured',
            tour_id: req.query.tour_id
        }).toArray((err, result) => {
            if (err) res.send(new response.BAD_REQUEST(false, err, "Database Error").response);
            if (result.length == 0) {
                res.send(new response.SUCCESS(true, null, "Success").response);
            } else {
                for (let i = 0; i < result.length; i++) {
                    result[i].imgUrl = `${req.protocol}://${req.get('host')}/${result[i].path}/${result[i].fileName}`;
                }
                res.send(new response.SUCCESS(true, result, "Success").response);
            }
        });
    } catch (err) {
        res.status(400).send(new response.BAD_REQUEST(false, err, "Failed").response);
    }
}

const getPopularTreks = async (req, res) => {
    try {
        db.collection("events").find({
            category: 'trekking'
        }).toArray((err, result_event) => {
            if (result_event.length > 0) {
                db.collection("packages").find({
                    divName: 'event_packages',
                    type: 'popular',
                    event_id: result_event[0].id
                }).toArray((err, result) => {
                    if (err) res.send(new response.BAD_REQUEST(false, err, "Database Error").response);
                    if (result.length == 0) {
                        res.send(new response.SUCCESS(true, null, "Success").response);
                    } else {
                        for (let i = 0; i < result.length; i++) {
                            result[i].imgUrl = `${req.protocol}://${req.get('host')}/${result[i].path}/${result[i].fileName}`;
                        }
                        res.send(new response.SUCCESS(true, result, "Success").response);
                    }
                });
            }
        });
    } catch (err) {
        res.status(400).send(new response.BAD_REQUEST(false, err, "Failed").response);
    }
}

const getAllTreks = async (req, res) => {
    try {
        db.collection("events").find({
            category: 'trekking'
        }).toArray((err, result_event) => {
            if (result_event['status'] == true) {
                if (result_event['result'] != null) {
                    db.collection("packages").find({
                        divName: 'event_packages',
                        event_id: result_event['result'][0]['id']
                    }).toArray((err, result) => {
                        if (err) res.send(new response.BAD_REQUEST(false, err, "Database Error").response);
                        if (result.length == 0) {
                            res.send(new response.SUCCESS(true, null, "Success").response);
                        } else {
                            for (let i = 0; i < result.length; i++) {
                                result[i].imgUrl = `${req.protocol}://${req.get('host')}/${result[i].path}/${result[i].fileName}`;
                            }
                            res.send(new response.SUCCESS(true, result, "Success").response);
                        }
                    });
                }
            }
        });
    } catch (err) {
        res.status(400).send(new response.BAD_REQUEST(false, err, "Failed").response);
    }
}

const deleteEvents = async (req, res) => {
    try {
        db.collection("events").find({
            id: req.query.id
        }).toArray((err, result_event) => {
            if (result_event.length > 0) {
                db.collection("packages").find({ event_id: req.query.id }).toArray((err, result) => {
                    result.forEach(row => {
                        if (fs.existsSync(`public/${result[0].path}/${result[0].fileName}`)) {
                            fs.unlinkSync(`public/${result[0].path}/${result[0].fileName}`);
                        }
                        db.collection("packages").deleteOne({ id: result[0].id }, function (err, obj) {
                            if (err) res.send(new response.BAD_REQUEST(false, err, "Database Error").response);
                        });
                    });
                    if (fs.existsSync(`public/${result_event[0].path}/${result_event[0].fileName}`)) {
                        fs.unlinkSync(`public/${result_event[0].path}/${result_event[0].fileName}`);
                    }
                    db.collection("events").deleteOne({ id: req.query.id }, function (err, obj) {
                        if (err) res.send(new response.BAD_REQUEST(false, err, "Database Error").response);
                        res.send(new response.SUCCESS(true, null, "Successfully deleted").response);
                    });
                });
            } else {
                res.status(200).send(new response.SUCCESS(false, null, "Not found").response);
            }
        });
    } catch (err) {
        res.status(400).send(new response.BAD_REQUEST(false, err, "Failed").response);
    }
}

const deleteTours = async (req, res) => {
    try {
        db.collection("tours").find({
            id: req.query.id
        }).toArray((err, result_event) => {
            if (result_event.length > 0) {
                db.collection("packages").find({ tour_id: req.query.id }).toArray((err, result) => {
                    result.forEach(row => {
                        if (fs.existsSync(`public/${result[0].path}/${result[0].fileName}`)) {
                            fs.unlinkSync(`public/${result[0].path}/${result[0].fileName}`);
                        }
                        db.collection("packages").deleteOne({ id: result[0].id }, function (err, obj) {
                            if (err) res.send(new response.BAD_REQUEST(false, err, "Database Error").response);
                        });
                    });
                    if (fs.existsSync(`public/${result_event[0].path}/${result_event[0].fileName}`)) {
                        fs.unlinkSync(`public/${result_event[0].path}/${result_event[0].fileName}`);
                    }
                    db.collection("tours").deleteOne({ id: req.query.id }, function (err, obj) {
                        if (err) res.send(new response.BAD_REQUEST(false, err, "Database Error").response);
                        res.send(new response.SUCCESS(true, null, "Successfully deleted").response);
                    });
                });
            } else {
                res.status(200).send(new response.SUCCESS(false, null, "Not found").response);
            }
        });
    } catch (err) {
        res.status(400).send(new response.BAD_REQUEST(false, err, "Failed").response);
    }
}


const deletePackages = async (req, res) => {
    try {
        db.collection("packages").find({
            id: req.query.id
        }).toArray((err, result_event) => {
            if (result_event.length > 0) {
                if (fs.existsSync(`public/${result[0].path}/${result[0].fileName}`)) {
                    fs.unlinkSync(`public/${result[0].path}/${result[0].fileName}`);
                }
                db.collection("packages").deleteOne({ id: req.query.id }, function (err, obj) {
                    if (err) res.send(new response.BAD_REQUEST(false, err, "Database Error").response);
                    res.send(new response.SUCCESS(true, null, "Successfully delted").response);
                })

            } else {
                res.status(200).send(new response.SUCCESS(false, null, "Not found").response);
            }
        });
    } catch (err) {
        res.status(400).send(new response.BAD_REQUEST(false, err, "Failed").response);
    }
}

module.exports = {
    getHomeVideo,
    setHomeVideo,
    updateHomeVideo,
    getHomeMainSlideShow,
    setHomeMainSlideShow,
    updateHomeMainSlideShow,
    getSingleEvent,
    getAllEvents,
    setEvents,
    updateEvents,
    getSinglePackage,
    getAllPackages,
    setPackages,
    updatePackages,
    getPopularEvents,
    setPopularEvents,
    getSingleTour,
    getAllTours,
    setTours,
    updateTours,
    getSingleTourPackage,
    getAllTourPackages,
    setTourPackages,
    updateTourPackages,
    getPopularTours,
    setPopularTours,
    getFeaturedEvents,
    getPopularTreks,
    getAllTreks,
    deletePackages,
    deleteTours,
    deleteEvents
}