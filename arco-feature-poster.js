
(()=>{
 'use strict';
 const mount=()=>{
  const section=document.querySelector('.universe-section');
  if(!section||section.dataset.featurePoster==='ready')return;
  section.dataset.featurePoster='ready';
  section.classList.add('arco-feature-poster');
  section.innerHTML=`
   <div class="afp-backdrop" aria-hidden="true"><span class="afp-orbit afp-orbit-a"></span><span class="afp-orbit afp-orbit-b"></span><span class="afp-dna">🧬</span><span class="afp-particle afp-particle-a"></span><span class="afp-particle afp-particle-b"></span></div>
   <div class="afp-topline"><span><i></i> ARCO · BIOLOGY LEARNING SYSTEM</span><span class="afp-edition">فضای جامع یادگیری زیست‌شناسی</span></div>
   <div class="afp-main">
    <div class="afp-copy"><div class="afp-kicker">LEARN · PRACTICE · MASTER</div><h2>مسیر یادگیری زیست‌شناسی،<br><b>یک‌جا و هوشمندانه.</b></h2><p>از یادگیری مفهومی تا سنجش آموخته‌ها؛ ابزارهای موردنیاز برای کنکور و امتحانات نهایی در یک فضای منسجم.</p><div class="afp-stats"><span><b>۳</b> پایه تحصیلی</span><span><b>۶+</b> ابزار یادگیری</span><span><b>۱</b> جهان زیستی</span></div></div>
    <div class="afp-art" aria-hidden="true"><div class="afp-ring afp-ring-one"></div><div class="afp-ring afp-ring-two"></div><div class="afp-cell"><span class="afp-cell-core"></span><i></i><i></i><i></i></div><span class="afp-float afp-float-one">DNA / 01</span><span class="afp-float afp-float-two">BIO LAB</span><span class="afp-float afp-float-three">LIVE LEARNING</span></div>
   </div>
   <div class="afp-divider"><span>امکانات آموزشی ARCO</span><i></i></div>
   <div class="afp-features">
    <button class="afp-feature afp-test" type="button" data-afp-kind="تستی"><span class="afp-feature-icon">◈</span><span class="afp-feature-text"><b>آزمون‌های تستی</b><small>تمرین فصل‌به‌فصل و سنجش چهارگزینه‌ای</small></span><span class="afp-feature-arrow">↗</span></button>
    <button class="afp-feature afp-written" type="button" data-afp-kind="تشریحی"><span class="afp-feature-icon">▤</span><span class="afp-feature-text"><b>آزمون‌های تشریحی</b><small>تمرین پاسخ‌نویسی و آمادگی امتحانات</small></span><span class="afp-feature-arrow">↗</span></button>
    <button class="afp-feature afp-truefalse" type="button" data-afp-kind="تشریحی"><span class="afp-feature-icon">✓</span><span class="afp-feature-text"><b>درست و نادرست</b><small>بررسی دقیق عبارت‌ها و نکته‌های کتاب</small></span><span class="afp-feature-arrow">↗</span></button>
    <button class="afp-feature afp-video" type="button" data-afp-kind="فیلم"><span class="afp-feature-icon">▷</span><span class="afp-feature-text"><b>ویدیوهای آموزشی</b><small>یادگیری تصویری مفاهیم زیست‌شناسی</small></span><span class="afp-feature-arrow">↗</span></button>
    <button class="afp-feature afp-notes" type="button" data-afp-kind="آموزشی"><span class="afp-feature-icon">✧</span><span class="afp-feature-text"><b>جزوه و خلاصه درس</b><small>مرور نکته‌ها و جمع‌بندی گفتارها</small></span><span class="afp-feature-arrow">↗</span></button>
    <button class="afp-feature afp-finals" type="button" data-afp-kind="تشریحی"><span class="afp-feature-icon">▣</span><span class="afp-feature-text"><b>بانک امتحانات نهایی</b><small>دسترسی به مجموعه آزمون‌های سال‌های گذشته</small></span><span class="afp-feature-arrow">↗</span></button>
   </div>
   <div class="afp-bottom"><span>🧬 زیست دهم · یازدهم · دوازدهم</span><button type="button" class="afp-cta" data-afp-go>ورود به مسیر یادگیری <b>←</b></button></div>
  `;
  const go=kind=>{const target=document.getElementById('learning');if(target)target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});if(kind){const tab=[...document.querySelectorAll('#resourceTabs [data-kind]')].find(x=>x.dataset.kind===kind);if(tab)setTimeout(()=>tab.click(),180)}};
  section.querySelectorAll('[data-afp-kind]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.afpKind)));
  section.querySelector('[data-afp-go]')?.addEventListener('click',()=>go());
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
