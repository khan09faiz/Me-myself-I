/**
 * GitHub Stats Page
 * Displays GitHub profile statistics and contributions
 */

import type { Metadata } from 'next'
import { Github, GitFork, Star, Users, Calendar } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'GitHub Stats',
  description: `${SITE_CONFIG.name}'s GitHub statistics and contributions`,
}

export const revalidate = 3600 // Revalidate every hour

async function getGitHubStats() {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN
  const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'khan09faiz'

  if (!GITHUB_TOKEN) {
    console.error('GitHub token not configured')
    return getFallbackData()
  }

  try {
    const query = `
      query GetUserStats($username: String!) {
        user(login: $username) {
          name
          bio
          avatarUrl
          followers {
            totalCount
          }
          following {
            totalCount
          }
          contributionsCollection {
            totalCommitContributions
            contributionCalendar {
              totalContributions
            }
          }
          repositories(
            first: 100
            privacy: PUBLIC
            isFork: false
            orderBy: {field: UPDATED_AT, direction: DESC}
          ) {
            totalCount
            nodes {
              name
              description
              url
              stargazerCount
              forkCount
              primaryLanguage {
                name
                color
              }
              languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                edges {
                  size
                  node {
                    name
                    color
                  }
                }
              }
            }
          }
        }
        rateLimit {
          remaining
          resetAt
        }
      }
    `

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { username: GITHUB_USERNAME },
      }),
      // Cache for 1 hour to avoid rate limits
      next: { revalidate: 3600 },
    })

    // Handle rate limiting (403 status)
    if (response.status === 403) {
      console.error('GitHub API rate limit exceeded')
      return getFallbackData()
    }

    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`)
    }

    const data = await response.json()

    if (data.errors) {
      console.error('GitHub API errors:', data.errors)
      throw new Error('GitHub API returned errors')
    }

    // Log remaining rate limit
    if (data.data?.rateLimit) {
      console.log(`GitHub API rate limit: ${data.data.rateLimit.remaining} remaining`)
    }

    // Calculate language statistics
    const languageMap = new Map<string, { bytes: number; color: string }>()
    let totalStars = 0
    let totalForks = 0

    data.data.user.repositories.nodes.forEach((repo: any) => {
      totalStars += repo.stargazerCount
      totalForks += repo.forkCount

      if (repo.languages?.edges) {
        repo.languages.edges.forEach((edge: any) => {
          const existing = languageMap.get(edge.node.name) || { bytes: 0, color: edge.node.color }
          languageMap.set(edge.node.name, {
            bytes: existing.bytes + edge.size,
            color: edge.node.color,
          })
        })
      }
    })

    const totalBytes = Array.from(languageMap.values()).reduce((sum, { bytes }) => sum + bytes, 0)
    const topLanguages = Array.from(languageMap.entries())
      .map(([name, { bytes, color }]) => ({
        name,
        color,
        percentage: Math.round((bytes / totalBytes) * 100),
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5)

    // Get featured repositories (top 4 by stars)
    const featuredRepos = data.data.user.repositories.nodes
      .filter((repo: any) => !repo.name.startsWith('.'))
      .sort((a: any, b: any) => b.stargazerCount - a.stargazerCount)
      .slice(0, 4)
      .map((repo: any) => ({
        name: repo.name,
        description: repo.description || 'No description available',
        stars: repo.stargazerCount,
        forks: repo.forkCount,
        language: repo.primaryLanguage?.name || 'Unknown',
        color: repo.primaryLanguage?.color || '#8257e5',
        url: repo.url,
      }))

    return {
      totalRepos: data.data.user.repositories.totalCount,
      totalStars,
      totalForks,
      followers: data.data.user.followers.totalCount,
      following: data.data.user.following.totalCount,
      contributions: data.data.user.contributionsCollection.contributionCalendar.totalContributions,
      topLanguages,
      featuredRepos,
    }
  } catch (error) {
    console.error('Error fetching GitHub stats:', error)
    return getFallbackData()
  }
}

function getFallbackData() {
  return {
    totalRepos: 24,
    totalStars: 45,
    totalForks: 12,
    followers: 38,
    following: 52,
    contributions: 847,
    topLanguages: [
      { name: 'Python', percentage: 45, color: '#3572A5' },
      { name: 'TypeScript', percentage: 25, color: '#2b7489' },
      { name: 'JavaScript', percentage: 15, color: '#f1e05a' },
    ],
    featuredRepos: [],
  }
}

export default async function GitHubPage() {
  const stats = await getGitHubStats()
  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">GitHub Statistics</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My coding journey, contributions, and open source work
          </p>
          <a
            href={SITE_CONFIG.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-lg transition-all duration-300"
          >
            <Github className="h-5 w-5" />
            <span>Visit GitHub Profile</span>
          </a>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12">
          <Card className="p-6 text-center">
            <Github className="h-8 w-8 mx-auto mb-3 text-primary" />
            <div className="text-3xl font-bold mb-1">{stats.totalRepos}</div>
            <div className="text-sm text-muted-foreground">Repositories</div>
          </Card>

          <Card className="p-6 text-center">
            <Star className="h-8 w-8 mx-auto mb-3 text-yellow-500" />
            <div className="text-3xl font-bold mb-1">{stats.totalStars}</div>
            <div className="text-sm text-muted-foreground">Stars Earned</div>
          </Card>

          <Card className="p-6 text-center">
            <GitFork className="h-8 w-8 mx-auto mb-3 text-green-500" />
            <div className="text-3xl font-bold mb-1">{stats.totalForks}</div>
            <div className="text-sm text-muted-foreground">Forks</div>
          </Card>

          <Card className="p-6 text-center">
            <Users className="h-8 w-8 mx-auto mb-3 text-blue-500" />
            <div className="text-3xl font-bold mb-1">{stats.followers}</div>
            <div className="text-sm text-muted-foreground">Followers</div>
          </Card>

          <Card className="p-6 text-center">
            <Users className="h-8 w-8 mx-auto mb-3 text-purple-500" />
            <div className="text-3xl font-bold mb-1">{stats.following}</div>
            <div className="text-sm text-muted-foreground">Following</div>
          </Card>

          <Card className="p-6 text-center">
            <Calendar className="h-8 w-8 mx-auto mb-3 text-orange-500" />
            <div className="text-3xl font-bold mb-1">{stats.contributions}</div>
            <div className="text-sm text-muted-foreground">Contributions</div>
          </Card>
        </div>

        {/* Top Languages */}
        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-6">
            <span className="text-gradient">Top Languages</span>
          </h2>
          <div className="space-y-4">
            {stats.topLanguages.map((lang: any) => (
              <div key={lang.name}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{lang.name}</span>
                  <span className="text-muted-foreground">{lang.percentage}%</span>
                </div>
                <div className="h-3 bg-card/50 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${lang.percentage}%`,
                      backgroundColor: lang.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Featured Repositories */}
        <div className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            <span className="text-gradient">Featured Repositories</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {stats.featuredRepos && stats.featuredRepos.length > 0 ? (
              stats.featuredRepos.map((repo: any) => (
                <Card key={repo.name} className="p-6 hover:border-primary/30 transition-all duration-300">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-primary hover:underline">
                        {repo.name}
                      </h3>
                      <Github className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {repo.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: repo.color }}
                        />
                        <span>{repo.language}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        <span>{repo.stars}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="h-4 w-4" />
                        <span>{repo.forks}</span>
                      </div>
                    </div>
                  </a>
                </Card>
              ))
            ) : (
              // Fallback to hardcoded repos if API data is empty
              [
                {
                  name: 'Idea-Recommendation-model',
                  description: 'GIG - Multi-factor ranking system with blockchain validation and federated learning',
                  stars: 12,
                  forks: 3,
                  language: 'Python',
                  color: '#3572A5',
                  url: 'https://github.com/khan09faiz/Idea-Recommendation-model-',
                },
                {
                  name: 'Unified-stock-market',
                  description: 'SARIMA-GARCH hybrid model with FinBERT sentiment and PPO reinforcement learning',
                  stars: 8,
                  forks: 2,
                  language: 'Python',
                  color: '#3572A5',
                  url: 'https://github.com/khan09faiz/Unified-stock-market',
                },
                {
                  name: 'blind-cap-object-detection',
                  description: 'YOLOv8-based accessibility wearable with real-time object detection',
                  stars: 15,
                  forks: 4,
                  language: 'Python',
                  color: '#3572A5',
                  url: 'https://github.com/khan09faiz/blind-cap-object-detection',
                },
                {
                  name: 'Me-myself-I',
                  description: 'Personal portfolio built with Next.js, TypeScript, and Tailwind CSS',
                  stars: 5,
                  forks: 1,
                  language: 'TypeScript',
                  color: '#2b7489',
                  url: 'https://github.com/khan09faiz/Me-myself-I',
                },
              ].map((repo) => (
              <Card key={repo.name} className="p-6 hover:border-primary/30 transition-all duration-300">
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-primary hover:underline">
                      {repo.name}
                    </h3>
                    <Github className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {repo.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: repo.color }}
                      />
                      <span>{repo.language}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      <span>{repo.stars}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="h-4 w-4" />
                      <span>{repo.forks}</span>
                    </div>
                  </div>
                </a>
              </Card>
            ))
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
