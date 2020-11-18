//How to add text to the container: This method used in API testig to log the data

const doc = cy.state('document')
const win = cy.state('window')
let container = doc.querySelector('.container')
  if (!container) {
  container = doc.createElement('div')
  container.className = 'container'
  doc.body.appendChild(container)
}

 container.innerHTML +=
  // should we use custom class and insert class style?
  '<div class="cy-api">\n' +
  `<h1 class="cy-api-request" style="margin: ${topMargin} 0 1em">Cy-api: ${name}</h1>\n` +
  '<div>\n' +
  '<b>Request:</b>\n' +
  '<pre>' +
  JSON.stringify(options, null, 2) +
  '\n</pre></div>'
  
  
  win.scrollTo(0, doc.body.scrollHeight)
   