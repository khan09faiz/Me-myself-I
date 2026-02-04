/**
 * SkillsSection Component
 * Showcase skills organized by categories with proficiency levels
 */

'use client'

import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import TechIcon from '@/components/ui/TechIcon'
import { Card } from '@/components/ui/Card'
import { SkillCategory } from '@/lib/types'
import skillsDataRaw from '@/src/data/skills.json'

const skillsData = skillsDataRaw as SkillCategory[]

export function SkillsSection() {
  // Calculate total technologies count
  const totalTechs = skillsData.reduce((acc, category) => acc + category.skills.length, 0)

  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionHeader
          terminalPath="~/skills"
          title="Technical Skills"
          description={`Proficient in ${totalTechs}+ technologies across ${skillsData.length} domains`}
        />

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {skillsData.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <Card hover variant="elevated" className="h-full">
                {/* Category Header */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-foreground">
                      {category.category}
                    </h3>
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                  </div>
                  
                  {/* Proficiency Bar */}
                  <div className="relative h-2 bg-card rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${category.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: categoryIndex * 0.1 + 0.3 }}
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-1">
                    {category.proficiency}% proficiency
                  </p>
                </div>

                {/* Skills Chips */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        delay: categoryIndex * 0.1 + skillIndex * 0.05,
                      }}
                      className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card/50 border border-primary/10 hover:border-primary/30 hover:shadow-glow-sm transition-all cursor-default"
                      title={skill}
                    >
                      <TechIcon name={skill} className="h-4 w-4 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium text-foreground/90">
                        {skill}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {skillsData.slice(0, 4).map((category) => (
            <div
              key={category.category}
              className="bg-card/20 backdrop-blur-sm border border-primary/10 rounded-lg p-4 text-center"
            >
              <div
                className="text-3xl font-bold mb-1"
                style={{ color: category.color }}
              >
                {category.skills.length}
              </div>
              <div className="text-sm text-muted-foreground">
                {category.category.replace(' Development', '')}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
