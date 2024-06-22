import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (
    req: Request,
    { params }: { params: { date: string } }, 
    res: NextResponse) => {

    const beginDate = new Date(params.date);
    const endDate = new Date(beginDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    const users = await prisma.schedules_tbl.findMany({
      where: {
        begin_time: {
          gte: beginDate,
          lte: endDate,
        },
      },
    });
    return NextResponse.json(users);
}