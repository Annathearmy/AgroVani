function parseDate(value, fallbackDate = new Date()) {
  const d = value ? new Date(value) : new Date(fallbackDate)
  if (Number.isNaN(d.getTime())) {
    return new Date(fallbackDate)
  }
  return d
}

function toISODate(value) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return date.toISOString().slice(0, 10)
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function calculateIncentivePlan({
  orderValue = 0,
  repeatBuyerDiscountPct = 0,
  seedSellerBuybackPct = 0,
  residualSellerIncentivePct = 0,
  logisticsIncentivePct = 0,
  buyerRepeatCount = 0,
} = {}) {
  const baseValue = Number(orderValue) || 0
  const repeatBuyerRate = Number(repeatBuyerDiscountPct) || 0
  const seedSellerRate = Number(seedSellerBuybackPct) || 0
  const residualSellerRate = Number(residualSellerIncentivePct) || 0
  const logisticsRate = Number(logisticsIncentivePct) || 0
  const repeatEligible = Number(buyerRepeatCount) >= 3

  const repeatBuyerDiscount = repeatEligible ? baseValue * (repeatBuyerRate / 100) : 0
  const seedSellerBuyback = baseValue * (seedSellerRate / 100)
  const residualSellerIncentive = baseValue * (residualSellerRate / 100)
  const logisticsIncentive = baseValue * (logisticsRate / 100)
  const totalIncentive = repeatBuyerDiscount + seedSellerBuyback + residualSellerIncentive + logisticsIncentive
  const netPayable = Math.max(0, baseValue - totalIncentive)

  return {
    orderValue: baseValue,
    repeatBuyerEligible: repeatEligible,
    totalIncentive: Number(totalIncentive.toFixed(2)),
    netPayable: Number(netPayable.toFixed(2)),
    incentivePct: Number(((totalIncentive / Math.max(baseValue, 1)) * 100).toFixed(2)),
    discountBreakdown: {
      repeatBuyerDiscount: Number(repeatBuyerDiscount.toFixed(2)),
      seedSellerBuyback: Number(seedSellerBuyback.toFixed(2)),
      residualSellerIncentive: Number(residualSellerIncentive.toFixed(2)),
      logisticsIncentive: Number(logisticsIncentive.toFixed(2)),
    },
  }
}

function buildCropCalendar({
  cropType = 'Rice',
  sowingDate = '2026-06-15',
  weatherDelayDays = 0,
  harvestWindowDays = 120,
} = {}) {
  const sowing = parseDate(sowingDate)
  const harvestDate = new Date(sowing)
  harvestDate.setDate(harvestDate.getDate() + Number(harvestWindowDays || 120))

  const milestones = [
    { label: 'Land prep', date: toISODate(new Date(sowing.getTime() - 12 * 24 * 60 * 60 * 1000)) },
    { label: 'Sowing', date: toISODate(sowing) },
    { label: 'Germination window', date: toISODate(new Date(sowing.getTime() + 10 * 24 * 60 * 60 * 1000)) },
    { label: 'Crop staging', date: toISODate(new Date(sowing.getTime() + 45 * 24 * 60 * 60 * 1000)) },
    { label: 'Nutrient check', date: toISODate(new Date(sowing.getTime() + 75 * 24 * 60 * 60 * 1000)) },
    { label: 'Harvest', date: toISODate(harvestDate) },
  ]

  const maturityWindow = {
    start: toISODate(harvestDate),
    end: toISODate(harvestDate),
  }

  return {
    cropType,
    sowing: { date: toISODate(sowing), weatherDelayDays: Number(weatherDelayDays || 0) },
    maturityWindow,
    harvest: { date: toISODate(harvestDate), recommendedWindowDays: Number(harvestWindowDays || 120) },
    milestones,
    nextCrop: cropType === 'Rice'
      ? 'Sow wheat or barley after residue uptake, ideally in the first 10–15 days after harvest to keep moisture and soil active.'
      : cropType === 'Wheat'
        ? 'Rotate to soybean or maize in the next favourable monsoon window to maintain field health and reduce residue burn risk.'
        : 'Follow with a legume or cereal rotation aligned with local rains and use residue as mulch instead of burning.',
  }
}

function calculateYieldProjection({
  areaInAcres = 1,
  expectedYieldTonsPerAcre = 2.2,
  weatherDelayDays = 0,
  stressIndex = 0,
  yieldLossPct = 0,
} = {}) {
  const acres = Number(areaInAcres) || 1
  const yieldPerAcre = Number(expectedYieldTonsPerAcre) || 0
  const baseYield = acres * yieldPerAcre
  const weatherPenalty = clamp((Number(weatherDelayDays) || 0) * 0.0006, 0, 0.02)
  const stressPenalty = clamp((Number(stressIndex) || 0) * 0.015, 0, 0.05)
  const lossPenalty = clamp(((Number(yieldLossPct) || 0) / 100) * 0.02, 0, 0.02)
  const netFactor = 1 - (weatherPenalty + stressPenalty + lossPenalty)
  const totalYieldTons = Number((baseYield * netFactor).toFixed(2))
  const yieldPercent = clamp(Number(((netFactor || 1) * 100).toFixed(1)), 70, 100)

  return {
    areaInAcres: acres,
    expectedYieldTonsPerAcre: yieldPerAcre,
    baseYieldTons: Number(baseYield.toFixed(2)),
    totalYieldTons,
    netYieldTons: totalYieldTons,
    yieldPercent,
    weatherPenalty: Number(weatherPenalty.toFixed(4)),
    stressPenalty: Number(stressPenalty.toFixed(4)),
    lossPenalty: Number(lossPenalty.toFixed(4)),
    netFactor: Number(netFactor.toFixed(4)),
  }
}

module.exports = {
  calculateIncentivePlan,
  buildCropCalendar,
  calculateYieldProjection,
}
