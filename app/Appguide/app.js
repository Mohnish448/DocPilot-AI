'use client'

import React, { useEffect, useState } from 'react'

const app = () => {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-3 py-6 flex flex-col justify-center items-center gap-6 sm:px-6 sm:py-10 sm:gap-10">

        {/*main content */}

        {/*welcome section */}
      <div className="max-w-5xl mx-auto rounded-[28px] border border-white/10 bg-gradient-to-br from-[#181818] via-[#141414] to-[#0f0f0f] p-8 shadow-2xl shadow-black/40">


        <div className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">
          Welcome to DocPilot
        </div>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Your intelligent AI-powered document assistant
        </h1>

        <p className="mt-6 text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
          DocPilot is designed to help you understand PDF documents faster by combining advanced Retrieval-Augmented Generation (RAG) with modern language models. Instead of manually searching through lengthy documents, simply upload a PDF and ask questions in natural language. Every answer is supported by retrieved evidence, source citations, similarity scores, and transparent retrieval information, allowing you to verify where the response comes from.
        </p>

        <p className="mt-5 text-lg leading-8 text-white/75">
          Whether you're reading research papers, technical documentation, reports, books, or study material, DocPilot helps you find relevant information quickly and accurately.
        </p>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold text-white">Why DocPilot?</h2>
          <ul className="mt-5 space-y-3 text-sm text-white/75 sm:text-base">
            <li className="flex items-start gap-3">
              <span className="mt-2 h-2.5 w-2.5 rounded-full bg-cyan-400" />
              <span>No sign-up or login required.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-2.5 w-2.5 rounded-full bg-cyan-400" />
              <span>Start using the application immediately.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-2.5 w-2.5 rounded-full bg-cyan-400" />
              <span>AI-powered document question answering.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-2.5 w-2.5 rounded-full bg-cyan-400" />
              <span>Transparent retrieval with citations and evidence.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-2.5 w-2.5 rounded-full bg-cyan-400" />
              <span>Built for learning, research, and productivity.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-2.5 w-2.5 rounded-full bg-cyan-400" />
              <span>Open-source educational project.</span>
            </li>
          </ul>
        </div>

        <p className="mt-8 text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
          We hope DocPilot makes exploring documents faster, easier, and more reliable.
        </p>

        <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-base text-emerald-200 sm:p-5 sm:text-lg">
          Thank you for using DocPilot. We hope it becomes a valuable companion in your learning and research journey.
        </div>
      </div>



{/*about section  */}
      <div className="max-w-5xl mx-auto rounded-[28px] border border-white/10 bg-gradient-to-br from-[#181818] via-[#141414] to-[#0f0f0f] p-8 shadow-2xl shadow-black/40">
        <div className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">
          About DocPilot
        </div>

        <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          About the platform
        </h2>

        <div className="mt-8 space-y-5 text-lg leading-8 text-white/75">
          <p>
            <strong>DocPilot</strong> is an AI-powered document intelligence application designed to make reading and understanding PDF documents faster, easier, and more transparent. Built on the principles of <strong>Retrieval-Augmented Generation (RAG)</strong>, DocPilot retrieves the most relevant sections of your uploaded document before generating an answer, ensuring that responses are grounded in the document itself rather than relying solely on AI knowledge.
          </p>

          <p>
            Unlike traditional document chat applications, DocPilot emphasizes <strong>transparency</strong>. Every response is accompanied by supporting evidence, including source citations, page numbers, paragraph references, chunk identifiers, similarity scores, and retrieval details. This allows users to verify where information originates and build confidence in the generated answers.
          </p>

          <p>
            DocPilot also includes a built-in <strong>Evaluation Dashboard</strong> that provides insights into document processing and retrieval performance. Users can monitor document statistics, chunk information, similarity metrics, and other retrieval data to better understand how the system works behind the scenes.
          </p>

          <p>
            Whether you're working with research papers, technical documentation, academic notes, reports, manuals, or business documents, DocPilot helps you locate information quickly without manually searching through hundreds of pages.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6">
          <h3 className="text-xl font-semibold text-white sm:text-2xl">What makes DocPilot different?</h3>
          <ul className="mt-5 grid gap-3 text-base text-white/75 sm:grid-cols-2">
            <li className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">AI-powered document question answering.</li>
            <li className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">Built using Retrieval-Augmented Generation (RAG).</li>
            <li className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">Transparent retrieval with evidence and citations.</li>
            <li className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">Page, paragraph, and chunk-level references.</li>
            <li className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">Built-in evaluation dashboard for retrieval metrics.</li>
            <li className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">Fast document indexing and semantic search.</li>
            <li className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">Privacy-focused with no account or login required.</li>
            <li className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">Open-source educational project built for learning and research.</li>
          </ul>
        </div>

        <div className="mt-8 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-base text-cyan-100 sm:p-5 sm:text-lg">
          DocPilot was created with a simple goal: to make AI-assisted document exploration accurate, transparent, and easy for everyone.
        </div>
      </div>


{/*how to use section  */}
      <div className="max-w-5xl mx-auto rounded-[28px] border border-white/10 bg-gradient-to-br from-[#181818] via-[#141414] to-[#0f0f0f] p-8 shadow-2xl shadow-black/40">
        <div className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">
          How to Use
        </div>

        <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          A simple step-by-step guide
        </h2>

        <div className="mt-8 space-y-6 text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
          <div>
            <h3 className="text-xl font-semibold text-white">1. Upload a PDF</h3>
            <p className="mt-2">
              Click <span className="font-semibold text-white">Add Documents</span> from the sidebar and select the PDF you want to analyze. DocPilot will automatically process the document by extracting text, creating chunks, generating embeddings, and storing them for semantic retrieval.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white">2. Wait for Processing</h3>
            <p className="mt-2">
              A progress window will appear showing each stage of document processing, including:
            </p>
            <ul className="mt-3 grid gap-2 text-base text-white/75 sm:grid-cols-2">
              <li className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">Uploading PDF</li>
              <li className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">Reading PDF</li>
              <li className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">Chunking Document</li>
              <li className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">Creating Embeddings</li>
              <li className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">Saving to Database</li>
            </ul>
            <p className="mt-3">
              Once processing is complete, your document is ready for interaction.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white">3. Ask Questions</h3>
            <p className="mt-2">
              Type your question into the chat box using natural language and click <span className="font-semibold text-white">Send</span>. You can ask about summaries, definitions, explanations, specific topics, or any information contained within the uploaded document.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white">4. Review AI Responses</h3>
            <p className="mt-2">
              DocPilot retrieves the most relevant document sections before generating an answer. Responses are grounded in the uploaded document and include supporting evidence whenever available.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white">5. Explore Sources</h3>
            <p className="mt-2">
              Click the <span className="font-semibold text-white">Sources</span> button to inspect how the answer was generated. The Sources panel displays:
            </p>
            <ul className="mt-3 grid gap-2 text-base text-white/75 sm:grid-cols-2">
              <li className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">Document name</li>
              <li className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">Chunk ID</li>
              <li className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">Similarity score</li>
              <li className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">Page number</li>
              <li className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">Paragraph number</li>
              <li className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">Citation</li>
              <li className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">Relevant evidence</li>
              <li className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">Full retrieved chunk</li>
            </ul>
            <p className="mt-3">
              This transparency helps you verify the origin of every response.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white">6. View Evaluation Metrics</h3>
            <p className="mt-2">
              Open the <span className="font-semibold text-white">Evaluate</span> tab to monitor retrieval performance and document statistics, including:
            </p>
            <ul className="mt-3 grid gap-2 text-base text-white/75 sm:grid-cols-2">
              <li className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">Total documents processed</li>
              <li className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">Total chunks created</li>
              <li className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">Average chunks per document</li>
              <li className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">Questions asked</li>
              <li className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">Answers generated</li>
              <li className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">Average similarity score</li>
              <li className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">Highest and lowest similarity scores</li>
              <li className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">Retrieved chunk count</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white">7. Start a New Conversation</h3>
            <p className="mt-2">
              Use <span className="font-semibold text-white">New Chat</span> to begin a separate conversation while continuing to use the same uploaded document.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white">8. Manage Your Documents</h3>
            <p className="mt-2">
              Upload additional PDFs at any time or use <span className="font-semibold text-[#FF0000]">Delete All Data</span> to permanently remove all stored documents, embeddings, vector indexes, and chat history from the application.
            </p>
          </div>
        </div>
      </div>



{/* features section */}
      <div className="max-w-5xl mx-auto rounded-[28px] border border-white/10 bg-gradient-to-br from-[#181818] via-[#141414] to-[#0f0f0f] p-8 shadow-2xl shadow-black/40">
        <div className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">
          Features
        </div>

        <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          What DocPilot offers
        </h2>

        <p className="mt-5 text-lg leading-8 text-white/75">
          DocPilot combines Retrieval-Augmented Generation (RAG) with a clean and transparent user experience, making document interaction accurate, explainable, and easy to use.
        </p>

        <div className="mt-8 grid gap-4 text-base leading-7 text-white/75 sm:grid-cols-2 sm:text-lg sm:leading-8">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-semibold text-white">PDF Document Processing</h3>
            <p className="mt-2">Upload PDF documents and automatically extract, process, and prepare them for intelligent semantic search.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-semibold text-white">Intelligent Text Chunking</h3>
            <p className="mt-2">Documents are divided into meaningful chunks, improving retrieval accuracy and ensuring relevant context is provided to the AI.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-semibold text-white">Semantic Search</h3>
            <p className="mt-2">Instead of relying on keyword matching, DocPilot understands the meaning of your questions and retrieves the most relevant content from your document.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-semibold text-white">AI-Powered Question Answering</h3>
            <p className="mt-2">Ask questions in natural language and receive context-aware answers generated directly from your uploaded documents.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:col-span-2">
            <h3 className="font-semibold text-white">Source Transparency</h3>
            <p className="mt-2">Every response includes supporting evidence so you can verify where the information originated. View retrieved chunks, chunk IDs, similarity scores, page numbers, paragraph numbers, citations, and full chunk content.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:col-span-2">
            <h3 className="font-semibold text-white">Retrieval Evaluation Dashboard</h3>
            <p className="mt-2">Monitor the performance of the retrieval system through built-in evaluation metrics, including total documents, total chunks, average chunks per document, questions asked, answers generated, average similarity score, highest similarity score, lowest similarity score, and retrieved chunk count.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-semibold text-white">Multiple Conversations</h3>
            <p className="mt-2">Create multiple chat sessions for the same document without re-uploading the PDF, allowing different discussions while preserving previous conversations.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-semibold text-white">Fast Retrieval</h3>
            <p className="mt-2">Powered by vector embeddings and semantic search for quick and relevant document retrieval.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-semibold text-white">Complete Data Management</h3>
            <p className="mt-2">Delete all uploaded documents, embeddings, vector indexes, and conversations with a single action whenever needed.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-semibold text-white">Privacy First</h3>
            <p className="mt-2">DocPilot does not require user registration or login. Your documents are processed only for your active session, and you remain in control of your uploaded data.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:col-span-2">
            <h3 className="font-semibold text-white">Simple and Modern Interface</h3>
            <p className="mt-2">A clean, responsive interface designed to make document exploration intuitive for students, researchers, developers, and professionals.</p>
          </div>
        </div>
      </div>



{/*FAQ section */}
      <div className="max-w-5xl mx-auto rounded-[28px] border border-white/10 bg-gradient-to-br from-[#181818] via-[#141414] to-[#0f0f0f] p-8 shadow-2xl shadow-black/40">
        <div className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">
          FAQ
        </div>

        <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Frequently Asked Questions
        </h2>

        <div className="mt-8 space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-xl font-semibold text-white">Do I need to create an account to use DocPilot?</h3>
            <p className="mt-2 text-base leading-7 text-white/75 sm:text-lg sm:leading-8">No. DocPilot does not require any sign-up or login. Simply upload your PDF and start asking questions.</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-xl font-semibold text-white">What file formats are supported?</h3>
            <p className="mt-2 text-base leading-7 text-white/75 sm:text-lg sm:leading-8">Currently, DocPilot supports PDF files.</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-xl font-semibold text-white">How does DocPilot answer my questions?</h3>
            <p className="mt-2 text-base leading-7 text-white/75 sm:text-lg sm:leading-8">DocPilot uses Retrieval-Augmented Generation (RAG) to retrieve the most relevant sections of your document before generating an AI-powered response.</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-xl font-semibold text-white">Can I verify where an answer comes from?</h3>
            <p className="mt-2 text-base leading-7 text-white/75 sm:text-lg sm:leading-8">Yes. Every response includes citations, page numbers, paragraph references, chunk IDs, similarity scores, and supporting evidence.</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-xl font-semibold text-white">Can I upload multiple documents?</h3>
            <p className="mt-2 text-base leading-7 text-white/75 sm:text-lg sm:leading-8">Yes. You can upload multiple PDF documents and switch between them from the Documents panel.</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-xl font-semibold text-white">Can I delete my data?</h3>
            <p className="mt-2 text-base leading-7 text-[#ff6b6b] sm:text-lg sm:leading-8">Yes. The Delete All Data option permanently removes all uploaded documents, embeddings, vector data, and chat history.</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-xl font-semibold text-white">Is DocPilot free to use?</h3>
            <p className="mt-2 text-base leading-7 text-white/75 sm:text-lg sm:leading-8">Yes. DocPilot is an open-source educational project and is free to use.</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-xl font-semibold text-white">Does DocPilot always provide perfect answers?</h3>
            <p className="mt-2 text-base leading-7 text-[#ff6b6b] sm:text-lg sm:leading-8">DocPilot aims to provide accurate, document-based responses, but AI-generated answers may occasionally be incomplete or inaccurate. Always verify important information using the provided sources and citations.</p>
          </div>
        </div>
      </div>


{/*privacy policy section */}
      <div className="max-w-5xl mx-auto rounded-[28px] border border-white/10 bg-gradient-to-br from-[#181818] via-[#141414] to-[#0f0f0f] p-8 shadow-2xl shadow-black/40">
        <div className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">
          Privacy Policy
        </div>

        <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Your privacy matters
        </h2>

        <div className="mt-8 space-y-5 text-lg leading-8 text-white/75">
          <p>
            Your privacy is important to us. DocPilot is designed to minimize data collection and give you full control over your documents.
          </p>

          <ul className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5">
            <li>No account or login is required to use DocPilot.</li>
            <li>DocPilot does not collect personal information such as your name, email address, or phone number.</li>
            <li>Uploaded PDF documents are used only to provide question-answering and retrieval functionality.</li>
            <li>You can permanently remove all uploaded documents, embeddings, vector data, and chat history at any time using the <span className="font-semibold text-[#ff6b6b]">Delete All Data</span> option.</li>
            <li>You remain the owner of all documents you upload.</li>
            <li>DocPilot is an open-source educational project developed for learning, research, and demonstration purposes.</li>
          </ul>

          <div className="rounded-2xl border border-[#ff6b6b]/30 bg-[#ff6b6b]/10 p-5 text-[#ffb3b3]">
            <strong>Note:</strong> If you are using a publicly hosted version of DocPilot, avoid uploading confidential or sensitive documents. For maximum privacy, run DocPilot locally on your own device.
          </div>
        </div>
      </div>



{/*terms and condition section */}
      <div className="max-w-5xl mx-auto rounded-[28px] border border-white/10 bg-gradient-to-br from-[#181818] via-[#141414] to-[#0f0f0f] p-8 shadow-2xl shadow-black/40">
        <div className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">
          Terms and Conditions
        </div>

        <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Please read before using DocPilot
        </h2>

        <div className="mt-8 space-y-5 text-lg leading-8 text-white/75">
          <p>
            By using DocPilot, you agree to the following terms:
          </p>

          <ul className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5">
            <li>DocPilot is provided for educational, research, and informational purposes.</li>
            <li>Users are responsible for the documents they upload and must ensure they have the right to use them.</li>
            <li>AI-generated responses are based on retrieved document content and may occasionally contain inaccuracies. Users should verify important information using the provided sources and citations.</li>
            <li>DocPilot must not be used for illegal, harmful, or unauthorized activities.</li>
            <li>The developer is not responsible for any loss, damages, or decisions made based on AI-generated responses.</li>
            <li>These terms may be updated in future versions of the application without prior notice.</li>
          </ul>

          <p>
            By continuing to use DocPilot, you acknowledge that you have read and agreed to these terms and conditions.
          </p>
        </div>
      </div>


{/* personal about section */}
      <div className="max-w-5xl mx-auto rounded-[28px] border border-white/10 bg-gradient-to-br from-[#181818] via-[#141414] to-[#0f0f0f] p-8 shadow-2xl shadow-black/40">
        <div className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">
          About the Developer
        </div>

        <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          A personal note from the creator
        </h2>

        <div className="mt-8 space-y-5 text-lg leading-8 text-white/75">
          <p>
            Hello! I'm <strong>Mohnish</strong>, the developer behind <strong>DocPilot</strong>.
          </p>
          <p>
            DocPilot was created as a personal project to explore modern AI technologies and build a transparent Retrieval-Augmented Generation (RAG) system from the ground up. The goal was not only to develop an intelligent document assistant but also to help users understand <strong>how</strong> AI arrives at its answers through citations, retrieved evidence, and evaluation metrics.
          </p>
          <p>
            This project reflects my passion for <strong>Artificial Intelligence, Machine Learning, and Full-Stack Development</strong>, with a focus on building practical AI applications that are both useful and transparent.
          </p>
          <p>
            Thank you for taking the time to explore DocPilot. I hope it makes working with documents faster, smarter, and more enjoyable.
          </p>
          <p className="font-semibold text-cyan-200">
            Happy Learning!
          </p>
        </div>
      </div>

      {/*contact section */}
      <div className="max-w-5xl mx-auto rounded-[28px] border border-white/10 bg-gradient-to-br from-[#181818] via-[#141414] to-[#0f0f0f] p-8 shadow-2xl shadow-black/40">
        <div className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">
          Contact
        </div>

        <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Let’s stay connected
        </h2>

        <div className="mt-8 space-y-5 text-lg leading-8 text-white/75">
          <p>
            Thank you for using <strong>DocPilot</strong>.
          </p>
          <p>
            If you have any questions, suggestions, or feedback, I would be happy to hear from you. Feel free to connect through any of the platforms below.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <a
              href="mailto:mohnishkumar724@gmail.com"
              className="min-w-0 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-400/40 hover:bg-cyan-400/10"
            >
              <div className="font-semibold text-white">Email</div>
              <div className="mt-1 text-sm text-cyan-200 break-words">mohnishkumar724@gmail.com</div>
            </a>
            <a
              href="https://www.linkedin.com/in/mohnish-dev"
              target="_blank"
              rel="noreferrer"
              className="min-w-0 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-400/40 hover:bg-cyan-400/10"
            >
              <div className="font-semibold text-white">LinkedIn</div>
              <div className="mt-1 text-sm text-cyan-200 break-words">linkedin.com/in/mohnish-dev</div>
            </a>
            <a
              href="https://github.com/Mohnish448"
              target="_blank"
              rel="noreferrer"
              className="min-w-0 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-400/40 hover:bg-cyan-400/10"
            >
              <div className="font-semibold text-white">GitHub</div>
              <div className="mt-1 text-sm text-cyan-200 break-words">github.com/Mohnish448</div>
            </a>
          </div>

          <p className="pt-2">
            I appreciate your feedback and support as I continue building AI-powered applications.
          </p>

          <div className="rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 text-amber-100">
            <strong>Note:</strong> DocPilot is developed and maintained independently. The application's source code is private and is not publicly distributed.
          </div>
        </div>
      </div>

      <footer className="max-w-5xl mx-auto rounded-[28px] border border-white/10 bg-gradient-to-br from-[#181818] via-[#141414] to-[#0f0f0f] p-6 text-center text-sm text-white/75 shadow-2xl shadow-black/40 sm:p-8">
        <p className="text-white/90 font-medium">© 2026 DocPilot. All rights reserved.</p>
        <p className="mt-2 text-white/70">Designed and developed by <span className="text-cyan-300 font-semibold">Mohnish</span>.</p>
      </footer>

    </div>
  )
}

export default app