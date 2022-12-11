const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const { auth } = require('express-oauth2-jwt-bearer');
const authConfig = require('./auth_config.json');

const app = express();

if (
    !authConfig.domain ||
    !authConfig.audience ||
    authConfig.audience === "https://processmanagementapi.com"
) {
    console.log(
        "Exiting: Please make sure that auth_config.json is in place and populated with valid domain and audience values"
    );

    process.exit();
}

app.use(morgan('dev'));
app.use(helmet());
app.use(
    cors({
        origin: authConfig.appUri,
    })
);

const checkJwt = auth({
    audience: authConfig.audience,
    issuerBaseURL: `https://${authConfig.domain}`,
});

app.get('http://localhost:3000/process/1913d3a0-8f26-4610-8d0c-cc5e57283d9a', checkJwt, (req, res) => {
    res.send({
        msg: 'Your access token was successfully validated!',
    });
});

const port = process.env.API_SERVER_PORT || 3001;

app.listen(port, () => console.log(`Api started on port ${port}`));
