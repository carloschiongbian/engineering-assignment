'use client'

import { useState } from 'react'
import { Divider, Modal, Row } from 'antd'
import {
  APPLICANT_TYPE_LABELS,
  REVENUE_BAND_LABELS,
  type Grant,
} from '@/lib/grants'

type GrantCardProps = {
  grant: Grant
}

const formatBusinessGoal = (goal: string) => {
  const spaced = goal.replace(/_/g, ' ')
  return spaced.charAt(0).toUpperCase() + spaced.slice(1)
}

const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1)

export function GrantCard({ grant }: GrantCardProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="cursor-pointer w-full outline-none rounded-lg border border-zinc-200 bg-white p-4 text-left transition-colors hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
      >
        <h2 className="text-sm font-semibold">{grant.name}</h2>
      </button>

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        title={grant.name}
        footer={null}
        width="min(600px, calc(100vw - 32px))"
        destroyOnHidden
        centered
        style={{ border: '2px solid #333', borderRadius: '10px' }}
        styles={{ title: { color: 'white' }, body: { backgroundColor: '#141414' } }}
      >
        <GrantDetails grant={grant} />
      </Modal>
    </>
  )
}

const GrantDetails = ({ grant }: { grant: Grant }) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        {grant.summary}
      </p>

      <Row className='!items-center'>
        <Section title="Applicant types">
          <ul className="flex flex-wrap gap-1">
            {grant.applicant_type.map((type) => (
              <li key={type} className="rounded-full border border-zinc-300 px-2 py-0.5 text-[10px] uppercase tracking-wide text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">{APPLICANT_TYPE_LABELS[type] ?? type}</li>
            ))}
          </ul>
        </Section>


        <Divider orientation="vertical" className='bg-gray-500 !h-[55px] !m-0 !mt-[10px] !mx-[20px]' />
        {grant.revenue_band.length > 0 && (
          <Section title="Revenue band">
            <ul className="flex flex-wrap gap-1" aria-label="Revenue band">
              {grant.revenue_band.map((band) => (
                <li
                  key={band}
                  className="rounded-full border border-zinc-300 px-2 py-0.5 text-[10px] uppercase tracking-wide text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
                >
                  {REVENUE_BAND_LABELS[band] ?? band}
                </li>
              ))}
            </ul>
          </Section>
        )}

        <Divider orientation="vertical" className='bg-gray-500 !h-[55px] !m-0 !mt-[10px] !mx-[20px]' />
        <Section title="Local entity">
          <dl className="flex flex-col gap-1 text-xs">
            <div className="flex items-baseline gap-2">
              <dd
                className={'font-medium text-zinc-800 dark:text-zinc-200'}
              >
                {grant.requires_local_entity ? 'Yes' : 'No'}
              </dd>
            </div>
          </dl>
        </Section>
        <Divider orientation="vertical" className='bg-gray-500 !h-[55px] !m-0 !mt-[10px] !mx-[20px]' />
        <Section title="New market">
          <dl className="flex flex-col gap-1 text-xs">
            <dd
              className={'font-medium text-zinc-800 dark:text-zinc-200'}
            >
              {grant.requires_new_market ? 'Yes' : 'No'}
            </dd>
          </dl>
        </Section>
      </Row>

      <Row className='!items-center gap-x-[30px] gap-y-4'>

        {grant.employee_count_min !== null && (
          <Section title="Minimum Employees">
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              {grant.employee_count_min}
            </p>
          </Section>
        )}

        {grant.business_goals.length > 0 && (
          <Section title="Business goals">
            <ul className="flex flex-wrap gap-1" aria-label="Business goals">
              {grant.business_goals.map((goal) => (
                <li
                  key={goal}
                  className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                >
                  {formatBusinessGoal(goal)}
                </li>
              ))}
            </ul>
          </Section>
        )}
      </Row>

      {grant.supports.length > 0 && (
        <Section title="Supports">
          <ul className="flex flex-wrap gap-1" aria-label="Supports">
            {grant.supports.map((item) => (
              <li
                key={item}
                className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              >
                {capitalize(item)}
              </li>
            ))}
          </ul>
        </Section>
      )}
      {grant.notes.length > 0 && (
        <Section title="Notes">
          <ul className="list-disc space-y-1 pl-5 text-xs text-zinc-600 dark:text-zinc-400">
            {grant.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </Section>
      )}
    </div>
  )
}

type SectionProps = {
  title: string
  children: React.ReactNode
}

function Section({ title, children }: SectionProps) {
  return (
    <div>
      <h3 className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
        {title}
      </h3>
      <div className="mt-1">{children}</div>
    </div>
  )
}



