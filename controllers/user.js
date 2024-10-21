const User = require("../models/user")

async function handleUserSignup(req,res){
    const { name, email, password } = req.body;
    await User.create({
        name,
        email,
        password
    });

    return res.render('login');
};

//for login 
async function handleUserLogin(req, res) {
    try {
        const { email, password } = req.body;
        // Find the user in the database
        const foundUser = await User.findOne({ email, password });

        // If no user is found, render login page with error
        if (!foundUser) {
            return res.render('login', {
                error: 'Invalid Email or Password'
            });
        }

        // Redirect to homepage on successful login
        return res.redirect('/');
    } catch (error) {
        console.error("Error during user login:", error);
        return res.status(500).render('login', {
            error: "An error occurred during login. Please try again."
        });
    }
}


module.exports = {
    handleUserSignup,
    handleUserLogin
}