export function timeStringToSeconds(timeString: string) {
  const [hours, minutes, secondsAndMs] = timeString.split(":")
  const [seconds, ms] = secondsAndMs.split(",")
  return (
    parseFloat(hours) * 3600 +
    parseFloat(minutes) * 60 +
    parseFloat(seconds) +
    parseFloat(ms) / 1000
  )
}
function secondsToTimeString(time: number) {
  const totalMilliseconds = Math.round(time * 1000)
  const hours = Math.floor(totalMilliseconds / (1000 * 60 * 60)).toString().padStart(2, "0")
  const minutes = Math.floor((totalMilliseconds % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, "0")
  const seconds = Math.floor((totalMilliseconds % (1000 * 60)) / 1000).toString().padStart(2, "0")
  const milliseconds = (totalMilliseconds % 1000).toString().padStart(3, "0")
  return `${hours}:${minutes}:${seconds},${milliseconds}`
}

export function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)
    reader.readAsText(file)
  })
}

export interface Subtitle {
  from: string
  to: string
  text: string
}

export function parseSrtFileContents(fileContents: string) {
  const lines = fileContents.split("\n")
  const subtitles = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    if (line === "") continue
    i++

    const timeRange = lines[i].split(" --> ")
    i++

    let text = ""
    while (lines[i] && lines[i].trim() !== "") {
      text += lines[i] + "\n"
      i++
    }

    subtitles.push({ from: timeRange[0], to: timeRange[1], text: text.trim(), })
  }

  return subtitles
}

export function shiftTime(timeString: string, seconds: number) {
  return secondsToTimeString(timeStringToSeconds(timeString) + seconds)
}

export function subtitleToSrt(subtitle: Subtitle, idx: number) {
  return `${idx}\n${subtitle.from} --> ${subtitle.to}\n${subtitle.text}\n`
}