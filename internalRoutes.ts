const Boom = require('@hapi/boom');

require('dotenv').config();

import { parseSonarPayload } from './parseSonar';

module.exports = [
    {
        method: 'POST',
        path: '/sonarcloud',
        options: {
            payload: {
                output: 'data',
                allow: 'application/json'
            }
        },
        handler: async (request, h) => {
            try {
                await parseSonarPayload(request);
                return "OK";
            } catch(err) {
                throw new Boom(err);
            }
        }
    }
];