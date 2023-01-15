import prisma from "lib/prisma";


export default async function handle(req, res) {
    const { id } = req.query;
    if (req.method !== 'DELETE') {
        res.end('Method not allowed')
    }

    const check = await prisma.posts.findUnique({
        where: { id: id },
    });

    if (!check) {
        return res.status(400).json({ message: 'Post not found' });
    }

    const result = await prisma.posts.delete({
        where: { id: id },
    });

    const status = result ? 200 : 400;
    return res.status(status).json(result);
}
