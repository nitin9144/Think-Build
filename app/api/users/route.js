import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";
export async function POST(request) {
    const user = await currentUser();
    // if User Already Exist?
    const userResult = await db.select().from(usersTable).where(eq(usersTable.email, user?.primaryEmailAddress?.emailAddress))

    // if not then insert new user
    if (userResult?.length === 0) {
        const result=await db.insert(usersTable).values({
            name: user?.fullName,
            email: user?.primaryEmailAddress?.emailAddress
        });
    }
    return NextResponse.json({user : userResult[0]});
}