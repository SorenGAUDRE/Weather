// Mapping des codes météo avec les icônes correspondantes
const iconMap = {
    0: 'day.svg',              // Soleil
    1: 'cloudy-day-1.svg',       // Peu nuageux
    2: 'cloudy-day-1.svg',       // Ciel voilé
    3: 'cloudy-day-2.svg',      // Nuageux
    4: 'cloudy.svg',            // Très nuageux
    5: 'cloudy.svg',            // Couvert
    6: 'cloudy.svg',            // Brouillard
    7: 'cloudy.svg',            // Brouillard givrant
    10: 'rainy-1.svg',          // Pluie faible
    11: 'rainy-7.svg',          // Pluie modérée
    12: 'rainy-7.svg',          // Pluie forte
    13: 'rainy-1.svg',          // Pluie faible verglaçante
    14: 'rainy-7.svg',          // Pluie modérée verglaçante
    15: 'rainy-7.svg',          // Pluie forte verglaçante
    16: 'cloudy.svg',           // Bruine
    20: 'snowy-1.svg',          // Neige faible
    21: 'snowy-1.svg',          // Neige modérée
    22: 'snowy-1.svg',          // Neige forte
    30: 'snowy-1.svg',          // Pluie et neige mêlées faibles
    31: 'snowy-1.svg',          // Pluie et neige mêlées modérées
    32: 'snowy-1.svg',          // Pluie et neige mêlées fortes
    40: 'rainy-1.svg',          // Averses de pluie locales et faibles
    41: 'rainy-7.svg',          // Averses de pluie locales
    42: 'rainy-7.svg',          // Averses locales et fortes
    43: 'rainy-1.svg',          // Averses de pluie faibles
    44: 'rainy-7.svg',          // Averses de pluie
    45: 'rainy-7.svg',          // Averses de pluie fortes
    46: 'rainy-1.svg',          // Averses de pluie faibles et fréquentes
    47: 'rainy-7.svg',          // Averses de pluie fréquentes
    48: 'rainy-7.svg',          // Averses de pluie fortes et fréquentes
    60: 'snowy-1.svg',          // Averses de neige localisées et faibles
    61: 'snowy-1.svg',          // Averses de neige localisées
    62: 'snowy-1.svg',          // Averses de neige localisées et fortes
    63: 'snowy-1.svg',          // Averses de neige faibles
    64: 'snowy-1.svg',          // Averses de neige
    65: 'snowy-1.svg',          // Averses de neige fortes
    66: 'snowy-1.svg',          // Averses de neige faibles et fréquentes
    67: 'snowy-1.svg',          // Averses de neige fréquentes
    68: 'snowy-1.svg',          // Averses de neige fortes et fréquentes
    70: 'snowy-1.svg',          // Averses de pluie et neige mêlées localisées et faibles
    71: 'snowy-1.svg',          // Averses de pluie et neige mêlées localisées
    72: 'snowy-1.svg',          // Averses de pluie et neige mêlées localisées et fortes
    73: 'snowy-1.svg',          // Averses de pluie et neige mêlées faibles
    74: 'snowy-1.svg',          // Averses de pluie et neige mêlées
    75: 'snowy-1.svg',          // Averses de pluie et neige mêlées fortes
    76: 'snowy-1.svg',          // Averses de pluie et neige mêlées faibles et nombreuses
    77: 'snowy-1.svg',          // Averses de pluie et neige mêlées fréquentes
    78: 'snowy-1.svg',          // Averses de pluie et neige mêlées fortes et fréquentes
    100: 'thunder.svg',         // Orages faibles et locaux
    101: 'thunder.svg',         // Orages locaux
    102: 'thunder.svg',         // Orages fort et locaux
    103: 'thunder.svg',         // Orages faibles
    104: 'thunder.svg',         // Orages
    105: 'thunder.svg',         // Orages forts
    106: 'thunder.svg',         // Orages faibles et fréquents
    107: 'thunder.svg',         // Orages fréquents
    108: 'thunder.svg',         // Orages forts et fréquents
    120: 'thunder.svg',         // Orages faibles et locaux de neige ou grésil
    121: 'thunder.svg',         // Orages locaux de neige ou grésil
    122: 'thunder.svg',         // Orages locaux de neige ou grésil
    123: 'thunder.svg',         // Orages faibles de neige ou grésil
    124: 'thunder.svg',         // Orages de neige ou grésil
    125: 'thunder.svg',         // Orages de neige ou grésil
    126: 'thunder.svg',         // Orages faibles et fréquents de neige ou grésil
    127: 'thunder.svg',         // Orages fréquents de neige ou grésil
    128: 'thunder.svg',         // Orages fréquents de neige ou grésil
    130: 'thunder.svg',         // Orages faibles et locaux de pluie et neige mêlées ou grésil
    131: 'thunder.svg',         // Orages locaux de pluie et neige mêlées ou grésil
    132: 'thunder.svg',         // Orages fort et locaux de pluie et neige mêlées ou grésil
    133: 'thunder.svg',         // Orages faibles de pluie et neige mêlées ou grésil
    134: 'thunder.svg',         // Orages de pluie et neige mêlées ou grésil
    135: 'thunder.svg',         // Orages forts de pluie et neige mêlées ou grésil
    136: 'thunder.svg',         // Orages faibles et fréquents de pluie et neige mêlées ou grésil
    137: 'thunder.svg',         // Orages fréquents de pluie et neige mêlées ou grésil
    138: 'thunder.svg',         // Orages forts et fréquents de pluie et neige mêlées ou grésil
    140: 'thunder.svg',         // Pluies orageuses
    141: 'snowy-1.svg',         // Pluie et neige mêlées à caractère orageux
    142: 'snowy-1.svg',         // Neige à caractère orageux
    210: 'rainy-1.svg',         // Pluie faible intermittente
    211: 'rainy-7.svg',         // Pluie modérée intermittente
    212: 'rainy-7.svg',         // Pluie forte intermittente
    220: 'snowy-1.svg',         // Neige faible intermittente
    221: 'snowy-1.svg',         // Neige modérée intermittente
    222: 'snowy-1.svg',         // Neige forte intermittente
    230: 'snowy-1.svg',         // Pluie et neige mêlées intermittentes
    231: 'snowy-1.svg',         // Pluie et neige mêlées intermittentes
    232: 'snowy-1.svg',         // Pluie et neige mêlées intermittentes
    235: 'thunder.svg'          // Averses de grêle
};
