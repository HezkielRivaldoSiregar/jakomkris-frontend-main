import React, { useEffect, useMemo } from 'react'
import { Pagination } from 'react-bootstrap'

function usePagination ({ total, limit = 10 }) {
  const [position, setPosition] = React.useState(1)
  const range = [(position - 1) * limit, position * limit]

  const totalPagination = Math.ceil(total / limit)

  useEffect(() => {
    if(position > totalPagination) {
      setPosition(totalPagination)
    }

    if(totalPagination > 0 && position === 0) {
      setPosition(1)
    }
  }, [position, totalPagination])

  const pagination = useMemo(() => {
    return (
      <Pagination className={'flex-wrap gap-4 m-0'}>
        <div className={'flex items-center flex-nowrap'}>
          <Pagination.First
            disabled={totalPagination === 1}
            onClick={() => setPosition(1)}
          />
          <Pagination.Prev
            disabled={totalPagination === 1}
            onClick={() => {
              if (position === 1) {
                return
              }
              setPosition(curPos => curPos - 1)
            }
            }
          />
          <span className={'mx-2'}>
            {position} / {totalPagination}
          </span>
          <Pagination.Next
            disabled={position === totalPagination}
            onClick={() => setPosition(curPos => curPos + 1)}
          />
          <Pagination.Last
            disabled={position === totalPagination}
            onClick={() => {
              if (position === totalPagination) {
                return
              }
              setPosition(totalPagination)
            }}
          />
        </div>

        <div>
          <span className={'mx-2'}>
            Go to page:
          </span>
          <select
            className={'py-[9px] px-3 bg-white border'}
            onChange={(e) => {
              setPosition(Number(e.target.value))
            }}
          >
            {
              Array.from({ length: totalPagination }).map((_, index) => {
                const number = index + 1
                return (
                  <option
                    key={number}
                    value={number}
                    selected={position === number}
                    onClick={() => setPosition(number)}
                  >
                    {number}
                  </option>
                )
              })
            }
          </select>
        </div>
      </Pagination>
    )
  }, [position, totalPagination])


  return {
    position,
    pagination,
    range,
    limit
  }
}

export default usePagination
