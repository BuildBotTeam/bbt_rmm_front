export type MikRouterType = {
    id: string
    name: string
    host: string
    username: string
    password: string
    version_os?: string
    user_id: string
    logs: MikRouterLogType[]
    status_log: MikRouterStatusLogType[]
    is_online: boolean
}

export type MikRouterLogType = {
    time: string
    topics: string
    message: string
}

export type MikRouterStatusLogType = {
    time: string
    bytes_in: string
    bytes_out: string
    online: boolean
}