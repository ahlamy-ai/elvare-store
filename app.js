// ÉLVARÉ catalogue renderer. Products are read from catalog.json; checkout is disabled.
document.documentElement.classList.add('elvare-ready');
(async function () {
  const grid=document.getElementById('product-grid'), more=document.getElementById('load-more'), count=document.getElementById('catalog-count');
  if(!grid||!more||!count)return;
  let products=[],shown=0; const PAGE_SIZE=60;
  const safe=v=>String(v??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  function card(p,i){
    const a=document.createElement('article');a.className='product-card';
    const supplier=/^https:\/\//i.test(p.supplier_url||'')?p.supplier_url:'#';
    const image=/^https:\/\//i.test(p.image||'')?p.image:'';
    const sizes=Array.isArray(p.listed_sizes)?p.listed_sizes.join(', '):'';
    const category=safe(String(p.category||'selected').replace(/[-_]/g,' ')).toUpperCase();
    const price=Number.isFinite(Number(p.wholesale_list_price_eur))?'Supplier list €'+Number(p.wholesale_list_price_eur).toFixed(2):'Price at launch';
    a.innerHTML='<a class="product-photo" href="'+safe(supplier)+'" target="_blank" rel="noopener"><img loading="lazy" src="'+safe(image)+'" alt="'+safe(p.name)+'"></a><div class="product-meta"><span>'+category+' · '+String(i+1).padStart(2,'0')+'</span><span>'+safe(p.brand||'')+'</span></div><h3>'+safe(p.name)+'</h3><p>'+safe(p.description||p.composition||'')+(sizes?' · Sizes: '+safe(sizes):'')+'</p><div class="product-foot"><span>'+price+'</span><a href="'+safe(supplier)+'" target="_blank" rel="noopener">SUPPLIER DETAILS ↗</a></div><small class="product-status">Catalogue candidate · live stock and delivery check pending</small>';
    return a;
  }
  function next(){products.slice(shown,shown+PAGE_SIZE).forEach((p,n)=>grid.appendChild(card(p,shown+n)));shown=Math.min(shown+PAGE_SIZE,products.length);count.textContent='Showing '+shown+' of '+products.length+' catalogue candidates · not yet available to order';more.hidden=shown>=products.length;}
  more.addEventListener('click',next);
  try{const r=await fetch('catalog.json',{cache:'no-store'});if(!r.ok)throw Error();const data=await r.json();products=Array.isArray(data.products)?data.products:[];grid.replaceChildren();if(!products.length){count.textContent='The catalogue is being prepared.';return;}next();}
  catch(e){count.textContent='Catalogue could not be loaded. Please try again later.';}
})();