"use client";
import { useState, useEffect } from 'react';

export default function Home() {
  const [step, setStep] = useState(1);
  const [noButtonPos, setNoButtonPos] = useState({ top: '50%', left: '60%' });
  const [time, setTime] = useState("18:00");
  const [choices, setChoices] = useState({ food: '', category: '', detail: '' });

  const images = {
    foodSurprise: "/bestellen.jpg",
    foodCooking: "/kochen.jpg",
    catMovies: "/chill.jpg",
    catWalk: "/spaziergang.jpg",
    catGames: "/billiard.jpg", 
    movieCarol: "/carol.jpg",
    moviePortrait: "/potrait.jpg",
    walkSchoenbrunn: "/schoenbrunn.jpg",
    walkDistrict1: "/erster-bezirk.jpg",
    gameBilliard: "/billiard-spiel.jpg",
    gameBowling: "/bowling.jpg"
  };

  const moveButton = () => {
    const randomTop = Math.floor(Math.random() * 80) + 10;
    const randomLeft = Math.floor(Math.random() * 80) + 10;
    setNoButtonPos({ top: `${randomTop}%`, left: `${randomLeft}%` });
  };

  useEffect(() => {
    if (step === 1) {
      const interval = setInterval(moveButton, 600);
      return () => clearInterval(interval);
    }
  }, [step]);

  const goBack = () => {
    if (step === 10) setStep(8);
    else if (step === 8) setStep(4);
    else if (step > 1) setStep(step - 1);
  };

  const Widget = ({ title, img, onClick }: { title: string, img: string, onClick: () => void }) => (
    <div 
      onClick={onClick} 
      className="cursor-pointer group relative h-40 w-full rounded-3xl overflow-hidden shadow-md transition-all active:scale-95 border border-white/50"
    >
      <img src={img} alt={title} className="object-cover w-full h-full group-hover:scale-110 transition duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent flex items-end p-5">
        <p className="text-white font-medium text-base tracking-wide">{title}</p>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 text-black bg-gradient-to-br from-rose-100 via-white to-pink-100 animate-gradient-slow">
      
      <div className="absolute top-10 left-10 text-rose-200 text-6xl animate-bounce opacity-50 select-none">❤️</div>
      <div className="absolute bottom-20 right-10 text-rose-200 text-4xl animate-pulse opacity-40 select-none">✨</div>

      <div className="max-w-md w-full backdrop-blur-xl bg-white/70 rounded-[2.5rem] shadow-[0_20px_50px_rgba(251,113,133,0.15)] p-8 text-center border border-white/80 relative z-10 overflow-hidden">
        
        <div className="absolute top-0 left-0 h-1.5 bg-rose-400 transition-all duration-500" style={{ width: `${(step / 10) * 100}%` }} />

        {step > 1 && (
          <button 
            onClick={goBack}
            className="absolute top-6 left-6 z-30 bg-white/80 backdrop-blur-md text-rose-500 w-10 h-10 flex items-center justify-center rounded-full shadow-sm border border-rose-100 hover:bg-rose-50 transition-all"
          >
            ←
          </button>
        )}

        {step === 1 && (
          <div className="py-10 animate-in fade-in zoom-in duration-700">
            <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse text-4xl">🐰</div>
            <h1 className="text-3xl font-extrabold text-gray-800 mb-4 tracking-tight">Firdous mein Möhrchen</h1>
            <p className="text-rose-500 text-lg font-medium mb-12">willst du mein Valentinstag-Date sein? ❤️</p>
            <button onClick={() => setStep(2)} className="w-full bg-rose-500 text-white font-bold py-5 rounded-2xl text-xl shadow-lg active:scale-95 transition-all">Ja, von Herzen gerne!</button>
            <button style={{ position: 'fixed', top: noButtonPos.top, left: noButtonPos.left, transition: 'all 0.4s ease', zIndex: 50 }} className="bg-white/40 backdrop-blur-sm text-gray-400 py-2 px-6 rounded-full text-xs border border-white/20 pointer-events-none">Nein 🏃‍♂️</button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in slide-in-from-bottom-8 duration-500 pt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Wann sehen wir uns? 📅</h2>
            <div className="bg-white/50 backdrop-blur-md rounded-3xl p-6 mb-8 border border-white">
              <p className="text-xs font-bold text-rose-400 uppercase mb-4">Februar 2026</p>
              <div className="grid grid-cols-7 gap-2 text-[10px] font-bold text-gray-300">
                {['M', 'D', 'M', 'D', 'F', 'S', 'S'].map(d => <div key={d}>{d}</div>)}
                {[...Array(13)].map((_, i) => <div key={i} className="opacity-20">{i + 1}</div>)}
                <div className="bg-rose-500 text-white rounded-lg shadow-md p-1 animate-pulse">14</div>
                {[...Array(14)].map((_, i) => <div key={i+15} className="opacity-20">{i + 15}</div>)}
              </div>
            </div>
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="text-5xl font-light p-4 bg-transparent text-rose-600 mb-10 w-full text-center outline-none" />
            <button onClick={() => setStep(3)} className="w-full bg-gray-900 text-white font-bold py-5 rounded-2xl active:scale-95 transition-all">Weiter ✨</button>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in slide-in-from-bottom-8 duration-500 space-y-4 pt-8">
            <h2 className="text-2xl font-bold text-gray-800 text-left">Das Dinner 🍝</h2>
            <Widget title="Überraschung von Kira 🎁" img={images.foodSurprise} onClick={() => {setChoices({...choices, food: 'Überraschung von Kira'}); setStep(4)}} />
            <Widget title="Gemeinsam kochen 👨‍🍳" img={images.foodCooking} onClick={() => {setChoices({...choices, food: 'Gemeinsam kochen'}); setStep(4)}} />
          </div>
        )}

        {step >= 4 && step <= 7 && (
          <div className="animate-in slide-in-from-bottom-8 duration-500 space-y-4 pt-8 text-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{step === 4 ? "Die Aktivität 🎡" : "Details wählen"}</h2>
            {step === 4 && (
              <>
                <Widget title="Kuscheln & Filmeabend 🍿" img={images.catMovies} onClick={() => {setChoices({...choices, category: 'Filme'}); setStep(5)}} />
                <Widget title="Nächtlicher Spaziergang 🌙" img={images.catWalk} onClick={() => {setChoices({...choices, category: 'Spaziergang'}); setStep(6)}} />
                <Widget title="Spieleabend 🎱" img={images.catGames} onClick={() => {setChoices({...choices, category: 'Spiele'}); setStep(7)}} />
              </>
            )}
            {step === 5 && (
              <>
                <Widget title="Carol" img={images.movieCarol} onClick={() => {setChoices({...choices, detail: 'Carol'}); setStep(8)}} />
                <Widget title="Porträt einer jungen Frau..." img={images.moviePortrait} onClick={() => {setChoices({...choices, detail: 'Porträt einer jungen Frau in Flammen'}); setStep(8)}} />
              </>
            )}
            {step === 6 && (
              <>
                <Widget title="Schönbrunn" img={images.walkSchoenbrunn} onClick={() => {setChoices({...choices, detail: 'Schönbrunn Spaziergang'}); setStep(8)}} />
                <Widget title="1. Bezirk" img={images.walkDistrict1} onClick={() => {setChoices({...choices, detail: '1. Bezirk Spaziergang'}); setStep(8)}} />
              </>
            )}
            {step === 7 && (
              <>
                <Widget title="Billiard" img={images.gameBilliard} onClick={() => {setChoices({...choices, detail: 'Billiard'}); setStep(8)}} />
                <Widget title="Bowlen" img={images.gameBowling} onClick={() => {setChoices({...choices, detail: 'Bowlen'}); setStep(8)}} />
              </>
            )}
          </div>
        )}

        {/* NEU: DER PERSÖNLICHE BRIEF */}
        {step === 8 && (
          <div className="animate-in fade-in zoom-in duration-1000 pt-8 flex flex-col items-center">
            <div className="text-4xl mb-6">✉️</div>
            <div className="bg-rose-50/80 border border-rose-100 rounded-3xl p-8 shadow-inner relative italic text-gray-700 leading-relaxed font-serif">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full text-[10px] font-bold text-rose-400 uppercase tracking-widest border border-rose-100">Für Firdous</div>
              
              <p className="mb-4">
                "Ich freue mich so unglaublich sehr, dass wir diesen Valentinstag doch gemeinsam verbringen."
              </p>
              <p>
                "Um ehrlich zu sein... ich hatte solche Angst, dass ich diesen besonderen Tag dieses Jahr ohne dich verbringen muss. Dass du da bist, bedeutet mir alles."
              </p>

              <div className="mt-6 text-right font-bold not-italic text-rose-500">— Dein Kira ❤️</div>
            </div>
            
            <button onClick={() => setStep(10)} className="mt-8 w-full bg-rose-500 text-white font-bold py-5 rounded-2xl shadow-xl active:scale-95 transition-all">
              Zum Plan ✨
            </button>
          </div>
        )}

        {step === 10 && (
          <div className="animate-in zoom-in duration-700 py-4">
            <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tighter uppercase">Unser Plan</h2>
            <div className="bg-white/40 border border-white rounded-[2rem] p-6 text-left space-y-4 shadow-inner mb-8 text-sm">
              <div className="flex justify-between font-semibold"><span>📅 Datum:</span> <span>14. Feb, {time} Uhr</span></div>
              <div className="flex justify-between font-semibold"><span>🍽️ Essen:</span> <span>{choices.food}</span></div>
              <div className="flex justify-between font-semibold"><span>🎯 Aktivität:</span> <span>{choices.detail}</span></div>
            </div>
            <button 
              onClick={() => {
                const message = `Hey Kira! ❤️ Ich habe unser Date geplant:%0A%0A📅 Datum: 14. Februar%0A⏰ Zeit: ${time} Uhr%0A🍽️ Essen: ${choices.food}%0A🎯 Aktivität: ${choices.detail}%0A%0AIch freue mich riesig! ✨🥕`;
                window.open(`https://wa.me/4367763747209?text=${message}`, '_blank');
              }}
              className="w-full bg-rose-500 text-white font-bold py-5 rounded-2xl shadow-xl flex items-center justify-center gap-3"
            >
              <span>💌</span> Plan senden
            </button>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes gradient-slow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .animate-gradient-slow { background-size: 200% 200%; animation: gradient-slow 10s ease infinite; }
      `}</style>
    </main>
  );
}
