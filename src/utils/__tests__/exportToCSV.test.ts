import { exportToCSV } from '../exportToCSV'

describe('exportToCSV', () => {
  it('deve gerar um CSV válido', () => {
    const data = [
      { campo: 'CNPJ', valor: '12345678000199' },
      { campo: 'Razão Social', valor: 'Empresa Exemplo' }
    ]
    // Simula o ambiente do browser
    const createObjectURL: jest.Mock = jest.fn()
    global.URL.createObjectURL = createObjectURL

    // Simula o clique
    const click: jest.Mock = jest.fn()
    document.createElement = jest.fn().mockReturnValue({ setAttribute: jest.fn(), click })

    exportToCSV(data, 'teste.csv')
    expect(createObjectURL).toHaveBeenCalled()
    expect(click).toHaveBeenCalled()
  })
}) 