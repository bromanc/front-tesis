import config from '../../auth_config.json';

const {domain, clientId, audience, apiUri, redirectUri, errorPath} = config as {
    domain: string;
    clientId: string;
    audience?: string;
    apiUri: string;
    redirectUri: string;
    errorPath: string;
};

export const environment = {
    production: false,
    auth: {
        domain,
        clientId,
        ...(audience && audience !== 'https://processmanagementapi.com' ? {audience} : null),
        redirectUri,
        errorPath,
    },
    httpInterceptor: {
        allowedList:
            [
                {
                    uri: `${apiUri}/*`,
                    tokenOptions: {
                        audience: 'https://processmanagementapi.com',
                        scope: 'read:sidebar',
                        prompt: 'consent'
                    },
                },
            ],
    },
};
