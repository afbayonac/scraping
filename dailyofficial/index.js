const puppeteer = require('puppeteer')

const main = async (url) => {
  // Create a browser instance
  const browser = await puppeteer.launch({ devtools: true })

  // Create a new page
  const page = await browser.newPage()
  await page.setViewport({ width: 1366, height: 768 })

  // Open URL in current page
  await page.goto(url, { waitUntil: 'networkidle0' })

  // To reflect CSS used for screens instead of print
  // await page.emulateMediaType('screen')
  // await page.waitForSelector('#fechaInicial_input')
  await page.type('#fechaInicial_input', '20/04/1864')

  // await page.waitForSelector('#fechaFinal_input')
  await page.type('#fechaFinal_input', '04/01/2023')
  // Close the browser instance
  // await browser.close()

  await page.evaluate(() => {
    const select = document.querySelector('#dtbDiariosOficiales_rppDD')
    const option = document.createElement('option')
    option.setAttribute('value', '1000')
    option.textContent = '1000'
    select.appendChild(option)
    select.value = '1000'
  });

  await page.select('select#dtbDiariosOficiales_rppDDt', '1000')

  // await page.type('#dtbDiariosOficiales_rppDD', '04/01/2023')

  // await page.click('#btnBuscar', {
  //   button: 'left',
  //   delay: 1000,
  //   clickCount: 1
  // })

  
  // await page.click('#btnBuscar')
  // await page.click('#btnBuscar')
  // await page.click('#btnBuscar')
}

main('http://svrpubindc.imprenta.gov.co/diario/view/diarioficial/consultarDiarios.xhtml')
