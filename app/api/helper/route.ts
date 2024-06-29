import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (
    req: Request,
    res: NextResponse) => {

    const users = await prisma.helper_tbl.findMany({
      orderBy: {
        id: "asc",
      },
    });
    return NextResponse.json(users);
}