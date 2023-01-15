import prisma from "lib/prisma";

export default async function handle(req, res) {
    const { title, content, published } = req.body;
    if (req.method !== 'POST') {
        res.end('Method not allowed')
    }
    const result = await prisma.posts.create({
        data: { title, content, published },
    });
    const status = result ? 200 : 400;
    return res.status(status).json(result);
}