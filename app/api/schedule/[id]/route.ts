import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (
  req: Request,
  { params }: { params: { id: string } },
  res: NextResponse
) => {
  const id: number = parseInt(params.id);

  const schedule = await prisma.schedules_tbl.findFirst({ where: { id } });
  return NextResponse.json(schedule);
};

export const PUT = async (
    req: Request,
    { params }: { params: { id: string } },
    res: NextResponse
  ) => {
    const id: number = parseInt(params.id);
    const { helper_name, customer_name, comment, begin_time, end_time } = await req.json();
    //console.log(helper_name, customer_name, comment, begin_time, end_time)
  
    const schedule = await prisma.schedules_tbl.update({
        data: {
            helper_name,
            customer_name,
            comment,
            begin_time,
            end_time,
        },
        where: { id },
    });
    return NextResponse.json(schedule);
  };
  
  export const DELETE = async (
    req: Request,
    { params }: { params: { id: string } },
    res: NextResponse
  ) => {
    const id: number = parseInt(params.id);
  
    const schedule = await prisma.schedules_tbl.delete({
      where: { id },
    });
    return NextResponse.json(schedule);
  };