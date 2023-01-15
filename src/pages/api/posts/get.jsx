import prisma from "lib/prisma";

export default async function handle(req, res) {
    const result = await prisma.posts.findMany();
    if(result === null) {
        res.end('No posts found')
    }
    
    const status = result ? 200 : 400;
    return res.status(status).json(result);
}