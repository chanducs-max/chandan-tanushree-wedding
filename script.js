const weddingDate = new Date("2026-09-21T09:00:00+05:30");

function updateCountdown(){
  const now = new Date();
  const diff = weddingDate - now;
  const ids = ["days","hours","minutes","seconds"];
  if(diff <= 0){
    ids.forEach(id => document.getElementById(id).textContent = "00");
    return;
  }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  document.getElementById("days").textContent = String(d).padStart(2,"0");
  document.getElementById("hours").textContent = String(h).padStart(2,"0");
  document.getElementById("minutes").textContent = String(m).padStart(2,"0");
  document.getElementById("seconds").textContent = String(s).padStart(2,"0");
}
updateCountdown();
setInterval(updateCountdown,1000);

document.getElementById("openBtn").addEventListener("click",()=> {
  document.getElementById("invitation").scrollIntoView({behavior:"smooth"});
});

document.getElementById("shareBtn").addEventListener("click", async()=>{
  const shareData = {
    title:"Chandan & Thanushree — Wedding Invitation",
    text:"You are warmly invited to the wedding of Chandan & Thanushree on 21 September 2026.",
    url:window.location.href
  };
  if(navigator.share){
    try{ await navigator.share(shareData); }catch(e){}
  }else{
    try{
      await navigator.clipboard.writeText(window.location.href);
      alert("Invitation link copied!");
    }catch(e){ alert("Copy this page URL to share the invitation."); }
  }
});

document.getElementById("calendarBtn").addEventListener("click",()=>{
  const start = "20260921T090000";
  const end = "20260921T130000";
  const ics = [
    "BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//ChandanThanushree//Wedding//EN",
    "BEGIN:VEVENT","UID:chandan-thanushree-wedding-2026@example.com",
    `DTSTART;TZID=Asia/Kolkata:${start}`,`DTEND;TZID=Asia/Kolkata:${end}`,
    "SUMMARY:Chandan & Thanushree — Wedding",
    "LOCATION:Mysuru, Karnataka","DESCRIPTION:Wedding of Chandan S and Thanushree B.J.",
    "END:VEVENT","END:VCALENDAR"
  ].join("\r\n");
  const blob = new Blob([ics],{type:"text/calendar;charset=utf-8"});
  const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download="Chandan-Thanushree-Wedding.ics"; a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href),1000);
});

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting) entry.target.classList.add("show");});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
