import React from 'react'
import Footer from '@/components/custom/footer'
import Technos from './components/custom/Technos'
import { BoxReveal } from '@/components/ui/box-reveal'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from './components/ui/button'

import reasonImg from '@/assets/reason.png'
import shotImg from '@/assets/shot.png'
import moImg from '@/assets/mo.png'
import mImg from '@/assets/m.png'
import img1 from '@/assets/1.png'
import img2 from '@/assets/2.png'
import img3 from '@/assets/3.png'
import main from '@/assets/main.png'

import bookImg from '@/assets/book.png'
import frontendImg from '@/assets/frontendcover.png'

export default function App() {
  const [open, setIsopen] = React.useState<boolean>(false)
  const OpenDialog = () => setIsopen(!open)

  return (
    <div className="min-h-max mx-auto flex flex-col m-0 sm:m-4">
      <div className="flex flex-col items-center gap-3 justify-center">
        <div className="flex flex-col sm:gap-3 sm:grid sm:grid-cols-[1fr_2fr] border sm:flex-row sm:w-3/4 sm:justify-center">
          <div className="flex justify-center items-center">
            <Avatar className="w-40 h-40">
              <AvatarImage src={reasonImg} className="object-cover" alt="User avatar" />
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
          <div className="sm:w-3/4 sm:gap-3 sm:flex flex flex-col">
            <div className="flex flex-col sm:grid sm:grid-cols-[2fr_1fr] gap-3">
              <div className="sm:mx-auto w-full h-full border rounded-lg overflow-hidden">
                <img src={shotImg} alt="proj1" className="w-full h-full object-cover" />
              </div>
              <div className="relative w-full h-80 sm:h-full">
                <Technos />
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:grid sm:grid-cols-[1fr_2fr] sm:gap-3">
              <button className="border rounded-lg" type="button" onClick={OpenDialog}>
                <img src={moImg} alt="proj1" className="object-contain w-full h-full" />
              </button>
              <div className="sm:mx-auto w-full h-full border rounded-lg overflow-hidden">
                <img src={mImg} alt="proj1" className="w-full h-full object-cover" />
              </div>
            </div>

            <Dialog open={open} onOpenChange={OpenDialog}>
              <DialogContent className="sm:max-w-3/5 h-4/5 flex flex-col justify-center overflow-y-scroll sm:overflow-hidden">
                <div className="flex flex-col sm:grid sm:grid-cols-3 sm:gap-4 sm:justify-center">
                  <div className="w-full h-full">
                    <img src={img1} alt="proj1" className="object-contain scale-90 hover:scale-100 transition-transform" />
                  </div>
                  <div className="w-full h-full">
                    <img src={img2} alt="proj1" className="object-contain scale-90 hover:scale-100 transition-transform" />
                  </div>
                  <div className="w-full h-full">
                    <img src={img3} alt="proj1" className="object-contain scale-90 hover:scale-100 transition-transform" />
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div>
            <p className="text-sm text-center">Auteurs des ouvrages</p>
            <p className="text-xs text-center">Cliquez sur chacun pour voir les aperçus</p>
          </div>

          <div className="sm:flex sm:justify-center sm:w-full sm:gap-6 lg:p-3">
            <a
              title="Ultimate roadmap for the modern web development"
              target="_blank"
              rel="noopener noreferrer"
              href="https://online.fliphtml5.com/yksuz/Modbile/"
              className="w-1/4 bg-white hover:bg-white border rounded-lg overflow-hidden sm:h-full"
            >
              <img src={main} className="object-cover hover:scale-110 transition-transform" alt="book modern web" />
            </a>

            <a
              title="devmobile"
              target="_blank"
              rel="noopener noreferrer"
              href="https://fliphtml5.com/yksuz/Modbile/"
              className="w-1/4 bg-white hover:bg-white border rounded-lg overflow-hidden sm:h-full"
            >
              <img src={bookImg} className="object-contain border hover:scale-110 transition-transform" alt="book dev mobile" />
            </a>

            <a
              title="fundamental frontend development"
              target="_blank"
              rel="noopener noreferrer"
              href="https://online.fliphtml5.com/yksuz/Modbile/"
              className="w-1/4 bg-white hover:bg-white border rounded-lg overflow-hidden sm:h-full"
            >
              <img src={frontendImg} className="object-cover hover:scale-110 transition-transform sm:h-full" alt="book frontend" />
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
