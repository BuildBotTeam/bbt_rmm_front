import axios, {AxiosError} from 'axios'

const actualUrl = {
    hostname: window.location.hostname,
    port: window.location.port,
    protocol: window.location.protocol,
}

// const actualUrl = {
//     hostname: '192.168.252.192',
//     port: '4000',
//     protocol: 'http:'
// }

export function getHostname() {
    const {hostname, port, protocol} = actualUrl
    return `${protocol}//${hostname}${port ? ':' + port : ''}`
}

export const apiUrl = `${getHostname()}/backend/api/`
// export const apiUrl = `${getHostname()}/api/`
export const wsUrl = getHostname().replace('http', 'ws') + '/backend/ws'
// export const wsUrl = getHostname().replace('http', 'ws') + '/ws'

const api = axios.create({
    baseURL: apiUrl,
    responseType: "json",
});

export interface IApiError {
    code: number
    message: string
}

export const apiError = (e: Error | AxiosError) => {
    if (axios.isAxiosError(e)) {
        let data = e.response?.data
        if (typeof data === 'string' && data.length < 100) return {code: e.response?.status, message: data}
        return {code: e.response?.status, message: e.message.toString()}
    }
    return {code: 0, message: e?.message}
}

export default api