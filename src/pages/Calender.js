import CalenderLists from '../components/CalenderLists'
import { useDispatch } from 'react-redux'
import { setLoading } from '../features/loading'
import { useEffect, useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';






const Calender = () => {

  const [season, setSeason] = useState("SUMMER");
  const [seasonYear, setSeasonYear] = useState(0);
  const getCurrentSeason = () => {
    let currentTime = new Date();
    let currentYear = currentTime.getUTCFullYear();
    let currentMonth = currentTime.getMonth();

    if (currentMonth >= 2 && currentMonth < 4) {
      setSeasonYear(currentYear)
      setSeason("SPRING")
    }
    else if (currentMonth >= 4 && currentMonth < 7){
      setSeasonYear(currentYear)
      setSeason("SUMMER")
    }
    else if (currentMonth >= 7 && currentMonth < 10){
      setSeasonYear(currentYear)
      setSeason("FALL")
    }
    else{
      setSeason("WINTER")
      if(currentMonth>=10){
        setSeasonYear(currentYear)
      }
      else{
        setSeasonYear(currentYear-1)
      }
    }
  }
  useEffect(() => (
    getCurrentSeason()
  ), [])
  const handleChange = (event, newValue) => {

    setSeason(newValue);
    let currentTime = new Date();
    let currentYear = currentTime.getUTCFullYear();
    let currentMonth = currentTime.getMonth();

    if (newValue === "WINTER") {
      if(currentMonth >= 10)
      {
        setSeasonYear(currentYear)
      }
      else {
        setSeasonYear(currentYear)
      }
    }

  };
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(false))
  }, [])
  return (
    <>
      <Tabs centered value={season} onChange={handleChange} aria-label="icon label tabs example">
        <Tab wrapped sx={{ "&:not(.Mui-selected)": { color: "#cecece" } , width:"min-content"}} label={`WINTER ${seasonYear + 1}`} value={"WINTER"} />
        <Tab wrapped sx={{ "&:not(.Mui-selected)": { color: "#cecece" } , width:"min-content"}} label={`SPRING ${seasonYear}`} value="SPRING" />
        <Tab wrapped sx={{ "&:not(.Mui-selected)": { color: "#cecece" } , width:"min-content"}} label={`SUMMER ${seasonYear}`} value="SUMMER" />
        <Tab wrapped sx={{ "&:not(.Mui-selected)": { color: "#cecece" } , width:"min-content"}} label={`FALL ${seasonYear}`} value="FALL" />

      </Tabs>
      <CalenderLists season={season} seasonYear={season === "WINTER" ? seasonYear + 1 : seasonYear} />
    </>
  )
}

export default Calender