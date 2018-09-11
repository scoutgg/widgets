const script = document.querySelector('.widgets-script')
const config = {}
Object.keys(script.dataset).forEach(key => {
  config[key] = script.dataset[key]
})

export default config
