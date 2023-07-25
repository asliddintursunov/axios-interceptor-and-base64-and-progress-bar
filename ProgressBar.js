// React Hooks
const [percentage, setPercentage] = useState(0)
const full = useRef(null)
const value = useRef(0)
const [seeProgress, setSeeProgress] = useState(0)
const [isOnProgress, setIsOnProgress] = useState(false)

const progressBar = useCallback(() => {
  let progress = setInterval(() => {
    setIsOnProgress(true)
    full.current = Math.floor(Math.random() * 10 + 1)

    value.current += full.current

    if (value.current >= 100) {
      value.current = 100
      setPercentage(value.current)
      clearInterval(progress)
      setSeeProgress(value.current)
      console.log('Progress Done!');
    }
    else {
      setPercentage(value.current)
      setSeeProgress(value.current)
    }

  }, 100);

  return () => {
    if (value.current) {
      clearInterval(progress)
      value.current = null
    }
  }
}, [])