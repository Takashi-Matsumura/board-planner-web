import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (
  req: Request,
  { params }: { params: { id: string } },
  res: NextResponse
) => {
  const id: number = parseInt(params.id);

  const schedule = await prisma.helper_tbl.findFirst({ where: { id } });
  return NextResponse.json(schedule);
};

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } },
  res: NextResponse
) => {
  const id: number = parseInt(params.id);
  const { name, active } = await req.json();

  const activeBoolean = active === "true";  

  const schedule = await prisma.helper_tbl.update({
      data: {
          name,
          active: activeBoolean,
      },
      where: { id },
  });
  return NextResponse.json(schedule);
};