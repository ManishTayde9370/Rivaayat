const jwt = require('jsonwebtoken');
const secret = "5af6e93f-6423-4bf9-b9ad-ced8df0ce641"; 

const authController = {
    login: (req, res) => {
        const { identity, password } = req.body;

        // Replace this with DB/user service lookup
        const validUsers = [
            {
                username: 'admin',
                email: 'Tejas17@example.com',
                phone: '9876543210',
                password: 'admin',
                name: 'Tejas'
            }
        ];

        const user = validUsers.find(user =>
            (user.username === identity || user.email === identity || user.phone === identity) &&
            user.password === password
        );

        if (user) {
            const tokenPayload = {
                username: user.username,
                name: user.name,
                email: user.email
            };

            const token = jwt.sign(tokenPayload, secret, { expiresIn: '1h' });

            res.cookie('jwtToken', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
                path: '/'
            });

            return res.status(200).json({
                success: true,
                message: "User authenticated successfully",
                username: user.username
            });
        } else {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
    },

    logout: (req, res) => {
        res.clearCookie('jwtToken');
        return res.json({ message: "User logged out successfully" });
    },

    isUserLoggedIn: (req, res) => {
        const token = req.cookies.jwtToken;

        if (!token) {
            return res.status(401).json({ message: "User not logged in" });
        }

        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid token" });
            }
            return res.json({ userDetails: decoded });
        });
    }
};

module.exports = authController;
