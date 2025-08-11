export interface Author {
    id: number;
    handle: string;
    fullName: string;
}

export interface Post {
    id: number;
    author: Author;
    content: string;
}