import React from 'react'
import Footer from '@/components/custom/footer'
import Technos from './components/custom/Technos'
import { BoxReveal } from '@/components/ui/box-reveal'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from './components/ui/button'

export default function App() {
  const [open, setIsopen] = React.useState<boolean>(false)
  const OpenDialog = () => setIsopen(!open)
  return (
    <div className="sm:flex sm:flex-col sm:m-4">
      <div className=" flex flex-col items-center gap-3 justify-center">
        <div className="flex flex-col sm:gap-3 sm:grid sm:grid-cols-[1fr_2fr] border sm:flex-row sm:w-3/4 justy-center">
          <div className="flex justify-center items-center">
            <Avatar className="w-40 h-40">
              <AvatarImage src="/src/assets/reason.png" className="object-cover" alt="User avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
          <div className="p-6">
            <BoxReveal boxColor="#93c5fd">
              <h1 className="text-4xl md:text-4xl font-extrabold font-tangerine">De l'idée → Réalité</h1>
            </BoxReveal>

            <BoxReveal>
              <p className="mt-3 text-lg font-medium">Full-Stack • React • React Native • Node</p>
              <p className="mt-2 text-base opacity-90">Transformez vos idées en Applications réelles</p>
              <p className="mt-1 text-sm italic opacity-70">Franck Hervé - Obsédé par la qualité des résultats</p>

              <div className="mt-4">
                <Button className="cursor-pointer">Discutons</Button>
              </div>
            </BoxReveal>
          </div>
        </div>
        <div className="flex flex-col gap-10 items-center w-full justify-center">
          <div className="sm:w-3/4 sm:gap-3 sm sm:flex flex flex-col">
            <div className="sm:grid sm:grid-cols-[2fr_1fr] sm:gap-3">
              <div className=" sm:mx-auto w-full h-full border rounded-lg overflow-hidden">
                <img src="/src/assets/shot.png" alt="proj1" className="w-full h-full" />
              </div>
              <div className="relative">
                <Technos />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-[1fr_2fr] sm:gap-3 ">
              <button className="border rounded-lg" type="button" onClick={OpenDialog}>
                <img src="/src/assets/mo.png" alt="proj1" className="object-cover" />
              </button>
              <div className=" sm:mx-auto w-full h-full border rounded-lg overflow-hidden">
                <img src="/src/assets/m.png" alt="proj1" className="w-full h-full" />
              </div>
            </div>
            <Dialog open={open} onOpenChange={OpenDialog}>
              <DialogContent className="sm:max-w-3/5 sm:h-4/5 flex flex-col justy-center overflow-hidden">
                <div className="grid grid-cols-3 grid-flow-row justify-center">
                  <div className="w-full h-3/5">
                    <img src="/src/assets/1.png" alt="proj1" className="object-contain scale-90 hover:scale-100" />
                  </div>
                  <div className="w-full h-3/5">
                    <img src="/src/assets/2.png" alt="proj1" className="object-contain scale-90  hover:scale-100" />
                  </div>
                  <div className="w-full h-3/5">
                    <img src="/src/assets/3.png" alt="proj1" className="object-contain scale-90  hover:scale-100" />
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div>
            <p className="text-sm text-center">Auteurs des ouvrages</p>
            <p className="text-xs">Cliquez sur chacun pour voir voir les aperçus</p>
          </div>
          <div className=" sm:flex sm:justify-center sm:w-full sm:gap-3 lg:p-3">
            <a
              title="Utimate roadmap for the modern web development"
              target="_blank"
              rel="noopener noreferrer"
              href="https://online.fliphtml5.com/yksuz/Modbile/"
              className="w-1/4 bg-white hover:bg-white border rounded-0 sm:h-full"
            >
              <img src="/src/assets/ModernWeb.png" className="object-cover hover:scale-110" alt="bookdevmobile" />
            </a>

            <a
              title="devmobile"
              target="_blank"
              rel="noopener noreferrer"
              href="https://fliphtml5.com/yksuz/Modbile/"
              className="w-1/4 bg-white hover:bg-white border rounded-0 sm:h-full"
            >
              <img src="/src/assets/book.png" className="object-contain border" alt="bookdevmobile" />
            </a>

            <a
              title="fundamental frontend development"
              target="_blank"
              rel="noopener noreferrer"
              href="https://online.fliphtml5.com/yksuz/Modbile/"
              className="w-1/4 bg-white hover:bg-white border rounded-0 sm:h-full"
            >
              <img src="/src/assets/frontendcover.png" className="object-cover hover:scale-110 sm:h-full" alt="bookdevmobile" />
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
