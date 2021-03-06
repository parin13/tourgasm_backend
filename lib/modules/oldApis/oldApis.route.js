const formRoutes = ( () => {
    'user strict';

    const express = require('express');
    const router = express.Router();
    const userPannel = require('../../../routes/userPannel');
    const home = require('../../../routes/home');


    // Home video
    router.get('/home/video', home.getHomeVideo);
    router.post('/home/video', home.setHomeVideo);
    router.put('/home/video', home.updateHomeVideo);

    // home main slide show
    router.get('/home/main/slideshow', home.getHomeMainSlideShow);
    router.post('/home/main/slideshow', home.setHomeMainSlideShow);
    router.put('/home/main/slideshow', home.updateHomeMainSlideShow);

    // events
    router.get('/events/all', home.getAllEvents);
    router.get('/events', home.getSingleEvent);
    router.post('/events', home.setEvents);
    router.put('/events', home.updateEvents);

    // events packages
    router.get('/events/package/all', home.getAllPackages);
    router.get('/events/package', home.getSinglePackage);
    router.post('/events/package', home.setPackages);
    router.put('/events/package', home.updatePackages);

    // tours
    router.get('/tours/all', home.getAllTours);
    router.get('/tours', home.getSingleTour);
    router.post('/tours', home.setTours);
    router.put('/tours', home.updateTours);

    // tour packages
    router.get('/tours/package/all', home.getAllTourPackages);
    router.get('/tours/package', home.getSingleTourPackage);
    router.post('/tours/package', home.setTourPackages);
    router.put('/tours/package', home.updateTourPackages);

    // popular events
    router.get('/events/popluar', home.getPopularEvents);
    router.put('/events/popluar', home.setPopularEvents);

    // popular tours
    router.get('/tours/popluar', home.getPopularTours);
    router.put('/tours/popluar', home.setPopularTours);

    // featured events
    router.get('/events/featured', home.getFeaturedEvents);

    // Treks
    router.get('/events/treks', home.getPopularTreks);
    router.get('/events/treks/all', home.getAllTreks);


    // remove 
    router.delete('/events', home.deleteEvents);
    router.delete('/tours', home.deleteTours);
    router.delete('/packages', home.deletePackages);


    router.post('/review',userPannel.addReview);
    router.get('/review',userPannel.getReviews);

    router.post('/enquire', userPannel.enquireNow);
    router.get('/enquire', userPannel.fetchEnquiry);

    return router;
})();

module.exports = formRoutes;