const jwt = require('jsonwebtoken');
const secret = "5af6e93f-6423-4bf9-b9ad-ced8df0ce641"; // Should be in env vars in production

const authController = {
    login: (request, response) => {
        const { username, password } = request.body;

        if (username === "admin" && password === "admin") {
            const userDetails = {
                name: "Tejas",
                email: "Tejas17@example.com",
            };
            const token = jwt.sign(userDetails, secret, { expiresIn: '1h' });

            response.cookie('jwtToken', token, {
                httpOnly: true,
                secure: false, // Set to true only with HTTPS in production
                sameSite: 'strict',
                path: '/'
            });

            return response.status(200).json({ message: "User authenticated successfully", userDetails });
        } else {
            return response.status(401).json({ message: "Invalid credentials" });
        }
    },

    logout: (request, response) => {
        response.clearCookie('jwtToken');
        return response.json({ message: "User logged out successfully" });
    },

    isUserLoggedIn: (request, response) => {
        const token = request.cookies.jwtToken;

        if (!token) {
            return response.status(401).json({ message: "User not logged in" });
        }

        jwt.verify(token, secret, (error, decodedSecret) => {
            if (error) {
                return response.status(401).json({ message: "Invalid token" });
            } else {
                return response.json({ userDetails: decodedSecret });
            }
        });
    },
};

module.exports = authController;
