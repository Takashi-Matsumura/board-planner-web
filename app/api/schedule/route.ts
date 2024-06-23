import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req: Request, res: NextResponse) => {
  const { helper_name, customer_name, comment, begin_time, end_time } = await req.json();

  const new_user = await prisma.schedules_tbl.create({
    data: {
        helper_name,
        customer_name,
        comment,
        begin_time,
        end_time,
    },
  });
  return NextResponse.json(new_user);
}