import { Icon } from "@chakra-ui/react"
import { IconType } from "react-icons"
import {
  WiDaySunny,
  WiDaySunnyOvercast,
  WiDayCloudy,
  WiCloudy,
  WiSnowflakeCold,
  WiDayFog,
  WiFog,
  WiDaySprinkle,
  WiDaySnowWind,
  WiDayRainMix,
  WiDayRain,
  WiRain,
  WiSnow,
  WiDaySnow,
  WiDayShowers,
  WiDayStormShowers,
  WiSnowWind,
  WiDayThunderstorm,
  WiDaySnowThunderstorm,
  WiNightClear,
  WiNightAltPartlyCloudy,
  WiNightAltCloudy,
  WiNightFog,
  WiNightAltSprinkle,
  WiNightAltSnowWind,
  WiNightAltRainMix,
  WiNightAltRain,
  WiNightAltSnow,
  WiNightAltSnowThunderstorm,
  WiNightAltShowers,
  WiNightAltStormShowers,
  WiNightAltThunderstorm,
  WiAlien
} from "react-icons/wi"
import { getLocalizedDate } from "../helpers"

interface Props {
  weathercode: number
  time?: Date,
  utcOffsetSeconds: number
}

const iconifyWeathecode = (weathercode: number, isNight: boolean): IconType => 
  (isNight ? {
    0: WiNightClear,
    1: WiNightAltPartlyCloudy,
    2: WiNightAltCloudy,
    3: WiCloudy,
    45: WiNightFog,
    48: WiFog,
    51: WiNightAltSprinkle,
    53: WiNightAltSprinkle,
    55: WiNightAltSprinkle,
    56: WiNightAltSnowWind,
    57: WiNightAltSnowWind,
    61: WiNightAltRainMix,
    63: WiNightAltRain,
    65: WiRain,
    66: WiSnow,
    67: WiSnow,
    71: WiNightAltSnow,
    73: WiNightAltSnow,
    75: WiNightAltSnowThunderstorm,
    77: WiSnowflakeCold,
    80: WiNightAltShowers,
    81: WiNightAltShowers,
    82: WiNightAltStormShowers,
    85: WiSnowWind,
    86: WiSnowWind,
    95: WiNightAltThunderstorm,
    96: WiNightAltSnowThunderstorm,
    99: WiNightAltSnowThunderstorm
  } : {
    0: WiDaySunny,
    1: WiDaySunnyOvercast,
    2: WiDayCloudy,
    3: WiCloudy,
    45: WiDayFog,
    48: WiFog,
    51: WiDaySprinkle,
    53: WiDaySprinkle,
    55: WiDaySprinkle,
    56: WiDaySnowWind,
    57: WiDaySnowWind,
    61: WiDayRainMix,
    63: WiDayRain,
    65: WiRain,
    66: WiSnow,
    67: WiSnow,
    71: WiDaySnow,
    73: WiDaySnow,
    75: WiDaySnowThunderstorm,
    77: WiSnowflakeCold,
    80: WiDayShowers,
    81: WiDayShowers,
    82: WiDayStormShowers,
    85: WiSnowWind,
    86: WiSnowWind,
    95: WiDayThunderstorm,
    96: WiDaySnowThunderstorm,
    99: WiDaySnowThunderstorm
  })[weathercode] ?? WiAlien

const WeathercodeIcon = ({ weathercode, time, utcOffsetSeconds }: Props) => {
  const date = getLocalizedDate(utcOffsetSeconds, time)
  const isNight = date.getUTCHours() >= 18 || date.getUTCHours() < 6

  return (
    <Icon as={iconifyWeathecode(weathercode, isNight)} width='40px' h='40px' />
  )
}

export default WeathercodeIcon
