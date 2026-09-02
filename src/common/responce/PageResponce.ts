export default class PageResponse {

    pageSize: number;
    page: number;
    totalPages: number;
    total: number

    constructor(pageSize?: number, page?: number, total?: number) {
        this.pageSize = pageSize || 0;
        this.page = page || 0;
        this.totalPages = Math.ceil(total / pageSize) || 0;
        this.total = total || 0;
    }
}