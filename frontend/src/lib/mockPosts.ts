import {Post} from "@/types/components/post";

const sampleAuthors = [
    {id: 1, handle: '@ava', fullName: 'Ava'},
    {id: 2, handle: '@liam', fullName: 'Liam'},
    {id: 3, handle: '@noah', fullName: 'Noah'},
    {id: 4, handle: '@sophia', fullName: 'Sophia'},
    {id: 5, handle: '@emma', fullName: 'Emma'}
];

function randomFrom<T>(arr: T[]) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function makePost(id: number) {
    const author = randomFrom(sampleAuthors);
    const textSamples = [
        'Loving the new UI patterns emerging this year — so many possibilities!',
        'Working on a small side project. Coffee is flowing ☕',
        'Here’s a thread on composable architecture... (1/5)',
        'Just shipped a small improvement to our app — velocity is real.',
        'What are your favourite accessibility resources for web dev?'
    ];

    return {
        id: id,
        author,
        content: randomFrom(textSamples) + (Math.random() > 0.7 ? ' #dev' : ''),
        createdAt: Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 7) // last 7 days
    };
}

const TOTAL_POSTS = 200;
const STORE: Post[] = Array.from({length: TOTAL_POSTS}).map((_, i) => makePost(i + 1));

export async function fetchPosts({page = 1, limit = 10}: { page?: number; limit?: number }) {
    // simulate network delay
    await new Promise((r) => setTimeout(r, 400 + Math.random() * 600));
    const start = (page - 1) * limit;
    const items = STORE.slice(start, start + limit);
    const hasMore = start + limit < STORE.length;
    return {items, hasMore};
}