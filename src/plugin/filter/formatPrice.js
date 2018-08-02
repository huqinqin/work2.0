export default {
  formatPrice (value) {
    let price = (value / 100).toFixed(2)
    return `$${price}`
  }
}
