const userSchema = require("../models/user")

module.exports = {
    login: async (req, res, next) => {
        try {
            if(req.body == null) {
                res.json({
                    success: false,
                });
                res.status(500).send();
            }
            const doc = await userSchema.findOne(req.body);
            const data = JSON.parse(JSON.stringify(doc));
            if (doc != null) {
                delete data.password;
                console.log("login successful", data)
                res.json({
                    success: true,
                    data: data
                });
            } else {
                console.log("user not found", doc)
                res.status(200).json({
                    success: false,
                    data: doc
                });
                //res.status(500).send();
            }
        } catch (error) {
            console.log("user not found")
            console.log(error)
            res.status(404).json({
                success: false,
                data: doc
            });
            //res.status(404).send();
        }
    },
    register: (req, res, next) => {
        try {
            const user = new userSchema({
                userEmailId: req.body.userEmailId,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                location: req.body.location,
            });
            user.save().then(result => {
                    console.log(result);
                })
                .catch(error => {
                    console.log(error);
                });
            console.log("new user registered");
            res.json({
                success: true
            });
        } catch (error) {
            console.log(error);
            res.json({
                success: false
            });
        }
    },
    resetPasswordEmail: async (req, res, next) => {
        const doc = await userSchema.findOne(req.body);
        const data = JSON.parse(JSON.stringify(doc));

        if (doc != null) {
            delete data["userEmailId"];
            delete data["password"];
            delete data["firstName"];
            delete data["lastName"];
            console.log("user exist with email: ", doc["userEmailId"])
            res.json({
                success: true,
                data: data
            });
        } else {
            console.log("user not found!")
            res.json({
                success: false,
                data: doc
            });
        }
    },
    passwordUpdateConfirmation: (req, res, next) => {
        const doc = req.body;
        newUser.findOne({
            userEmailId: doc["userEmailId"]
        }, function (err, foundObject) {
            if (err) {
                console.log(err);
                res.json({
                    success: false
                });
                res.status(500).send();
            } else {
                if (!foundObject) {
                    res.status(404).send();
                    res.json({
                        success: false
                    });
                } else {
                    if (req.body.password) {
                        foundObject.password = req.body.password;
                    }
                    foundObject.save(function (err, updatedObject) {
                        if (err) {
                            console.log(err);
                            res.json({
                                success: false
                            });
                            res.status(500).send();
                        } else {
                            res.json({
                                success: true
                            });
                        }
                    });
                }
            }
        });
    }
}