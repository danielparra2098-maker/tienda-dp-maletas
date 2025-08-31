import { useMemo, useState } from 'react'
import { ShoppingCart, Truck, ShieldCheck, CreditCard, X, Star, Ruler, Package } from 'lucide-react'

const PHONE = "3007900388"
const WHATS = (msg) => `https://wa.me/57${PHONE}?text=${encodeURIComponent(msg)}`

const ASSETS = {
  logo: "/img/logo.png",
  gallery: [
    { color: "Beige", src: "/img/beige.jpeg" },
    { color: "Rosado", src: "/img/rosado.jpeg" },
    { color: "Negro A", src: "/img/negro-a.jpeg" },
    { color: "Azul", src: "/img/azul.jpeg" },
    { color: "Café", src: "/img/cafe.jpeg" },
    { color: "Oro", src: "/img/oro.jpeg" },
    { color: "Negro B", src: "/img/negro-b.jpeg" },
    { color: "Lila", src: "/img/lila.jpeg" },
    { color: "Plata", src: "/img/plata.jpeg" },
  ]
}

const BASE_PRODUCTS = [
  { id: "cabina-20", title: 'Cabina 20\" Giro 360°', price: 130000, oldPrice: 229900, size: 'Cabina (20\")', weight: '10 kg', color: ASSETS.gallery.map(g=>g.color), material: 'ABS+PC', warranty: '12 meses', tag: 'Top Seller', image: ASSETS.gallery[0].src },
  { id: "mediana-24", title: 'Mediana 24\" Expandible', price: 130000, oldPrice: 299900, size: 'Mediana (24\")', weight: '10 kg', color: ASSETS.gallery.map(g=>g.color), material: 'Policarbonato', warranty: '12 meses', tag: 'Nuevo', image: ASSETS.gallery[1].src },
  { id: "grande-28", title: 'Grande 28\" Ultraliviana', price: 140000, oldPrice: 349900, size: 'Grande (28\")', weight: '10 kg', color: ASSETS.gallery.map(g=>g.color), material: 'PP', warranty: '24 meses', tag: 'Garantía 24m', image: ASSETS.gallery[2].src },
  { id: "set-3", title: 'Set 3 piezas 20/24/28', price: 140000, oldPrice: 699900, size: 'Set (20/24/28)', weight: '10 kg (cada una)', color: ASSETS.gallery.map(g=>g.color), material: 'ABS', warranty: '12 meses', tag: 'Ahorra 17%', image: ASSETS.gallery[3].src },
]

function formatCOP(n){ return n.toLocaleString('es-CO', {style:'currency', currency:'COP', maximumFractionDigits:0}) }

export default function App(){
  const [query, setQuery] = useState('')
  const [size, setSize] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [cart, setCart] = useState([])

  const products = useMemo(()=>{
    return BASE_PRODUCTS.filter(p =>
      (!size || p.size.toLowerCase().includes(size.toLowerCase())) &&
      (!maxPrice || p.price <= parseInt(maxPrice)) &&
      (!query || p.title.toLowerCase().includes(query.toLowerCase()))
    )
  }, [query, size, maxPrice])

  const itemsDetailed = cart.map(c=> ({...BASE_PRODUCTS.find(p=>p.id===c.id), qty: c.qty}))
  const subtotal = itemsDetailed.reduce((acc,i)=> acc + i.price*i.qty, 0)

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={ASSETS.logo} className="w-10 h-10 object-contain rounded-md" alt="logo" />
            <div className="leading-tight">
              <div className="font-semibold">Tu Viaje Comienza Aquí</div>
              <div className="text-xs text-zinc-500">Maletas resistentes, ligeras y con estilo</div>
            </div>
          </div>
          <CartButton cart={cart} itemsDetailed={itemsDetailed} subtotal={subtotal} setCart={setCart} />
        </div>
      </header>

      <section className="border-b bg-gradient-to-br from-zinc-50 to-white">
        <div className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Maletas que sobreviven al viaje y al carrito.</h1>
            <p className="mt-4 text-zinc-600">Diseño liviano, ruedas 360°, candado TSA y garantía real. Compra fácil, envíos a todo Colombia.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#catalogo" className="px-4 py-2 rounded-2xl bg-zinc-900 text-white">Ver catálogo</a>
              <a href={WHATS('Hola, quiero información.')} target="_blank" className="px-4 py-2 rounded-2xl border">Escríbenos</a>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4 text-sm text-zinc-700">
              <div className="flex items-center gap-2"><Truck className="w-4 h-4"/> Envío nacional</div>
              <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4"/> Garantía hasta 24 meses</div>
              <div className="flex items-center gap-2"><CreditCard className="w-4 h-4"/> Múltiples métodos de pago</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {ASSETS.gallery.slice(0,4).map(g=>(
              <div key={g.color} className="aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-100">
                <img src={g.src} alt={g.color} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="catalogo" className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Catálogo</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-3 mb-6">
            <input placeholder="Buscar modelo" value={query} onChange={e=>setQuery(e.target.value)} className="border rounded-xl px-3 py-2" />
            <select onChange={e=>setSize(e.target.value)} className="border rounded-xl px-3 py-2">
              <option value="">Tamaño</option>
              <option value="cabina">Cabina (20")</option>
              <option value="mediana">Mediana (24")</option>
              <option value="grande">Grande (28")</option>
              <option value="set">Set 3 piezas</option>
            </select>
            <select onChange={e=>setMaxPrice(e.target.value)} className="border rounded-xl px-3 py-2">
              <option value="">Precio máximo</option>
              <option value="200000">Hasta $200k</option>
              <option value="300000">Hasta $300k</option>
              <option value="600000">Hasta $600k</option>
            </select>
            <button onClick={()=>{setQuery(''); setSize(''); setMaxPrice('')}} className="text-left border rounded-xl px-3 py-2">Limpiar</button>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map(p => (
              <div key={p.id} className="rounded-2xl border">
                <div className="p-4">
                  <div className="aspect-[4/5] rounded-xl overflow-hidden bg-zinc-100 mb-3">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-sm text-zinc-600 flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_,i)=><Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />)}
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-zinc-500 line-through">{formatCOP(p.oldPrice)}</div>
                    <div className="text-xl font-bold">{formatCOP(p.price)}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[12px] text-zinc-600 mb-3">
                    <div className="flex items-center gap-1"><Ruler className="w-3 h-3"/>{p.size}</div>
                    <div className="flex items-center gap-1"><Package className="w-3 h-3"/>{p.material}</div>
                    <div className="">Peso: {p.weight}</div>
                    <div className="">Garantía: {p.warranty}</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 border rounded-2xl px-3 py-2" onClick={()=>{
                      setCart(prev=>{
                        const ex = prev.find(i=>i.id===p.id)
                        if (ex) return prev.map(i=> i.id===p.id ? {...i, qty:i.qty+1} : i)
                        return [...prev, {id:p.id, qty:1}]
                      })
                    }}><span className="inline-flex items-center gap-2"><ShoppingCart className="w-4 h-4" /> Agregar</span></button>
                    <a className="flex-1 text-center rounded-2xl px-3 py-2 bg-zinc-900 text-white" href={WHATS(`Hola, quiero ${p.title} por ${formatCOP(p.price)}.`)} target="_blank">Comprar</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-zinc-50 border-t">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6">
          <Benefit icon={<Truck className='w-5 h-5'/>} title="Envíos ágiles" desc="48–72h ciudades principales. Rastreo y seguro." />
          <Benefit icon={<ShieldCheck className='w-5 h-5'/>} title="Garantía real" desc="Defectos de fábrica cubiertos. Soporte por WhatsApp." />
          <Benefit icon={<CreditCard className='w-5 h-5'/>} title="Pagos flexibles" desc="Transferencia, datáfono, contraentrega (según ciudad)." />
        </div>
      </section>

      <footer className="py-10 border-t">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="text-sm text-zinc-600">© {new Date().getFullYear()} Tu Viaje Comienza Aquí.</div>
          <a href={WHATS('Hola, quiero información.')} target="_blank" className="px-4 py-2 rounded-2xl bg-zinc-900 text-white">Escríbenos</a>
        </div>
      </footer>
    </div>
  )
}

function Benefit({icon, title, desc}){
  return (
    <div className="rounded-2xl border p-6">
      <div className="font-semibold flex items-center gap-2">{icon} {title}</div>
      <div className="text-sm text-zinc-600 mt-2">{desc}</div>
    </div>
  )
}

function CartButton({cart, itemsDetailed, subtotal, setCart}){
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button onClick={()=>setOpen(true)} className="rounded-2xl border px-3 py-2 inline-flex items-center gap-2">
        <ShoppingCart className="w-4 h-4"/> Carrito ({cart.reduce((a,b)=>a+b.qty,0)})
      </button>
      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={()=>setOpen(false)}></div>
          <div className="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="font-semibold">Tu carrito</div>
              <button onClick={()=>setOpen(false)} className="p-1 rounded-md hover:bg-zinc-100"><X className="w-5 h-5"/></button>
            </div>
            <div className="space-y-3 max-h-[65vh] overflow-auto">
              {itemsDetailed.length===0 && <div className="text-sm text-zinc-500">Aún no agregas productos.</div>}
              {itemsDetailed.map(i=>(
                <div key={i.id} className="border rounded-xl p-3">
                  <div className="font-medium text-sm">{i.title}</div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-sm">{formatCOP(i.price)}</div>
                    <div className="flex items-center gap-2">
                      <button className="w-7 h-7 border rounded-md" onClick={()=>setCart(c=>c.map(x=>x.id===i.id?{...x, qty: Math.max(1, x.qty-1)}:x))}>-</button>
                      <span>{i.qty}</span>
                      <button className="w-7 h-7 border rounded-md" onClick={()=>setCart(c=>c.map(x=>x.id===i.id?{...x, qty: x.qty+1}:x))}>+</button>
                      <button className="text-zinc-500" onClick={()=>setCart(c=>c.filter(x=>x.id!==i.id))}>Eliminar</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t mt-4 pt-4 flex items-center justify-between">
              <div className="text-sm text-zinc-600">Subtotal</div>
              <div className="font-semibold">{formatCOP(subtotal)}</div>
            </div>
            <a className="block mt-3 w-full text-center rounded-2xl bg-zinc-900 text-white px-4 py-2"
               href={WHATS(`Hola, quiero comprar: ${itemsDetailed.map(i=>`${i.qty}x ${i.title}`).join(', ')} — Total aprox: ${formatCOP(subtotal)}`)}
               target="_blank">Finalizar por WhatsApp</a>
          </div>
        </div>
      )}
    </div>
  )
}
