const formController = ( () => {

    'use strict';
   
    const utilityHelper = require('../../helpers/utilities.helpers');
    const userPannel = require('../../../routes/userPannel');
    
    function forms() {}

    const _p = forms.prototype;

    // _p.setReview =  async(req, res, next) => {
    //     try{
    //         console.log("**************")
    //     }catch(e){  
    //         console.log("**********Error**********")
    //     }
    // }
    
    _p.setReview =  userPannel.addReview;

    _p.getReview =  async(req, res, next) => {
        try{
            console.log("**************");
        }catch(e){  
            console.log("**********Error**********")
        }
    }


    return {
        setReview : _p.setReview,
        getReview : _p.getReview
    }
})();

module.exports =  formController;