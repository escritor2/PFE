const htmlForm = document.querySelector('form')
const htmlName = document.querySelector('#name')
const htmlRole = document.querySelector('#role')
const card = document.querySelector('#card')

if (htmlForm) {
    htmlForm.addEventListener('submit', (e) => {
        e.preventDefault()
        getData()
    })
}

function atualizarCartao(name, role, color){
    if (htmlName) htmlName.textContent = name || 'Nome não informado'
    if (htmlRole) htmlRole.textContent = role || 'Função não informada'

    const colors = {
        black: '#111827',
        white: '#d3d5d8',
        blue: '#3b82f6',
        red: '#ef4444',
        green: '#00754e'
    }

    const colorValue = colors[color] || ''
    if (card) {
        if (colorValue) card.style.setProperty('--card-color', colorValue)
        const isDark = ['black','blue','red','green'].includes(color)
        card.style.color = isDark ? '#fff' : '#000'
    }
}

function getData(){
    if (!htmlForm) return
    const formData = new FormData(htmlForm)
    const name = (formData.get('userName') || '').toString().trim()
    const role = (formData.get('userRole') || '').toString().trim()
    const color = formData.get('colors')

    atualizarCartao(name, role, color)
}