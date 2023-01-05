const puppeteer = require('puppeteer')

const log = (...args) => console.log('[Daily official 🤘]  ', ...args) 

const main = async (url) => {
  // Create a browser instance
  const browser = await puppeteer.launch({ devtools: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] })

  
  const pages = await browser.pages()
  const page = pages[0]
  // await page.setViewport({ width: 920, height: 768 })
  await page.setRequestInterception(true);
  page.on('request', request => {
    request.url()
    if (['image'].includes(request.resourceType())) {
      request.abort();
    } else {
      request.continue();
    }
  });



  // Open URL in current page
  log('-- open base page --')
  await page.goto(url, { waitUntil: 'networkidle2' })
  
  log('-- set dates and click btn --')
  await page.waitForSelector('#fechaInicial_input')
  await page.type('#fechaInicial_input', '20/04/1864')
  await page.type('#fechaInicial_input', '11/04/1864')
  await page.type('#fechaFinal_input', '04/01/2023')
  await page.click('#btnBuscar', {
    button: 'left',
    delay: 300,
    clickCount: 2
  })

  await new Promise((resolve, reject) => {
    let interval = null
    interval = setInterval(async() => {
      const text = await  page.$eval('span.ui-paginator-current', e => e.innerHTML)
      log(text)
      if (text === 'Registro 1 a 10 de 22920 | Página 1 de 2292') {
        clearInterval(interval)
        resolve()
      }
    }, 1000 )
  })

  log('-- redirect to pdf --')
  await page.click('#dtbDiariosOficiales\\:0\\:j_idt32', {
    button: 'left',
    delay: 300,
    clickCount: 1
  })

  await page.waitForSelector('#frmVerPdf\\:j_idt21')
  const text = await  page.$eval('object', e => e.data)
  console.log(text)
 
  await page.click('#frmVerPdf\\:j_idt21', {
    button: 'left',
    delay: 300,
    clickCount: 2
  })


  log('-- change id and name --')
  await page.waitForSelector('#dtbDiariosOficiales\\:0\\:j_idt32')
  await page.$eval('#dtbDiariosOficiales\\:0\\:j_idt32', btn => {
    console.log('update btn')
    btn.setAttribute('id', 'dtbDiariosOficiales\:10\:j_idt32')
    btn.setAttribute('name', 'dtbDiariosOficiales:10:j_idt32')
    console.log(btn)
    return btn
  })

  log('-- change id and name --')
  await page.waitForSelector('#dtbDiariosOficiales\\:10\\:j_idt32')
  await page.click('#dtbDiariosOficiales\\:10\\:j_idt32', {
    button: 'left',
    delay: 300,
    clickCount: 2
  })

  // await page.waitForSelector('#frmVerPdf\\:j_idt21')
  // const text2 = await  page.$eval('object', e => e.data)
  // console.log(text)







  // await page.waitForSelector('#dialogStatus_modal')
  // close browser
  // await browser.close()
}

main('http://svrpubindc.imprenta.gov.co/diario/view/diarioficial/consultarDiarios.xhtml')
