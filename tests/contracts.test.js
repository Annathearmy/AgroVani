import test from 'node:test'
import assert from 'node:assert/strict'
import { farmCreateSchema, listingCreateSchema, orderCreateSchema } from '../lib/contracts/api.js'

test('farm contract rejects invalid coordinates and area', () => {
  const result = farmCreateSchema.safeParse({ areaInAcres: 0, latitude: 100, longitude: 76 })
  assert.equal(result.success, false)
})

test('listing contract rejects non-finite and non-positive prices', () => {
  assert.equal(listingCreateSchema.safeParse({ sellerId: 'seller', name: 'Seed', priceInr: 'NaN' }).success, false)
  assert.equal(listingCreateSchema.safeParse({ sellerId: 'seller', name: 'Seed', priceInr: 0 }).success, false)
})

test('order contract requires a positive integer quantity', () => {
  const valid = orderCreateSchema.safeParse({ listingId: 'listing', sellerId: 'seller', quantity: 2 })
  const invalid = orderCreateSchema.safeParse({ listingId: 'listing', sellerId: 'seller', quantity: 1.5 })
  assert.equal(valid.success, true)
  assert.equal(invalid.success, false)
})
