// ÉLVARÉ pre-launch renderer. No checkout, cart, order capture or payment processing is enabled.
document.documentElement.classList.add('elvare-ready');
(async function () {
  const grid=document.getElementById('product-grid'), more=document.getElementById('load-more'), count=document.getElementById('catalog-count'), search=document.getElementById('catalog-search');
  if(!grid)return;
  let all=[],filtered=[],shown=0; const PAGE_SIZE=60;
  const safe=v=>String(v??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  function card(p){
    const a=document.createElement('article');a.className='product-card';
    const image=/^https:\/\//i.test(p.image||'')?p.image:'';
    const sizes=Array.isArray(p.listed_sizes)?p.listed_sizes.join(', '):'';
    const category=safe(String(p.category||'Selected').replace(/[-_]/g,' ')).toUpperCase();
    a.innerHTML=(image?'<div class="product-photo"><img loading="lazy" decoding="async" referrerpolicy="no-referrer" src="'+safe(image)+'" alt="'+safe(p.name)+'" onerror="this.onerror=null;this.parentElement.classList.add(\'image-unavailable\');this.remove()"></div>':'<div class="product-photo product-no-image">ÉLVARÉ</div>')+
      '<div class="product-meta"><span>'+category+'</span><span>'+safe(p.brand||'')+'</span></div>'+
      '<h3>'+safe(p.name)+'</h3><p>'+(p.color?'Colour: '+safe(p.color)+' · ':'')+(sizes?'Sizes listed: '+safe(sizes):'Details being reviewed')+'</p>'+
      '<div class="product-foot"><strong>'+(p.retail_price_eur?'€'+Number(p.retail_price_eur).toFixed(2):'Price unavailable')+'</strong><span>ÉLVARÉ EDIT</span></div>'+
      '<small class="product-status">Provisional price · checkout closed · delivery and stock unverified</small>';
    return a;
  }
  function render(reset){
    if(reset){grid.replaceChildren();shown=0;}
    filtered.slice(shown,shown+PAGE_SIZE).forEach(p=>grid.appendChild(card(p)));
    shown=Math.min(shown+PAGE_SIZE,filtered.length);
    if(count)count.textContent='Showing '+shown+' of '+filtered.length+' catalogue products';
    if(more)more.hidden=shown>=filtered.length;
  }
  function applySearch(){
    const q=(search?.value||'').trim().toLowerCase();
    filtered=!q?all:all.filter(p=>[p.name,p.brand,p.category,p.color].join(' ').toLowerCase().includes(q));
    render(true);
  }
  more?.addEventListener('click',()=>render(false)); search?.addEventListener('input',applySearch);
  try{
    const r=await fetch('catalog.json',{cache:'no-store'});if(!r.ok)throw Error('catalog unavailable');
    const data=await r.json();all=Array.isArray(data.products)?data.products:[];
    try{const pr=await fetch('price-map.json',{cache:'no-store'});if(pr.ok){const map=await pr.json();for(const p of all){const v=map.products?.[p.id];if(v&&Number.isFinite(v.price_eur))p.retail_price_eur=v.price_eur;}}}catch(priceError){}
    if(all.length){filtered=all;render(true);}
  }catch(e){/* The editorial collection remains visible when the supplier feed is unavailable. */}
})();