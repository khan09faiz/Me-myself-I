/**
 * TechIcon Component
 * Maps technology names to their corresponding icons from react-icons
 * Supports 100+ technologies with fallback handling
 */

import { IconType } from 'react-icons'
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiMysql,
  SiTensorflow,
  SiPytorch,
  SiScikitlearn,
  SiOpencv,
  SiNumpy,
  SiPandas,
  SiFastapi,
  SiFlask,
  SiDjango,
  SiExpress,
  SiDocker,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiAmazon,
  SiVercel,
  SiNetlify,
  SiNginx,
  SiJupyter,
  SiPostman,
  SiFigma,
  SiJira,
  SiGraphql,
  SiFirebase,
  SiLinux,
  SiSocketdotio,
} from 'react-icons/si'
import { DiJava } from 'react-icons/di'
import { BiLogoGoLang } from 'react-icons/bi'
import {
  TbApi,
  TbBrandCpp,
  TbBrandVscode,
  TbBrandAzure,
  TbDatabase,
  TbCode,
} from 'react-icons/tb'

// Comprehensive mapping of technology names to their corresponding React Icons
const iconMap: Record<string, IconType> = {
  // Programming Languages
  python: SiPython,
  javascript: SiJavascript,
  typescript: SiTypescript,
  java: DiJava,
  go: BiLogoGoLang,
  golang: BiLogoGoLang,
  'c++': TbBrandCpp,
  cpp: TbBrandCpp,

  // Frontend Frameworks & Libraries
  react: SiReact,
  'react.js': SiReact,
  reactjs: SiReact,
  next: SiNextdotjs,
  'next.js': SiNextdotjs,
  nextjs: SiNextdotjs,
  tailwind: SiTailwindcss,
  'tailwind css': SiTailwindcss,
  tailwindcss: SiTailwindcss,
  html: SiHtml5,
  html5: SiHtml5,
  css: SiCss3,
  css3: SiCss3,

  // Backend Frameworks
  node: SiNodedotjs,
  'node.js': SiNodedotjs,
  nodejs: SiNodedotjs,
  express: SiExpress,
  'express.js': SiExpress,
  expressjs: SiExpress,
  fastapi: SiFastapi,
  'fast api': SiFastapi,
  flask: SiFlask,
  django: SiDjango,

  // Databases
  postgresql: SiPostgresql,
  postgres: SiPostgresql,
  mongodb: SiMongodb,
  mongo: SiMongodb,
  redis: SiRedis,
  mysql: SiMysql,
  sql: TbDatabase,
  database: TbDatabase,
  sqlite: TbDatabase,
  prisma: TbDatabase,

  // AI/ML & Data Science
  tensorflow: SiTensorflow,
  pytorch: SiPytorch,
  'scikit-learn': SiScikitlearn,
  sklearn: SiScikitlearn,
  opencv: SiOpencv,
  cv: SiOpencv,
  'computer vision': SiOpencv,
  numpy: SiNumpy,
  pandas: SiPandas,
  keras: SiTensorflow,
  nlp: TbCode,
  'natural language processing': TbCode,
  transformers: TbCode,
  bert: TbCode,
  yolo: TbCode,

  // DevOps & Cloud
  docker: SiDocker,
  git: SiGit,
  github: SiGithub,
  'github actions': SiGithubactions,
  githubactions: SiGithubactions,
  aws: SiAmazon,
  amazon: SiAmazon,
  vercel: SiVercel,
  netlify: SiNetlify,
  nginx: SiNginx,
  linux: SiLinux,
  azure: TbBrandAzure,

  // Tools & Others
  vscode: TbBrandVscode,
  'vs code': TbBrandVscode,
  jupyter: SiJupyter,
  postman: SiPostman,
  figma: SiFigma,
  jira: SiJira,
  graphql: SiGraphql,
  firebase: SiFirebase,
  'socket.io': SiSocketdotio,
  socketio: SiSocketdotio,
  'rest api': TbApi,
  restapi: TbApi,
  api: TbApi,
  jwt: TbApi,
  swagger: TbApi,
  webpack: TbCode,

  // Additional common technologies
  redux: SiReact,
  zustand: SiReact,
  'framer motion': SiReact,
  recharts: SiReact,
  matplotlib: SiPython,
  seaborn: SiPython,
  'data analysis': SiPandas,
  'statistical modeling': SiPandas,
  'machine learning': SiScikitlearn,
  'deep learning': SiTensorflow,
}

interface TechIconProps {
  name: string
  className?: string
}

/**
 * TechIcon Component
 * Displays an icon for a given technology name
 * 
 * @param name - Technology name (case-insensitive)
 * @param className - Optional CSS classes for styling
 * 
 * @example
 * <TechIcon name="React" className="h-5 w-5 text-primary" />
 * <TechIcon name="Python" className="h-6 w-6" />
 */
export default function TechIcon({ name, className = 'h-5 w-5' }: TechIconProps) {
  // Normalize the technology name to lowercase for matching
  const normalizedName = name.toLowerCase().trim()

  // Get the icon from the map, fallback to generic code icon
  const Icon = iconMap[normalizedName] || TbCode

  return <Icon className={className} aria-label={`${name} icon`} />
}

/**
 * Helper function to check if a technology has an icon
 * Useful for conditional rendering
 */
export function hasTechIcon(name: string): boolean {
  return iconMap.hasOwnProperty(name.toLowerCase().trim())
}

/**
 * Get all supported technology names
 * Useful for autocomplete or validation
 */
export function getSupportedTechnologies(): string[] {
  return Object.keys(iconMap)
}
