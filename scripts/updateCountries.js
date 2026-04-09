const fs = require('fs');
const path = require('path');

// 读取data.json文件
const dataJsonPath = path.join(__dirname, '../data/data.json');
const pageTsxPath = path.join(__dirname, '../app/shop/page.tsx');

const data = JSON.parse(fs.readFileSync(dataJsonPath, 'utf-8'));

// 国家地区映射
const regionMap = {
  // 亚洲
  'JP': 'Ази', 'KR': 'Ази', 'CN': 'Ази', 'SG': 'Ази', 'TH': 'Ази', 'MY': 'Ази', 'VN': 'Ази', 'ID': 'Ази', 'PH': 'Ази', 'IN': 'Ази', 'HK': 'Ази', 'MO': 'Ази', 'TW': 'Ази', 'BD': 'Ази', 'LK': 'Ази', 'PK': 'Ази', 'AF': 'Ази', 'NP': 'Ази', 'BT': 'Ази', 'MM': 'Ази', 'KH': 'Ази', 'LA': 'Ази', 'MY': 'Ази', 'SG': 'Ази', 'ID': 'Ази', 'PH': 'Ази', 'TH': 'Ази', 'VN': 'Ази', 'CN': 'Ази', 'HK': 'Ази', 'MO': 'Ази', 'JP': 'Ази', 'KR': 'Ази', 'IN': 'Ази', 'PK': 'Ази', 'BD': 'Ази', 'LK': 'Ази', 'AF': 'Ази', 'NP': 'Ази', 'BT': 'Ази', 'MM': 'Ази', 'KH': 'Ази', 'LA': 'Ази',
  // 欧洲
  'DE': 'Европ', 'GB': 'Европ', 'FR': 'Европ', 'IT': 'Европ', 'ES': 'Европ', 'PT': 'Европ', 'TR': 'Европ', 'RU': 'Европ', 'UA': 'Европ', 'PL': 'Европ', 'SE': 'Европ', 'NO': 'Европ', 'FI': 'Европ', 'DK': 'Европ', 'NL': 'Европ', 'BE': 'Европ', 'CH': 'Европ', 'AT': 'Европ', 'HU': 'Европ', 'CZ': 'Европ', 'SK': 'Европ', 'SI': 'Европ', 'HR': 'Европ', 'BA': 'Европ', 'RS': 'Европ', 'BG': 'Европ', 'RO': 'Европ', 'MD': 'Европ', 'LT': 'Европ', 'LV': 'Европ', 'EE': 'Европ', 'IS': 'Европ', 'IE': 'Европ', 'MT': 'Европ', 'CY': 'Европ', 'LI': 'Европ', 'MC': 'Европ', 'AD': 'Европ', 'SM': 'Европ', 'VA': 'Европ', 'BY': 'Европ',
  // 北美洲
  'US': 'Хойд Америк', 'CA': 'Хойд Америк', 'MX': 'Хойд Америк', 'PR': 'Хойд Америк', 'CU': 'Хойд Америк', 'DO': 'Хойд Америк', 'JM': 'Хойд Америк', 'HT': 'Хойд Америк', 'BS': 'Хойд Америк', 'TT': 'Хойд Америк', 'VC': 'Хойд Америк', 'AG': 'Хойд Америк', 'GD': 'Хойд Америк', 'LC': 'Хойд Америк', 'KN': 'Хойд Америк', 'DM': 'Хойд Америк', 'BB': 'Хойд Америк', 'AW': 'Хойд Америк', 'BZ': 'Хойд Америк', 'CR': 'Хойд Америк', 'SV': 'Хойд Америк', 'GT': 'Хойд Америк', 'HN': 'Хойд Америк', 'NI': 'Хойд Америк', 'PA': 'Хойд Америк',
  // 南美洲
  'BR': 'Өмнөд Америк', 'AR': 'Өмнөд Америк', 'CL': 'Өмнөд Америк', 'CO': 'Өмнөд Америк', 'PE': 'Өмнөд Америк', 'VE': 'Өмнөд Америк', 'EC': 'Өмнөд Америк', 'UY': 'Өмнөд Америк', 'PY': 'Өмнөд Америк', 'BO': 'Өмнөд Америк', 'SR': 'Өмнөд Америк', 'GY': 'Өмнөд Америк', 'GF': 'Өмнөд Америк', 'MQ': 'Өмнөд Америк', 'GP': 'Өмнөд Америк',
  // 大洋洲
  'AU': 'Австрали', 'NZ': 'Австрали', 'FJ': 'Австрали', 'WS': 'Австрали', 'GU': 'Австрали', 'PF': 'Австрали', 'NC': 'Австрали', 'VU': 'Австрали',
  // 中东和非洲
  'SA': 'Дундад зүүн', 'AE': 'Дундад зүүн', 'EG': 'Дундад зүүн', 'IL': 'Дундад зүүн', 'JO': 'Дундад зүүн', 'LB': 'Дундад зүүн', 'SY': 'Дундад зүүн', 'IQ': 'Дундад зүүн', 'IR': 'Дундад зүүн', 'OM': 'Дундад зүүн', 'QA': 'Дундад зүүн', 'KW': 'Дундад зүүн', 'BH': 'Дундад зүүн', 'YE': 'Дундад зүүн', 'GM': 'Дундад зүүн', 'SN': 'Дундад зүүн', 'MR': 'Дундад зүүн', 'ML': 'Дундад зүүн', 'GN': 'Дундад зүүн', 'GW': 'Дундад зүүн', 'CI': 'Дундад зүүн', 'BJ': 'Дундад зүүн', 'TG': 'Дундад зүүн', 'GH': 'Дундад зүүн', 'NG': 'Дундад зүүн', 'KE': 'Дундад зүүн', 'TZ': 'Дундад зүүн', 'UG': 'Дундад зүүн', 'RW': 'Дундад зүүн', 'BI': 'Дундад зүүн', 'CD': 'Дундад зүүн', 'CG': 'Дундад зүүн', 'AO': 'Дундад зүүн', 'ZW': 'Дундад зүүн', 'ZM': 'Дундад зүүн', 'MW': 'Дундад зүүн', 'MZ': 'Дундад зүүн', 'SD': 'Дундад зүүн', 'SO': 'Дундад зүүн', 'ET': 'Дундад зүүн', 'ER': 'Дундад зүүн', 'DJ': 'Дундад зүүн', 'KM': 'Дундад зүүн', 'MG': 'Дундад зүүн', 'RE': 'Дундад зүүн', 'MA': 'Дундад зүүн', 'DZ': 'Дундад зүүн', 'TN': 'Дундад зүүн', 'LY': 'Дундад зүүн', 'EG': 'Дундад зүүн', 'ZA': 'Дундад зүүн', 'NA': 'Дундад зүүн', 'BW': 'Дундад зүүн', 'LS': 'Дундад зүүн', 'SZ': 'Дундад зүүн', 'MOZ': 'Дундад зүүн',
  // 中亚
  'KZ': 'Дундад зүүн', 'UZ': 'Дундад зүүн', 'KG': 'Дундад зүүн', 'TJ': 'Дундад зүүн', 'TM': 'Дундад зүүн',
  // 蒙古
  'MN': 'Монгол'
};

// 旅游知名度排序（数字越大知名度越高）
const popularityMap = {
  // 高知名度国家
  'JP': 100, 'TH': 95, 'SG': 90, 'CN': 88, 'US': 85, 'AU': 80, 'GB': 78, 'FR': 75, 'IT': 72, 'ES': 70, 'TR': 68, 'KR': 65, 'DE': 62, 'PT': 60,
  // 中等知名度国家
  'MY': 58, 'VN': 55, 'ID': 52, 'PH': 50, 'HK': 48, 'IN': 45, 'CA': 42, 'MX': 40, 'SA': 38, 'AE': 35, 'EG': 32, 'RU': 30,
  // 较低知名度国家
  'MO': 28, 'NZ': 25, 'AR': 22, 'BR': 20, 'PE': 18, 'CH': 16, 'AT': 14, 'NL': 12, 'BE': 10,
  // 默认值
  'default': 5
};

// 过滤有效国家（排除复合代码如EU-30、AS-5等）
const validCountries = data.filter(item => {
  return item.name.length === 2 && !item.name.includes('-') && !item.name.includes('_');
});

// 处理国家数据
const processedCountries = validCountries.map(item => {
  const code = item.name;
  const name = item.nameMN || item.locationMN || item.name;
  const region = regionMap[code] || 'Бусад';
  
  return {
    code: code,
    name: name,
    flag: '',
    fromPrice: 0,
    region: region
  };
});

// 按旅游知名度排序
const sortedCountries = processedCountries.sort((a, b) => {
  const popularityA = popularityMap[a.code] || popularityMap['default'];
  const popularityB = popularityMap[b.code] || popularityMap['default'];
  return popularityB - popularityA;
});

// 生成新的ALL_COUNTRIES数组代码
const countriesCode = `const ALL_COUNTRIES = [
  ${sortedCountries.map(country => `
  { code: "${country.code}", name: "${country.name}", flag: "", fromPrice: 0, region: "${country.region}" }`).join(',')}
];`;

// 读取page.tsx文件内容
const pageContent = fs.readFileSync(pageTsxPath, 'utf-8');

// 替换ALL_COUNTRIES数组
const updatedPageContent = pageContent.replace(/const ALL_COUNTRIES = \[\s[\s\S]*?\];/, countriesCode);

// 写入更新后的内容
fs.writeFileSync(pageTsxPath, updatedPageContent, 'utf-8');

console.log('Successfully updated ALL_COUNTRIES in shop/page.tsx');
console.log(`Added ${sortedCountries.length} countries`);
