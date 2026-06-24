import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiPrisma,
  SiSequelize,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiTurborepo,
  SiGit,
  SiPostman,
} from "react-icons/si"
import { FaAws, FaDatabase } from "react-icons/fa6"
import type { IconType } from "react-icons"

interface SkillIcon {
  icon: IconType
  color: string
}

// Real brand colours sit on the dark glass cards; skills without a dedicated
// brand mark (raw SQL, individual AWS services) fall back to a shared icon.
export const skillIcons: Record<string, SkillIcon> = {
  JavaScript: { icon: SiJavascript, color: "#F7DF1E" },
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  "React.js": { icon: SiReact, color: "#61DAFB" },
  "Next.js": { icon: SiNextdotjs, color: "#FFFFFF" },
  SQL: { icon: FaDatabase, color: "#94A3B8" },
  "Node.js": { icon: SiNodedotjs, color: "#5FA04E" },
  "Express.js": { icon: SiExpress, color: "#FFFFFF" },
  NestJS: { icon: SiNestjs, color: "#E0234E" },
  Prisma: { icon: SiPrisma, color: "#FFFFFF" },
  Sequelize: { icon: SiSequelize, color: "#52B0E7" },
  PostgreSQL: { icon: SiPostgresql, color: "#4169E1" },
  MySQL: { icon: SiMysql, color: "#4479A1" },
  MongoDB: { icon: SiMongodb, color: "#47A248" },
  DynamoDB: { icon: FaAws, color: "#FF9900" },
  Redis: { icon: SiRedis, color: "#DC382D" },
  Docker: { icon: SiDocker, color: "#2496ED" },
  Turborepo: { icon: SiTurborepo, color: "#EF4444" },
  Git: { icon: SiGit, color: "#F05032" },
  Postman: { icon: SiPostman, color: "#FF6C37" },
  "AWS EC2": { icon: FaAws, color: "#FF9900" },
  "AWS S3": { icon: FaAws, color: "#FF9900" },
  "AWS Lambda": { icon: FaAws, color: "#FF9900" },
  "AWS ECS": { icon: FaAws, color: "#FF9900" },
  "AWS ECR": { icon: FaAws, color: "#FF9900" },
  "AWS KMS": { icon: FaAws, color: "#FF9900" },
  "API Gateway": { icon: FaAws, color: "#FF9900" },
}
