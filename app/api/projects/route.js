import { NextResponse } from "next/server"
import { currentUser } from "@clerk/nextjs/server"
import { db } from "@/config/db"
import { projectsTable, frameTable, chatTable } from "@/config/schema"

export async function POST(req) {
    try {
        const { projectId, frameId, chatMessage } = await req.json()
        const user = await currentUser()

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const userEmail = user.primaryEmailAddress?.emailAddress

        if (!userEmail) {
            return NextResponse.json({ error: "No email found" }, { status: 400 })
        }

        const projectresult = await db.insert(projectsTable).values({
            projectId: projectId,
            createdBy: userEmail,
        })

        const frameresult = await db.insert(frameTable).values({
            frameId: String(frameId),
            projectId: projectId,
        })

        const chatresult = await db.insert(chatTable).values({
            chatMessage: chatMessage,
            createdBy: userEmail,
        })

        return NextResponse.json({ projectresult, frameresult, chatresult })
    } catch (err) {
        console.error("Error creating project:", err)
        return NextResponse.json(
            { error: "Internal Server Error", details: err.message },
            { status: 500 }
        )
    }
}