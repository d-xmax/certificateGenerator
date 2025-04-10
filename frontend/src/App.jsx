import './App.css'
import Form from './components/Form'
import Hero from './components/Hero'
import StepSection from './components/StepSection'
import Submit from './components/Submit'
import Templates from './components/Templates'
import CertificateContextProvider from './store/CertificateContext'
 

function App() {
 

  return (
    <CertificateContextProvider>
      <Hero/>
      <StepSection/>
      <Templates/>
      <Form/>
      <Submit/>
    </CertificateContextProvider>
  )
}

export default App
