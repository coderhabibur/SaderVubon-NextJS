import { NextResponse } from "next/server";
import { getNavigationMenu } from "@/lib/woocommerce";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const menu = await getNavigationMenu();
    return NextResponse.json(menu);
  } catch (error) {
    console.error("Error in /api/menu route:", error);
    return NextResponse.json([]);
  }
}
