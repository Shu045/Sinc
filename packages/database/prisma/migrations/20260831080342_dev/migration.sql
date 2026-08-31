/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Workflow` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkflowRun` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkflowStep` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AgentEventType" AS ENUM ('MESSAGE', 'TOOL_CALL', 'TOOL_RESULT', 'QUESTION', 'APPROVAL', 'ERROR');

-- DropForeignKey
ALTER TABLE "Workflow" DROP CONSTRAINT "Workflow_userId_fkey";

-- DropForeignKey
ALTER TABLE "WorkflowRun" DROP CONSTRAINT "WorkflowRun_workflowId_fkey";

-- DropForeignKey
ALTER TABLE "WorkflowStep" DROP CONSTRAINT "WorkflowStep_workflowId_fkey";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "Workflow";

-- DropTable
DROP TABLE "WorkflowRun";

-- DropTable
DROP TABLE "WorkflowStep";

-- DropEnum
DROP TYPE "RunStatus";

-- CreateTable
CREATE TABLE "Agent" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'My Agent',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Agent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgentSession" (
    "id" TEXT NOT NULL,
    "agentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),

    CONSTRAINT "AgentSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgentEvent" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "type" "AgentEventType" NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AgentEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AgentEvent_sessionId_createdAt_idx" ON "AgentEvent"("sessionId", "createdAt");

-- AddForeignKey
ALTER TABLE "AgentSession" ADD CONSTRAINT "AgentSession_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentEvent" ADD CONSTRAINT "AgentEvent_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "AgentSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
