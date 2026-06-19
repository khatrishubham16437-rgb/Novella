const express = require('express');

const {users} = require('../data/users.json');

const {getAllUsers, getSingleUserById , createUser , updateUserById , deleteUserById , getSubscriptionDetailsById} = require('../controllers/user_controller');

const router = express.Router();



/*
route = /users
method = get
description = get all users
access = public
parameters = none
*/

router.get("/",getAllUsers);

/*
route = /users/:id
method = get
description = get a user by id
access = public
parameters = id
*/

router.get("/:id",getSingleUserById)

/*
route = /users
method = POST
description = create a user
access = public
parameters = none
*/
router.post("/",createUser)  

/*
route = /users/:id
method = PUT
description = updating user by their id
access = public
parameters = none
*/

router.put("/:id",updateUserById);

/*
route = /users/:id
method = DELEATE
description = deleating user by their id
access = public
parameters = none
*/
router.delete("/:id",deleteUserById)

/*
route = /users/subscription-details/:id
method = get
description = get all subscription details of a user by their id
access = public
parameters = id
*/


 router.get('/subscription-details/:id',getSubscriptionDetailsById);



module.exports = router;