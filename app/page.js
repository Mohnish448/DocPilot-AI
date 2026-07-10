'use client'
import React, { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faPlus, faFolder } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faAngleRight, faAngleLeft, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { uploadPDF, askQuestion, deleteAllData, getEvaluationStats } from "../services/api"
import { AnimatePresence, motion } from 'framer-motion'
import Appguide from './Appguide/app'









const page = () => {
  const [expanded, setExpanded] = useState(true)
  const [docsOpen, setDocsOpen] = useState(true)

  //for showing the actual doc name
  const [activeTab, setActiveTab] = useState("docpilot")
  const [chats, setChats] = useState([])
  const [question, setQuestion] = useState('')
  const [activeChatId, setActiveChatId] = useState(null) 
  const [uploading, setUploading] = useState(false)
  const [expandedSources, setExpandedSources] = useState({})
  const fileInputRef = useRef(null)

  
  // for evaluate routing

  

  //new hooks
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("Idle");
  const [uploadFinished, setUploadFinished] = useState(false);
  const [showUploadCard, setShowUploadCard] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [chatsOpen, setChatsOpen] = useState(false);

  const [showSources, setShowSources] = useState(false);
  const [evaluationStats, setEvaluationStats] = useState({total_documents: 0, total_chunks: 0});
  const [showAppGuide, setShowAppGuide] = useState(false);

  // delete the data 
  const [showDeleteModal, setShowDeleteModal ] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const showSidebarText = isMobile || expanded;

  const icons = `text-white/80 text-[18px] shrink-0 cursor-pointer `

  const Iconbox = `flex items-center gap-3 px-[18px] py-[10px]
  transition-all duration-200 ease-in-out hover:bg-white/5 cursor-pointer `
  
const activeChat = chats.find(chat => chat.id === activeChatId);


const activeConversation = 
    activeChat?.conversations.find(
        c => c.id === activeChat.activeConversationId
);

const messages = activeConversation?.messages || [];

const latestAssistantMessage =
  messages.findLast(msg => msg.role === "assistant");

const evaluation = latestAssistantMessage?.evaluation || {};    

const activeSource =
  latestAssistantMessage?.source || [];


const documentId = activeChat?.documentId || null;

const totalSources = messages.reduce(
  (total, m) => total + (m.source?.length || 0), 0
);

const totalQuestions = messages.filter(
  (m) => m.role === "user"
).length;

const totalAnswers = messages.filter(
  (m) => m.role === "assistant"
).length;

const averageChunks = evaluationStats.total_documents > 0 
     ? (
      evaluationStats.total_chunks /
      evaluationStats.total_documents
     ).toFixed(1) : 0;


//evaluation function 
async function loadEvaluationStats() {

  try {
    const stats = await getEvaluationStats();

    setEvaluationStats(stats);

  } catch (err) {

     console.error(err);
  }
}

  async function handleUpload(event) {

  const file = event.target.files[0];

  if (!file) return;

  await startUpload(file);
}

  async function startUpload(file) {
    setUploading(true);
    setShowUploadCard(true);
    setUploadFinished(false);

    setUploadProgress(5);
    setUploadStatus("Uploading PDF...");

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setUploadProgress(20);
      setUploadStatus("Reading PDF...");

      await new Promise(resolve => setTimeout(resolve, 500));
      setUploadProgress(40);
      setUploadStatus("Chunking document...");

      await new Promise(resolve => setTimeout(resolve, 500));
      setUploadProgress(60);
      setUploadStatus("Creating embeddings...");

      const result = await uploadPDF(file);
      console.log("Upload Result:", result);

      await loadEvaluationStats();
      console.log("Evaluation stats loaded");

      setUploadProgress(90);
      setUploadStatus("Saving to database...");

      await new Promise(resolve => setTimeout(resolve, 600));

      setUploadProgress(100);
      setUploadStatus(" Ready! Ask your first question.");

      const conversationId = Date.now().toString();

      const newChat = {
        id: Date.now().toString(),
        title: file.name,
        documentId: result.document_id,
        activeConversationId: conversationId,
        conversations:[
          {
            id: conversationId,
            title:"see chats",
            messages:[]
          }
        ]
      };

      setChats(prev => [...prev, newChat]);
      setActiveChatId(newChat.id);

      await loadEvaluationStats();

      setUploadFinished(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowUploadCard(false);
      setUploadFinished(false);
      setUploadProgress(0);
      setUploadStatus("");
    } catch (error) {
      console.error(error);
      setUploadStatus("❌ Upload failed.");
    } finally {
      setUploading(false);
    }
  }

// new chat function 

function handleNewChat(){

  if(!activeChatId){
    alert("Select a document first.");
    return;
  }

  const newConversation = {
    id: Date.now().toString(),
    title: `Chat ${activeChat.conversations.length + 1}`,
    messages: []
  };

  setChats(prev => 
    prev.map(chat => chat.id === activeChatId ? {
      ...chat, conversations: [...chat.conversations, newConversation],
      activeConversationId: newConversation.id
    }
    : chat
  )
  );
}

// delete function 

async function handleDeleteAll() {

  try{

    await deleteAllData();  //backend API

    setChats([]);
    setActiveChatId(null);
    setQuestion("");
    setExpandedSources({});
      setShowDeleteModal(false);

      await loadEvaluationStats();
    
  } catch (err) {

    console.error(err);
    alert("Unable to delete data. Please try again")
  }
}

  // send chat function
async function handleSend() {
  const text = question.trim();

  if (!text) return;

  if (!documentId) {
    alert("Please upload a document first.");
    return;
  }

  const userMsg = {
    id: `u${Date.now()}`,
    role: "user",
    text,
  };

  setChats(prev =>
  prev.map(chat =>
    chat.id === activeChatId
      ? {
          ...chat,
          conversations: chat.conversations.map(conv =>
            conv.id === chat.activeConversationId
              ? {
                  ...conv,
                  messages: [...conv.messages, userMsg]
                }
              : conv
          )
        }
      : chat
  )
);

  setQuestion("");
  setIsThinking(true);

try {
   const result = await askQuestion(documentId, text);



const assistantMsg = {
    id: `a${Date.now()}`,
    role: "assistant",
    text: result.answer,
    source: result.sources,
    evaluation: result.evaluation
};

setChats(prev =>
  prev.map(chat =>
    chat.id === activeChatId
      ? {
          ...chat,
          conversations: chat.conversations.map(conv =>
            conv.id === chat.activeConversationId
              ? {
                  ...conv,
                  messages: [...conv.messages, assistantMsg]
                }
              : conv
          )
        }
      : chat
  )
);
setIsThinking(false);

} catch (err) {

  // Stop showing "Thinking..." if an error occurs

  console.error(err);

setChats(prev =>
  prev.map(chat =>
    chat.id === activeChatId
      ? {
          ...chat,
          conversations: chat.conversations.map(conv =>
            conv.id === chat.activeConversationId
              ? {
                  ...conv,
                  messages: [
                    ...conv.messages,
                    {
                      id: `a${Date.now()}`,
                      role: "assistant",
                      text: "Something went wrong."
                    }
                  ]
                }
              : conv
          )
        }
      : chat
  )
);

  setIsThinking(false);
}
}



  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }


//evaluation function 
useEffect(() => {
    loadEvaluationStats();
}, []);

useEffect(() => {
  const handleResize = () => {
    const mobile = window.innerWidth < 1024;
    setIsMobile(mobile);
  };

  handleResize();
  window.addEventListener('resize', handleResize);

  return () => window.removeEventListener('resize', handleResize);
}, []);

useEffect(() => {
  if (!isMobile) {
    setMobileSidebarOpen(false);
  }
}, [isMobile]);


  return (
    <div className="h-screen w-full bg-black flex ">


{/* Upload Overlay */}
{/*it  shows the animation of the pdf chunking after uploading it  */}
{showUploadCard && (

<div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">

    <div className="w-[min(92vw,500px)] max-w-[500px] rounded-2xl bg-[#171717] border border-white/10 p-4 shadow-2xl sm:p-8">

        <h2 className="text-white text-xl font-semibold mb-6">
         {uploadFinished 
         ? "Document Ready" : "Uploading Document"
         }
        </h2>

        <div className="flex justify-between mb-2">

            <span className="text-white/70">
                {uploadStatus}
            </span>

            <span className="text-white">
                {uploadProgress}%
            </span>

        </div>

        {/* Progress Bar */}

        <div className="h-3 rounded-full bg-[#2a2a2a] overflow-hidden">

            <div
                className="h-full bg-green-500 transition-all duration-500"
                style={{
                    width: `${uploadProgress}%`
                }}
            />

        </div>

        <div className="mt-8 space-y-3 text-[15px]">

            <p className={uploadProgress >= 5 ? "text-green-400" : "text-white/40"}>
                {uploadProgress >= 5 ? "✔" : "○"} Uploading PDF
            </p>

            <p className={uploadProgress >= 20 ? "text-green-400" : "text-white/40"}>
                {uploadProgress >= 20 ? "✔" : "○"} Reading PDF
            </p>

            <p className={uploadProgress >= 40 ? "text-green-400" : "text-white/40"}>
                {uploadProgress >= 40 ? "✔" : "○"} Chunking Document
            </p>

            <p className={uploadProgress >= 60 ? "text-green-400" : "text-white/40"}>
                {uploadProgress >= 60 ? "✔" : "○"} Creating Embeddings
            </p>

            <p className={uploadProgress >= 90 ? "text-green-400" : "text-white/40"}>
                {uploadProgress >= 90 ? "✔" : "○"} Saving to Database
            </p>

        </div>

    </div>

</div>

)}

{/*delete the data pop up page */}

{showDeleteModal && (

<div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">

    <div className="w-[min(92vw,500px)] max-w-[500px] rounded-2xl bg-[#171717] border border-white/10 p-4 shadow-2xl sm:p-8">

        <h2 className="text-white text-2xl font-semibold">
            Delete All Data
        </h2>

        <p className="text-white/60 mt-4 leading-7">

            This will permanently remove every document, chat,
            embedding, vector index and conversation stored in
            DocPilot.

            <br /><br />

            This action cannot be undone.

        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">

            <button
                onClick={() => setShowDeleteModal(false)}
                className="px-5 py-2 rounded-lg bg-[#2b2b2b] text-white hover:bg-[#333]"
            >
                Cancel
            </button>

            <button
                onClick={handleDeleteAll}
                className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
            >
                Delete All
            </button>

        </div>

    </div>

</div>

)}
      {isMobile && mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-[65] bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/*sidebar */}
      <div
        className={`${isMobile
          ? `fixed inset-y-0 left-0 z-[70] flex w-[84vw] max-w-[320px] flex-col justify-between overflow-hidden border-r border-white/10 bg-[#171717] shadow-2xl shadow-black/30 transition-transform duration-200 lg:hidden ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`
          : `h-full bg-[#171717] flex flex-col justify-between transition-all duration-200 ease-in-out overflow-hidden ${expanded ? 'w-[260px]' : 'w-[55px]' }`}`}>
        <div className="flex-1 overflow-y-auto hide-scrollbar flex flex-col">

          {/* New Chats */}
          <div className={Iconbox} onClick={handleNewChat}>
            <FontAwesomeIcon icon={faPlus} className={icons} />
            {showSidebarText && <span className="text-white text-[15px] font-medium whitespace-nowrap">New Chats</span>}
          </div>

          {/* Chats */}
        <div
    className={`${Iconbox} justify-between`}
    onClick={() => setChatsOpen(!chatsOpen)}>
    <div className="flex items-center gap-3">
        <FontAwesomeIcon icon={faComment} className={icons}/>
        {showSidebarText && <span className="text-white">Chats</span>}
    </div>

    {showSidebarText && (
        <FontAwesomeIcon
            icon={faChevronDown}
            className={`text-white/60 text-[12px] transition-transform duration-200 ${
                chatsOpen ? "rotate-180" : ""
            }`}
        />
    )}
</div>

{/* CHAT LIST GOES HERE */}

{showSidebarText && chatsOpen && (

<div className="flex flex-col">

    {chats.map(chat => (

        <div key={chat.id}>

            <div className="px-4 py-2 text-white text-[12px] font-semibold">
                {chat.title}
            </div>

            {chat.conversations.map(conv => (

                <div
                    key={conv.id}
                    onClick={() => {

                        setActiveChatId(chat.id);

                        setChats(prev =>
                            prev.map(c =>
                                c.id === chat.id
                                    ? {
                                          ...c,
                                          activeConversationId: conv.id
                                      }
                                    : c
                            )
                        );

                    }}
                    className="pl-8 py-2 text-white/70 hover:bg-white/5 cursor-pointer"
                >
                    {conv.title}
                </div>

            ))}

        </div>

    ))}

</div>

)}


          {/* Documents */}
          <div
            className={`${Iconbox} justify-between`}
            onClick={() => expanded && setDocsOpen(!docsOpen)}
          >
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faFolder} className={icons} />
              {showSidebarText && <span className="text-white text-[15px] whitespace-nowrap">Documents</span>}
            </div>
            {showSidebarText && (
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`text-white/60 text-[12px] transition-transform duration-200 ${
                  docsOpen ? 'rotate-180' : ''
                }`}
              />
            )}
          </div>

          {/* document list */}

{showSidebarText && docsOpen && (
  <div className="flex flex-col">

    {chats.map(chat => (

      <div
        key={chat.id}
        onClick={() => setActiveChatId(null)}
        className={`px-[18px] py-[8px] cursor-pointer font-medium text-white text-[12px] truncate
        ${
          activeChatId === chat.id
            ? "bg-white/10"
            : "hover:bg-white/5"
        }`}
      >
        {chat.title}
      </div>

    ))}

    <div
      className="flex items-center gap-3 px-[18px] py-[10px] hover:bg-white/5 cursor-pointer"
      onClick={() => fileInputRef.current.click()}
    >
      <FontAwesomeIcon
        icon={faPlus}
        className="text-white/70 text-[13px]"
      />

      <span className="text-white/70 text-[13px]">
        {uploading ? "Uploading..." : "ADD DOCUMENTS"}
      </span>
    </div>

  </div>
)}
          {/* Delete all data */}
          <div className={`${Iconbox} mt-[10px]`}
          onClick={() => setShowDeleteModal(true)}>
            <FontAwesomeIcon icon={faTrash} className="text-white/80 text-[16px] shrink-0 cursor-pointer" />
            {showSidebarText && <span className="text-white text-[15px] whitespace-nowrap">Delete all data</span>}
          </div>
        </div>

        {/* footer */}
        <div className="w-full flex flex-col border-t border-white/10">
          <button
            onClick={() => !isMobile && setExpanded(!expanded)}
            className={`flex items-center px-[18px] py-[14px] hover:bg-white/5 ${isMobile ? 'cursor-default' : 'cursor-pointer'}`}
          >
            <FontAwesomeIcon
              icon={expanded ? faAngleLeft : faAngleRight}
              className={icons}
            />
          </button>
        <div
  className="flex items-center gap-3 px-[18px] py-[12px] hover:bg-white/5 cursor-pointer"
  onClick={() => {
    setShowAppGuide(true);
    if (isMobile) {
      setMobileSidebarOpen(false);
    } else {
      setExpanded(false);
    }
  }}
>
  <FontAwesomeIcon icon={faEllipsis} className="text-white/80 text-[18px]" />
  {showSidebarText && <span className="text-white/80 text-[14px] whitespace-nowrap">App guide</span>}
</div>
        </div>
      </div>

{/*sources side  bar */}

<AnimatePresence>
  {showSources && (
    <motion.div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={() => setShowSources(false)}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="h-full w-full max-w-[700px] bg-[#171717] border-l border-white/10 p-4 overflow-y-auto hide-scrollbar sm:p-6"
        initial={{ x: 450 }}
        animate={{ x: 0 }}
        exit={{ x: 450 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 28,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-white text-xl font-semibold">
            Sources
          </h2>

          <button
            onClick={() => setShowSources(false)}
            className="text-white/60 hover:text-white text-2xl transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Current PDF */}
        <div className="mt-6">
          <p className="text-white/40 text-xs uppercase tracking-wider">
            Current Document
          </p>

          <p className="text-white mt-2 font-medium">
            {activeChat?.title}
          </p>
        </div>

        {/* Sources */}
        <div className="mt-8 space-y-4">
          {activeSource.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.08,
                duration: 0.25,
              }}
              className="rounded-xl bg-[#111] border border-white/10 p-4"
            >
              <div className="flex items-center justify-between mb-4">

    <h3 className="text-white font-semibold">
        {src.pdf}
    </h3>

    <span className="px-2 py-1 rounded-full bg-[#232323] text-xs text-green-400">
        {src.similarity >= 85
            ? "High Confidence"
            : src.similarity >= 70
            ? "Medium Confidence"
            : "Low Confidence"}
    </span>

</div>

              {/* We'll replace these placeholders with real values next */}
              <div className="space-y-3 text-sm">

    <div className="flex justify-between">
        <span className="text-white/50">Chunk ID</span>
        <span className="text-white">{src.chunk_id}</span>
    </div>

    <div className="flex justify-between">
        <span className="text-white/50">Similarity</span>

        <span
            className={`font-medium ${
                src.similarity >= 85
                    ? "text-green-400"
                    : src.similarity >= 70
                    ? "text-yellow-400"
                    : "text-red-400"
            }`}
        >
            {src.similarity}%
        </span>
    </div>

    <div className="flex justify-between">
        <span className="text-white/50">Page</span>
        <span className="text-white">{src.page}</span>
    </div>

    <div className="flex justify-between">
        <span className="text-white/50">Paragraph</span>
        <span className="text-white">{src.paragraph}</span>
    </div>

    <div className="mt-4 rounded-lg bg-[#1E1E1E] p-3">
        <p className="text-xs text-white/40 mb-1">
            Citation
        </p>

        <p className="text-sm text-blue-400">
            [{src.pdf}:{src.page}]
        </p>
    </div>

    <div className="mt-4">
        <p className="text-white/50 mb-2">
            Relevant Evidence
        </p>

        <div className="rounded-lg bg-[#1E1E1E] p-3">
            <p className="text-white/80 text-sm leading-6">
                {src.preview}
            </p>
        </div>
    </div>

    <details className="mt-4">
        <summary className="cursor-pointer text-blue-400 hover:text-blue-300">
            View Full Chunk
        </summary>

        <div className="mt-3 rounded-lg bg-[#101010] p-3 border border-white/10">
            <p className="text-white/70 text-sm whitespace-pre-wrap leading-6">
                {src.full_text}
            </p>
        </div>
    </details>

</div>
        
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

<AnimatePresence>
  {showAppGuide && (
    <motion.div
      className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={() => setShowAppGuide(false)}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="w-full h-full bg-[#171717] border-l border-white/10 p-6 overflow-y-auto hide-scrollbar"
        initial={{ x: 450 }}
        animate={{ x: 0 }}
        exit={{ x: 450 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 28,
        }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-white text-xl font-semibold">App Guide</h2>
          <button
            onClick={() => setShowAppGuide(false)}
            className="text-white/60 hover:text-white text-2xl transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="mt-6 text-white/80">
          <Appguide />
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

      {/*main content bar */}
      <div className='h-full w-full min-w-0 flex flex-col relative overflow-hidden'>
        {/*upper bar */}
        <div className='w-full min-h-[55px] flex flex-wrap items-center justify-between gap-3 px-3 py-2 shrink-0 sm:px-[20px]'>

          {/* tabs */}
         <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
   {isMobile && (
     <button
       onClick={() => setMobileSidebarOpen(true)}
       className="mr-1 flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#171717] text-white/80 lg:hidden"
     >
       <FontAwesomeIcon icon={faBars} className="text-[16px]" />
     </button>
   )}
   <button
    onClick={() => setActiveTab("docpilot")}
    className={`h-[34px] px-[14px] rounded-[8px]
    ${
        activeTab === "docpilot"
            ? "bg-[#2a2a2a] text-white"
            : "text-white/60"
    }`}
>
    DocPilot
</button>

<button
    onClick={() => setActiveTab("evaluate")}
    className={`h-[34px] px-[14px] rounded-[8px]
    ${
        activeTab === "evaluate"
            ? "bg-[#2a2a2a] text-white"
            : "text-white/60"
    }`}
>
    Evaluate
</button>
</div>

          {/* right side chips */}
          <div className='flex flex-wrap items-center justify-end gap-2'>
            
            {/*pdf title */}
            <div className='h-[34px] max-w-[180px] px-[12px] rounded-[20px] bg-[#1e1e1e] flex items-center justify-center cursor-pointer sm:px-[16px]'>
              <p className='truncate text-white/90 text-[12px] sm:text-[14px]'>{activeChat?.title || "No Document"}</p>
            </div>

            {/*source section */}
            <div 
            onClick={() => setShowSources(true)}
            className='h-[34px] px-[12px] rounded-[20px] bg-[#1e1e1e] flex items-center gap-2 justify-center
            cursor-pointer hover:bg-[#2a2a2a] sm:px-[16px]'>
              <span className='w-[8px] h-[8px] rounded-full bg-green-500'></span>
              <p className='text-white/90 text-[12px] sm:text-[14px]'>
              {totalSources} Sources Active</p>
            </div>
            
          </div>

        </div>
        

        <div className='flex-1 relative overflow-hidden'>
          <AnimatePresence mode="wait" initial={false}>
            {activeTab === "docpilot" ? (
              <motion.div
                key="docpilot"
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -40, opacity: 0 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
                className='absolute inset-0 flex flex-col'
              >
                {/* chat thread */}
                <div className='flex-1 w-full overflow-y-auto px-3 py-4 sm:px-6 sm:py-6 flex flex-col hide-scrollbar'>
                  {!activeChat ? (
                    <div className='flex-1 w-full flex flex-col items-center justify-center text-center'>
                      {!activeChat && (
                        <div
                          className="w-[56px] h-[56px] rounded-[12px] bg-[#1c1c1c] border border-white/10 flex items-center justify-center mb-[18px]"
                          onClick={() => fileInputRef.current.click()}
                        >
                          <FontAwesomeIcon
                            icon={faFileArrowDown}
                            className="text-white/70 text-[22px]"
                          />
                        </div>
                      )}
                      <p className='text-white text-[18px] font-medium'>
                        {activeChat
                          ? "Your document is ready."
                          : "Start by uploading a PDF to begin asking questions."}
                      </p>
                      <p className='text-white/40 text-[13px] mt-2 max-w-[360px]'>
                        {activeChat
                          ? "Chunking complete. You can now ask questions about your document."
                          : "Answers are grounded in your active sources, with citations and a visible evidence trace for every claim."}
                      </p>
                    </div>
                  ) : (
                    <div className='max-w-[860px] mx-auto w-full flex flex-col gap-4 sm:gap-6'>
                      {messages.map((m) =>
                        m.role === 'user' ? (
                          <div key={m.id} className='flex justify-end'>
                            <div className='max-w-[92%] break-words whitespace-pre-wrap bg-[#2a2a2a] text-white text-[14px] leading-relaxed rounded-[14px] rounded-tr-[4px] px-[14px] py-[12px] sm:max-w-[78%] sm:px-[18px] sm:py-[14px] sm:text-[15px]'>
                              {m.text}
                            </div>
                          </div>
                        ) : (
                          <div key={m.id} className='flex justify-start'>
                            <div className='max-w-[95%] break-words whitespace-pre-wrap bg-[#1c1c1c] text-white rounded-[14px] rounded-tl-[4px] px-[14px] py-[12px] sm:max-w-[85%] sm:px-[20px] sm:py-[16px]'>
                              <p className='text-white/40 text-[11px] tracking-widest font-semibold mb-2'>DOCPILOT</p>
                              <p className='text-[15px] leading-relaxed'>{m.text}</p>

                              {Array.isArray(m.source) && m.source.length > 0 && (
                                <div className="mt-4 border-t border-white/10 pt-3">
                                  <div className="text-[12px] text-white/50">
                                    📄 {m.source[0].pdf}
                                  </div>

                                  <div className="text-[11px] text-white/35 mt-1">
                                    Page {m.source[0].page} • Paragraph {m.source[0].paragraph}
                                  </div>

                                  <button
                                    onClick={() =>
                                      setExpandedSources(prev => ({
                                        ...prev,
                                        [m.id]: !prev[m.id]
                                      }))
                                    }
                                    className="text-blue-400 text-[12px] mt-2 hover:underline cursor-pointer"
                                  >
                                    {expandedSources[m.id] ? "Hide Source" : "See Source"}
                                  </button>

                                  {expandedSources[m.id] && (
                                    <div className="mt-3 space-y-3">
                                      {m.source.map((src, index) => (
                                        <div
                                          key={index}
                                          className="rounded-lg bg-[#111] p-3 text-[13px] text-white/75"
                                        >
                                          {src.full_text}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      )}

                      {isThinking && (
                        <div className="flex justify-start">
                          <div className="max-w-[85%] bg-[#1c1c1c] text-white rounded-[14px] rounded-tl-[4px] px-[20px] py-[16px]">
                            <p className="text-white/40 text-[11px] tracking-widest font-semibold mb-2">
                              DOCPILOT
                            </p>

                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                              <span className="text-white/70">
                                Thinking...
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className='w-full flex items-center justify-center pb-4 px-3 shrink-0 sm:pb-[20px] sm:px-4'>
                  <div className='w-full max-w-[760px] flex flex-col gap-3 sm:flex-row sm:items-center'>
                    <input
                      type='text'
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder='Ask a Question about your documents ....'
                      className='w-full min-w-0 h-[48px] bg-[#171717] border border-white/10 rounded-[10px] px-[16px] text-white text-[14px] placeholder:text-white/40 outline-none focus:border-white/30'
                    />
                    <button
                      onClick={handleSend}
                      className='h-[48px] w-full sm:w-auto px-[20px] bg-white text-black text-[14px] font-medium rounded-[10px] flex items-center justify-center gap-2 cursor-pointer hover:bg-white/90 transition-colors duration-150'
                    >
                      Send
                      <FontAwesomeIcon icon={faPaperPlane} className='text-[13px]' />
                    </button>
                  </div>
                </div>

                {/*evaluation section  */}
              </motion.div>
            ) : (
              <motion.div
                key="evaluate"
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -40, opacity: 0 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
                className='absolute inset-0 overflow-y-auto px-6 py-6 hide-scrollbar'
              >
                <div className='max-w-[760px] mx-auto w-full'>
                  <div className='rounded-3xl border border-white/10 bg-[#171717] p-6'>
                    <p className='text-[11px] uppercase tracking-[0.3em] text-white/40'>Evaluation</p>
                    <h2 className='mt-2 text-2xl font-semibold text-white'>RAG Evaluation Hub</h2>
                    <p className='mt-3 text-sm leading-7 text-white/60'>
                      Measure retrieval quality, answer grounding, and response consistency without leaving the workspace.
                    </p>
                  </div>

                  <div className='mt-4 grid gap-3 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'>
                    {[
  {
    label: "Documents",
    value: evaluationStats.total_documents
  },
  {
    label: "Chunks",
    value: evaluationStats.total_chunks
  },
  {
    label: "Avg Chunks / Doc",
    value: averageChunks
  },
  {
    label: "Questions Asked",
    value: totalQuestions
  },
  {
    label: "Answers Generated",
    value: totalAnswers
  },
  {
    label: "Active Document",
    value: activeChat?.title || "None"
  }
].map((item) => (
                      <div key={item.label} className='rounded-2xl border border-white/10 bg-[#171717] p-4'>
                        <p className='text-[11px] uppercase tracking-[0.25em] text-white/40'>{item.label}</p>
                        <p className='mt-1 text-sm text-white'>{item.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
  <h2 className="text-xl text-white font-semibold mb-4">
    Retrieval Metrics
  </h2>

  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

    {[
      {
        label: "Average Similarity",
        value: evaluation.average_similarity
          ? `${evaluation.average_similarity}%`
          : "--"
      },
      {
        label: "Highest Similarity",
        value: evaluation.highest_similarity
          ? `${evaluation.highest_similarity}%`
          : "--"
      },
      {
        label: "Lowest Similarity",
        value: evaluation.lowest_similarity
          ? `${evaluation.lowest_similarity}%`
          : "--"
      },
      {
        label: "Retrieved Chunks",
        value: activeSource.length
      }

    ].map((item) => (

      <div
        key={item.label}
        className="rounded-2xl border border-white/10 bg-[#171717] p-4"
      >
        <p className="text-[11px] uppercase tracking-[0.25em] text-white/40">
          {item.label}
        </p>

        <p className="mt-2 text-white text-xl font-semibold">
          {item.value}
        </p>
      </div>

    ))}

  </div>
</div>

                  <div className='mt-6 rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-6'>
                    <p className='text-sm font-semibold text-emerald-300'>Quick start</p>
                    <p className='mt-2 text-sm leading-7 text-emerald-100/80'>
                      Add a sample dataset, run the evaluator, and review the generated report directly here.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

 <input
      type="file"
      ref={fileInputRef}
      accept=".pdf"
      style={{ display: "none" }}
      onChange={handleUpload}
    />

    </div>

</div>
  )
}

export default page