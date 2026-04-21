'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Checkbox, Form, Input } from 'antd'
import { GrantCard } from '@/components/grant-card'
import {
  APPLICANT_TYPES,
  APPLICANT_TYPE_LABELS,
  REVENUE_BANDS,
  REVENUE_BAND_LABELS,
  REQUIREMENT_LABELS,
  type ApplicantType,
  type Grant,
  type Requirement,
  type RevenueBand,
} from '@/lib/grants'

type FilterValues = {
  query?: string
  types?: ApplicantType[]
  revenueBands?: RevenueBand[]
  requirements?: Requirement[]
}

const APPLICANT_TYPE_OPTIONS = APPLICANT_TYPES.map((type) => ({
  label: APPLICANT_TYPE_LABELS[type] ?? type,
  value: type,
}))

const REVENUE_BAND_OPTIONS = REVENUE_BANDS.map((band) => ({
  label: REVENUE_BAND_LABELS[band] ?? band,
  value: band,
}))

const REQUIREMENT_OPTIONS: { label: string; value: Requirement }[] = [
  { label: REQUIREMENT_LABELS.local_entity, value: 'local_entity' },
  { label: REQUIREMENT_LABELS.new_market, value: 'new_market' },
]

const buildParams = (filters: FilterValues) => {
  const params: Record<string, string> = {}
  if (filters.query?.trim()) params.q = filters.query.trim()
  if (filters.types?.length) params.types = filters.types.join(',')
  if (filters.revenueBands?.length)
    params.revenueBands = filters.revenueBands.join(',')
  if (filters.requirements?.length)
    params.requirements = filters.requirements.join(',')
  return params
}

export default function Home() {
  const [filters, setFilters] = useState<FilterValues>({})
  const [results, setResults] = useState<Grant[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    handleSearch()
  }, [])

  const handleSearch = async () => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await axios.get<{ results: Grant[] }>('/api/grants', {
        params: buildParams(filters),
      })
      setResults(data.results)
    } catch (err) {
      console.error(err)
      setError('Failed to fetch grants. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <h1 className="mb-6 text-center text-2xl font-semibold text-white sm:text-left">
        Grant Search
      </h1>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
        <aside className="flex w-full flex-col gap-4 lg:w-80 lg:shrink-0">
          <Form
            layout="vertical"
            initialValues={{
              query: '',
              types: [],
              revenueBands: [],
              requirements: [],
            }}
            onValuesChange={(_, values) => setFilters(values)}
            onFinish={handleSearch}
          >
            <Form.Item name="query" label="Search">
              <Input allowClear placeholder="Search grants by name..." />
            </Form.Item>

            <div className="flex flex-col gap-4 sm:flex-row sm:gap-10 lg:flex-col lg:gap-0">
              <div>
                <h2 className="text-sm font-bold text-white">Applicant type</h2>
                <Form.Item name="types" className="!text-white">
                  <Checkbox.Group options={APPLICANT_TYPE_OPTIONS} className="!text-white" />
                </Form.Item>
              </div>

              <div>
                <h2 className="text-sm font-bold text-white">Revenue band</h2>
                <Form.Item name="revenueBands" className="!text-white">
                  <Checkbox.Group options={REVENUE_BAND_OPTIONS} className="!text-white" />
                </Form.Item>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold text-white">Requirements</h2>
              <Form.Item name="requirements" className="!text-white">
                <Checkbox.Group options={REQUIREMENT_OPTIONS} className="!text-white" />
              </Form.Item>
            </div>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Search
              </Button>
            </Form.Item>
          </Form>

          {error && <p className="text-xs text-red-500">{error}</p>}

          {results !== null && !loading && (
            <p className="text-xs text-zinc-500">
              {results.length} {results.length === 1 ? 'match' : 'matches'}
            </p>
          )}
        </aside>

        <section className="w-full lg:flex-1">
          {results === null ? (
            <p className="py-3 text-sm text-zinc-500">
              Press Search to see matching grants.
            </p>
          ) : results.length === 0 ? (
            <p className="py-3 text-sm text-zinc-500">
              No grants match your filters.
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {results.map((grant) => (
                <li key={grant.id}>
                  <GrantCard grant={grant} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}
