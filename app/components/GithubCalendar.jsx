import { ActivityCalendar } from 'react-activity-calendar'

export async function GithubCalendar() {
  const response = await fetch("https://github-contributions-api.jogruber.de/v4/Sarthakischauhan?y=2025") 
  if(!response.ok){
    console.log("No data returned")
    return <></>
  }
  const data = (await response.json()).contributions
  return <ActivityCalendar 
    data={data} 
    theme={
        {
            dark:["rgba(255, 255, 255, 0.1)","#79f046ff" ], 
            light:["rgba(255, 255, 255, 0.1)","#79f046ff" ]
        }
    }/>
}