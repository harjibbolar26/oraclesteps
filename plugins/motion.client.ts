import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
export default defineNuxtPlugin((nuxtApp)=>{
 gsap.registerPlugin(ScrollTrigger)
 let context:gsap.Context|undefined
 const animate=()=>{context?.revert();if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;context=gsap.context(()=>{
 gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el=>gsap.from(el,{y:26,opacity:0,duration:.7,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 94%',once:true},clearProps:'all'}))
 gsap.utils.toArray<HTMLElement>('[data-counter]').forEach(el=>{const original=el.innerHTML;const target=Number(el.dataset.counter);const state={value:0};gsap.to(state,{value:target,duration:1.6,ease:'power2.out',scrollTrigger:{trigger:el,once:true,start:'top 95%'},onUpdate:()=>{el.innerHTML=(target===4?Math.round(state.value):state.value.toFixed(2))+`<span>${target===4?'+':'%'}</span>`},onComplete:()=>{el.innerHTML=original}})})
 })}
 nuxtApp.hook('page:finish',()=>nextTick(animate))
 nuxtApp.hook('app:mounted',()=>nextTick(animate))
})
