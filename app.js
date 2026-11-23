// ÉLVARÉ pre-launch catalogue renderer. Customer checkout stays disabled until supplier, shipping and payment checks pass.
document.documentElement.classList.add('elvare-ready');
(async function () {
  const grid=document.getElementById('product-grid'), more=document.getElementById('load-more'), count=document.getElementById('catalog-count'), search=document.getElementById('catalog-search');
  if(!grid||!more||!count)return;
  let all=[],filtered=[],shown=0; const PAGE_SIZE=60;
  const safe=v=>String(v??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  function card(p,i){
    const a=document.createElement('article');a.className='product-card';
    const image=/^https:\/\//i.test(p.image||'')?p.image:'';
    const sizes=Array.isArray(p.listed_sizes)?p.listed_sizes.join(', '):'';
    const category=safe(String(p.category||'Selected').replace(/[-_]/g,' ')).toUpperCase();
    a.innerHTML=(image?'<div class="product-photo"><img loading="lazy" src="'+safe(image)+'" alt="'+safe(p.name)+'"></div>':'<div class="product-photo product-no-image">ÉLVARÉ</div>')+
      '<div class="product-meta"><span>'+category+'</span><span>'+safe(p.brand||'')+'</span></div>'+
      '<h3>'+safe(p.name)+'</h3>'+
      '<p>'+(p.color?'Colour: '+safe(p.color)+' · ':'')+(sizes?'Sizes listed: '+safe(sizes):'Details being reviewed')+'</p>'+
      '<div class="product-foot"><span>Retail price pending</span><span>ÉLVARÉ EDIT</span></div>'+
      '<small class="product-status">Pre-launch selection · availability and delivery not confirmed</small>';
    return a;
  }
  function render(reset){
    if(reset){grid.replaceChildren();shown=0;}
    filtered.slice(shown,shown+PAGE_SIZE).forEach((p,n)=>grid.appendChild(card(p,shown+n)));
    shown=Math.min(shown+PAGE_SIZE,filtered.length);
    count.textContent='Showing '+shown+' of '+filtered.length+' matching styles · '+all.length+' total catalogue entries';
    more.hidden=shown>=filtered.length;
  }
  function applySearch(){
    const q=(search?.value||'').trim().toLowerCase();
    filtered=!q?all:all.filter(p=>[p.name,p.brand,p.category,p.color].join(' ').toLowerCase().includes(q));
    render(true);
  }
  more.addEventListener('click',()=>render(false));
  search?.addEventListener('input',applySearch);
  try{
    const r=await fetch('catalog.json',{cache:'no-store'});if(!r.ok)throw Error('catalog missing');
    const data=await r.json();all=Array.isArray(data.products)?data.products:[];
    filtered=all;render(true);
  }catch(e){count.textContent='The expanded catalogue file is not installed yet. Please check back soon.';}
})();