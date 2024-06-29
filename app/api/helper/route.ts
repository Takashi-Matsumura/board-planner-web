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

export const POST = async (req: Request, res: NextResponse) => {
  const { name, active } = await req.json();

  const activeBoolean = active === "true";  

  const new_user = await prisma.helper_tbl.create({
    data: {
        name,
        active: activeBoolean,
    },
  });
  return NextResponse.json(new_user);
}