export interface Product{
    id:string,
    name:string,
    price:number,
    promotion:boolean;
}
export interface PageProducts{
    page : number;
    size : number;
    totalPages : number;
    products : Product[];
}