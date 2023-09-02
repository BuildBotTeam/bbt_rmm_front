export type MikRouterType = {
    id: string
    name: string
    host: string
    username: string
    password: string
    user_id: string
    logs: MikRouterLogType[]
}

export type MikRouterLogType = {
    time: string
    topics: string
    message: string
}