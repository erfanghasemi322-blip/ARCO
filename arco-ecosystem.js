(()=>{'use strict';
const KEY='arco-ecosystem-v1',base={tasks:[],cards:[],xp:0,badges:[],attempts:[],posts:[],challengeDay:'',challengeDone:false};
let d;try{d={...base,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{d={...base}}
const $=id=>document.getElementById(id),save=()=>{try{localStorage.setItem(KEY,JSON.stringify(d))}catch{}},esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),today=()=>new Date().toLocaleDateString('fa-IR');
function toast(t){const n=$('arcoEcoToast');if(!n)return;n.textContent=t;n.classList.add('show');clearTimeout(n._t);n._t=setTimeout(()=>n.classList.remove('show'),2300)}
function stats(){const avg=d.attempts.length?Math.round(d.attempts.reduce((s,x)=>s+x.score,0)/d.attempts.length):0;$('ecoStats').innerHTML=[['امتیاز کل',d.xp+' XP'],['کارهای انجام‌شده',d.tasks.filter(x=>x.done).length],['آزمون‌های ثبت‌شده',d.attempts.length],['میانگین آزمون',avg+'٪']].map(x=>'<div class="eco-stat"><small>'+x[0]+'</small><strong>'+x[1]+'</strong></div>').join('')}
function award(n){d.xp+=n;[['شروع مسیر',10],['ذهن پویا',50],['پژوهشگر',150],['استاد تمرین',350]].forEach(x=>{if(d.xp>=x[1]&&!d.badges.includes(x[0])){d.badges.push(x[0]);toast('نشان تازه: '+x[0]+' 🏅')}});save();stats()}
const cards=[['📊','داشبورد پیشرفت','آمار، امتیاز و عملکرد','dashboard'],['🧫','آزمایشگاه سه‌بعدی','مدل تعاملی یاخته','lab'],['🏆','XP و دستاوردها','امتیاز و نشان‌های یادگیری','xp'],['⚡','چالش روزانه','پنج پرسش کوتاه علمی','challenge'],['⚗️','میز کار شیمی','محاسبه جرم مولی','chem'],['🪐','شبیه‌ساز فیزیک','سقوط آزاد و قانون اهم','physics'],['🧠','جعبه لایتنر','فلش‌کارت و مرور','flash'],['🗓️','برنامه‌ریز مطالعه','ثبت و پیگیری کارها','planner'],['📈','تحلیل‌گر آزمون','درصد و نمودار پیشرفت','analytics'],['🗺️','نقشه دانش','پیوند مفاهیم علمی','map'],['💬','انجمن علمی','یادداشت‌های محلی','forum']];
const qset=[['کدام اندامک محل اصلی تولید ATP در تنفس هوازی است؟',['میتوکندری','ریبوزوم','گلژی','واکوئول'],0,'میتوکندری محل اصلی تولید ATP در تنفس هوازی است.'],['واحد سازنده پروتئین‌ها چیست؟',['آمینواسید','نوکلئوتید','اسید چرب','گلوکز'],0,'پروتئین‌ها از آمینواسیدها ساخته می‌شوند.'],['کدام مولکول اطلاعات وراثتی را ذخیره می‌کند؟',['DNA','نشاسته','چربی','سلولز'],0,'DNA ماده وراثتی اصلی در بیشتر جانداران است.'],['تعرق گیاه عمدتاً از کدام ساختار انجام می‌شود؟',['روزنه','آوند آبکش','ریشه','گلبرگ'],0,'بخش عمده بخار آب از روزنه‌ها خارج می‌شود.'],['کدام بخش نورون پیام را از جسم یاخته‌ای دور می‌کند؟',['آسه','دندریت','هسته','غلاف هسته'],0,'آسه پیام عصبی را از جسم یاخته‌ای دور می‌کند.']];
const host=document.createElement('section');host.id='arcoEcosystem';
host.innerHTML='<div class="eco-head"><div><div class="eco-kicker">ARCO • LEARNING UNIVERSE</div><h2>جهان ابزارهای یادگیری</h2><p>۱۲ ابزار برای یادگیری، تمرین، تحلیل و کشف دنیای علم</p></div><span class="eco-pill">نسخه ۱.۰ · رایگان</span></div><div class="eco-stats" id="ecoStats"></div><div class="eco-grid" id="ecoGrid">'+cards.map(c=>'<button class="eco-card" data-module="'+c[3]+'"><span class="ico">'+c[0]+'</span><h3>'+c[1]+'</h3><p>'+c[2]+'</p></button>').join('')+'</div><div class="eco-work" id="ecoWork"><h3>از کجا شروع کنیم؟</h3><p>یکی از ابزارها را انتخاب کن. داده‌ها در همین مرورگر ذخیره می‌شوند.</p></div><div id="arcoEcoToast" role="status"></div>';
const hero=document.querySelector('.hero');if(hero)hero.insertAdjacentElement('afterend',host);else document.querySelector('.shell')?.append(host);
function taskHtml(){return d.tasks.length?d.tasks.map((t,i)=>'<div class="eco-item"><label><input type="checkbox" data-act="taskdone" data-i="'+i+'" '+(t.done?'checked':'')+'> '+esc(t.name)+' <small class="eco-muted">· '+esc(t.subject)+'</small></label><button class="eco-btn danger" data-act="deltask" data-i="'+i+'">حذف</button></div>').join(''):'<p class="eco-muted">برنامه‌ای ثبت نشده است.</p>'}
function cardHtml(){return d.cards.length?d.cards.map((c,i)=>'<div class="eco-item"><b>'+esc(c.front)+'</b><button class="eco-btn secondary" data-act="review" data-i="'+i+'">نمایش پاسخ</button></div>').join(''):'<p class="eco-muted">هنوز فلش‌کارتی نساخته‌ای.</p>'}
function postsHtml(){return d.posts.slice().reverse().map(p=>'<div class="eco-item">'+esc(p.text)+' <small class="eco-muted">'+esc(p.date)+'</small></div>').join('')||'<p class="eco-muted">هنوز نوشته‌ای ثبت نشده است.</p>'}
function chart(){return d.attempts.length?'<div class="eco-chart">'+d.attempts.slice(-8).map(a=>'<div class="eco-bar" style="height:'+Math.max(5,a.score)+'%"><small>'+a.score+'٪</small></div>').join('')+'</div>':'<p class="eco-muted">پس از ثبت آزمون، نمودار نمایش داده می‌شود.</p>'}
let qi=0,qs=0;
function quiz(){const q=qset[qi];return '<span class="eco-pill">پرسش '+(qi+1)+' از ۵</span><h4>'+q[0]+'</h4><div class="eco-answers">'+q[1].map((x,i)=>'<button class="eco-answer" data-act="answer" data-choice="'+i+'">'+x+'</button>').join('')+'</div><p id="ecoFeedback" class="eco-muted"></p>'}
const views={
dashboard:()=>'<h3>📊 داشبورد یادگیری</h3><p>خلاصه فعالیت‌های ثبت‌شده در ARCO.</p><div class="eco-grid2"><div class="eco-note">امتیاز: <b>'+d.xp+' XP</b><div class="eco-progress"><span style="width:'+(d.xp%100)+'%"></span></div>نشان‌ها: '+(d.badges.join('، ')||'هنوز آزاد نشده')+'</div><div class="eco-note">فلش‌کارت‌ها: '+d.cards.length+'<br>برنامه‌ها: '+d.tasks.length+'<br>یادداشت‌ها: '+d.posts.length+'</div></div><h4>روند آزمون‌ها</h4>'+chart(),
lab:()=>'<h3>🧫 آزمایشگاه مجازی زیست‌شناسی</h3><p>بیش از ۱۰ مدل سه‌بعدی آموزشی را انتخاب کن، بچرخان و از زوایای مختلف بررسی کن.</p><div class="eco-row"><select class="eco-select" id="ecoBioModel">'+BIO_MODELS.map((m,i)=>'<option value="'+i+'">'+m.name+'</option>').join('')+'</select><span class="eco-pill">۱۴ مدل سه‌بعدی</span></div><canvas id="eco3d" aria-label="مدل سه بعدی زیست شناسی"></canvas><div class="eco-note" id="ecoBioInfo"></div><p class="eco-muted">مدل‌ها شماتیک و آموزشی‌اند و مقیاس و جزئیات میکروسکوپی در آن‌ها الزاماً واقعی نیست.</p>',
xp:()=>'<h3>🏆 XP و دستاوردها</h3><div class="eco-note"><b style="font-size:26px;color:#6ce4e1">'+d.xp+' XP</b><br>سطح: '+(d.xp<50?'تازه‌وارد':d.xp<150?'یادگیرنده':'پژوهشگر')+'</div><h4>نشان‌های آزادشده</h4>'+(d.badges.map(x=>'<span class="eco-pill">🏅 '+x+'</span>').join(' ')||'<p class="eco-muted">با انجام فعالیت‌ها نشان بگیر.</p>'),
challenge:()=>'<h3>⚡ چالش روزانه</h3><p>پنج پرسش کوتاه علمی. هر روز یک بار امتیاز نهایی ثبت می‌شود.</p><div id="ecoQuiz">'+(d.challengeDay===new Date().toISOString().slice(0,10)&&d.challengeDone?'<p class="eco-good">چالش امروز را انجام داده‌ای. فردا برگرد!</p>':quiz())+'</div>',
chem:()=>'<h3>⚗️ میز کار شیمی</h3><p>جرم مولی فرمول‌های ساده مانند H2O، CO2، NaCl و C6H12O6 را محاسبه کن.</p><div class="eco-row"><input class="eco-input" id="ecoFormula" placeholder="فرمول شیمیایی"><button class="eco-btn" data-act="molar">محاسبه</button></div><div class="eco-note" id="ecoChemOut">خروجی بر حسب g/mol است. پرانتزهای تو در تو هنوز پشتیبانی نمی‌شوند.</div>',
physics:()=>'<h3>🪐 شبیه‌ساز فیزیک</h3><div class="eco-grid2"><div class="eco-note"><b>سقوط آزاد ایده‌آل</b><p>زمان (ثانیه)</p><input class="eco-input" id="ecoT" type="number" min="0" value="2"><button class="eco-btn" data-act="fall">محاسبه مسافت</button><p id="ecoFallOut"></p></div><div class="eco-note"><b>قانون اهم</b><p>ولتاژ (ولت)</p><input class="eco-input" id="ecoV" type="number" min="0" value="12"><p>مقاومت (اهم)</p><input class="eco-input" id="ecoR" type="number" min=".01" value="4"><button class="eco-btn" data-act="ohm">محاسبه جریان</button><p id="ecoOhmOut"></p></div></div><p class="eco-muted">سقوط آزاد بدون مقاومت هوا و با g=9.8 m/s² مدل شده است.</p>',
flash:()=>'<h3>🧠 جعبه لایتنر</h3><div class="eco-grid2"><input class="eco-input" id="ecoFront" placeholder="روی کارت: پرسش"><input class="eco-input" id="ecoBack" placeholder="پشت کارت: پاسخ"></div><button class="eco-btn" data-act="addcard">افزودن کارت</button><div class="eco-list" id="ecoCards">'+cardHtml()+'</div>',
planner:()=>'<h3>🗓️ برنامه‌ریز مطالعه</h3><div class="eco-row"><input class="eco-input" id="ecoTask" placeholder="مثلاً مرور گفتار دوم زیست"><select class="eco-select" id="ecoSubject"><option>زیست‌شناسی</option><option>شیمی</option><option>فیزیک</option><option>ریاضی</option><option>عمومی</option></select><button class="eco-btn" data-act="addtask">افزودن کار</button></div><div class="eco-list" id="ecoTasks">'+taskHtml()+'</div>',
analytics:()=>'<h3>📈 تحلیل‌گر آزمون</h3><p>تعداد درست، غلط و نزده را وارد کن. درصد با نمره منفی یک‌سوم محاسبه می‌شود.</p><div class="eco-row"><input class="eco-input" id="ecoC" type="number" min="0" placeholder="درست"><input class="eco-input" id="ecoW" type="number" min="0" placeholder="غلط"><input class="eco-input" id="ecoB" type="number" min="0" placeholder="نزده"><button class="eco-btn" data-act="exam">ثبت</button></div><div class="eco-note" id="ecoExamOut"></div>'+chart(),
map:()=>'<h3>🗺️ نقشه دانش</h3><p>نقشه آغازین ارتباط مفاهیم علوم تجربی.</p><div class="eco-map"><span class="eco-node">یاخته</span>↔<span class="eco-node">مولکول‌های زیستی</span>↔<span class="eco-node">سوخت‌وساز</span><span class="eco-node">DNA و RNA</span>↔<span class="eco-node">وراثت</span>↔<span class="eco-node">تنوع زیستی</span><span class="eco-node">انرژی</span>↔<span class="eco-node">فیزیک</span>↔<span class="eco-node">شیمی</span></div><div class="eco-note">مسیر پیشنهادی: یاخته ← مولکول‌ها ← آنزیم‌ها و سوخت‌وساز ← وراثت و تنظیم فعالیت‌ها.</div>',
forum:()=>'<h3>💬 انجمن علمی محلی</h3><p>نوشته‌ها فقط روی همین دستگاه دیده می‌شوند؛ هنوز سامانه آنلاین چندکاربره نیست.</p><textarea class="eco-textarea" id="ecoPost" placeholder="پرسش یا نکته علمی..."></textarea><button class="eco-btn" data-act="post">ثبت نوشته</button><div class="eco-list" id="ecoPosts">'+postsHtml()+'</div>'
};
function open(id){document.querySelectorAll('.eco-card').forEach(b=>b.classList.toggle('active',b.dataset.module===id));$('ecoWork').innerHTML=views[id]?views[id]():'ابزار پیدا نشد.';$('ecoWork').scrollIntoView({behavior:'smooth',block:'nearest'});if(id==='lab')init3d()}
const BIO_MODELS=[
{name:'یاخته جانوری',desc:'غشای پلاسمایی، هسته، میتوکندری و اندامک‌ها در یک نمای شماتیک.',kind:'animal'},
{name:'یاخته گیاهی',desc:'دیواره یاخته‌ای، کلروپلاست‌ها، واکوئول مرکزی و هسته.',kind:'plant'},
{name:'میتوکندری',desc:'غشای بیرونی و چین‌خوردگی‌های غشای درونی (کریستا).',kind:'mito'},
{name:'کلروپلاست',desc:'غشاهای پیرامونی و گرانوم‌ها؛ محل انجام فتوسنتز.',kind:'chloro'},
{name:'هسته و هستک',desc:'پوشش هسته، منافذ و هستک درون هسته.',kind:'nucleus'},
{name:'نورون',desc:'دندریت‌ها، جسم یاخته‌ای، آسه و پایانه‌های عصبی.',kind:'neuron'},
{name:'قلب',desc:'نمای شماتیک چهار حفره قلب و مسیر کلی ورود و خروج خون.',kind:'heart'},
{name:'شش‌ها و حبابک‌ها',desc:'نایژه‌ها و خوشه‌ای از حبابک‌های انتهایی برای نمایش تبادل گاز.',kind:'lungs'},
{name:'نفرون',desc:'کپسول بومن، گلومرول و لوله‌های پیچ‌خورده در واحد عملکردی کلیه.',kind:'nephron'},
{name:'مارپیچ DNA',desc:'دو رشته مکمل و جفت‌بازهای پیونددهنده در ساختار مارپیچی.',kind:'dna'},
{name:'باکتری',desc:'دیواره، غشا، ماده ژنتیکی حلقوی و تاژک در یک باکتری ساده.',kind:'bacteria'},
{name:'ویروس',desc:'کپسید و ماده ژنتیکی در یک مدل عمومی ویروسی؛ نه یک گونه خاص.',kind:'virus'},
{name:'ماهیچه اسکلتی',desc:'دسته‌ای از تارهای ماهیچه‌ای موازی با نواربندی شماتیک.',kind:'muscle'},
{name:'گلبول قرمز',desc:'شکل دوطرف فرورفته گلبول قرمز در نمایش ساده‌شده.',kind:'rbc'}
];
function init3d(){
const canvas=$('eco3d');if(!canvas)return;
const select=$('ecoBioModel'),info=$('ecoBioInfo');
if(!window.THREE){canvas.insertAdjacentHTML('afterend','<p class="eco-muted">کتابخانه سه‌بعدی بارگذاری نشده است. اتصال اینترنت و دسترسی به Three.js را بررسی کن.</p>');return}
const T=window.THREE,scene=new T.Scene(),camera=new T.PerspectiveCamera(42,1,.1,100);camera.position.set(0,0,8);
const renderer=new T.WebGLRenderer({canvas,antialias:true,alpha:true});renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
scene.add(new T.AmbientLight(0xffffff,1.35));const light=new T.DirectionalLight(0xffffff,2.2);light.position.set(4,5,7);scene.add(light);
const root=new T.Group();scene.add(root);let drag=false,lastX=0,lastY=0,raf=0;
const mat=(color,opacity=1)=>new T.MeshStandardMaterial({color,roughness:.42,metalness:.04,transparent:opacity<1,opacity});
function ball(g,x,y,z,sx,sy,sz,color){const o=new T.Mesh(new T.SphereGeometry(1,22,16),mat(color));o.position.set(x,y,z);o.scale.set(sx,sy,sz);g.add(o);return o}
function rod(g,a,b,r,color){const A=new T.Vector3(...a),B=new T.Vector3(...b),v=new T.Vector3().subVectors(B,A),o=new T.Mesh(new T.CylinderGeometry(r,r,v.length(),10),mat(color));o.position.copy(A).add(B).multiplyScalar(.5);o.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),v.normalize());g.add(o);return o}
function line(g,pts,r,color){const curve=new T.CatmullRomCurve3(pts.map(p=>new T.Vector3(...p)));const o=new T.Mesh(new T.TubeGeometry(curve,Math.max(20,pts.length*5),r,8,false),mat(color));g.add(o);return o}
function build(kind){
while(root.children.length)root.remove(root.children[0]);
if(kind==='animal'||kind==='plant'){
const plant=kind==='plant';ball(root,0,0,0,plant?2.1:1.8,plant?1.35:1.55,plant?1.05:1.35,plant?0x5d9b68:0x438bb5);
if(plant){const wall=new T.Mesh(new T.BoxGeometry(4.25,2.75,2.05),new T.MeshBasicMaterial({color:0xb7d99a,wireframe:true}));root.add(wall);ball(root,0,0,0,1.05,.92,.72,0x65a9c9);for(let i=0;i<7;i++){const a=i*2.4;ball(root,Math.cos(a)*1.45,Math.sin(a)*.72,.3,.28,.15,.2,0x39c77c)}}
else{ball(root,0,0,0,.78,.72,.7,0x9c72d8)}
for(let i=0;i<5;i++){const a=i*1.25;ball(root,Math.cos(a)*1.15,Math.sin(a)*.8,.45,.25,.16,.13,i%2?0xffc66e:0x65d6c6)}
}
if(kind==='mito'){ball(root,0,0,0,2,1,.75,0xd88761);for(let i=0;i<6;i++){const x=-1.25+i*.5;line(root,[[x,-.5,.45],[x-.2,.1,.45],[x+.2,.45,.45],[x+.35,-.2,.45]],.07,0xffe0a0)}}
if(kind==='chloro'){ball(root,0,0,0,1.9,1,.72,0x319e68);for(let i=0;i<5;i++){const x=-1.1+i*.55;for(let j=0;j<4;j++)ball(root,x,-.48+j*.3,.55,.19,.09,.1,0xa8df74)}}
if(kind==='nucleus'){ball(root,0,0,0,1.55,1.45,1.2,0x7b85d6);ball(root,.15,.1,.95,.38,.38,.22,0xf3b1dc);for(let i=0;i<12;i++){const a=i*Math.PI/6;ball(root,Math.cos(a)*1.5,Math.sin(a)*1.35,.05,.1,.1,.1,0xd7e8ff)}}
if(kind==='neuron'){ball(root,0,0,0,.62,.62,.5,0xe9b46a);for(let i=0;i<9;i++){const a=i*2*Math.PI/9;const x=Math.cos(a),y=Math.sin(a);line(root,[[x*.4,y*.4,0],[x*1.1,y*1.1,.1],[x*1.65,y*1.2,.12],[x*1.9,y*.85,.1]],.045,0x70c9dc)}line(root,[[.3,-.2,0],[1,-.45,0],[2,-.55,0],[3,-.5,0],[3.7,-.2,0]],.075,0xe5a45d);for(let i=0;i<4;i++)ball(root,3.6+i*.14,-.2+i*.18,0,.12,.12,.12,0xb58aff)}
if(kind==='heart'){ball(root,-.45,.1,0,.65,.95,.55,0xd94f68);ball(root,.45,.1,0,.65,.95,.55,0xd94f68);ball(root,0,-.55,0,.62,.58,.55,0xd94f68);rod(root,[-.4,.7,0],[-.55,1.65,0],.18,0x4e9bd0);rod(root,[.45,.65,0],[.65,1.55,0],.17,0xd85a58);rod(root,[.05,.75,0],[.05,1.65,0],.13,0x4e9bd0)}
if(kind==='lungs'){rod(root,[0,1.9,0],[0,.4,0],.16,0xd6dce8);for(let side of [-1,1]){line(root,[[0,.5,0],[side*.45,.1,0],[side*.8,-.35,0],[side*1.1,-.65,0]],.11,0xd6dce8);for(let i=0;i<8;i++){const a=i*Math.PI/4;ball(root,side*(1.15+Math.cos(a)*.42),-.75+Math.sin(a)*.6,0,.22,.22,.22,0xf18ca3)}}}
if(kind==='nephron'){ball(root,-1,1,0,.65,.65,.5,0xe7a7b0);for(let i=0;i<7;i++){const a=i*Math.PI/3.5;line(root,[[-1,1,0],[-.5+Math.cos(a)*.5,.5+Math.sin(a)*.45,0],[.25,.1,0],[.6,-.4,0],[1.3,-.5,0]],.075,0x69b8d9)}line(root,[[1.3,-.5,0],[1.7,-.1,0],[1.6,.6,0],[1.1,1,0]],.08,0xe6b35f)}
if(kind==='dna'){for(let i=0;i<34;i++){const t=i*.28,y=-2.2+i*.135,a=t;const p1=[Math.cos(a),y,Math.sin(a)],p2=[-Math.cos(a),y,-Math.sin(a)];ball(root,...p1,.09,.09,.09,0x55c8e8);ball(root,...p2,.09,.09,.09,0xe68ab2);if(i%2===0)rod(root,p1,p2,.035,0xe8d58b)}}
if(kind==='bacteria'){ball(root,0,0,0,1.55,.8,.7,0x6bbd91);const shell=new T.Mesh(new T.SphereGeometry(1,24,16),new T.MeshBasicMaterial({color:0xc0f1a8,wireframe:true}));shell.scale.set(1.58,.83,.73);root.add(shell);line(root,[[1.2,0,0],[1.8,.2,0],[2.3,.7,0],[2.8,.6,0],[3.3,1,0]],.035,0xe8d58b);for(let i=0;i<10;i++)ball(root,Math.sin(i*8)*.8,Math.cos(i*4)*.35,.5,.07,.07,.07,0x7258a8)}
if(kind==='virus'){ball(root,0,0,0,1,1,1,0x8e83d9);for(let i=0;i<14;i++){const a=i*2.4,phi=Math.acos(1-2*(i+.5)/14),v=[Math.sin(phi)*Math.cos(a),Math.cos(phi),Math.sin(phi)*Math.sin(a)];rod(root,v,[v[0]*1.55,v[1]*1.55,v[2]*1.55],.055,0x8ce1d3);ball(root,v[0]*1.55,v[1]*1.55,v[2]*1.55,.12,.12,.12,0xf2c47b)}}
if(kind==='muscle'){for(let i=0;i<8;i++){const y=-1.1+i*.3;const o=ball(root,0,y,0,1.8,.12,.2,i%2?0xc95f70:0xe68b8e);for(let j=0;j<7;j++)rod(root,[-1.4+j*.45,y-.08,.19],[ -1.25+j*.45,y+.08,.19],.018,0xffd0b5)}}
if(kind==='rbc'){const g=new T.SphereGeometry(1,36,24);const pos=g.attributes.position;for(let i=0;i<pos.count;i++){const x=pos.getX(i),y=pos.getY(i),z=pos.getZ(i),rad=1-.32*Math.exp(-((x*x+y*y)/.18));pos.setXYZ(i,x*rad*1.4,y*rad,z*.35)}g.computeVertexNormals();const o=new T.Mesh(g,mat(0xd84c5e));root.add(o)}
}
function selectModel(){const model=BIO_MODELS[Number(select?.value)||0];if(!model)return;info.textContent=model.name+'：'+model.desc;build(model.kind);root.rotation.set(.15,-.35,0)}
canvas._ecoRebuild=selectModel;
select?.addEventListener('change',selectModel);
canvas.addEventListener('pointerdown',e=>{drag=true;lastX=e.clientX;lastY=e.clientY;canvas.setPointerCapture(e.pointerId)});
canvas.addEventListener('pointerup',()=>drag=false);canvas.addEventListener('pointercancel',()=>drag=false);
canvas.addEventListener('pointermove',e=>{if(drag){root.rotation.y+=(e.clientX-lastX)*.009;root.rotation.x+=(e.clientY-lastY)*.009;lastX=e.clientX;lastY=e.clientY}});
function resize(){const w=canvas.clientWidth||360,h=270;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()}new ResizeObserver(resize).observe(canvas);resize();selectModel();
function loop(){if(!document.body.contains(canvas)){renderer.dispose();return}raf=requestAnimationFrame(loop);if(!drag)root.rotation.y+=.002;renderer.render(scene,camera)}loop();
}

document.addEventListener('click',e=>{const tile=e.target.closest('[data-module]');if(tile){open(tile.dataset.module);return}const b=e.target.closest('[data-act]');if(!b)return;const a=b.dataset.act,i=Number(b.dataset.i);
if(a==='ask'){const q=$('ecoAiQ').value.toLowerCase(),bank=[['میتوکندری','میتوکندری اندامکی است که بخش بزرگی از ATP را در تنفس یاخته‌ای تولید می‌کند.'],['ریبوزوم','ریبوزوم محل ترجمه و ساخت زنجیره پلی‌پپتیدی است.'],['فتوسنتز','در فتوسنتز انرژی نور به انرژی شیمیایی تبدیل و مواد آلی ساخته می‌شود.'],['dna','DNA اطلاعات وراثتی را ذخیره می‌کند.'],['rna','RNA در بیان اطلاعات ژنتیکی و ساخت پروتئین نقش دارد.'],['روزنه','روزنه‌ها در تبادل گاز و تنظیم تعرق گیاه نقش دارند.'],['اهم','قانون اهم: ولتاژ برابر جریان ضرب‌در مقاومت است.']];const hit=bank.find(x=>q.includes(x[0]));$('ecoAiOut').textContent=hit?hit[1]:'برای این پرسش پاسخ آماده‌ای ندارم. واژه کلیدی دقیق‌تری بنویس یا به کتاب درسی رجوع کن.';award(2)}
if(a==='addtask'){const n=$('ecoTask').value.trim();if(!n)return toast('عنوان کار را بنویس.');d.tasks.push({name:n,subject:$('ecoSubject').value,done:false,rewarded:false});save();$('ecoTasks').innerHTML=taskHtml();$('ecoTask').value='';stats()}

if(a==='deltask'){d.tasks.splice(i,1);save();$('ecoTasks').innerHTML=taskHtml();stats()}
if(a==='addcard'){const f=$('ecoFront').value.trim(),v=$('ecoBack').value.trim();if(!f||!v)return toast('هر دو سمت کارت را کامل کن.');d.cards.push({front:f,back:v,seen:false});save();$('ecoCards').innerHTML=cardHtml();stats()}
if(a==='review'){alert('پاسخ: '+d.cards[i].back);if(!d.cards[i].seen){d.cards[i].seen=true;save();award(3);$('ecoCards').innerHTML=cardHtml()}}
if(a==='answer'){const q=qset[qi],pick=Number(b.dataset.choice);document.querySelectorAll('.eco-answer').forEach((x,j)=>{x.disabled=true;if(j===q[2])x.classList.add('correct')});if(pick===q[2])qs++;else b.classList.add('wrong');$('ecoFeedback').textContent=q[3];const n=document.createElement('button');n.className='eco-btn';n.textContent=qi===4?'نتیجه':'پرسش بعدی';n.onclick=()=>{qi++;if(qi===5){$('ecoQuiz').innerHTML='<p class="eco-good">نتیجه: '+qs+' از ۵</p>';const day=new Date().toISOString().slice(0,10);if(d.challengeDay!==day){d.challengeDay=day;d.challengeDone=true;award(qs*5+5)}save()}else $('ecoQuiz').innerHTML=quiz()};$('ecoQuiz').append(n)}
if(a==='molar'){const f=$('ecoFormula').value.trim(),masses={H:1.008,C:12.011,N:14.007,O:15.999,Na:22.99,Cl:35.45,S:32.06,Ca:40.078,Mg:24.305,K:39.098,P:30.974,Fe:55.845};const re=/([A-Z][a-z]?)(\d*)/g;let x,pos=0,total=0,ok=!!f;while((x=re.exec(f))!==null){if(x.index!==pos||masses[x[1]]===undefined){ok=false;break}total+=masses[x[1]]*(Number(x[2])||1);pos=re.lastIndex}if(pos!==f.length)ok=false;$('ecoChemOut').textContent=ok?'جرم مولی '+f+' ≈ '+total.toFixed(3)+' g/mol':'فرمول پشتیبانی نمی‌شود؛ نمادها را بررسی کن.';award(1)}
if(a==='fall'){const t=Number($('ecoT').value);$('ecoFallOut').textContent=t>=0?'مسافت: '+(.5*9.8*t*t).toFixed(2)+' متر':'زمان نامعتبر است.';award(1)}
if(a==='ohm'){const v=Number($('ecoV').value),r=Number($('ecoR').value);$('ecoOhmOut').textContent=v>=0&&r>0?'جریان: '+(v/r).toFixed(3)+' آمپر':'مقادیر نامعتبرند.';award(1)}
if(a==='exam'){const c=Number($('ecoC').value),w=Number($('ecoW').value),z=Number($('ecoB').value),t=c+w+z;if(![c,w,z].every(x=>Number.isInteger(x)&&x>=0)||!t)return toast('تعدادها را بررسی کن.');const score=Math.max(0,Math.round((c-w/3)/t*100));d.attempts.push({score,total:t,date:today()});save();$('ecoExamOut').textContent='درصد خام: '+score+'٪ · کل پرسش‌ها: '+t;award(10);stats()}
if(a==='post'){const v=$('ecoPost').value.trim();if(!v)return toast('متن خالی است.');d.posts.push({text:v,date:today()});save();$('ecoPosts').innerHTML=postsHtml();stats()}
});
document.addEventListener('change',e=>{if(e.target.id==='ecoBioModel'){const m=BIO_MODELS[Number(e.target.value)];const info=$('ecoBioInfo');if(info)info.textContent=m.name+'：'+m.desc;const c=$('eco3d');if(c&&c._ecoRebuild)c._ecoRebuild();return}const b=e.target.closest('[data-act="taskdone"]');if(!b)return;const i=Number(b.dataset.i);if(d.tasks[i]){d.tasks[i].done=b.checked;if(b.checked&&!d.tasks[i].rewarded){d.tasks[i].rewarded=true;award(5)}save();stats()}});

// Mobile-first quick navigation
function mountMobileDock(){
 if(document.getElementById('arcoMobileDock'))return;
 const dock=document.createElement('nav');dock.id='arcoMobileDock';dock.className='arco-mobile-dock';dock.setAttribute('aria-label','میانبرهای اصلی سایت');
 dock.innerHTML='<a class="dock-link active" href="#arcoTop" aria-label="خانه"><span aria-hidden="true">⌂</span><small>خانه</small></a><a class="dock-link" href="#learning" aria-label="درس‌ها"><span aria-hidden="true">▤</span><small>درس‌ها</small></a><a class="dock-link" href="#studyTools" aria-label="ابزارها"><span aria-hidden="true">⌘</span><small>ابزارها</small></a><button class="dock-link" type="button" data-dock-profile aria-label="حساب کاربری"><span aria-hidden="true">◉</span><small>حساب من</small></button>';
 document.body.appendChild(dock);
 dock.addEventListener('click',e=>{const profile=e.target.closest('[data-dock-profile]');if(profile){const trigger=document.getElementById('arcoProfileBtn');if(trigger)trigger.click();return}const link=e.target.closest('a[href^="#"]');if(link){const target=document.querySelector(link.getAttribute('href'));if(target){e.preventDefault();target.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});dock.querySelectorAll('.dock-link').forEach(x=>x.classList.toggle('active',x===link))}}});
 const sections=[['arcoTop',0],['learning',1],['studyTools',2]];if('IntersectionObserver'in window){const io=new IntersectionObserver(entries=>{const visible=entries.filter(x=>x.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(!visible)return;const item=sections.find(x=>x[0]===visible.target.id);if(item)dock.querySelectorAll('.dock-link').forEach((x,i)=>x.classList.toggle('active',i===item[1]))},{rootMargin:'-20% 0px -65% 0px',threshold:[0,.15,.4]});sections.forEach(x=>{const el=document.getElementById(x[0]);if(el)io.observe(el)})}
}
mountMobileDock();


function initNexusExperience(){
 const shell=document.querySelector('.shell');if(!shell)return;
 // Mobile/header status badge removed to prevent collision with the brand.
 const targets=[...document.querySelectorAll('.hero-next,.universe-section,.subject-card,.section-title,.main-panel,.tools-section,.tool-card,#arcoEcosystem,.topic-library')];
 if('IntersectionObserver'in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('nexus-visible');io.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -35px 0px'});targets.forEach((el,i)=>{if(i>0){el.classList.add('nexus-reveal');io.observe(el)}})}
}
initNexusExperience();

stats();
})();