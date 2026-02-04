"use client";
import { useState, useEffect } from 'react';

export default function Home() {
  const [step, setStep] = useState(1);
  const [noButtonPos, setNoButtonPos] = useState({ top: '70%', left: '50%' });
  const [time, setTime] = useState("18:00");
  const [song, setSong] = useState("");
  const [voucher, setVoucher] = useState("");
  const [choices, setChoices] = useState({ food: '', category: '', detail: '' });
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

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
    gameBowling: "/bowling.jpg",
    gameCards: "/kartenspiele.jpg",
    voucherKuscheln: "/kuscheln.jpg", 
    voucherMassage: "/massage.jpg",
    voucherSelfcare: "/selfcare.jpg"
  };

  useEffect(() => {
    const saved = localStorage.getItem('valentine_plan');
    if (saved) {
      const parsed = JSON.parse(saved);
      setChoices(parsed.choices);
      setTime(parsed.time);
      setSong(parsed.song);
      setVoucher(parsed.voucher);
      setStep(12);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const target = new Date("2026-02-14T" + time + ":00");
      const now = new Date();
      const difference = target.getTime() - now.getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [time]);

  const saveAndFinish = () => {
    const data = { choices, time, song, voucher };
    localStorage.setItem('valentine_plan', JSON.stringify(data));
    setStep(12);
  };

  const goBack = () => {
    if (step === 11) setStep(9);
    else if (step === 9) setStep(14);
    else if (step === 14) setStep(13);
    else if (step === 13) {
      if (choices.category === 'Filme') setStep(6);
      else if (choices.category === 'Spaziergang') setStep(7);
      else if (choices.category === 'Spiele') setStep(8);
      else setStep(5);
    }
    else if (step >= 6 && step <= 8) setStep(5);
    else if (step > 1) setStep(step - 1);
  };

  const moveButton = () => {
    const randomTop = Math.floor(Math.random() * 60) + 20;
    const randomLeft = Math.floor(Math.random() * 60) + 20;
    setNoButtonPos({ top: `${randomTop}%`, left: `${randomLeft}%` });
  };

  useEffect(() => {
    if (step === 1) {
      const interval = setInterval(moveButton, 600);
      return () => clearInterval(interval);
    }
  }, [step]);

  const Widget = ({ title, img, onClick, active }: { title: string, img?: string, onClick: () => void, active?: boolean }) => (
    <div 
      onClick={onClick} 
      className={`cursor-pointer group relative h-32 w-full rounded-3xl overflow-hidden shadow-md transition-all active:scale-95 border-2 ${active ? 'border-rose-500 shadow-rose-200 scale-[0.98]' : 'border-white/50'}`}
    >
      {img ? (
        <img src={img} alt={title} className="object-cover w-full h-full group-hover:scale-110 transition duration-700" />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-rose-200 to-pink-300">
           <span className="text-4xl">✨</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent flex items-end p-4">
        <p className="text-white font-medium text-sm tracking-wide">{title}</p>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 text-black bg-gradient-to-br from-rose-100 via-white to-pink-100">
      <div className="max-w-md w-full backdrop-blur-xl bg-white/70 rounded-[2.5rem] shadow-[0_20px_50px_rgba(251,113,133,0.15)] p-8 text-center border border-white/80 relative z-10 overflow-hidden min-h-[600px] flex flex-col pt-20 transition-all duration-500">
        
        {/* ZURÜCK BUTTON MIT MEHR ABSTAND */}
        {step > 1 && step < 12 && (
          <button 
            onClick={goBack} 
            className="absolute top-8 left-8 z-30 bg-white/90 backdrop-blur-md text-rose-500 w-12 h-12 flex items-center justify-center rounded-full shadow-md border border-rose-50 hover:bg-rose-50 active:scale-90 transition-all"
          >
            <span className="text-xl font-bold">←</span>
          </button>
        )}

        {step < 12 && (
          <div className="absolute top-0 left-0 h-1.5 bg-rose-400 transition-all duration-500" style={{ width: `${(step / 14) * 100}%` }} />
        )}

        {/* --- CONTENT BEREICH MIT GENÜGEND ABSTAND NACH OBEN --- */}
        <div className="flex-1 flex flex-col justify-center animate-in fade-in duration-700">
          {step === 1 && (
            <div className="py-10 relative h-full">
              <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl">🐰</div>
              <h1 className="text-3xl font-extrabold text-gray-800 mb-4">Firdous mein Möhrchen</h1>
              <p className="text-rose-500 text-lg font-medium mb-12">willst du mein Valentinstag-Date sein? ❤️</p>
              <button onClick={() => setStep(2)} className="w-full bg-rose-500 text-white font-bold py-5 rounded-2xl text-xl shadow-lg relative z-20">Ja, von Herzen gerne!</button>
              <button style={{ position: 'absolute', top: noButtonPos.top, left: noButtonPos.left, transform: 'translate(-50%, -50%)', transition: 'all 0.4s ease' }} className="bg-white/60 text-gray-400 py-3 px-8 rounded-full text-sm border border-white/40 pointer-events-none whitespace-nowrap shadow-sm">Nein 🏃‍♂️</button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Wann sehen wir uns? 📅</h2>
              <div className="bg-white/50 rounded-3xl p-6 border border-white shadow-sm">
                <p className="text-xs font-bold text-rose-400 uppercase mb-4 tracking-widest">Februar 2026</p>
                <div className="grid grid-cols-7 gap-2 text-[10px] font-bold text-gray-300 mb-6 italic">
                  {['M', 'D', 'M', 'D', 'F', 'S', 'S'].map(d => <div key={d}>{d}</div>)}
                  {[...Array(13)].map((_, i) => <div key={i} className="opacity-20">{i + 1}</div>)}
                  <div className="bg-rose-500 text-white rounded-lg shadow-md p-1 animate-pulse">14</div>
                  {[...Array(14)].map((_, i) => <div key={i+15} className="opacity-20">{i + 15}</div>)}
                </div>
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="text-4xl font-bold bg-white rounded-xl px-4 py-2 text-rose-600 outline-none border border-rose-100 w-full text-center" />
              </div>
              <button onClick={() => setStep(3)} className="w-full bg-gray-900 text-white font-bold py-5 rounded-2xl">Weiter ✨</button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Ein kleiner Hinweis... 📝</h2>
              <div className="bg-amber-50/80 border border-amber-100 rounded-3xl p-6 text-left text-sm text-gray-700 leading-relaxed">
                <p className="mb-4">Liebes Möhrchen, nimm dir bitte für das Dinner und die Aktivität genug Zeit. ❤️</p>
                <p>Ich möchte, dass wir den Tag komplett stressfrei genießen können.</p>
              </div>
              <button onClick={() => setStep(4)} className="w-full bg-rose-500 text-white font-bold py-5 rounded-2xl">Verstanden ✨</button>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 text-left">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Das Dinner 🍝</h2>
              <Widget title="Überraschung von Kira 🎁" img={images.foodSurprise} onClick={() => {setChoices({...choices, food: 'Überraschung von Kira'}); setStep(5)}} />
              <Widget title="Gemeinsam kochen (Ich besorge die Zutaten!) 👨‍🍳" img={images.foodCooking} onClick={() => {setChoices({...choices, food: 'Gemeinsam kochen (Kira besorgt Zutaten)'}); setStep(5)}} />
            </div>
          )}

          {step === 5 && (
            <div className="space-y-3 text-left">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Die Aktivität 🎡</h2>
              <Widget title="Kuscheln & Filmeabend 🍿" img={images.catMovies} onClick={() => {setChoices({...choices, category: 'Filme'}); setStep(6)}} />
              <Widget title="Nächtlicher Spaziergang 🌙" img={images.catWalk} onClick={() => {setChoices({...choices, category: 'Spaziergang'}); setStep(7)}} />
              <Widget title="Spieleabend 🎱" img={images.catGames} onClick={() => {setChoices({...choices, category: 'Spiele'}); setStep(8)}} />
            </div>
          )}
          
          {(step === 6 || step === 7 || step === 8) && (
            <div className="space-y-3 text-left">
               <h2 className="text-2xl font-bold text-gray-800 mb-2">Details wählen ✨</h2>
               {step === 6 && (
                 <>
                  <Widget title="Carol" img={images.movieCarol} onClick={() => {setChoices({...choices, detail: 'Carol'}); setStep(13)}} />
                  <Widget title="Porträt einer jungen Frau..." img={images.moviePortrait} onClick={() => {setChoices({...choices, detail: 'Porträt einer jungen Frau'}); setStep(13)}} />
                  <Widget title="Ich bringe einen Film mit 🎬" onClick={() => {setChoices({...choices, detail: 'Eigener Filmvorschlag'}); setStep(13)}} />
                 </>
               )}
               {step === 7 && (
                 <>
                  <Widget title="Schönbrunn" img={images.walkSchoenbrunn} onClick={() => {setChoices({...choices, detail: 'Schönbrunn'}); setStep(13)}} />
                  <Widget title="1. Bezirk" img={images.walkDistrict1} onClick={() => {setChoices({...choices, detail: '1. Bezirk'}); setStep(13)}} />
                 </>
               )}
               {step === 8 && (
                 <>
                  <Widget title="Billiard" img={images.gameBilliard} onClick={() => {setChoices({...choices, detail: 'Billiard'}); setStep(13)}} />
                  <Widget title="Bowlen" img={images.gameBowling} onClick={() => {setChoices({...choices, detail: 'Bowlen'}); setStep(13)}} />
                  <Widget title="Home-Kartenspiele 🃏" img={images.gameCards} onClick={() => {setChoices({...choices, detail: 'Home-Kartenspiele'}); setStep(13)}} />
                 </>
               )}
            </div>
          )}

          {step === 13 && (
            <div className="space-y-6">
              <div className="text-4xl">🎵</div>
              <h2 className="text-2xl font-bold text-gray-800">Unser Song?</h2>
              <p className="text-gray-500 text-sm">Welcher Song soll in einem schönen Moment abgespielt werden?</p>
              <input type="text" placeholder="Songname..." value={song} onChange={(e) => setSong(e.target.value)} className="w-full p-4 rounded-2xl border-2 border-rose-100 outline-none focus:border-rose-400 text-center" />
              <button onClick={() => setStep(14)} disabled={!song} className="w-full bg-rose-500 text-white font-bold py-5 rounded-2xl shadow-lg disabled:opacity-50">Weiter ✨</button>
            </div>
          )}

          {step === 14 && (
            <div className="space-y-3 text-left">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Dein Gutschein 🎁</h2>
              <Widget title="Extra langes Kuscheln 🫂" img={images.voucherKuscheln} active={voucher === 'Kuscheln'} onClick={() => setVoucher('Kuscheln')} />
              <Widget title="Massage für Erwachsene 💆‍♀️" img={images.voucherMassage} active={voucher === 'Massage'} onClick={() => setVoucher('Massage')} />
              <Widget title="Gemeinsames Selfcare ✨" img={images.voucherSelfcare} active={voucher === 'Selfcare'} onClick={() => setVoucher('Selfcare')} />
              <button onClick={() => setStep(9)} disabled={!voucher} className="w-full bg-gray-900 text-white font-bold py-5 rounded-2xl mt-4 disabled:opacity-50 transition-all">Gutschein wählen</button>
            </div>
          )}

       {/* --- STEP 9: DER PERSÖNLICHE BRIEF --- */}
{step === 9 && (
  <div className="space-y-8 animate-in zoom-in duration-1000">
    <div className="text-4xl animate-bounce">✉️</div>
    <div className="bg-rose-50/90 border border-rose-100 rounded-[2.5rem] p-8 italic text-gray-700 text-sm leading-relaxed shadow-inner relative">
      {/* Ein kleines Herz-Icon als Dekoration im Hintergrund */}
      <span className="absolute top-4 right-6 text-rose-200 text-4xl opacity-50">♥</span>
      
      <p className="mb-4">
        "Mein liebes Möhrchen, ich kann dir gar nicht sagen, wie sehr ich mich freue, 
        dass du dieses Jahr mein Valentinstag-Date bist."
      </p>
      
      <p className="mb-4">
        "Vor ein paar Wochen saß ich noch in tiefer Trauer da und wollte diesen Tag 
        einfach nur so schnell wie möglich hinter mich bringen. Er fühlte sich schwer an."
      </p>
      
      <p className="mb-4">
        "Aber jetzt? Jetzt kann ich es kaum erwarten. Weil ich diesen Tag genau so verbringen darf, 
        wie ich es mir insgeheim immer erhofft und gewünscht habe: Mit einer Frau wie dir an meiner Seite."
      </p>
      
      <p>
        "Mit der Frau, die ich liebe. Danke, dass du da bist."
      </p>
      
      <div className="mt-6 text-right font-bold text-rose-500 text-base">
        — Dein Kira ❤️
      </div>
    </div>
    <button 
      onClick={() => setStep(11)} 
      className="w-full bg-rose-500 text-white font-bold py-5 rounded-2xl shadow-xl hover:bg-rose-600 transition-colors"
    >
      Zum Plan ✨
    </button>
  </div>
)}
          {step === 11 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-gray-900 uppercase">Unser Plan</h2>
              <div className="bg-white/40 border border-white rounded-[2rem] p-6 text-left space-y-3 shadow-inner text-sm">
                <div className="flex justify-between"><span>📅 Datum:</span> <span className="font-bold">14. Feb, {time}</span></div>
                <div className="flex justify-between"><span>🍽️ Essen:</span> <span className="font-bold">{choices.food}</span></div>
                <div className="flex justify-between"><span>🎯 Aktivität:</span> <span className="font-bold">{choices.detail}</span></div>
                <div className="flex justify-between text-rose-500"><span>🎵 Song:</span> <span className="font-bold truncate max-w-[150px]">{song}</span></div>
                <div className="flex justify-between text-rose-500"><span>🎁 Gutschein:</span> <span className="font-bold">{voucher}</span></div>
              </div>
              <button 
                onClick={() => {
                  const message = `Hey Kira! ❤️ Ich habe unser Date geplant:%0A%0A📅 Zeit: ${time} Uhr%0A🍽️ Essen: ${choices.food}%0A🎯 Aktivität: ${choices.detail}%0A🎵 Song: ${song}%0A🎁 Gutschein: ${voucher}%0A%0AIch freue mich riesig! ✨🥕`;
                  window.open(`https://wa.me/4367763747209?text=${message}`, '_blank');
                  saveAndFinish();
                }}
                className="w-full bg-rose-500 text-white font-bold py-5 rounded-2xl shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all"
              >
                <span>💌</span> Plan senden & Starten!
              </button>
            </div>
          )}

          {step === 12 && (
            <div className="py-6 space-y-8">
              <div className="w-16 h-16 bg-rose-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce text-2xl">❤️</div>
              <h2 className="text-2xl font-bold text-gray-800">Wir sehen uns bald!</h2>
              
              <div className="grid grid-cols-4 gap-2">
                {[{ label: 'Tage', val: timeLeft.days }, { label: 'Std', val: timeLeft.hours }, { label: 'Min', val: timeLeft.minutes }, { label: 'Sek', val: timeLeft.seconds }].map(t => (
                  <div key={t.label} className="bg-white rounded-2xl p-3 shadow-sm border border-rose-50">
                    <div className="text-2xl font-black text-rose-500 leading-none mb-1">{t.val}</div>
                    <div className="text-[10px] uppercase text-gray-400 font-bold tracking-tighter">{t.label}</div>
                  </div>
                ))}
              </div>
              <div className="text-left bg-rose-50/50 rounded-2xl p-5 border border-rose-100">
                <p className="text-[10px] text-rose-400 font-bold uppercase mb-2">Eingeloggt als Firdous Möhrchen 🥕</p>
                <p className="text-xs text-gray-600 leading-relaxed">Song: <strong>{song}</strong><br/>Gutschein: <strong>{voucher}</strong></p>
              </div>
              <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="text-[10px] text-gray-400 underline uppercase tracking-widest active:text-rose-400">Plan ändern</button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
