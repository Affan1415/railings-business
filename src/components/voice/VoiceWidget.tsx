"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, X, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export function VoiceWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleStartConversation = useCallback(async () => {
    const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;
    if (!agentId) { console.log("ElevenLabs agent not configured - demo mode"); setIsConnected(true); setIsListening(true); return; }
    try { setIsConnected(true); setIsListening(true); } catch (error) { console.error("Failed to start conversation:", error); setIsConnected(false); setIsListening(false); }
  }, []);

  const handleEndConversation = useCallback(() => { setIsConnected(false); setIsListening(false); }, []);
  const toggleListening = useCallback(() => { if (isListening) { handleEndConversation(); } else { handleStartConversation(); } }, [isListening, handleStartConversation, handleEndConversation]);

  return (
    <>
      <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: "spring" }} onClick={() => setIsOpen(true)} className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/25 hover:opacity-90 transition-opacity flex items-center justify-center ${isOpen ? "hidden" : ""}`}>
        <MessageSquare className="h-7 w-7" />
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 100, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 100, scale: 0.9 }} transition={{ type: "spring", damping: 25 }} className="fixed bottom-6 right-6 z-50 w-80 bg-card rounded-2xl shadow-2xl border border-border overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-red-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"><Phone className="h-5 w-5" /></div><div><h3 className="font-semibold">AI Assistant</h3><p className="text-sm text-white/80">{isConnected ? "Connected" : "Ready to help"}</p></div></div>
                <button onClick={() => { handleEndConversation(); setIsOpen(false); }} className="p-1 hover:bg-white/20 rounded-full transition-colors"><X className="h-5 w-5" /></button>
              </div>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                {isConnected ? (<div className="space-y-2"><div className="flex items-center justify-center gap-2"><span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span></span><span className="text-sm text-green-500 font-medium">{isListening ? "Listening..." : "Connected"}</span></div><p className="text-sm text-muted-foreground">Speak naturally - I&apos;m here to help with your home improvement questions.</p></div>) : (<div className="space-y-2"><p className="text-foreground font-medium">Hi! I&apos;m Alex, your virtual assistant.</p><p className="text-sm text-muted-foreground">Click the microphone to start a voice conversation. I can help with service info, pricing, and scheduling.</p></div>)}
              </div>
              <div className="flex justify-center mb-6">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={toggleListening} className={`w-20 h-20 rounded-full flex items-center justify-center transition-colors ${isListening ? "bg-red-500 hover:bg-red-600" : "bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90"}`}>
                  {isListening ? <MicOff className="h-8 w-8 text-white" /> : <Mic className="h-8 w-8 text-white" />}
                </motion.button>
              </div>
              {isListening && (<div className="flex justify-center gap-1 mb-6">{[...Array(5)].map((_, i) => (<motion.div key={i} className="w-1 bg-orange-500 rounded-full" animate={{ height: [16, 32, 16] }} transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }} />))}</div>)}
              <div className="space-y-2"><p className="text-xs text-muted-foreground text-center mb-2">Quick questions:</p><div className="flex flex-wrap gap-2 justify-center">{["Service areas?", "Get a quote", "Schedule visit"].map((question) => (<button key={question} className="px-3 py-1.5 text-xs bg-muted rounded-full text-muted-foreground hover:bg-muted/80 transition-colors">{question}</button>))}</div></div>
            </div>
            <div className="px-6 py-3 bg-muted/50 border-t border-border"><p className="text-xs text-center text-muted-foreground">Powered by AI | Available 24/7</p></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
