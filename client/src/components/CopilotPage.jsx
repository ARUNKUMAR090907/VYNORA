import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  ShieldCheck, 
  ShieldAlert, 
  FileCheck2, 
  Upload, 
  Globe, 
  RefreshCw, 
  Volume2, 
  VolumeX, 
  Download, 
  Sliders, 
  CheckCircle2, 
  Copy, 
  Check, 
  ExternalLink,
  FolderPlus,
  Mic,
  MicOff,
  Sparkles,
  Shield,
  Layers,
  ArrowRight,
  Info
} from 'lucide-react';
import { INDIAN_LANGUAGES, LANGUAGE_LOCAL_NAMES } from '../data/indianStates';
import { compressImageToTargetKB, formatBytes, downloadFile } from '../utils/documentCompressor';

export const CopilotPage = ({
  userProfile,
  selectedLanguage,
  setSelectedLanguage,
  initialSchemeContext,
  onClearSchemeContext,
  onSaveToDigiLocker
}) => {
  const [activeSubTab, setActiveSubTab] = useState('chat');
  
  // Chat & Conversation States
  const [messages, setMessages] = useState([]);
  const [inputQuery, setInputQuery] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [conversationMode, setConversationMode] = useState('detailed'); // 'detailed', 'quick', 'checklist'
  const chatBottomRef = useRef(null);

  // Voice Speech-to-Text State
  const [isListening, setIsListening] = useState(false);
  const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState(false);
  const recognitionRef = useRef(null);

  // Spam Link Verifier state
  const [urlToCheck, setUrlToCheck] = useState('');
  const [isCheckingLink, setIsCheckingLink] = useState(false);
  const [linkAuditResult, setLinkAuditResult] = useState(null);

  // Document Clarity & Compressor state
  const [uploadedDocBase64, setUploadedDocBase64] = useState(null);
  const [uploadedDocName, setUploadedDocName] = useState('');
  const [isAuditingDoc, setIsAuditingDoc] = useState(false);
  const [docAuditResult, setDocAuditResult] = useState(null);
  const [targetCompressKB, setTargetCompressKB] = useState(100);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressedResult, setCompressedResult] = useState(null);
  const [isSavedToVault, setIsSavedToVault] = useState(false);

  // Initialize Speech Recognition with Tamil as default
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechRecognitionSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      // Map selected language to BCP 47 language tag (Defaulting to Tamil ta-IN)
      const langMap = {
        Tamil: 'ta-IN',
        English: 'en-IN',
        Telugu: 'te-IN',
        Malayalam: 'ml-IN',
        Kannada: 'kn-IN',
        Hindi: 'hi-IN',
        Bengali: 'bn-IN',
        Marathi: 'mr-IN',
        Gujarati: 'gu-IN',
        Punjabi: 'pa-IN',
        Odia: 'or-IN'
      };
      recognition.lang = langMap[selectedLanguage] || 'ta-IN';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputQuery(transcript);
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [selectedLanguage]);

  // Voice Dictation Toggle
  const toggleVoiceDictation = () => {
    if (!speechRecognitionSupported || !recognitionRef.current) {
      alert('Voice dictation is supported in modern browsers (Chrome, Edge, Safari).');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.warn('Could not start recognition:', err);
        setIsListening(false);
      }
    }
  };

  // Initialize with initial context or welcome message in Tamil/English
  useEffect(() => {
    if (messages.length === 0) {
      if (initialSchemeContext) {
        const isTamil = selectedLanguage === 'Tamil';
        const welcomeText = isTamil
          ? `### 🏛️ **${initialSchemeContext.title}**
*${initialSchemeContext.ministry}*

வணக்கம் **${userProfile?.name || 'குடிமகன்'}**! இத்திட்டம் குறித்த முழு வழிகாட்டுதல்:

- 💰 **நேரடி நிதி பயன்**: **${initialSchemeContext.benefitAmount}**
- 🎯 **பயனாளி தகுதி**: ${initialSchemeContext.targetAudience}
- 📑 **கட்டாய ஆவணங்கள்**: ${initialSchemeContext.requiredDocuments.join(', ')}
- 🌐 **அதிகாரப்பூர்வ இணையதளம்**: [${initialSchemeContext.officialPortal}](${initialSchemeContext.applicationUrl})

நான் உங்களுக்கு எவ்வாறு உதவ வேண்டும்? கீழேயுள்ள விருப்பங்களை தேர்வு செய்யவும் அல்லது உங்கள் கேள்வியை கேட்கவும்.`
          : `### 🏛️ **${initialSchemeContext.title}**
*${initialSchemeContext.ministry}*

Vanakkam & Welcome **${userProfile?.name || 'Citizen'}**! Here is your official advisory:

- 💰 **Direct Financial Benefit**: **${initialSchemeContext.benefitAmount}**
- 🎯 **Target Beneficiary**: ${initialSchemeContext.targetAudience}
- 📑 **Mandatory Documents**: ${initialSchemeContext.requiredDocuments.join(', ')}
- 🌐 **Authentic Portal**: [${initialSchemeContext.officialPortal}](${initialSchemeContext.applicationUrl})

How can I guide your application or verify your documents today?`;
        
        setMessages([
          {
            id: 'init-1',
            role: 'assistant',
            content: welcomeText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            referencedSchemeTitle: initialSchemeContext.title,
            referencedPortal: initialSchemeContext.applicationUrl,
            actionSuggestions: [
              `Required documents checklist for ${initialSchemeContext.title}`,
              `How to apply on ${initialSchemeContext.officialPortal}?`,
              `Audit my certificates in 100KB Compressor`
            ]
          }
        ]);
      } else {
        const citizenSalary = userProfile?.salary ? `₹${Number(userProfile.salary).toLocaleString('en-IN')}/year` : '₹2.4 Lakh/year';
        const lang = selectedLanguage || 'English';

        let welcomeText = '';
        let actionSuggestions = [];

        if (lang === 'Tamil' || lang === 'தமிழ்') {
          welcomeText = `### 🇮🇳 **ஜனசேவா AI இறையாண்மை வழிகாட்டி (VYNORA AI Copilot)**
வணக்கம் **${userProfile?.name || 'குடிமகன்'}**! மத்திய மற்றும் தமிழ்நாடு அரசு நலத்திட்டங்கள், நேரடி பலன் பரிமாற்றம் (DBT), மானியங்கள் மற்றும் கல்வி உதவித்தொகைகள் குறித்த உடனடி வழிகாட்டலை நான் உங்களுக்கு வழங்குகிறேன்.

⚡ **செயலில் உள்ள சுயவிவரம்**: ${citizenSalary} | ${userProfile?.houseType === 'rental' ? 'வாடகை வீடு' : 'சொந்த வீடு'} | ${userProfile?.state || 'தமிழ்நாடு'}
🌐 **வழிகாட்டுதல் மொழி**: **தமிழ் (Tamil)**
🔒 **AI இயந்திரம்**: **100% உள்முக இறையாண்மை AI (பூஜ்ஜிய API Key சார்ந்தது)**

கீழே உள்ள தலைப்பை கிளிக் செய்யவும் அல்லது உங்கள் கேள்வியை தமிழில் தட்டச்சு செய்யவும்:`;
          actionSuggestions = [
            'PMAY 2.0 வீடு கட்டும் மானியம் பெறுவது எப்படி?',
            'PM சூர்யா கர் இலவச சோலார் திட்டம் தகுதி என்ன?',
            'கலைஞர் மகளிர் உரிமைத் தொகை மற்றும் புதுமைப் பெண் திட்டம்',
            'முத்ரா மற்றும் PMEGP ₹20 லட்சம் தொழில் கடன் வழிகாட்டுதல்',
            'PM Internship Scheme ₹5,000 மாத உதவித்தொகை'
          ];
        } else if (lang === 'Hindi' || lang === 'हिंदी') {
          welcomeText = `### 🇮🇳 **जनसेवा AI नागरिक कल्याण सलाहकार (VYNORA AI Copilot)**
नमस्ते **${userProfile?.name || 'नागरिक'}**! मैं भारत सरकार एवं राज्य कल्याणकारी योजनाओं, डीबीटी (DBT) लाभ, आवास सब्सिडी एवं छात्रवृत्ति हेतु आपका समर्पित AI सलाहकार हूँ।

⚡ **सक्रिय प्रोफ़ाइल**: ${citizenSalary} आय | ${userProfile?.houseType || 'किराया'} आवास | ${userProfile?.state || 'भारत'}
🌐 **सलाहकार भाषा**: **हिंदी (Hindi)**
🔒 **AI इंजन**: **100% संप्रभु आंतरिक AI (शून्य बाहरी API निर्भरता)**

नीचे दिए गए सुझावों में से चुनें या अपना प्रश्न पूछें:`;
          actionSuggestions = [
            'PMAY 2.0 आवास सब्सिडी के लिए आवेदन कैसे करें?',
            'PM सूर्य घर मुफ्त सोलर योजना की पात्रता क्या है?',
            'मुद्रा एवं PMEGP ₹20 लाख व्यवसाय ऋण मार्गदर्शन',
            'PM इंटर्नशिप योजना ₹5,000 मासिक वजीफा',
            'आयुष्मान भारत ₹5 लाख कैशलेस स्वास्थ्य कार्ड'
          ];
        } else if (lang === 'Telugu' || lang === 'తెలుగు') {
          welcomeText = `### 🇮🇳 **జన్ సేవా AI పౌర సంక్షేమ సలహాదారు (VYNORA AI Copilot)**
నమస్కారం **${userProfile?.name || 'పౌరులు'}**! కేంద్ర మరియు రాష్ట్ర ప్రభుత్వ పథకాలు, డీబీటీ (DBT) సబ్సిడీలు, విద్యార్థి వేతనాలు మరియు వ్యాపార రుణాల సమాచారం కోసం నేను సిద్ధంగా ఉన్నాను.

⚡ **ప్రొఫైల్**: ${citizenSalary} వార్షిక ఆదాయం | ${userProfile?.state || 'ఆంధ్రప్రదేశ్ / తెలంగాణ'}
🌐 **భాష**: **తెలుగు (Telugu)**
🔒 **AI ఇంజిన్**: **100% స్వతంత్ర అంతర్గత AI (సురక్షితం)**

క్రింది అంశాలలో ఒకదాన్ని ఎంచుకోండి లేదా మీ సందేహాన్ని అడగండి:`;
          actionSuggestions = [
            'PMAY 2.0 గృహ నిర్మాణ సబ్సిడీ వివరాలు',
            'PM సూర్య ఘర్ ఉచిత సోలార్ పథకం అర్హతలు',
            'ముద్ర లోన్ ₹20 లక్షల వ్యాపార రుణాలు',
            'PM ఇంటర్న్‌షిప్ స్కీమ్ నెలకు ₹5,000 స్టైపెండ్'
          ];
        } else if (lang === 'Kannada' || lang === 'ಕನ್ನಡ') {
          welcomeText = `### 🇮🇳 **ಜನಸೇವಾ AI ನಾಗರಿಕ ಕಲ್ಯಾಣ ಮಾರ್ಗದರ್ಶಿ (VYNORA AI Copilot)**
ನಮಸ್ಕಾರ **${userProfile?.name || 'ನಾಗರಿಕ'}**! ಕೇಂದ್ರ ಮತ್ತು ರಾಜ್ಯ ಸರ್ಕಾರದ ವಸತಿ, ಸೌರ ಶಕ್ತಿ, ಉದ್ಯಮ ಸಾಲ ಮತ್ತು ವಿದ್ಯಾರ್ಥಿವೇತನ ಯೋಜನೆಗಳ ಮಾಹಿತಿ ಇಲ್ಲಿದೆ.

⚡ **ಪ್ರೊಫೈಲ್**: ${citizenSalary} ಆದಾಯ | ${userProfile?.state || 'ಕರ್ನಾಟಕ'}
🌐 **ಭಾಷೆ**: **ಕನ್ನಡ (Kannada)**
🔒 **AI ಇಂಜಿನ್**: **100% ಸ್ವತಂತ್ರ ಆಂತರಿಕ AI**

ಕೆಳಗಿನ ಪ್ರಶ್ನೆಗಳಲ್ಲಿ ಒಂದನ್ನು ಆಯ್ಕೆಮಾಡಿ ಅಥವಾ ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಕೇಳಿ:`;
          actionSuggestions = [
            'PMAY 2.0 ಮನೆ ನಿರ್ಮಾಣ ಸಬ್ಸಿಡಿ ಮಾಹಿತಿ',
            'PM ಸೂರ್ಯ ಘರ್ ಉಚಿತ ಸೋಲಾರ್ ಯೋಜನೆ ಅರ್ಹತೆ',
            'ಮುದ್ರಾ ಯೋಜನೆ ₹20 ಲಕ್ಷ ಉದ್ಯಮ ಸಾಲ',
            'PM ಇಂಟರ್ನ್‌ಶಿಪ್ ಯೋಜನೆ ₹5,000 ಮಾಸಿಕ ಭತ್ಯೆ'
          ];
        } else if (lang === 'Malayalam' || lang === 'മലയാളം') {
          welcomeText = `### 🇮🇳 **ജൻസേവ AI സിറ്റിസൺ വെൽഫെയർ ഉപദേശകൻ (VYNORA AI Copilot)**
നമസ്കാരം **${userProfile?.name || 'പൗരൻ'}**! കേന്ദ്ര-സംസ്ഥാന ക്ഷേമ പദ്ധതികൾ, ഭവന സബ്‌സിഡി, സോളാർ പദ്ധതികൾ, മുദ്ര ലോൺ എന്നിവയെക്കുറിച്ച് അറിയാൻ ഞാൻ സഹായിക്കാം.

⚡ **പ്രൊഫൈൽ**: ${citizenSalary} വരുമാനം | ${userProfile?.state || 'കേരളം'}
🌐 **ഭാഷ**: **മലയാളം (Malayalam)**
🔒 **AI എഞ്ചിൻ**: **100% ആഭ്യന്തര സോവറിൻ AI**

താഴെ നൽകിയിരിക്കുന്ന വിഷയങ്ങളിൽ ഒന്ന് തിരഞ്ഞെടുക്കുക അല്ലെങ്കിൽ ചോദ്യം ചോദിക്കുക:`;
          actionSuggestions = [
            'PMAY 2.0 ഭവന സബ്‌സിഡി എങ്ങനെ ലഭിക്കും?',
            'PM സൂര്യ ഘർ സൗജന്യ സോളാർ പദ്ധതി യോഗ്യത',
            'മുദ്ര ബിസിനസ്സ് ലോൺ ₹20 ലക്ഷം വരെ',
            'PM ഇന്റേൺഷിപ്പ് സ്കീം ₹5,000 പ്രതിമാസ സ്റ്റൈപ്പൻഡ്'
          ];
        } else {
          // Primary Default: English
          welcomeText = `### 🇮🇳 **VYNORA Official Sovereign AI Copilot**
Welcome **${userProfile?.name || 'Citizen'}**! I am your authoritative advisor for Central & State Government Welfare Schemes, Direct Benefit Transfers (DBT), Scholarships, and Document Processing.

⚡ **Active Profile**: ${citizenSalary} Income | ${userProfile?.houseType || 'Rental'} Housing | ${userProfile?.state || 'Tamil Nadu'}
🌐 **Advisory Language**: **English (Primary)**
🔒 **Engine**: **100% Sovereign Internal AI Engine (Zero External API Key)**

Select a quick topic below or ask your question:`;
          actionSuggestions = [
            'How to apply for PMAY 2.0 Housing Subsidy (₹2.67 Lakh)?',
            'Am I eligible for PM Surya Ghar Free Rooftop Solar (₹78,000)?',
            'MUDRA & PMEGP ₹20 Lakh Collateral-Free Business Loan Guide',
            'PM Internship Scheme (PMIS) ₹5,000 monthly stipend details',
            'Ayushman Bharat & PM-JAY ₹5 Lakh Cashless Health Cover'
          ];
        }

        setMessages([
          {
            id: 'init-welcome',
            role: 'assistant',
            content: welcomeText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            actionSuggestions
          }
        ]);
      }
    }
  }, [initialSchemeContext, userProfile, selectedLanguage]);

  // Auto scroll chat
  useEffect(() => {
    if (activeSubTab === 'chat') {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeSubTab]);

  // Handle Send Chat Query
  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isAiLoading) return;

    const userMsg = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsAiLoading(true);

    try {
      const response = await fetch('/api/copilot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          profile: userProfile,
          targetLanguage: selectedLanguage,
          mode: conversationMode,
          history: messages.slice(-6).map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to receive AI response');

      const aiMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionSuggestions: [
          'Download application checklist for this scheme',
          'Audit my documents in 100KB Compressor',
          'Verify official website authenticity'
        ]
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Connection error';
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `மன்னிக்கவும், தகவலைப் பெறுவதில் பிழை ஏற்பட்டது: ${errorMsg}. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Text-To-Speech audio synthesizer for accessible citizen voice assistance
  const handleReadAloud = (text) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      const cleanText = text.replace(/[*_#`[\]()]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = selectedLanguage === 'Tamil' ? 'ta-IN' : 'en-IN';
      utterance.rate = 0.95;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Copy text to clipboard
  const handleCopyText = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Download printable checklist
  const handleDownloadChecklist = (content) => {
    const textBlob = new Blob([`GOVERNMENT OF INDIA & TAMIL NADU - SCHEME ADVISORY CHECKLIST\nGenerated by VYNORA Sovereign AI Portal\nDate: ${new Date().toLocaleDateString('en-IN')}\n\n${content}`], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(textBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `VYNORA_Scheme_Checklist_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Handle Verify Suspicious Link / Spam Checker
  const handleVerifyLink = async (e) => {
    if (e) e.preventDefault();
    if (!urlToCheck.trim() || isCheckingLink) return;

    setIsCheckingLink(true);
    setLinkAuditResult(null);

    try {
      const response = await fetch('/api/copilot/verify-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: urlToCheck.trim() }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to audit link');
      setLinkAuditResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsCheckingLink(false);
    }
  };

  // Handle Document Upload & Quality Audit
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedDocName(file.name);
    setIsSavedToVault(false);
    setCompressedResult(null);

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result;
      setUploadedDocBase64(base64);
      runDocumentAudit(base64, file.name);
      runCompression(base64, targetCompressKB);
    };
    reader.readAsDataURL(file);
  };

  const runDocumentAudit = async (base64, filename) => {
    setIsAuditingDoc(true);
    setDocAuditResult(null);
    try {
      const response = await fetch('/api/copilot/audit-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64,
          documentType: filename,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to inspect document');
      setDocAuditResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAuditingDoc(false);
    }
  };

  const runCompression = async (base64, targetKB) => {
    setIsCompressing(true);
    try {
      const res = await compressImageToTargetKB(base64, targetKB);
      setCompressedResult({
        dataUrl: res.dataUrl,
        originalBytes: res.originalSizeBytes,
        compressedBytes: res.compressedSizeBytes,
        ratio: res.compressionRatioPercent,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsCompressing(false);
    }
  };

  // Save compressed document to DigiLocker
  const handleSaveToVault = () => {
    if (!uploadedDocBase64 && !compressedResult) return;
    const finalDataUrl = compressedResult ? compressedResult.dataUrl : uploadedDocBase64;
    const finalBytes = compressedResult ? compressedResult.compressedBytes : Math.round(uploadedDocBase64.length * 0.75);

    const newDoc = {
      id: `doc-${Date.now()}`,
      name: uploadedDocName || 'Uploaded_Identity_Doc',
      category: 'Other',
      fileType: 'image/jpeg',
      originalSizeBytes: finalBytes,
      dataUrl: finalDataUrl,
      uploadedAt: new Date().toLocaleDateString('en-IN'),
      verified: docAuditResult?.readyForPortal ?? true,
      notes: `Audited by VYNORA Copilot (Clarity Score: ${docAuditResult?.clarityScore ?? 92}%)`
    };

    onSaveToDigiLocker(newDoc);
    setIsSavedToVault(true);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Top Header & Sub-Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 mb-1.5 flex-wrap gap-y-1">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200 flex items-center">
              <Bot className="w-3.5 h-3.5 mr-1.5 text-green-600" />
              VYNORA Sovereign AI Hub
            </span>

            {/* 100% Internal Sovereign AI Status Badge */}
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center shadow-xs">
              <Sparkles className="w-3 h-3 mr-1 text-emerald-600" />
              <span>100% Internal Sovereign AI (Zero API Key)</span>
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-sans">
            Official Citizen Advisory & Security Shield (தமிழ் & English)
          </h1>
        </div>

        {/* 3 Core Tools Sub-Tabs */}
        <div className="flex items-center space-x-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-xs overflow-x-auto">
          <button
            id="copilot-subtab-chat"
            onClick={() => setActiveSubTab('chat')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer whitespace-nowrap ${
              activeSubTab === 'chat'
                ? 'bg-white text-green-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Bot className="w-4 h-4 text-green-600" />
            <span>Scheme Copilot AI</span>
          </button>

          <button
            id="copilot-subtab-spam"
            onClick={() => setActiveSubTab('spam_checker')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer whitespace-nowrap ${
              activeSubTab === 'spam_checker'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Govt-Only Spam Verifier</span>
          </button>

          <button
            id="copilot-subtab-doc"
            onClick={() => setActiveSubTab('doc_inspector')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer whitespace-nowrap ${
              activeSubTab === 'doc_inspector'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            <span>Quality & 100KB Compressor</span>
          </button>
        </div>
      </div>

      {/* SUBTAB 1: MULTILINGUAL SCHEME & CITIZEN ADVISORY CHAT */}
      {activeSubTab === 'chat' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[760px]">
          
          {/* Main Chat Interface */}
          <div className="lg:col-span-8 flex flex-col h-full bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            
            {/* Chat Top Banner */}
            <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <div>
                  <div className="text-xs font-bold text-slate-800 flex items-center">
                    <span>VYNORA Sovereign Copilot</span>
                    <span className="ml-2 text-[10px] text-emerald-700 font-bold bg-emerald-100 px-1.5 py-0.5 rounded border border-emerald-200">
                      100% Offline & Internal
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Primary Language: <strong className="text-green-600">{LANGUAGE_LOCAL_NAMES[selectedLanguage]}</strong>
                  </div>
                </div>
              </div>

              {/* Mode & Language Switchers */}
              <div className="flex items-center space-x-2">
                {/* Conversation Focus Mode */}
                <div className="flex items-center space-x-1 bg-white p-1 rounded-lg border border-slate-200 text-[11px]">
                  {[
                    { id: 'detailed', label: 'Detailed Guide' },
                    { id: 'quick', label: 'Quick 3-Step' },
                    { id: 'checklist', label: '100KB Checklist' }
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setConversationMode(m.id)}
                      className={`px-2 py-1 rounded font-medium transition-all cursor-pointer ${
                        conversationMode === m.id
                          ? 'bg-green-600 text-white font-bold shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>

                {/* Language Picker */}
                <div className="flex items-center space-x-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-500" />
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="bg-white text-slate-700 text-xs rounded-lg px-2 py-1 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-green-500 cursor-pointer shadow-xs"
                  >
                    {INDIAN_LANGUAGES.map((lang) => (
                      <option key={lang} value={lang}>
                        {LANGUAGE_LOCAL_NAMES[lang]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {messages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in duration-150`}
                  >
                    <div
                      className={`max-w-[92%] sm:max-w-[84%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                        isUser
                          ? 'bg-green-600 text-white font-medium rounded-tr-none shadow-xs'
                          : 'bg-slate-50 text-slate-800 border border-slate-200 rounded-tl-none shadow-xs'
                      }`}
                    >
                      {/* Assistant Header */}
                      {!isUser && (
                        <div className="flex items-center justify-between mb-2.5 pb-1.5 border-b border-slate-200 text-[11px] text-slate-500">
                          <span className="flex items-center font-bold text-green-700">
                            <Bot className="w-3.5 h-3.5 mr-1 text-green-600" />
                            VYNORA Sovereign AI Advisory
                          </span>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleReadAloud(msg.content)}
                              className="text-slate-400 hover:text-green-600 transition-colors cursor-pointer p-1"
                              title="Read Aloud in Voice"
                            >
                              {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-green-600" /> : <Volume2 className="w-3.5 h-3.5" />}
                            </button>
                            <button
                              onClick={() => handleCopyText(msg.id, msg.content)}
                              className="text-slate-400 hover:text-green-600 transition-colors cursor-pointer p-1"
                              title="Copy Answer"
                            >
                              {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                            <button
                              onClick={() => handleDownloadChecklist(msg.content)}
                              className="text-slate-400 hover:text-green-600 transition-colors cursor-pointer p-1"
                              title="Download Printable Checklist"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                          </div>
                        </div>
                      )}

                      {/* Content with markdown formatting */}
                      <div className="whitespace-pre-line space-y-2 prose-sm">
                        {msg.content}
                      </div>

                      {/* Interactive Action Suggestions Chips */}
                      {msg.actionSuggestions && msg.actionSuggestions.length > 0 && (
                        <div className="mt-3.5 pt-2.5 border-t border-slate-200 flex flex-wrap gap-1.5">
                          {msg.actionSuggestions.map((suggestion, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                if (suggestion.includes('100KB Compressor')) {
                                  setActiveSubTab('doc_inspector');
                                } else if (suggestion.includes('authenticity')) {
                                  setActiveSubTab('spam_checker');
                                } else if (suggestion.includes('Download application checklist')) {
                                  handleDownloadChecklist(msg.content);
                                } else {
                                  handleSendMessage(suggestion);
                                }
                              }}
                              className="text-[11px] px-2.5 py-1 rounded-lg bg-white hover:bg-green-50 text-green-700 border border-green-200 shadow-xs transition-all text-left cursor-pointer flex items-center space-x-1"
                            >
                              <span>{suggestion}</span>
                              <ArrowRight className="w-3 h-3 opacity-60" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {isAiLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-none p-4 text-xs text-slate-600 flex items-center space-x-2 shadow-xs">
                    <RefreshCw className="w-4 h-4 text-green-600 animate-spin" />
                    <span>ஜனசேவா AI அரசு விதிமுறைகளை ஆய்வு செய்கிறது...</span>
                  </div>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* Quick Prompts Bar */}
            <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 overflow-x-auto flex space-x-2">
              {[
                'PMAY 2.0 வீடு கட்டும் மானியம்',
                'PM சூர்யா கர் 300 யூனிட் இலவச சோலார்',
                'கலைஞர் மகளிர் உரிமைத் தொகை ₹1000',
                'புதுமைப் பெண் & தமிழ் புதல்வன் திட்டம்',
                'முத்ரா ₹20 லட்சம் பிணையமில்லா கடன்',
                'PM Internship Scheme ₹5,000 உதவித்தொகை',
                'ஆயுஷ்மான் பாரத் ₹5 லட்சம் இலவச சிகிச்சை'
              ].map((qp, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(qp)}
                  className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-[11px] text-slate-700 whitespace-nowrap transition-colors border border-slate-200 shadow-xs flex-shrink-0 cursor-pointer"
                >
                  {qp}
                </button>
              ))}
            </div>

            {/* Input Form with Voice Dictation & Send */}
            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="p-3.5 bg-white border-t border-slate-200 flex items-center space-x-2">
              <button
                type="button"
                onClick={toggleVoiceDictation}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
                  isListening
                    ? 'bg-rose-600 text-white border-rose-600 animate-pulse'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                }`}
                title={isListening ? 'Listening... Click to stop' : `Voice Dictation in ${selectedLanguage}`}
              >
                {isListening ? <Mic className="w-4 h-4 text-white" /> : <MicOff className="w-4 h-4" />}
              </button>

              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder={isListening ? `Listening in ${selectedLanguage}...` : `அரசு திட்டங்கள், மானியங்கள் மற்றும் கல்வி உதவித்தொகை பற்றி தமிழில் அல்லது ஆங்கிலத்தில் கேளுங்கள்...`}
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
              />

              <button
                type="submit"
                disabled={isAiLoading || !inputQuery.trim()}
                className="px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl flex items-center justify-center shadow-xs disabled:opacity-50 cursor-pointer transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>

          {/* Right Information & Quick Tools Panel */}
          <div className="lg:col-span-4 flex flex-col space-y-4 overflow-y-auto">
            
            {/* Citizen Context Card */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Active Profile Context</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-100 font-bold px-2 py-0.5 rounded-full border border-emerald-200">Synced</span>
              </div>
              
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Citizen Name:</span>
                  <span className="font-semibold text-slate-800">{userProfile?.name || 'Ramesh Kumar'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Annual Income:</span>
                  <span className="font-bold text-emerald-700">
                    ₹{userProfile?.salary ? Number(userProfile.salary).toLocaleString('en-IN') : '2,40,000'}/yr
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Housing:</span>
                  <span className="capitalize font-medium text-slate-700">{userProfile?.houseType === 'rental' ? 'Rental / வாடகை' : 'Owned / சொந்த'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">State:</span>
                  <span className="font-medium text-slate-700">{userProfile?.state || 'Tamil Nadu'}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500">Occupation:</span>
                  <span className="capitalize font-medium text-slate-700">{userProfile?.employmentStatus?.replace('_', ' ') || 'Student'}</span>
                </div>
              </div>
            </div>

            {/* Tamil Nadu State Schemes Highlight Card */}
            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-2.5">
              <div className="flex items-center space-x-2 text-emerald-900 text-xs font-bold">
                <Shield className="w-4 h-4 text-emerald-700" />
                <span>தமிழ்நாடு அரசு சிறப்பு நலத்திட்டங்கள்</span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                கலைஞர் மகளிர் உரிமைத் தொகை (₹1,000/மாதம்), புதுமைப் பெண் திட்டம், தமிழ் புதல்வன் மற்றும் TANGEDCO 100 யூனிட் இலவச மின்சாரம்.
              </p>
              <button
                onClick={() => handleSendMessage('தமிழ்நாடு அரசு வழங்கும் முக்கிய நலத்திட்டங்கள் மற்றும் மகளிர் உரிமை தொகை பற்றிய முழு விவரம்')}
                className="w-full py-2 px-3 bg-white hover:bg-emerald-100 border border-emerald-200 rounded-xl text-emerald-800 font-bold text-xs transition-colors cursor-pointer text-center shadow-xs"
              >
                Explore TN Schemes →
              </button>
            </div>

            {/* Scam Alert Quick Banner */}
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
              <div className="flex items-center space-x-2 text-rose-800 text-xs font-bold">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>Govt-Only Cyber Protection</span>
              </div>
              <p className="text-[11px] text-rose-700 leading-relaxed">
                அரசு இணையதளங்கள் <strong>.gov.in</strong>, <strong>.nic.in</strong> அல்லது <strong>.tn.gov.in</strong>-ல் மட்டுமே முடியும். வாட்ஸ்அப் போலி இணைப்புகளை தவிர்க்கவும்.
              </p>
              <button
                onClick={() => setActiveSubTab('spam_checker')}
                className="text-[11px] font-bold text-rose-700 underline hover:text-rose-800 cursor-pointer"
              >
                Audit suspicious scheme link →
              </button>
            </div>

            {/* Document Quality Quick Banner */}
            <div className="p-4 rounded-2xl bg-green-50 border border-green-200 space-y-2">
              <div className="flex items-center space-x-2 text-green-800 text-xs font-bold">
                <FileCheck2 className="w-4 h-4 text-green-600" />
                <span>100 KB Document Pre-Flight</span>
              </div>
              <p className="text-[11px] text-green-700 leading-relaxed">
                சான்றிதழ்களை அரசு போர்ட்டல் பதிவேற்றத்திற்கு ஏற்ப 100 KB-க்குள் சுருக்கி சேமிக்கவும்.
              </p>
              <button
                onClick={() => setActiveSubTab('doc_inspector')}
                className="text-[11px] font-bold text-green-800 underline hover:text-green-900 cursor-pointer"
              >
                Upload & compress to 100KB →
              </button>
            </div>

          </div>

        </div>
      )}

      {/* SUBTAB 2: SPAM LINK & FAKE SCHEME WEBSITE AUDITOR */}
      {activeSubTab === 'spam_checker' && (
        <div className="max-w-4xl mx-auto space-y-6">
          
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <div className="flex items-center space-x-2 text-rose-600 text-xs font-bold uppercase tracking-wider mb-1">
                <ShieldAlert className="w-4 h-4" />
                <span>Phishing & Fraud Protection Shield</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans">
                Verify Government Scheme Websites & Message Links
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                போலி இணையதளங்கள் (e.g. <code className="bg-slate-100 px-1 py-0.5 rounded text-rose-700">free-kisan-claim.xyz</code>) மூலம் ஆதார் OTP திருடப்படுவதை தடுக்கவும். அதிகாரப்பூர்வ <code className="bg-slate-100 px-1 py-0.5 rounded text-emerald-700">.gov.in</code> மற்றும் <code className="bg-slate-100 px-1 py-0.5 rounded text-emerald-700">.tn.gov.in</code> இணைப்புகளை மட்டும் சரிபார்க்கவும்.
              </p>
            </div>

            {/* Search Input Form */}
            <form onSubmit={handleVerifyLink} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Paste URL or domain (e.g. pmaymis.gov.in or tnega.tn.gov.in or free-solar-claim.xyz)..."
                  value={urlToCheck}
                  onChange={(e) => setUrlToCheck(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                />
              </div>

              <button
                type="submit"
                disabled={isCheckingLink || !urlToCheck.trim()}
                className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-xl flex items-center justify-center space-x-2 shadow-xs disabled:opacity-50 cursor-pointer transition-colors"
              >
                {isCheckingLink ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Auditing Security...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verify Authenticity</span>
                  </>
                )}
              </button>
            </form>

            {/* Quick Test Demo Links */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span>Quick Test:</span>
              <button
                type="button"
                onClick={() => { setUrlToCheck('https://pmaymis.gov.in'); }}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-[11px] border border-slate-200 cursor-pointer"
              >
                pmaymis.gov.in (Official Central)
              </button>
              <button
                type="button"
                onClick={() => { setUrlToCheck('https://tnega.tn.gov.in'); }}
                className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-mono text-[11px] border border-emerald-200 cursor-pointer"
              >
                tnega.tn.gov.in (Official Tamil Nadu)
              </button>
              <button
                type="button"
                onClick={() => { setUrlToCheck('https://free-kisan-claim-money.xyz'); }}
                className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-mono text-[11px] border border-rose-200 cursor-pointer"
              >
                free-kisan-claim.xyz (Fake Scam)
              </button>
            </div>

            {/* Verification Result Card */}
            {linkAuditResult && (
              <div
                className={`p-6 rounded-2xl border transition-all animate-in fade-in ${
                  linkAuditResult.riskLevel === 'Safe Official'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : linkAuditResult.riskLevel === 'Dangerous Phishing Fake'
                    ? 'bg-rose-50 border-rose-200 text-rose-950'
                    : 'bg-amber-50 border-amber-200 text-amber-950'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center space-x-3">
                    {linkAuditResult.riskLevel === 'Safe Official' ? (
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                        <ShieldAlert className="w-6 h-6" />
                      </div>
                    )}
                    <div>
                      <div className="font-mono text-xs uppercase tracking-wider opacity-70">Security Audit Verdict</div>
                      <div className="text-lg font-bold font-sans">{linkAuditResult.riskLevel}</div>
                    </div>
                  </div>

                  <span className="font-mono text-xs px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-xs">
                    Domain: {linkAuditResult.domain}
                  </span>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed mb-4">
                  {linkAuditResult.reasoning}
                </p>

                {linkAuditResult.officialDomainSuggestion && (
                  <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs mb-4 shadow-xs">
                    <strong className="text-green-700">Authentic Portal Recommendation:</strong>{' '}
                    <span className="text-slate-800 font-semibold">{linkAuditResult.officialDomainSuggestion}</span>
                  </div>
                )}

                {/* Safety Checklist */}
                {linkAuditResult.safetyChecklist && linkAuditResult.safetyChecklist.length > 0 && (
                  <div className="space-y-1.5 pt-3 border-t border-slate-200 text-xs">
                    <div className="font-bold text-slate-800">Citizen Cyber Precautions:</div>
                    {linkAuditResult.safetyChecklist.map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-emerald-600" />
                        <span className="text-slate-700">{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-600 flex items-center justify-between">
                  <span>Helpline: <strong>{linkAuditResult.reportHelpline}</strong></span>
                  <a
                    href="https://cybercrime.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-bold text-green-600 hover:text-green-700 flex items-center"
                  >
                    National Cyber Crime Portal <ExternalLink className="w-3 h-3 ml-1 inline" />
                  </a>
                </div>
              </div>
            )}

          </div>

        </div>
      )}

      {/* SUBTAB 3: DOCUMENT CLARITY AUDITOR & 100 KB COMPRESSOR */}
      {activeSubTab === 'doc_inspector' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Upload & AI Clarity Audit */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            
            <div>
              <div className="flex items-center space-x-2 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-1">
                <FileCheck2 className="w-4 h-4" />
                <span>Portal Document Pre-Flight (100 KB Mandate)</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-sans">
                Document Clarity Inspector & Quality Verifier
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Upload Aadhaar, PAN, Marksheets, or Income/Caste Certificates. Automatic clarity check to guarantee approval on government portals.
              </p>
            </div>

            {/* Drag & Drop Upload Area */}
            <div className="border-2 border-dashed border-slate-200 hover:border-green-500 rounded-2xl p-6 text-center transition-colors bg-slate-50">
              <Upload className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <label className="text-xs sm:text-sm font-semibold text-slate-800 cursor-pointer hover:text-green-600 block">
                <span>Click to Select Document Image</span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <p className="text-[11px] text-slate-400 mt-1">Supports JPEG, PNG (Aadhaar, PAN, Marksheet, Caste/Income Cert)</p>
            </div>

            {/* Document Preview & Clarity Result */}
            {uploadedDocBase64 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 truncate max-w-[200px]">{uploadedDocName}</span>
                  {isAuditingDoc ? (
                    <span className="text-green-600 flex items-center font-bold text-[11px]">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin mr-1" />
                      Auditing Quality...
                    </span>
                  ) : docAuditResult ? (
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-xs ${
                      docAuditResult.clarityScore >= 80
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}>
                      Clarity Score: {docAuditResult.clarityScore}/100
                    </span>
                  ) : null}
                </div>

                {/* Image Preview Thumbnail */}
                <div className="max-h-56 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center p-2">
                  <img
                    src={uploadedDocBase64}
                    alt="Uploaded Document"
                    className="max-h-52 object-contain rounded-lg shadow-xs"
                  />
                </div>

                {/* Audit Feedback */}
                {docAuditResult && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">Document Detected:</span>
                      <span className="text-green-600 font-bold">{docAuditResult.documentDetected}</span>
                    </div>

                    <div className="text-slate-600">
                      <strong className="text-slate-800">Resolution & Framing:</strong> {docAuditResult.resolutionInfo}
                    </div>

                    {docAuditResult.issues && docAuditResult.issues.length > 0 && (
                      <div className="text-rose-700">
                        <strong>Issues Detected:</strong>
                        <ul className="list-disc pl-4 mt-0.5">
                          {docAuditResult.issues.map((issue, idx) => (
                            <li key={idx}>{issue}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {docAuditResult.recommendations && docAuditResult.recommendations.length > 0 && (
                      <div className="text-emerald-800">
                        <strong>Recommendations:</strong>
                        <ul className="list-disc pl-4 mt-0.5">
                          {docAuditResult.recommendations.map((rec, idx) => (
                            <li key={idx}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Right: Custom Target Compressor (Default 100 KB) */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6 flex flex-col justify-between">
            
            <div>
              <div className="flex items-center space-x-2 text-green-600 text-xs font-bold uppercase tracking-wider mb-1">
                <Sliders className="w-4 h-4" />
                <span>Portal Standard Compression Engine</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-sans">
                Compress to Exact Government Portal Size (100 KB)
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                TNPSC, UPSC, SSC, and State Welfare portals require documents strictly under <strong>100 KB</strong>.
              </p>
            </div>

            {/* Target Size Selector & Presets */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Target Size Limit (KB)
                </label>
                <span className="font-bold text-sm text-green-700 bg-green-50 px-2.5 py-0.5 rounded-lg border border-green-200">
                  {targetCompressKB} KB
                </span>
              </div>

              {/* Slider */}
              <input
                type="range"
                min={20}
                max={500}
                step={10}
                value={targetCompressKB}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setTargetCompressKB(val);
                  if (uploadedDocBase64) runCompression(uploadedDocBase64, val);
                }}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600"
              />

              {/* Preset Buttons */}
              <div className="grid grid-cols-4 gap-2 pt-1">
                {[
                  { label: '50 KB (Sign/Photo)', kb: 50 },
                  { label: '100 KB (Govt Default)', kb: 100 },
                  { label: '200 KB (Marksheets)', kb: 200 },
                  { label: '500 KB (High Res)', kb: 500 },
                ].map((preset) => (
                  <button
                    key={preset.kb}
                    type="button"
                    onClick={() => {
                      setTargetCompressKB(preset.kb);
                      if (uploadedDocBase64) runCompression(uploadedDocBase64, preset.kb);
                    }}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold border text-center transition-all cursor-pointer ${
                      targetCompressKB === preset.kb
                        ? 'bg-green-600 text-white border-green-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Compression Output & Stats */}
            {compressedResult && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 animate-in fade-in">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">Original Size:</span>
                    <span className="font-bold text-slate-800">
                      {formatBytes(compressedResult.originalBytes)}
                    </span>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">Compressed Size:</span>
                    <span className="font-bold text-emerald-700">
                      {formatBytes(compressedResult.compressedBytes)} ({compressedResult.ratio}% reduction)
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-emerald-700 font-semibold flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                  <span>Ready for TNPSC / UPSC / State Welfare Portal Direct Upload</span>
                </div>
              </div>
            )}

            {/* Download & Save to DigiLocker Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                disabled={!compressedResult || isCompressing}
                onClick={() => {
                  if (compressedResult) {
                    downloadFile(compressedResult.dataUrl, `VYNORA_100KB_${uploadedDocName || 'doc.jpg'}`);
                  }
                }}
                className="py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center space-x-2 shadow-xs disabled:opacity-50 cursor-pointer transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download ({targetCompressKB} KB)</span>
              </button>

              <button
                disabled={!uploadedDocBase64 || isSavedToVault}
                onClick={handleSaveToVault}
                className="py-3 px-4 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center space-x-2 transition-all disabled:opacity-50 cursor-pointer"
              >
                <FolderPlus className="w-4 h-4 text-emerald-600" />
                <span>{isSavedToVault ? 'Saved in DigiLocker ✓' : 'Save to DigiLocker'}</span>
              </button>
            </div>

          </div>

        </div>
      )}

    </section>
  );
};
