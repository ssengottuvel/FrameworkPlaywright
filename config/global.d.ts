export { };

declare global {
    namespace NodeJS {
        interface ProcessEnv {
           
            APP_URL: string,
           
        }
    }
}