import './App.css'
import { AddressInput } from './components/search/AddressInput'
import { Map } from './components/map/Map'

function App() {

  return (
    <>
      <div className="relative w-screen h-screen">
        <Map />
        <div className="absolute inset-x-0 top-0 px-4 md:px-8 pt-4 md:pt-8 z-1000">
          <div className="w-full max-w-[1024px]">
            <AddressInput />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
