const test = require('node:test')
const assert = require('node:assert/strict')

const {
  buildGeminiVisionPrompt,
  parseGeminiResponse,
  mapSymptomsToRecommendation,
} = require('../lib/ai/gemini')

test('buildGeminiVisionPrompt includes crop and diagnosis instructions', () => {
  const prompt = buildGeminiVisionPrompt({ cropType: 'Rice', farmName: 'Farm A' })
  assert.match(prompt, /Rice/)
  assert.match(prompt, /JSON/i)
  assert.match(prompt, /product/i)
})

test('parseGeminiResponse extracts JSON from Gemini markdown output', () => {
  const parsed = parseGeminiResponse({
    candidates: [{
      content: { parts: [{ text: '```json\n{"issue":"Leaf blast","severity":"Moderate","confidence":0.86}\n```' }], },
    }],
  })

  assert.equal(parsed.issue, 'Leaf blast')
  assert.equal(parsed.severity, 'Moderate')
  assert.equal(parsed.confidence, 0.86)
})

test('mapSymptomsToRecommendation chooses an agronomic product based on symptom cues', () => {
  const recommendation = mapSymptomsToRecommendation({
    cropType: 'Rice',
    issue: 'Rice blast',
    symptoms: 'Spindle-shaped lesions on leaves and neck blast',
  })

  assert.match(recommendation.product, /Amistar|Revus|Folio|Score|Amistar Top/i)
  assert.match(recommendation.category, /fungicide|disease/i)
})
