import '@testing-library/jest-dom'

// Create modal-root for portal tests
const modalRoot = document.createElement('div')
modalRoot.setAttribute('id', 'modal-root')
document.body.appendChild(modalRoot)
