(function(){
  const root=document.getElementById('ops-checklist');
  if(!root)return;
  const boxes=[...root.querySelectorAll('input[type="checkbox"][data-key]')];
  const progress=document.getElementById('ops-progress');
  const note=document.getElementById('ops-save-note');
  const storageKey='elvare-ops-checklist-v1';
  function load(){
    try{
      const saved=JSON.parse(localStorage.getItem(storageKey)||'{}');
      boxes.forEach(box=>{box.checked=saved[box.dataset.key]===true;});
    }catch(e){note.textContent='Local storage unavailable; checklist will not persist.';}
    update();
  }
  function update(){
    const done=boxes.filter(box=>box.checked).length;
    progress.textContent=done+' / '+boxes.length+' completed';
    const saved={};
    boxes.forEach(box=>saved[box.dataset.key]=box.checked);
    try{localStorage.setItem(storageKey,JSON.stringify(saved));note.textContent='Saved in this browser only.';}
    catch(e){note.textContent='Could not save locally in this browser.';}
  }
  boxes.forEach(box=>box.addEventListener('change',update));
  document.getElementById('ops-reset')?.addEventListener('click',()=>{
    if(!window.confirm('Clear all checklist ticks saved in this browser?'))return;
    boxes.forEach(box=>box.checked=false);
    try{localStorage.removeItem(storageKey);}catch(e){}
    update();
  });
  load();
})();