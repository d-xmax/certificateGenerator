import './App.css'
import Form from './components/Form'
import Templates from './components/Templates'
import CertificateContextProvider from './store/CertificateContext'
 

function App() {
 

  return (
    <CertificateContextProvider>
      <Form/>
      <Templates/>
    </CertificateContextProvider>
  )
}

export default App
