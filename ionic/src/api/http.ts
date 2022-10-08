export enum METHOD {
    GET = 'GET',
    POST ='POST',
    PATCH ='PATCH',
    DELETE ='DELETE'
}

const headers = {
    "Accept": "application/json",
    "Content-type": "application/json"
}

class HttpService {

    private readonly _domain: string;

    constructor() {
        this._domain = 'https://dummyjson.com';
    }

    private joinUrl(baseURL: string, url: string): string {
        return `${baseURL}/${url}`;
    }

    public request(url: string, method = METHOD.POST, data?: any) {
        // creates the url
        url = this.joinUrl(this._domain, url);
        // create http options
        const options: any = {
            headers,
            method
        }

        if (data) {
            options.body = JSON.stringify({ ...data });
        }

        return fetch(url, options);
    }

    public post<T>(url: string, data: T) {
        return this.request(url, METHOD.POST).then(res => res.json());
    }

    public get<T>(url: string, id?: string | number): Promise<T> {
        if (id) {
            url = `${url}/${id}`
        }
        return this.request(url, METHOD.GET).then(res => res.json());
    }

    public delete<T>(url: string, id: string | number): Promise<T> {
        if (id) {
            url = `${url}/${id}`
        }
        return this.request(url, METHOD.DELETE).then(res => res.json());
    }

    public patch<T>(url: string, id: string | number): Promise<T> {
        if (id) {
            url = `${url}/${id}`
        }
        return this.request(url, METHOD.PATCH).then(res => res.json());
    }


}

export default HttpService;
