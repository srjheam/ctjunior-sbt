export const getLocalizedDate = (utcOffsetSeconds: number, date?: Date): Date =>
  new Date((date ?? new Date(Date.now())).getTime() + utcOffsetSeconds * 1000)

export const stringifyWeathercode = (weathercode: number):string => ({
    0: 'Céu claro',
    1: 'Claro, com nuvens',
    2: 'Parcialmente nublado',
    3: 'Nublado',
    45: 'Nevoeiro',
    48: 'Geada',
    51: 'Garoa',
    53: 'Garoa',
    55: 'Garoa',
    56: 'Garoa congelada',
    57: 'Garoa congelada',
    61: 'Chuva leve',
    63: 'Chuva moderada',
    65: 'Chuva intensa',
    66: 'Chuva congelada',
    67: 'Chuva congelada',
    71: 'Nevasca leve',
    73: 'Nevasca moderada',
    75: 'Nevasca intensa',
    77: 'Grãos de neve',
    80: 'Pancadas de chuva leve',
    81: 'Pancadas de chuva moderada',
    82: 'Pancadas de chuva intensa',
    85: 'Aguaceiros de neve',
    86: 'Aguaceiros de neve',
    95: 'Tempestade com raios',
    96: 'Tempestade com raios e granizo',
    99: 'Tempestade com raios e granizo'
  }[weathercode] ?? 'Blood moon')
