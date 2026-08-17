"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface Message { id: string; role: "user" | "assistant"; text: string; timestamp: Date; }
let messageIdCounter = 0;
function generateMessageId(): string { return `msg-${++messageIdCounter}`; }

export function LaelConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ id:"welcome", role:"assistant", text:"Hi! I'm your personal LAEL stylist. I can help you find the perfect piece, answer questions about care and shipping, or just chat about jewellery. What brings you here today?", timestamp:new Date() }]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior:"smooth" }); };
  useEffect(() => { scrollToBottom(); }, [messages]);
  const quickActions = [{label:"Help me choose",emoji:"✨"},{label:"Gift ideas",emoji:"🎁"},{label:"Anti-tarnish care",emoji:"✦"},{label:"Shop earrings",emoji:"👂"}];
  const handleSendMessage = async (messageText:string) => {
    if (!messageText.trim()) return;
    setMessages(prev => [...prev,{id:generateMessageId(),role:"user",text:messageText,timestamp:new Date()}]); setInput(""); setIsLoading(true);
    try { const response=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:messageText})}); const data=await response.json(); setMessages(prev=>[...prev,{id:generateMessageId(),role:"assistant",text:data.text||"I'm here to help. What would you like to know?",timestamp:new Date()}]); }
    catch { setMessages(prev=>[...prev,{id:generateMessageId(),role:"assistant",text:"Let me connect you with our team. Feel free to message us on WhatsApp for a quicker response!",timestamp:new Date()}]); }
    finally { setIsLoading(false); }
  };
  return <>
    <motion.button onClick={()=>setIsOpen(!isOpen)} initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{delay:.6,duration:.4}} aria-label={isOpen ? "Close LAEL Concierge" : "Open LAEL Concierge"} className="fixed bottom-24 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-[#29251F]/20 bg-[#F7F1E8] shadow-lg transition hover:scale-110 sm:bottom-32 sm:right-8">
      <motion.span animate={{rotate:isOpen?90:0,scale:isOpen?1.05:1}} transition={{duration:.2}} className="text-2xl" aria-hidden="true">{isOpen ? "×" : "✦"}</motion.span>
    </motion.button>
    <AnimatePresence>{isOpen && <motion.div initial={{opacity:0,y:20,scale:.95}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:20,scale:.95}} transition={{duration:.3}} className="fixed bottom-40 right-6 z-40 flex h-[500px] w-[90vw] max-w-sm flex-col overflow-hidden rounded-2xl border border-[#29251F]/10 bg-[#FFFDF8] shadow-2xl sm:bottom-48 sm:right-8">
      <div className="border-b border-[#29251F]/10 bg-[#F7F1E8] p-4"><div className="flex items-center justify-between"><div><p className="font-serif text-lg font-medium text-[#29251F]">LAEL CONCIERGE</p><p className="text-[0.62rem] uppercase tracking-[0.2em] text-[#75695B]">Your personal stylist</p></div><button type="button" onClick={()=>setIsOpen(false)} aria-label="Close chat" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#29251F]/15 bg-[#FFFDF8] text-lg font-medium text-[#29251F] shadow-sm transition hover:scale-105 hover:bg-[#EFE5D6]">×</button></div></div>
      <div className="flex-1 space-y-4 overflow-y-auto p-4">{messages.map(msg=><motion.div key={msg.id} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:.3}} className={`flex ${msg.role==="user"?"justify-end":"justify-start"}`}><div className={`max-w-xs rounded-lg px-4 py-2 text-sm leading-relaxed ${msg.role==="user"?"bg-[#29251F] text-[#F7F1E8]":"bg-[#EFE5D6] text-[#29251F]"}`}>{msg.text}</div></motion.div>)}{isLoading&&<motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex gap-2 p-2"><div className="h-2 w-2 animate-bounce rounded-full bg-[#B79A6A]"/><div className="h-2 w-2 animate-bounce rounded-full bg-[#B79A6A] delay-100"/><div className="h-2 w-2 animate-bounce rounded-full bg-[#B79A6A] delay-200"/></motion.div>}<div ref={messagesEndRef}/></div>
      {messages.length===1&&!isLoading?<div className="space-y-2 border-t border-[#29251F]/10 p-4"><p className="mb-3 text-[0.62rem] uppercase tracking-[0.2em] text-[#75695B]">Quick actions</p><div className="grid grid-cols-2 gap-2">{quickActions.map(action=><button type="button" key={action.label} onClick={()=>handleSendMessage(action.label)} className="rounded-lg border border-[#29251F]/10 bg-[#F7F1E8] px-3 py-2 text-[0.62rem] uppercase tracking-[0.18em] text-[#29251F] transition hover:bg-[#EFE5D6]"><span className="text-lg">{action.emoji}</span><p className="mt-1 text-xs leading-tight">{action.label}</p></button>)}</div></div>:<div className="flex gap-2 border-t border-[#29251F]/10 p-3"><input type="text" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();handleSendMessage(input);}}} placeholder="Ask me anything..." className="flex-1 rounded-lg bg-[#EFE5D6] px-3 py-2 text-sm text-[#29251F] outline-none placeholder-[#75695B]" disabled={isLoading}/><button type="button" onClick={()=>handleSendMessage(input)} disabled={isLoading||!input.trim()} className="rounded-lg bg-[#29251F] px-4 py-2 text-sm font-medium text-[#F7F1E8] transition hover:bg-[#3d3530] disabled:opacity-50">Send</button></div>}
    </motion.div>}</AnimatePresence>
  </>;
}
