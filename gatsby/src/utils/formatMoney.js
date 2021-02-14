const formatter = Intl.NumberFormat('en-us', {
  style: 'currency',
  currency: 'USD',
})

export default function formatMoney(cents) {
  return formatter.format(cents / 100)
}
