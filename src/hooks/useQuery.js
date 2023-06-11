import React, { useEffect } from 'react'

function useQuery(asyncFunction, options) {
  const { isEnabled = true } = options || {}
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [error, setError] = React.useState();
  const [data, setData] = React.useState();
  // const [lastUpdate, setLastUpdate] = useState(0)

  useEffect(() => {
    if(!isEnabled) return

    asyncFunction()
      .then(res => {
        setData(res);
        // setLastUpdate(Date.now())
        setIsLoading(false);
        setIsSuccess(true);
      })
      .catch(err => {
        setError(err)
        // setLastUpdate(Date.now())
        setIsLoading(false);
        setIsError(true);
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEnabled]);

  return {
    isLoading,
    isError,
    isSuccess,
    data,
    error,
    setData,
    // lastUpdate
  }
}

export default useQuery;
