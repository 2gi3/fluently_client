
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            WEATHER_API_KEY: string;
            WEB_SOCKET_URL: string;
            SERVER_URL: string;
            //New environment variables must be added here
        }
    }
}