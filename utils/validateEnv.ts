import { cleanEnv,str,port } from 'envalid'

const env = cleanEnv(process.env, {
    JWT_SECRET: str({default:"dccd"}),
    MONGO_PASSWORD: str({default:"sxsxs"}),
    MONGO_PATH: str(),
    MONGO_USER: str(),
    PORT: port(),
})