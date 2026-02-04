/**
 * TimelineSection Component
 * Display career, education, and achievements timeline
 */

'use client'

import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, Award, Calendar } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import TechIcon from '@/components/ui/TechIcon'
import { Card } from '@/components/ui/Card'
import { TimelineItem } from '@/lib/types'
import timelineDataRaw from '@/src/data/timeline.json'

const timelineData = timelineDataRaw as TimelineItem[]

const getIcon = (type: string) => {
  switch (type) {
    case 'work':
      return Briefcase
    case 'education':
      return GraduationCap
    case 'achievement':
      return Award
    default:
      return Briefcase
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'work':
      return 'text-blue-400 bg-blue-500/20'
    case 'education':
      return 'text-purple-400 bg-purple-500/20'
    case 'achievement':
      return 'text-yellow-400 bg-yellow-500/20'
    default:
      return 'text-primary bg-primary/20'
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export function TimelineSection() {
  // Sort timeline by date (newest first)
  const sortedTimeline = [...timelineData].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  )

  return (
    <section id="timeline" className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionHeader
          terminalPath="~/career"
          title="Career Timeline"
          description="Professional journey, education, and key achievements"
        />

        {/* Timeline */}
        <div className="mt-12 space-y-8">
          {sortedTimeline.map((item, index) => {
            const Icon = getIcon(item.type)
            const isLeft = index % 2 === 0

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Connecting Line */}
                {index < sortedTimeline.length - 1 && (
                  <div className="absolute left-[27px] top-[60px] w-0.5 h-[calc(100%+2rem)] bg-gradient-to-b from-primary/50 to-transparent hidden md:block" />
                )}

                <div className="flex gap-6 items-start">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-14 h-14 rounded-full ${getTypeColor(item.type)} flex items-center justify-center border border-primary/20 shadow-glow`}>
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Content Card */}
                  <Card hover variant="elevated" className="flex-1">
                    {/* Header */}
                    <div className="mb-3">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-foreground">
                          {item.title}
                        </h3>
                        <span className="text-sm text-muted-foreground">
                          @ {item.organization}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(item.startDate)} -{' '}
                          {item.endDate ? formatDate(item.endDate) : 'Present'}
                        </span>
                        {item.location && (
                          <span>📍 {item.location}</span>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    {item.description && item.description.length > 0 && (
                      <ul className="space-y-2 mb-4">
                        {item.description.map((desc, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-1">▹</span>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Technologies */}
                    {item.technologies && item.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {item.technologies.map((tech, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 hover:border-primary/30 transition-colors"
                          >
                            <TechIcon name={tech} className="h-3.5 w-3.5" />
                            <span className="text-xs text-foreground/90">{tech}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 grid grid-cols-3 gap-4"
        >
          {[
            {
              label: 'Work Experience',
              count: timelineData.filter((item) => item.type === 'work').length,
              color: 'text-blue-400',
            },
            {
              label: 'Education',
              count: timelineData.filter((item) => item.type === 'education').length,
              color: 'text-purple-400',
            },
            {
              label: 'Achievements',
              count: timelineData.filter((item) => item.type === 'achievement').length,
              color: 'text-yellow-400',
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-card/20 backdrop-blur-sm border border-primary/10 rounded-lg p-4 text-center"
            >
              <div className={`text-3xl font-bold mb-1 ${stat.color}`}>
                {stat.count}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
